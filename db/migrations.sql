create table public.profiles (
  user_id uuid not null references auth.users on delete cascade,
  username text,
  primary key (user_id)
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by users who created them."
  on profiles for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = user_id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = user_id );

create table public.bookmarks (
  bookmark_id uuid not null default uuid_generate_v4(),
  user_id uuid not null references auth.users on delete cascade,
  repo_owner text not null,
  repo_name text not null,
  repo_url text not null,
  repo_image_url text not null,
  primary key (bookmark_id),
  unique (user_id, repo_owner, repo_name)
);

alter table public.bookmarks enable row level security;

create policy "Bookmarks are viewable by users who created them."
  on bookmarks for select
  using ( auth.uid() = user_id );

create policy "Users can insert their own bookmarks."
  on bookmarks for insert
  with check ( auth.uid() = user_id );

create policy "Users can delete own bookmarks."
  on bookmarks for delete
  using ( auth.uid() = user_id );

