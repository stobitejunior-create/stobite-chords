-- ---------- update 9: a featured artist on each song ----------
alter table public.songs add column if not exists featuring text not null default '';

create or replace function public.protect_songs() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.updated < old.updated then return null; end if;
  if new.deleted and coalesce(new.title, '') = '' and coalesce(new.chart, '') = '' then
    new.title := old.title; new.artist := old.artist; new.key := old.key; new.tempo := old.tempo; new."time" := old."time";
    new.info := old.info; new.tags := old.tags; new.chart := old.chart; new.play_key := old.play_key; new.video := old.video;
    new.featuring := old.featuring;
  end if;
  if (to_jsonb(new) - 'updated' - 'updated_by') is distinct from (to_jsonb(old) - 'updated' - 'updated_by') then
    insert into public.history (tbl, team_id, row_id, row) values ('songs', old.team_id, old.id, to_jsonb(old));
  end if;
  return new;
end $$;
