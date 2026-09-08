---
title: "Local Development"
description: Getting Pawtograder running on your machine, seeding a class you can log into, and the commands worth knowing before you open a pull request.
sidebar_position: 3
---

# Local Development

A working reference for the commands you'll use all semester. Everything here is checked against [`pawtograder/platform`](https://github.com/pawtograder/platform) as of September 2026. The repo documents itself in `README.md`, `AGENTS.md`, `CLAUDE.md` and `DEPLOYMENT.md`, and those files win when this page disagrees with them. Tell us when that happens, because a stale setup doc is a real ticket.

## Two ways to run it

| If your work touches | You need |
|---|---|
| Docs, copy, a component, a page layout | Path A, the staging backend |
| A database migration or an RLS policy | Path B, the full local stack |
| An edge function | Path B |
| Playwright end-to-end tests | Path B |
| Something you can't classify yet | Start with A and escalate |

Path A takes minutes and needs no Docker. Path B takes an hour or so the first time. Most people end up needing B eventually, and nobody should spend a first afternoon fighting Docker for a docs ticket.

## Path A: the frontend against staging

```bash
git clone https://github.com/pawtograder/platform
cd platform
nvm install 22 && nvm use 22
npm install
cp .env.local.staging .env.local
npm run dev
```

Node 22 is what CI runs, and [nvm](https://github.com/nvm-sh/nvm#installing-and-updating) is the easiest way to get it without disturbing whatever Node you already have. Install nvm first if you don't have it; the two commands above won't work otherwise.

There's nothing to fill in. `.env.local.staging` is tracked in git and holds only browser-facing values, which is the Supabase URL, the anon key, and the web URL. The service role key and GitHub App key that pair with it are staff-only, and no Path A work needs them.

Three things that surprise people:

- `npm install` prints a wall of deprecation warnings and a complaint from `amazon-chime-sdk-component-library-react` about your Node version. Both are fine to ignore.
- The dev server is HTTPS on `https://localhost:3000`, with a self-signed certificate. Your browser will warn you; click through. HTTPS is required because the office hours queue needs camera and microphone access.
- Sign in with email and password. GoTrue's allow list on staging is `https://staging.pawtograder.net/*`, so a GitHub, Discord or Microsoft round trip lands you on the deployed site and not on your dev server. Signups are also hidden on staging, so you need an account somebody made for you.

## Path B: the full local stack

Docker has to be running first.

```bash
npx supabase start                            # Postgres, Auth, Realtime, Storage
npx supabase db reset                         # replay every migration, load supabase/seed.sql
npx supabase status -o env                    # the keys to paste into .env.local
npm run seed                                  # a class with fabricated students you can log into
npm run dev
```

Skip the edge functions for now. You only need `supabase functions serve` when you're exercising one, which the [section below](#edge-functions) covers.

Your `.env.local` needs the values `supabase status` just printed:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_URL` | `http://127.0.0.1:54321` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_ANON_KEY` | the anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | the service role key. Server-side only, never in the browser, never committed |
| `NEXT_PUBLIC_PAWTOGRADER_WEB_URL` | wherever you're serving the app, usually `https://localhost:3000` |
| `ENABLE_SIGNUPS` | `true`, so you can make accounts from the UI |

And the ports:

| Service | Port |
|---|---|
| Next.js dev server | 3000 |
| Supabase API | 54321 |
| Postgres | 54322 |
| Supabase Studio | 54323 |
| Mailpit, which catches outgoing email | 54324 |

Studio on `localhost:54323` is worth opening now. Reading the rows directly is how you debug a row-level security problem, and you'll be doing that in week two.

## `npm run dev` vs. a production build

`npm run dev` compiles each route the first time you hit it. That's the right trade while you're editing one page, and the wrong one for everything else: clicking around costs seconds on every new route, and a Playwright run against `next dev` times out all over the suite.

For any use that isn't active editing, build once and serve the build:

```bash
npm run build && npm start
```

It wants roughly 8 GB of heap (the script already passes `--max-old-space-size=8000`) and takes a few minutes, and what you get is dramatically faster to use. If you're seeding a class and exploring it as four different roles, build first.

Two rules come attached:

- `NEXT_PUBLIC_*` values are inlined into the bundle at build time. Changing one in `.env.local` does nothing to a build that already exists. Export the new value, delete `.next`, build again.
- Never run `npm run dev` and `npm start` at the same time. Pick one.

For the full end-to-end suite the repo's convention is a production build on port 3001: export `NEXT_PUBLIC_PAWTOGRADER_WEB_URL=http://localhost:3001` before `npm run build`, serve with `PORT=3001 npm start`, and run `BASE_URL=http://localhost:3001 npx playwright test`. Dev mode on 3000 is for iterating on a single test with `npm run test:e2e:local`.

## Logging in

Every seeded user's password is `change-it`. `npm run seed` prints a lot of output, so search it for "Login Credentials".

On a local instance any email address works, and putting the word `instructor` in the address makes you an instructor when you sign up. To promote an account that's already in a seeded class:

```bash
npx tsx scripts/AddUserToClassAsInstructor.ts <course_id> <email>
```

Pass `--csv <file>` instead of an email for a list of people, with `name` and `email` columns.

When you want a session as some other user and don't want to deal with their password, create a login link:

```bash
npx tsx scripts/GenerateMagicLink.ts someone@example.com
```

It prints a URL you paste into a browser. It reads `.env.local`, so `SUPABASE_SERVICE_ROLE_KEY` and `NEXT_PUBLIC_PAWTOGRADER_WEB_URL` both have to be set. This is the fastest way to move between roles, which makes it the single most useful script on this page during the [ticket hunt](./assignments/ticket-hunt.md).

Anything the app emails you locally, including magic links and confirmations, lands in Mailpit at `http://localhost:54324` instead of a real inbox. When auth looks broken, look there before you assume it is.

## Seeding a class worth testing

`npm run seed` defaults to the `micro` template, which is 30 students, one grader, one instructor, and two assignments whose deadlines are already in the past. Run `npm run seed -- --help` for everything below.

| Template | What it gives you |
|---|---|
| `micro` | The default. 30 students, 2 past-due assignments. Fast |
| `small` | 50 students, 5 graders, 20 assignments spanning 30 days either side of today, specification grading |
| `large` | 900 students, 80 graders, 20 assignments. For anything where scale is the question |
| `tcrs` | 50 students in stable 3 to 4 person groups, reused across all 10 group assignments |
| `marketing` | A 500-student course that looks good in a screenshot |
| `custom` | 100 students, and a starting point for your own flags |

Flags that override whichever template you picked: `--class-name`, `--students`, `--graders`, `--instructors`, `--assignments`, `--manual-graded-columns`, `--grading-scheme current|specification`, `--help-requests`, `--discussion-posts`, `--date-range-start`, `--date-range-end`.

Two of them are worth explaining:

`--date-range-start` and `--date-range-end` are in days relative to now, and negative numbers are in the past. That's how you manufacture an assignment that's already closed, which you need in order to see late policy, regrade requests, or anything that behaves differently after a deadline.

`FIXED_STUDENT_EMAIL`, `FIXED_GRADER_EMAIL`, `FIXED_INSTRUCTOR_EMAIL` and `FIXED_ADMIN_EMAIL` seed your own address into that role, so you log in as yourself in the seat you want to inspect. For the grader role in the ticket hunt:

```bash
FIXED_GRADER_EMAIL=you@northeastern.edu \
  npm run seed -- --template small --date-range-start -30 --date-range-end -1
```

`CLASS_NAME` overrides the class name for any template, and `npm run seed:demo` builds the demo class used for screenshots.

## When the database is wrong

The symptoms all look different and mean the same thing:

- `column ... does not exist`
- `Could not find the '...' column in the schema cache`
- `no partition of relation "audit" found for row`

Your database is older than your checkout. The fix is:

```bash
npx supabase db reset
npm run seed
```

`db reset` drops everything, replays all 400-odd migrations in `supabase/migrations/`, and reloads `supabase/seed.sql`; the second command puts a class back. It's the escape hatch for essentially every local database problem, it's cheap, and reaching for it early beats an hour of debugging the schema. Don't look for a narrower fix.

Two related traps:

- `npx supabase start` restores the previous Docker volume by default, so a stale database survives a stop and a start. `npx supabase stop --no-backup` deletes the volume, and the next `start` builds from nothing.
- The Supabase CLI is pinned to `2.105.0` in `package.json`. Run it through `npx` so you get that version. On an older CLI, `db reset` dies partway with `ERROR: must be owner of table objects`, which reads like a bug in a migration and isn't one.

## Changing the schema

```bash
npx supabase migration new add_gradebook_column_groups
# write your SQL in the file it just created under supabase/migrations/
npx supabase db reset
npm run client-local
```

`npm run client-local` regenerates `utils/supabase/SupabaseTypes.d.ts` from your local schema and copies it into `supabase/functions/_shared/`. Skip it and your new table doesn't exist as far as TypeScript is concerned, so you get type errors that point everywhere except at the migration you just wrote. The file is generated, so don't hand-edit it.

Verify a migration by resetting, not by applying it to a database that's already running. CI replays from scratch, and a migration that only works against the database you already have will fail there.

## Edge functions

Only if you're exercising one. Browsing the app, reading a seeded class, and most frontend work never touch an edge function, so leave this off until something needs it.

```bash
npx supabase functions serve --env-file .env.local
```

This serves everything in `supabase/functions/` at `http://127.0.0.1:54321/functions/v1/<name>`. You need it for any flow that invokes one, which covers submissions, webhooks, and the async workers. When it isn't running, those calls fail and everything else works, which is a confusing enough symptom to be worth remembering.

You don't need real GitHub App credentials to do it. Put `E2E_ENABLE=true`, `END_TO_END_SECRET=not-a-secret`, `EDGE_FUNCTION_SECRET=some-secret-value`, `GITHUB_APP_ID=1` and any RSA private key in `GITHUB_PRIVATE_KEY_STRING` into `.env.local`. The dummy key is there because the function runtime builds a GitHub client when it loads; the E2E bypass keeps it from making real calls.

## Before you push

| Command | What it does |
|---|---|
| `npm run format` | Runs Prettier over the tree, in place |
| `npm run lint` | ESLint, plus a Prettier check that fails on unformatted code |
| `npm test` | Jest unit tests. `npx jest path/to/file` for one of them |
| `npm run test:functions` | Deno tests for the edge functions |
| `npx playwright test --ui` | The end-to-end suite, in Playwright's UI mode |

Run `npm run format` before every commit. Unformatted code is the most common reason a first pull request comes back red, and that round trip costs twenty minutes for nothing.

## What CI does with your pull request

Opening a PR runs the lint lane, which is `npm run lint`, the Jest tests, the Deno function tests, and a Helm chart render check. It also builds your branch and deploys an ephemeral preview of the whole stack, then comments the URL on the PR.

The end-to-end lane, which is Playwright plus Argos visual snapshots, is gated on trust. It runs for branches pushed to `pawtograder/platform` itself and not for pull requests from forks, because that job checks out and executes the PR's code on the project's own runners. So work on a branch in the repo, and ask for push access if you don't have it yet. A fork PR is a PR nobody can fully check.

Argos uploads snapshots only from CI, so running Playwright locally never touches the visual baseline.

## Where to look next

| Where | What's in it |
|---|---|
| `README.md` | The setup path this page compresses |
| `AGENTS.md` | Ports, known traps, and how to run E2E properly. Point your agent at this file before you ask it anything |
| `CLAUDE.md` | The architecture tour: Supabase clients, realtime controllers, `TableController`, generated types |
| `DEPLOYMENT.md` | Production, self-hosting, and the GitHub App |
| [docs.pawtograder.com](https://docs.pawtograder.com/developers/intro/) | Documentation for developers, course staff and students |

Thirty minutes of no progress on the same problem, and you owe the team a question. Ask in Discord, in public, with the actual error pasted in.
