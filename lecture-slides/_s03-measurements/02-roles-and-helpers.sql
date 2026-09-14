do $$ begin
  if not exists (select 1 from pg_roles where rolname = 'authenticated') then
    create role authenticated nologin;
  end if;
end $$;
grant usage on schema public, auth to authenticated;
grant select on all tables in schema public to authenticated;
grant execute on all functions in schema auth to authenticated;

-- Pawtograder's ORIGINAL helper: plpgsql, STABLE, SECURITY DEFINER, over user_roles.
create or replace function public.authz_plpgsql(class__id bigint) returns boolean
  language plpgsql stable security definer set search_path to ''
as $$
begin
  return exists (
    select 1 from public.user_roles r
    where r.class_id = class__id and r.user_id = auth.uid()
  );
end;
$$;

-- Pawtograder's CURRENT helper: LANGUAGE sql, STABLE, over the denormalized table.
create or replace function public.authz_sql(class__id bigint) returns boolean
  language sql stable
as $$
  select exists (
    select 1 from public.user_privileges up
    where up.user_id = auth.uid() and up.class_id = authz_sql.class__id
  );
$$;

grant execute on function public.authz_plpgsql(bigint), public.authz_sql(bigint) to authenticated;

alter table gradebook_column_students enable row level security;
alter table gradebook_columns enable row level security;
alter table gradebook_column_groups enable row level security;
alter table user_privileges enable row level security;
alter table user_roles enable row level security;

create policy own_privileges on user_privileges for select to authenticated
  using (user_id = (select auth.uid()));
create policy own_roles on user_roles for select to authenticated
  using (user_id = (select auth.uid()));
