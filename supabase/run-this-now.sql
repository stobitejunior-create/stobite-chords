-- Stobite Chords: run this whole thing once. Safe to run again.
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
