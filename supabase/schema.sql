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

-- ---------- update 5: YouTube link on each song ----------
alter table public.songs add column if not exists video text not null default '' check (char_length(video) <= 300);

-- ---------- update 6: artists shared with the team (name + portrait) ----------
create table if not exists public.artists (
  team_id uuid not null references public.teams (id) on delete cascade,
  id text not null check (char_length(id) <= 64),
  name text not null default '' check (char_length(name) <= 200),
  photo text not null default '' check (char_length(photo) <= 90000),
  src text not null default '' check (src in ('', 'auto', 'own')),
  updated bigint not null default 0,
  deleted boolean not null default false,
  updated_by uuid default auth.uid(),
  primary key (team_id, id)
);
alter table public.artists enable row level security;

drop policy if exists "members read artists" on public.artists;
create policy "members read artists" on public.artists for select using (public.is_member(team_id));
drop policy if exists "members add artists" on public.artists;
create policy "members add artists" on public.artists for insert with check (public.is_member(team_id));
drop policy if exists "members edit artists" on public.artists;
create policy "members edit artists" on public.artists for update using (public.is_member(team_id)) with check (public.is_member(team_id));

do $$
begin
  begin alter publication supabase_realtime add table public.artists; exception when duplicate_object then null; end;
end $$;

-- ---------- update 7: nothing can be lost ----------
-- 1. Every change keeps the previous version in public.history (visible to you in the Supabase dashboard only).
-- 2. A delete can never blank a song, setlist or artist: its words stay in the row.
-- 3. A device with out-of-date data can never overwrite newer work.
-- 4. The music director can find every team (name + code) and rejoin one with the admin password.
alter table public.songs add column if not exists play_key text not null default '' check (char_length(play_key) <= 8);
alter table public.songs add column if not exists video text not null default '' check (char_length(video) <= 300);

create table if not exists public.history (
  id bigserial primary key,
  tbl text not null,
  team_id uuid,
  row_id text,
  row jsonb not null,
  changed_at timestamptz not null default now()
);
alter table public.history enable row level security; -- no policies: the app can't read or change it
create index if not exists history_lookup on public.history (tbl, team_id, row_id);

create or replace function public.protect_songs() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.updated < old.updated then return null; end if;
  if new.deleted and coalesce(new.title, '') = '' and coalesce(new.chart, '') = '' then
    new.title := old.title; new.artist := old.artist; new.key := old.key; new.tempo := old.tempo; new."time" := old."time";
    new.info := old.info; new.tags := old.tags; new.chart := old.chart; new.play_key := old.play_key; new.video := old.video;
  end if;
  if (to_jsonb(new) - 'updated' - 'updated_by') is distinct from (to_jsonb(old) - 'updated' - 'updated_by') then
    insert into public.history (tbl, team_id, row_id, row) values ('songs', old.team_id, old.id, to_jsonb(old));
  end if;
  return new;
end $$;

create or replace function public.protect_setlists() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.updated < old.updated then return null; end if;
  if new.deleted and coalesce(new.name, '') = '' then
    new.name := old.name; new.date := old.date; new.notes := old.notes; new.items := old.items;
  end if;
  if (to_jsonb(new) - 'updated' - 'updated_by') is distinct from (to_jsonb(old) - 'updated' - 'updated_by') then
    insert into public.history (tbl, team_id, row_id, row) values ('setlists', old.team_id, old.id, to_jsonb(old));
  end if;
  return new;
end $$;

drop trigger if exists protect_songs on public.songs;
create trigger protect_songs before update on public.songs for each row execute function public.protect_songs();
drop trigger if exists protect_setlists on public.setlists;
create trigger protect_setlists before update on public.setlists for each row execute function public.protect_setlists();

do $$
begin
  if to_regclass('public.artists') is not null then
    execute $f$
      create or replace function public.protect_artists() returns trigger
      language plpgsql security definer set search_path = public as $g$
      begin
        if new.updated < old.updated then return null; end if;
        if new.deleted and coalesce(new.name, '') = '' then new.name := old.name; new.photo := old.photo; new.src := old.src; end if;
        if (to_jsonb(new) - 'updated' - 'updated_by') is distinct from (to_jsonb(old) - 'updated' - 'updated_by') then
          insert into public.history (tbl, team_id, row_id, row) values ('artists', old.team_id, old.id, to_jsonb(old));
        end if;
        return new;
      end $g$
    $f$;
    drop trigger if exists protect_artists on public.artists;
    create trigger protect_artists before update on public.artists for each row execute function public.protect_artists();
  end if;
end $$;

-- a first snapshot of everything as it is right now
do $$
begin
  if not exists (select 1 from public.history) then
    insert into public.history (tbl, team_id, row_id, row) select 'songs', team_id, id, to_jsonb(s) from public.songs s;
    insert into public.history (tbl, team_id, row_id, row) select 'setlists', team_id, id, to_jsonb(s) from public.setlists s;
  end if;
end $$;

-- music director: see every team (name + code) and rejoin one, even if everyone left and the code is lost
create or replace function public.admin_list_teams(pw text)
returns table (team_id uuid, team_name text, code text, created timestamptz, songs bigint, members bigint)
language plpgsql security definer set search_path = public as $$
begin
  if auth.uid() is null then raise exception 'Not signed in'; end if;
  if not check_admin(pw) then raise exception 'Wrong password'; end if;
  return query
    select t.id, t.name, t.join_code, t.created_at,
           (select count(*) from songs s where s.team_id = t.id and not s.deleted),
           (select count(*) from team_members m where m.team_id = t.id)
    from teams t order by t.created_at;
end $$;

create or replace function public.admin_join_team(t uuid, pw text, my_name text) returns public.teams
language plpgsql security definer set search_path = public as $$
declare r teams;
begin
  if auth.uid() is null then raise exception 'Not signed in'; end if;
  if not check_admin(pw) then raise exception 'Wrong password'; end if;
  insert into team_members (team_id, user_id, display_name, role)
    values (t, auth.uid(), left(trim(my_name), 60), 'leader')
    on conflict (team_id, user_id) do update set role = 'leader', display_name = excluded.display_name;
  select * into r from teams where id = t;
  return r;
end $$;

revoke all on function public.protect_songs(), public.protect_setlists(), public.admin_list_teams(text), public.admin_join_team(uuid, text, text) from public, anon;
grant execute on function public.admin_list_teams(text), public.admin_join_team(uuid, text, text) to authenticated;
