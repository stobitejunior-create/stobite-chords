-- Stobite Chords: shared team library.
-- Paste this whole file into Supabase → SQL Editor → New query, then click Run.
-- Safe to run again: it only creates what's missing and replaces the functions.

-- ---------- tables ----------
create table if not exists public.teams (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 80),
  join_code text not null unique,
  created_by uuid references auth.users (id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.team_members (
  team_id uuid not null references public.teams (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 60),
  role text not null default 'member' check (role in ('leader', 'member')),
  joined_at timestamptz not null default now(),
  primary key (team_id, user_id)
);

create table if not exists public.songs (
  team_id uuid not null references public.teams (id) on delete cascade,
  id text not null check (char_length(id) <= 64),
  title text not null default '' check (char_length(title) <= 200),
  artist text not null default '' check (char_length(artist) <= 200),
  key text not null default '' check (char_length(key) <= 8),
  tempo int check (tempo between 0 and 400),
  time text not null default '' check (char_length(time) <= 8),
  info text not null default '' check (char_length(info) <= 5000),
  tags text[] not null default '{}',
  chart text not null default '' check (char_length(chart) <= 100000),
  updated bigint not null default 0,
  deleted boolean not null default false,
  updated_by uuid default auth.uid(),
  primary key (team_id, id)
);

create table if not exists public.setlists (
  team_id uuid not null references public.teams (id) on delete cascade,
  id text not null check (char_length(id) <= 64),
  name text not null default '' check (char_length(name) <= 200),
  date text not null default '' check (char_length(date) <= 10),
  notes text not null default '' check (char_length(notes) <= 5000),
  items jsonb not null default '[]',
  updated bigint not null default 0,
  deleted boolean not null default false,
  updated_by uuid default auth.uid(),
  primary key (team_id, id)
);

-- ---------- helpers ----------
create or replace function public.is_member(t uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from team_members where team_id = t and user_id = auth.uid());
$$;

create or replace function public.is_leader(t uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from team_members where team_id = t and user_id = auth.uid() and role = 'leader');
$$;

create or replace function public.new_join_code() returns text
language plpgsql volatile set search_path = public as $$
declare
  alphabet constant text := 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'; -- no 0/O, 1/I/L
  code text;
begin
  loop
    code := '';
    for i in 1..8 loop
      code := code || substr(alphabet, 1 + floor(random() * length(alphabet))::int, 1);
    end loop;
    exit when not exists (select 1 from teams where join_code = code);
  end loop;
  return code;
end $$;

-- ---------- row level security ----------
alter table public.teams enable row level security;
alter table public.team_members enable row level security;
alter table public.songs enable row level security;
alter table public.setlists enable row level security;

drop policy if exists "members read team" on public.teams;
create policy "members read team" on public.teams for select using (public.is_member(id));
drop policy if exists "leaders rename team" on public.teams;
create policy "leaders rename team" on public.teams for update using (public.is_leader(id)) with check (public.is_leader(id));

drop policy if exists "members see members" on public.team_members;
create policy "members see members" on public.team_members for select using (public.is_member(team_id));
drop policy if exists "leave or remove" on public.team_members;
create policy "leave or remove" on public.team_members for delete using (user_id = auth.uid() or public.is_leader(team_id));

drop policy if exists "members read songs" on public.songs;
create policy "members read songs" on public.songs for select using (public.is_member(team_id));
drop policy if exists "members add songs" on public.songs;
create policy "members add songs" on public.songs for insert with check (public.is_member(team_id));
drop policy if exists "members edit songs" on public.songs;
create policy "members edit songs" on public.songs for update using (public.is_member(team_id)) with check (public.is_member(team_id));

drop policy if exists "members read setlists" on public.setlists;
create policy "members read setlists" on public.setlists for select using (public.is_member(team_id));
drop policy if exists "members add setlists" on public.setlists;
create policy "members add setlists" on public.setlists for insert with check (public.is_member(team_id));
drop policy if exists "members edit setlists" on public.setlists;
create policy "members edit setlists" on public.setlists for update using (public.is_member(team_id)) with check (public.is_member(team_id));

-- ---------- team actions (called from the app) ----------
create or replace function public.create_team(team_name text, my_name text) returns public.teams
language plpgsql security definer set search_path = public as $$
declare t teams;
begin
  if auth.uid() is null then raise exception 'Not signed in'; end if;
  insert into teams (name, join_code, created_by)
    values (left(trim(team_name), 80), new_join_code(), auth.uid()) returning * into t;
  insert into team_members (team_id, user_id, display_name, role)
    values (t.id, auth.uid(), left(trim(my_name), 60), 'leader');
  return t;
end $$;

create or replace function public.join_team(code text, my_name text) returns public.teams
language plpgsql security definer set search_path = public as $$
declare t teams;
begin
  if auth.uid() is null then raise exception 'Not signed in'; end if;
  select * into t from teams where join_code = upper(regexp_replace(code, '[^A-Za-z0-9]', '', 'g'));
  if not found then raise exception 'No team has that code'; end if;
  insert into team_members (team_id, user_id, display_name)
    values (t.id, auth.uid(), left(trim(my_name), 60))
    on conflict (team_id, user_id) do update set display_name = excluded.display_name;
  return t;
end $$;

create or replace function public.new_team_code(t uuid) returns text
language plpgsql security definer set search_path = public as $$
declare code text;
begin
  if not is_leader(t) then raise exception 'Only a team leader can change the code'; end if;
  code := new_join_code();
  update teams set join_code = code where id = t;
  return code;
end $$;

revoke all on function public.create_team(text, text), public.join_team(text, text), public.new_team_code(uuid), public.new_join_code() from public, anon;
grant execute on function public.create_team(text, text), public.join_team(text, text), public.new_team_code(uuid) to authenticated;

-- ---------- live updates ----------
do $$
begin
  begin alter publication supabase_realtime add table public.songs; exception when duplicate_object then null; end;
  begin alter publication supabase_realtime add table public.setlists; exception when duplicate_object then null; end;
  begin alter publication supabase_realtime add table public.team_members; exception when duplicate_object then null; end;
end $$;

-- ---------- update 2: the band's chord language, shared with the whole team ----------
alter table public.teams add column if not exists language jsonb;
do $$
begin
  begin alter publication supabase_realtime add table public.teams; exception when duplicate_object then null; end;
end $$;

-- ---------- update 3: the key the band plays each song in ----------
alter table public.songs add column if not exists play_key text not null default '' check (char_length(play_key) <= 8);

-- ---------- update 4: admin password checked inside the database ----------
-- The password's fingerprint lives only in this table, which the app cannot read.
-- Set or change it in the SQL Editor (not saved in this file):
--   insert into public.app_admin (id, password_hash) values (1, encode(sha256(convert_to('YOUR PASSWORD', 'UTF8')), 'hex'))
--   on conflict (id) do update set password_hash = excluded.password_hash;
create table if not exists public.app_admin (
  id int primary key default 1 check (id = 1),
  password_hash text not null
);
alter table public.app_admin enable row level security; -- no policies: nobody can read it through the app

create or replace function public.check_admin(pw text) returns boolean
language plpgsql security definer set search_path = public as $$
declare ok boolean;
begin
  select exists (select 1 from app_admin where password_hash = encode(sha256(convert_to(coalesce(pw, ''), 'UTF8')), 'hex')) into ok;
  if not ok then perform pg_sleep(1); end if; -- slows down guessing
  return ok;
end $$;

-- Lets the music director take the leader role back (e.g. after reinstalling the app on a phone).
create or replace function public.claim_leader(t uuid, pw text) returns void
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'Not signed in'; end if;
  if not check_admin(pw) then raise exception 'Wrong password'; end if;
  if not is_member(t) then raise exception 'Join the team first'; end if;
  update team_members set role = 'leader' where team_id = t and user_id = auth.uid();
end $$;

revoke all on function public.check_admin(text), public.claim_leader(uuid, text) from public, anon;
grant execute on function public.check_admin(text), public.claim_leader(uuid, text) to authenticated;
