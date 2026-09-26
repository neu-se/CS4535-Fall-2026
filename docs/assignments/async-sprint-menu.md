---
title: "Async Sprint: Spike Menu"
description: Candidate sprint objectives for each project, with where to start
sidebar_position: 6.5
---

# Async Sprint: Spike Menu

**Pick by:** Thu Oct 1, in class · **Goes in:** section 8 of your [charter](./team-charter.md) · **Artifact due:** Tue Oct 13 · See the [Async Sprint](./async-sprint.md) handout for the deliverable and rubric

## Overview

Each project below has eight or nine candidate objectives for the [async sprint](./async-sprint.md). Every one names a question, the shape of the work, where in the platform to start, and why your team's plan depends on the answer. Pointers are paths in [`pawtograder/platform`](https://github.com/pawtograder/platform) as of Sep 26. Files move, so if a line number is off, search for the function name.

Use the menu this way:

- **Pick one, one person each.** Where two items overlap, the notes under each project say so. Either split them cleanly or pick one.
- **The question has to change your plan.** If every possible answer leads to the same next step, pick something else.
- **Your own objective is fine** if your team ratifies it on Thursday. The ones on this list are a starting point.
- **Think about Oct 15.** Your First Implementation Ticket should come out of what you learn here, so an objective that ends in "and here's the change worth making" pays off twice.

## Paper Exams

Milestone 1 is getting PR #814 green and merged, so at least one of you should be on it from day one. Two things to know first. #814 is larger than an exam PR: it also carries in-app quizzes and survey auto-credit, and the open P1 findings from the Sep 15 bot review are in the survey code. And its E2E job runs under staging's workflow file, so some of what's failing can only be fixed on staging.

| # | Objective | Shape | The question |
|---|---|---|---|
| E1 | Scan to grader | Trace | What happens between "upload PDF" and a grader seeing crops of each answer? |
| E2 | #814's E2E, locally | Reproduction | After merging staging, which of the specs that failed on Sep 2 still fail with the fake vision provider, and why? |
| E3 | #814's P1 findings | Reproduction | Can each of the three P1 bot findings be reproduced on a local stack, and what's the regression test for each? |
| E4 | Page codes | Spike | Can a printed page code be decoded from a real copier scan reliably enough to replace fixed-count page splitting? |
| E5 | Region alignment | Research | Do normalized answer regions survive the skew, scale, and offset of real scans? |
| E6 | Where BYOK grading lives | Research | Should LLM-assisted grading reuse the llm-hint model factory or the exam worker's provider layer? |
| E7 | Per-course API keys | Spike | Where can a course's API key live so that only the worker can read it? |
| E8 | Answers to points | Trace | Where would an LLM-suggested score land, and where does a human confirm it? |
| E9 | RLS on exam tables | Practice (RLS) | Do the staff-only policies keep students out, and can a test lock that in? |

**Where to start:**

- **E1:** `app/course/[course_id]/manage/assignments/[assignment_id]/exam/scans/page.tsx` → `lib/exam/pdfRasterize.ts` → `enqueue_exam_process_batch` and `enqueue_exam_finalize` in the PR's `20260902000000_exam_grading.sql` → `supabase/functions/exam-async-worker/index.ts` → `components/ui/exam-submission-renderer.tsx`. Pinned comments have to attach to whatever the grader actually views, so this map is the first thing the comments work needs.
- **E2:** `tests/e2e/exam-grading.spec.ts`, `quiz-builder.spec.ts`, and `assessment-types.spec.ts`. `supabase/functions/_shared/examVision.ts` fails closed when `EXAM_VISION_PROVIDER` is unset. Staging's migrations have moved past the PR's timestamps, so expect to renumber. **One person does the rebase.**
- **E3:** the bot review on #814 from Sep 15. Compare how `quiz_autograde` and `survey_apply_completion` are granted in the PR's `20260902000100_assessment_types.sql`. These findings block the merge. **Overlaps with E2** on the survey migration, so coordinate.
- **E4:** `lib/exam/split.ts` splits by a fixed `pages_per_exam`, so one missing page shifts every student after it. `lib/exam/pdfGenerate.ts` prints no codes yet. A QR generator is already a dependency (`hooks/usePollQrCode.tsx`); a decoder isn't. Part of the answer is whether decoding happens in the browser or the Deno worker.
- **E5:** `lib/exam/regionMath.ts` (`boxCenterInRegion`) and its Deno copy in `supabase/functions/_shared/examVision.ts`, which has to stay in sync; the `exam_question_regions` columns; Google Vision's `images:annotate` docs on orientation. **Overlaps with E4.** Pair them or pick one.
- **E6:** `app/api/llm-hint/route.ts` (`getChatModel`, LangChain, per-account keys) against `_shared/examVision.ts` (Gemini-only REST, no npm dependencies, `ProviderRateLimitError`). The answer decides whether grading code lives in a Next route or the Deno worker.
- **E7:** three patterns already in the repo: Supabase Vault (`vault.create_secret` in `20250614231720_gradebook.sql`), app-level encryption in `lib/lti/crypto.ts`, and OpenBao (`scripts/setup-openbao-edge-functions.sh`), which is per-deployment today. There's no per-course secret store yet. **Security-sensitive:** get the design reviewed before any code lands.
- **E8:** `exam_sync_rubric_from_questions` in the exam migration. Its comment says only in-app quizzes are auto-scored, so scanned multiple choice gets no autograde today. Also `exam_scanned_submissions.extracted` and `submission_artifact_comments.rubric_check_id`. Human-confirmed grading needs a draft state that doesn't exist yet.
- **E9:** the policy loops and storage policies in the exam migration; the test pattern in `tests/e2e/audit-leaderboard-rls-db.spec.ts`. Pinned comments will add page and position columns to `submission_artifact_comments`, which is new RLS surface.

## Cloud Workspaces

There's no Codespaces code in the platform to replace, so the workspace half is new. The coupling map is about repos, webhooks, identity, and grading. `supabase/functions/_shared/GitHubWrapper.ts` is about 5,000 lines, and 32 edge functions import it. Split it by function so nobody traces `getOctoKit` twice.

| # | Objective | Shape | The question |
|---|---|---|---|
| W1 | Repo creation | Trace | Which GitHub-only features does repo provisioning assume: templates, forks, rulesets, org teams? |
| W2 | Push to grade | Trace | What happens between a push and a graded submission, and where is GitHub Actions built in? |
| W3 | Forgejo Actions as the grader | Research | Can a Forgejo Actions job run the existing `grade.yml` unchanged, and present a token the submission endpoint can verify? |
| W4 | Auth and identity | Trace | What's the provider key? Every GitHub call resolves its client from an org name, and every user from a GitHub username. |
| W5 | Permission sync | Trace | How do team and collaborator permissions reach student and solution repos? |
| W6 | One click in Coder | Research | What does "one click from Pawtograder" mean in Coder: API call or deep link, and how do repo credentials get in? |
| W7 | Forgejo + Coder in the namespace | Spike | Does SSO → Forgejo repo → Coder workspace work in your namespace, and what breaks? |
| W8 | "Ready" before it's usable (#981) | Reproduction | Why does a repo show as ready before the student can access it? |
| W9 | Repo status smoke test | Practice (Playwright) | Can you build the harness your readiness checks will run in? |

**Where to start:**

- **W1:** `assignment-create-all-repos` and `autograder-create-repos-for-student` → `_shared/repoCreationStrategy.ts` (three modes) → `github-async-worker` → `createRepo` and `applyBranchProtectionRuleset` in `GitHubWrapper.ts`, plus `_shared/branchProtection.ts`. Each feature either has a Forgejo equivalent or gets cut for the target assignment.
- **W2:** `github-repo-webhook/index.ts` (it accepts the EventBridge envelope only) → `triggerWorkflow`, which tags `pawtograder-submit/<sha>` and runs `grade.yml` with `pawtograder/assignment-action` → `autograder-create-submission`, which verifies the job's GitHub OIDC token (`validateOIDCToken`) → results as check runs. The OIDC step is the hardest link to replace. **Overlaps with W3.**
- **W3:** Forgejo's docs on Actions (`act_runner`, GitHub-compatibility limits, job tokens) and webhooks (payload, signature header), read against `DEPLOYMENT.md` § "GitHub Actions runners for grading". If OIDC can't be kept, submission auth needs a redesign. That's the largest branch in your plan. One person owns the OIDC question, and whoever takes W2 cites their answer.
- **W4:** `getOctoKit` in `GitHubWrapper.ts` (app installations, org picked from `owner/repo`); `linkIdentity({provider: "github"})` in `app/actions.ts` and `components/github/link-account.tsx`; `github-user-sync`, `list-github-orgs`, `github-check-app-installation`; columns `classes.github_org`, `users.github_username`, `repositories.github_repository_id`. This settles whether a second provider is a column or a refactor.
- **W5:** `syncRepoPermissions`, `syncStaffTeam`, and `syncStudentTeam` in `GitHubWrapper.ts`; `assignment-create-solution-repo`; `github-membership-reconciler`. Staff get `maintain` on student repos. This is your shared interface with the permissions team on "TAs who can't push to solution repos," so talk to them. **Overlaps with W1 and W4.**
- **W6:** Coder's docs on templates (Terraform, Kubernetes provider), external auth and whether Forgejo is a supported provider, OIDC login, creating workspaces by API or link, and startup scripts as a base for readiness checks. **Feeds W7.** If only one of you takes Coder, merge W6 into W7.
- **W7:** `charts/pawtograder/` and `docs/operations/preview-readonly-kubeconfig.md`, plus the W6 reading. The deliverable is the list of what broke: auth handoff, storage, ingress. This is the riskiest infrastructure piece, and it doesn't wait on the coupling map.
- **W8:** `is_github_ready` in `app/course/[course_id]/assignments/[assignment_id]/manageGroupWidget.tsx` and `studentAssignmentsList.tsx`; related #969. "Ready" means the repo exists, and your readiness checks need a truer signal. The same trap comes back with Forgejo. **Pairs with W9.**
- **W9:** `playwright.config.ts`, `tests/e2e/assignment-repo-config-form.test.tsx`, and the GitHub stub (`PAWTOGRADER_GITHUB_STUB`, `_shared/e2eGithubGuard.ts`, which records calls to `e2e_github_calls`). The stub is where a Forgejo fake would plug in. Land one test that asserts what the student assignment page shows about repo status.

## Office Hours

Three people means three objectives, and the project has three needs before the study: a baseline number, the realtime path, and a protocol. Discord privacy work can wait for the first implementation tickets.

| # | Objective | Shape | The question |
|---|---|---|---|
| O1 | Time to resolution | Spike | Can wait and resolution times per queue be measured from the tables that exist, and how far can the numbers be trusted? |
| O2 | Queue update to browser | Trace | When a TA changes a request's status, what path does the change take to the student's screen? |
| O3 | Resolve doesn't sync (#1003) | Reproduction | Does #1003 reproduce reliably, and at which step of O2's path is the update lost? |
| O4 | Queue position test | Practice (Playwright) | Can you write a failing E2E test for "position doesn't move while people ahead are being helped"? |
| O5 | What the bot posts | Trace | Which personal data leaves Pawtograder in a help-request message, and where is each field attached? |
| O6 | Staff-only queue channels | Spike | What permission overwrites does a new office-hours channel need, and can you check them against the mock Discord server? |
| O7 | Interview protocol | Research | What should students and TAs be asked about what the queue shows and hides, and what have other queue tools learned? |
| O8 | What Discord allows | Research | For a live status board, "you're up" notifications, and threads per request, what do Discord's API and our wrapper support? |
| O9 | RLS on help requests | Practice (RLS) | Can one policy test prove a student can't read another student's private request? |

**Where to start:**

- **O1:** `help_requests` (`created_at`, `resolved_at`, `status`, `assignee`, `help_queue`) and `help_request_work_sessions` (`started_at`, `ended_at`, `queue_depth_at_start`, from `20251226204315_help_request_work_sessions.sql`); the existing `manage/office-hours/time-tracking/` dashboard. Test three caveats: `resolved_at` is set from the browser's clock (`components/help-queue/help-request-chat.tsx`), nothing records the move to `in_progress` except a work-session start, and work sessions only exist from Dec 2025.
- **O2:** `broadcast_help_request_data_change()` in `20250929004834_realtime-broadcast-optimization.sql` → `lib/OfficeHoursRealTimeController.ts` (the `help_queue:<id>` topic) → `lib/TableController.ts` → `useHelpRequests` and `useStudentVisibleHelpRequests` in `hooks/useOfficeHoursRealtime.tsx`. Every "only updates on refresh" bug in the sweep runs through this path. **O3 depends on it.** Different people, shared notes.
- **O3:** #1003; `components/help-queue/help-request-chat.tsx`; `app/course/[course_id]/office-hours/[queue_id]/[request_id]/page.tsx`.
- **O4:** `hooks/useActiveHelpRequest.tsx`, where the position count includes both `open` and `in_progress` requests ahead of you; `tests/e2e/office-hours.test.tsx`. No issue is filed for this bug yet, so filing one is part of the deliverable. The test then comes with you into the First Implementation Ticket.
- **O5:** `enqueue_discord_help_request_message` in `20251213194246_calendar_discord.sql`, which collects student names and emails; the embed construction in `supabase/functions/discord-async-worker/index.ts`. Removing student emails is the prerequisite for any new Discord feature.
- **O6:** `createChannel` in `_shared/DiscordWrapper.ts` sends no `permission_overwrites`. The overwrite logic already exists in `_shared/DiscordPermissions.ts`. Mock server: `tests/mocks/discord/`. **Overlaps with O5 and O8.** Pick at most two of the three.
- **O7:** published and open-source queue tools (start with the literature on My Digital Hand and the Illinois open-source queue, and check what you find); Pawtograder's own `help_request_feedback` table and `manage/office-hours/feedback.tsx`, for what's already collected. The deliverable is a 20-minute protocol with student and TA variants, plus a recruitment plan. The study decides which Discord feature gets built.
- **O8:** Discord's developer docs on message edits, threads, and rate limits; `_shared/DiscordWrapper.ts`, `_shared/DiscordBotRest.ts`, and `enqueue_discord_queue_assignment_message`. The `discord-student-join` flag (`lib/courseFeatures.ts`) has only been tested against mocks.
- **O9:** the policies in `20251226204315_help_request_work_sessions.sql`; PR #940, which fixed a help-request privacy bug. A lighter alternative to O1.

Also open in this area: #1000 (the help-request form's loading state is hardcoded), #1015 (per-queue notification preferences), and #745 (no Schedule option when creating staff queues), which may be the same finding as "scheduling is hidden under Discord settings."

## Usability, Accessibility & Permissions

Most of these share the Ticket Hunt's "UI lets you start it, backend refuses" cluster (#983, #996, #1010). Give each person a different issue so nobody redoes someone else's reproduction. If you're choosing between the accessibility and permissions tracks, U6 is the fastest way to find out how big the SurveyJS gap is, and U2 feeds the second-half roles build most directly.

| # | Objective | Shape | The question |
|---|---|---|---|
| U1 | One grader action, UI to RLS | Trace | For "grader creates an assignment" (#983), what check runs at each layer, and where do they disagree? |
| U2 | Drift inventory | Spike | For each UI role gate in a sampled area, does the backend enforce the same thing: match, UI looser, or UI stricter? |
| U3 | UI allows, backend refuses | Reproduction | For #996 and #1010, which exact exception or policy is hit, and what did the UI show first? |
| U4 | Who can push to solution repos | Trace | How does a grader end up able to push to a solution repo, and is that gate in RLS or on GitHub? |
| U5 | Prior art for roles | Research | How do #930, #41, and existing LMS roles divide capabilities, and which of those fit a small per-course capability set? |
| U6 | axe on SurveyJS | Practice (Playwright) | What does axe find once the SurveyJS subtree stops being excluded? Land one scan that covers it. |
| U7 | SurveyJS upstream | Research | What does SurveyJS promise on accessibility, and which of our findings are upstream bugs versus our theming? |
| U8 | User-research protocol | Research | Which four or five tasks should students and TAs be observed doing, who gets recruited, and with what consent script? |
| U9 | RLS test for a grader denial | Practice (RLS) | Can one DB-level test assert that a grader is denied, or allowed, an action from #983, #996, or #1010? |

**Where to start:**

- **U1:** UI: `app/course/[course_id]/manage/assignments/new/` and the role hooks in `hooks/useClassProfiles.tsx` (`useIsInstructor`, `useIsGraderOrInstructor`, `useIsGrader`, all reading the effective role). Database: the instructor policy on `assignments` and the `authorizeforclassgrader` / `authorizeforclassinstructor` helpers, whose latest definitions read `user_privileges`. The capability set has to plug in at the points this trace finds.
- **U2:** about 69 files use the role hooks or compare `role` directly. There's a third layer besides UI and RLS: edge functions use `assertUserIsInstructor` and friends from `supabase/functions/_shared/HandlerUtils.ts`. Sample one area, such as `app/course/[course_id]/manage/`. Don't try a full census. This sizes the second-half build.
- **U3:** #996: `groups/page.tsx` calls `publish_assignment_group_changes` (latest in `20260605120000_fix_group_publish_timeout.sql`), and the toast falls back to "Unknown error." #1010: the "Only instructors can..." exceptions in `20250919005007_bulk-assignment-via-rpc.sql` and `20260120120000_grading_progress_dashboard_rpc.sql`. Each confirmed case is a drift data point and a candidate first ticket.
- **U4:** `supabase/functions/autograder-sync-staff-team/index.ts`, which puts instructors, graders, and admins into one GitHub team; `syncStaffTeam` in `_shared/GitHubWrapper.ts`; `assignment-create-solution-repo`. "TAs who can't push to solution repos" can't be done in RLS alone, and the plan should say so before the build starts. Cloud Workspaces is tracing the same code (their W5), so share notes.
- **U5:** #930 and #41 (which names Canvas's observer role); the `app_role` enum (`admin`, `instructor`, `grader`, `student`, never altered since the initial schema); `user_roles` and `user_privileges`. This defines the capability set.
- **U6:** `DEFAULT_EXCLUDES` in `tests/e2e/axeStudentA11y.ts` skips `[data-surveyjs]`, `.sv-root`, `.sd-root-modern`, and others. Fixtures: `tests/e2e/surveySubmissionSeeding.ts`, `submission-survey-tab.spec.ts`. This produces real findings for the audit in place of guesses.
- **U7:** closed #881, which records VoiceOver findings on surveys; `tools/a11y-judge/mutations/132-survey-options-first.ts`; `docs/a11y-voiceover-mac-runbook.md`. The answer decides between fixing upstream, working around it, and replacing the widget. **Same widget as U6.** One person owns the SurveyJS setup.
- **U8:** existing task definitions in `tools/a11y-judge/agent/tasks.ts` and `tests/e2e/a11y-tasks/`; the hunt issues #989, #1002, #1007, and #996. Mix them with survey completion. The mid-semester scope decision rests on this evidence. U8 needs U6 and U7's findings to pick survey tasks, so sync around Oct 7.
- **U9:** the pattern in `tests/e2e/audit-leaderboard-rls-db.spec.ts`; related `course-landing-no-role.spec.ts`. A regression harness has to exist before anyone changes the helpers. **Shares issues with U1 and U3.**
