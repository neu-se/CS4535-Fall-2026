-- Mirror of the Pawtograder gradebook shapes, at plausible production scale.
create schema if not exists auth;

create or replace function auth.uid() returns uuid
  language sql stable
as $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;

create table classes (id bigint primary key, name text not null);

create table user_roles (
  id bigserial primary key,
  user_id uuid not null,
  class_id bigint not null references classes(id),
  role text not null,
  private_profile_id uuid not null,
  disabled boolean not null default false
);

create table user_privileges (
  user_id uuid not null,
  class_id bigint not null,
  role text not null,
  private_profile_id uuid,
  primary key (user_id, class_id)
);

create table gradebooks (id bigint primary key, class_id bigint not null references classes(id));

create table gradebook_column_groups (
  id bigserial primary key,
  class_id bigint not null references classes(id),
  gradebook_id bigint not null references gradebooks(id),
  slug text not null,
  name text not null,
  sort_order integer not null
);

create table gradebook_columns (
  id bigserial primary key,
  class_id bigint not null references classes(id),
  gradebook_id bigint not null references gradebooks(id),
  group_id bigint references gradebook_column_groups(id),
  slug text not null,
  name text not null,
  sort_order integer not null
);

create table gradebook_column_students (
  id bigserial primary key,
  class_id bigint not null references classes(id),
  gradebook_column_id bigint not null references gradebook_columns(id),
  student_id uuid not null,
  score numeric,
  is_private boolean not null default false,
  is_missing boolean not null default false
);

-- 10 classes: one large (CS 2100 shape), nine ordinary.
insert into classes select g, 'Class ' || g from generate_series(1, 10) g;
insert into gradebooks select g, g from generate_series(1, 10) g;

-- students
insert into user_roles (user_id, class_id, role, private_profile_id)
select gen_random_uuid(), c.id, 'student', gen_random_uuid()
from classes c,
     lateral generate_series(1, case when c.id = 1 then 700 else 300 end) s;

-- staff: 2 instructors + 4 graders per class
insert into user_roles (user_id, class_id, role, private_profile_id)
select gen_random_uuid(), c.id, 'instructor', gen_random_uuid()
from classes c, lateral generate_series(1, 2) s;
insert into user_roles (user_id, class_id, role, private_profile_id)
select gen_random_uuid(), c.id, 'grader', gen_random_uuid()
from classes c, lateral generate_series(1, 4) s;

update user_roles set private_profile_id = private_profile_id;

create index idx_user_roles_user_class on user_roles (user_id, class_id);
create index idx_user_roles_class_role on user_roles (class_id, role) where disabled = false;
create index idx_user_roles_private_profile on user_roles (private_profile_id);

insert into user_privileges (user_id, class_id, role, private_profile_id)
select user_id, class_id, role, private_profile_id from user_roles where disabled = false;

create index idx_user_privileges_user_id on user_privileges (user_id);
create index idx_user_privileges_private on user_privileges (private_profile_id);

-- column groups: 8 per class
insert into gradebook_column_groups (class_id, gradebook_id, slug, name, sort_order)
select c.id, c.id, g.slug, initcap(g.slug), g.ord
from classes c,
     lateral (values ('assignment',1),('assignment-lab',2),('exam',3),('quiz',4),
                     ('attendance',5),('skill',6),('expectation',7),('other',8)) as g(slug, ord);

-- columns: 150 for class 1 (topics x attempts), 40 for the rest
insert into gradebook_columns (class_id, gradebook_id, group_id, slug, name, sort_order)
select c.id, c.id,
       (select grp.id from gradebook_column_groups grp
         where grp.class_id = c.id
         order by ((n - 1) % 8) limit 1 offset ((n - 1) % 8)),
       'col-' || n, 'Column ' || n, n
from classes c,
     lateral generate_series(1, case when c.id = 1 then 150 else 40 end) n;

create index idx_gradebook_columns_class on gradebook_columns (class_id, sort_order);
create index idx_gradebook_columns_group on gradebook_columns (group_id);
create index idx_gradebook_column_groups_class on gradebook_column_groups (class_id, sort_order);

-- one row per (student, column)
insert into gradebook_column_students (class_id, gradebook_column_id, student_id, score, is_private)
select col.class_id, col.id, ur.private_profile_id,
       round((random() * 100)::numeric, 1),
       (col.sort_order % 7 = 0)
from gradebook_columns col
join user_roles ur on ur.class_id = col.class_id and ur.role = 'student' and ur.disabled = false;

create index idx_gcs_class on gradebook_column_students (class_id);
create index idx_gcs_student on gradebook_column_students (student_id);
create index idx_gcs_column on gradebook_column_students (gradebook_column_id);

analyze;

select 'classes' t, count(*) from classes
union all select 'user_roles', count(*) from user_roles
union all select 'gradebook_columns', count(*) from gradebook_columns
union all select 'gradebook_column_groups', count(*) from gradebook_column_groups
union all select 'gradebook_column_students', count(*) from gradebook_column_students;
