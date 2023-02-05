begin;
  -- remove the supabase_realtime publication
  drop publication if exists supabase_realtime;

  -- re-create the supabase_realtime publication with no tables and only for insert
  create publication supabase_realtime with (publish = 'insert');
commit;

-- add a table to the publication
alter publication supabase_realtime add table public.bookmarks;

-- retrieve old records on update and delete
alter table public.bookmarks replica identity full;
