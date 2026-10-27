---
title: "Cross-Project Functions"
description: Oct 14 – Dec 10. Your standing responsibility across all four projects, the issues each function starts from, and what counts as evidence
sidebar_position: 6.9
---

# Cross-Project Functions

**Roster:** posted on Discord Sat Oct 10 · **Swap requests:** by standup on Wed Oct 14 · **Kickoff:** in class, Wed Oct 14 · **Feeds:** the **Distinction** requirement *work delivered through your cross-project function, outside your own project area*

## Overview

You belong to a project team and to a **cross-project function**. The [syllabus](/syllabus#project-teams-and-cross-project-functions) says why the course is organized this way and what goes wrong in a matrix organization. This page covers the practical side: who's in which function, where each one starts, and what you can link in December.

Each function has two or three people, one from each of several project teams:

| Function | Owns | People |
|---|---|---|
| **Release and CI** | The Actions pipelines, migration discipline, and the staging-to-production promotion | 3 |
| **Accessibility** | The open WCAG defects, the untriaged axe findings, and keeping `a11y-judge` honest | 3 |
| **Docs and handoff** | [`mintlify-docs`](https://github.com/pawtograder/mintlify-docs), the platform's `docs/` tree, and the ops playbooks January depends on | 3 |
| **Observability** | Sentry, the Grafana dashboards and alerts, and the response when a game day starts | 2 |
| **AI research** | [`CLAUDE.md`](https://github.com/pawtograder/platform/blob/main/CLAUDE.md), [`AGENTS.md`](https://github.com/pawtograder/platform/blob/main/AGENTS.md), and the evidence about what agents are and aren't good for in this codebase | 2 |

The names are on Discord.

## What this asks of you

There's no separate deliverable, no function meeting, and no hours to log. Four things:

1. **Join your function's Discord channel** (`#fn-release-ci`, `#fn-accessibility`, `#fn-docs`, `#fn-observability`, `#fn-ai-research`). It's where you flag things to each other and where staff look first when something in your area breaks.
2. **Put your function in section 1 of `charter.md`** after the kickoff. Several charters list functions that don't exist ("Security audit", "Team Sync") or say TBD. Use the five names above.
3. **Notice, then own the follow-up.** When something in your function's area breaks or goes stale anywhere in the product, you're the one who says so in the channel and either takes it or finds who will. You don't have to do all the CI work yourself. You do have to make sure a red `staging` build has a name next to it.
4. **Tell your team when the two collide.** Your project wants the feature shipped and your function wants CI unbroken, sometimes in the same week. That's a legitimate blocker. Say it at standup, with what you're choosing and why.

## Where each function starts

Each list below is a place to begin. It isn't a quota, and you're free to add to it. An item on one of these lists can also be your [First Implementation Ticket](./first-implementation-ticket.md) if it's XL and outside your team's area. Then the same PR counts for both.

### Release and CI

- [#993](https://github.com/pawtograder/platform/issues/993): `typecheck:functions` reports success when Deno is missing, so the check silently doesn't run
- [#1012](https://github.com/pawtograder/platform/issues/1012): `npx jest` fails 2 of 108 suites on a clean checkout, and one failure hides five real assertion failures
- [PR #814](https://github.com/pawtograder/platform/pull/814): its end-to-end job has never actually run in CI. `pull_request_target` uses `staging`'s workflow, and that workflow doesn't set `EXAM_VISION_PROVIDER=fake`
- The staging-to-production promotion: write down the steps as they're actually done today, next to [`DEPLOYMENT.md`](https://github.com/pawtograder/platform/blob/main/DEPLOYMENT.md), and note where the two disagree
- [#81](https://github.com/pawtograder/platform/issues/81): a stricter `tsconfig.json`, which is a good place to practice landing a change that touches every team

### Accessibility

- Eleven open issues with the [`accessibility`](https://github.com/pawtograder/platform/issues?q=is%3Aopen+label%3Aaccessibility) label, [#903](https://github.com/pawtograder/platform/issues/903) through [#916](https://github.com/pawtograder/platform/issues/916). Three of them are in the survey widget, which every course uses
- [#910](https://github.com/pawtograder/platform/issues/910): 88 axe "needs review" findings on student pages that nobody has triaged
- The axe scan skips the SurveyJS subtree. There's no issue for that yet, so file one
- [#995](https://github.com/pawtograder/platform/issues/995) and [#906](https://github.com/pawtograder/platform/issues/906): pages that fail on a phone-width screen
- [`docs/a11y-voiceover-mac-runbook.md`](https://github.com/pawtograder/platform/blob/main/docs/a11y-voiceover-mac-runbook.md): does it still work as written?

### Docs and handoff

- [#991](https://github.com/pawtograder/platform/issues/991) and [#1004](https://github.com/pawtograder/platform/issues/1004): the setup docs point new contributors at `https://localhost:3000`, and the quick start says to create an account with an env file that disables signups.
- `mintlify-docs` has 96 pages and no open issues, which isn't the same as being right. Pick the pages for the features the four teams are changing and check them against the product
- The ops playbook template. Every team owes a playbook for what it shipped by feature freeze (Nov 23). This function drafts the template the teams fill in, and has it ready by Nov 16
- [`docs/operations/`](https://github.com/pawtograder/platform/tree/main/docs/operations) in the platform repo: what's there, and what's missing for January

### Observability

- [#951](https://github.com/pawtograder/platform/issues/951): five panels on the edge-functions dashboard query `deno_*` series that don't exist
- [#1025](https://github.com/pawtograder/platform/issues/1025): empty alert thresholds render broken PromQL for 15 alert rules
- [#1022](https://github.com/pawtograder/platform/issues/1022): the standby Postgres has no exporter, so its metrics are invisible
- [#1032](https://github.com/pawtograder/platform/issues/1032): the OpenTelemetry proposal. Read it and comment with what it would and wouldn't let us see
- Sentry: unassigned errors in any team's area. Route each one to the team that owns it
- **Game days.** Game Day 1 is Thu Oct 22. Everyone works in their own workspace with `psql` and the code, and there are no dashboards, so afterwards, work out which dashboard or alert would have caught the fault. Bring that to Checkpoint 2. Game Day 2 is Nov 5, in the same format

### AI research

- `CLAUDE.md` last changed in July and `AGENTS.md` in August. Check what they say against the code as it is now, and open a PR for what's wrong
- The [Agents Activity](./agents-activity.md) writeups from Oct 7 are in all four team repos. That's one run per student, of the same workflow on the same codebase. What did the agents get wrong, and was it the same thing across teams? Link the runs
- Co-author trailers on platform commits. One student counted 22 of about 340 platform commits carrying one, and none since August. Count this term's PRs, and see what the trailer does and doesn't tell you
- R11 and R12, the two AI readings, are presented on Wed Oct 28. Bring what you've found so far to the discussion

This function's research questions are still being set, with the two of you, in `#fn-ai-research`. It works from public evidence: PRs, commit trailers, the team repos' `notes/`, and the Agents Activity writeups. It doesn't have access to the course's private agent-session recordings.

The standard for this function is the one in the syllabus: "agents are bad at migrations" is a claim, and the three migration PRs where it went wrong, with what the prompts looked like, is a finding.

## What counts as evidence

The Distinction requirement asks for **work delivered through your cross-project function, outside your own project area**. In your Learning Summary Report, that's a link to something that:

- sits in your function's area: one of the items above, or something you added to the list in your channel
- landed outside your team's project area, or served at least one other team
- you did or drove yourself, for example a merged PR, a review that changed someone else's PR, a doc page, a dashboard fix, or a finding written up with its sources

A link that doesn't qualify on its own: a message in the channel saying something was broken, with nothing after it. Noticing is step one. The evidence is what happened next, even if what happened next was finding the right person and following up until it was fixed.

Function work also counts toward [code review](./code-review.md). A review you write through your function is usually outside your team, which is what Pass asks for at least two of.

## Checkpoints

- **Checkpoints 2 and 3** (Nov 5 and Dec 3) ask for links to what you've done through your function. The judgment that comes back will say so plainly if the role has become a title.

## Swaps

You can ask to swap until standup on Wed Oct 14. Message Jon on Discord with the swap you want, ideally with the person you'd trade with. Two rules hold every roster together: teammates are in different functions, and every function has at least two people.

## Dates

| | |
|---|---|
| Roster posted on Discord | Sat Oct 10 |
| Swap requests | Wed Oct 14, by standup |
| Kickoff in class | Wed Oct 14 |
| Game Day 1 | Thu Oct 22 |
| Checkpoint 2: links | Thu Nov 5 |
| Ops playbook template ready (Docs and handoff) | Mon Nov 16 |
| Checkpoint 3: links | Thu Dec 3 |
