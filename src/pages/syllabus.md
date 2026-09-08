---
title: Syllabus
description: CS 4535 Course Syllabus
---

# CS 4535: Software Design & Delivery

**Professional Practicum Capstone: AI & Open Source**

**Instructor:** Jonathan Bell

**Credits:** 4

**Section 3:** MWR 10:30–11:35 AM

**Class size:** Up to 50 students; 10–20 expected for Fall 2026

:::info
This syllabus is a **draft** and is subject to adjustment before the Fall 2026 semester begins. Project offerings, band requirements, and course structure may change based on enrollment, staffing, and community feedback.
:::

## Course Description

When you join a company, you'll be working on a product that predates you. Lots of features. Lots of code. Lots of technical debt. Some teams struggle under that weight, barely satisfying their users, burning through resources. But the best teams find ways to make a codebase better than they found it, ship features that users didn't know they needed, and turn inherited complexity into a platform for something new. The difference is skill. This course teaches you that skill, using a product that you should be familiar with: Pawtograder.

Pawtograder is developed by Prof. Bell in collaboration with students and other instructors, and in Fall 2026 it supports course operations for CS 2000, 2100, 3100, 3650, and 4530, plus sections of 5001, 5008, and 5010, including this course. It goes beyond a platform to submit assignments. Pawtograder administers group projects, manages grading workflows, has a complex gradebook supporting a rich query language, and provides an integrated discussion forum, surveying, live polling, and real-time office hours.

Pawtograder is already in production, with 1,500+ weekly active users and shipping continuously. Students in this course will practice the complete software development lifecycle from design to operations. The goal: leave the codebase in an excellent place for January 2027, when the next semester's classes pick it up and depend on everything you built.

## Philosophy

How much do you do? We define the minimum for an A. You decide the minimum for your goals. Choose the topic focus that you want. Make the GitHub resume that you want. Use the AI that you want, too.

### A wide range of backgrounds welcome

Real products need more than people who can write code. They need people who can talk to users, design interfaces, write documentation, set up monitoring, optimize queries, wrangle CI pipelines, and figure out why the thing that worked yesterday doesn't work today. This course has room for all of those people.

Consider a student who is passionate about user research and student experience, who conducts usability studies, synthesizes findings into design recommendations, and uses Claude Code to implement and ship those changes. That student is just as valued as the distributed systems hacker who profiles the gradebook and rewrites the query layer. Both are doing real engineering. Both are accountable for what ships. The difference is where you focus.

What matters is that you can engage with a production codebase, contribute meaningfully to a team, and take ownership of your work from design through deployment, whatever your entry point into that process is.

## Course Structure

The course runs in three phases across 36 sessions. The [schedule](/schedule) is authoritative, with every session, date, and deadline; what follows is the shape of it.

### Phase 1: Onboarding (weeks 1–3, Sep 9 – Sep 24)

Every session is a lecture, front-loaded so that hands-on work is unblocked as early as possible. The first week covers the architecture of Pawtograder and how one request moves through it, local dev and the contribution workflow, and the data model with what row-level security enforces. The rest of the phase covers continuous delivery, releasing safely, testing, and monitoring.

In parallel, everyone builds the same thing: first-class **gradebook column groups**, independently, as a pull request that never merges. Everyone solves the same problem independently, and the submissions get compared, so you learn the codebase by cutting one vertical slice through all of it. One scoped **implementation ticket**, shipped end to end through branch, PR, review, merge, and deploy, follows in the studio phase on Oct 15; that one merges.

**Project bids are due Sep 17. Teams are announced Sep 24.**

### Project Slate

Students choose from a slate of projects, ranked by preference in a bid. Each project has defined deliverables but significant latitude in approach, and each spans the full lifecycle of user research, design, implementation, testing, and operations within your area.

**[See the current project slate on the course home page.](/#projects)** It's a starting point, not a fixed list. If you see a problem in Pawtograder that isn't on it, propose it in your application.

**Teams are 3–4 people, and one team owns one project.** The number of projects that actually run therefore depends on final enrollment. Not every project on the slate will get a team, and the bid is what decides which do. Expect that answer in week 3, not before.

### Phase 2: Studio (weeks 4–12, Sep 28 – Nov 23)

Teams own their project areas. The week settles into a rhythm:

| Day | Format |
|-----|--------|
| **Monday** | Standup + clinic: a short all-hands standup, then teams sign up for consultation slots on specific blockers, architectural questions, or design tradeoffs. |
| **Wednesday** | A tech talk, or two pairs teaching an assigned reading to the room. |
| **Thursday** | Team work session, demo day, or game day. |

Punctuating that rhythm:

- Demo days, roughly every two weeks. Live product, real environment, five minutes per team plus questions.
- Game days, which are incident drills. You'll know that they exist; you won't always know when one is coming.
- Integration sessions, where cross-team coupling gets resolved in the room rather than over three days of messages.
- The async sprint, Oct 2–13, while the instructor is at OOPSLA/ISSTA. Three sessions run asynchronously and you leave Oct 1 with a plan. Read the [participation](#participation) rules for what counts as attendance in that window.

**Feature freeze is Nov 23.** Nothing new lands after it.

### Project teams and cross-project functions

You belong to a project team and to a **cross-project function**, one member from each project team. Your project team owns a vertical slice of Pawtograder. Your function owns something that runs across all of them:

| Function | What it owns |
|---|---|
| **Release and CI** | The Actions pipelines, migration discipline, and the staging-to-production promotion |
| **Accessibility** | The open WCAG defects, the untriaged axe findings, and keeping the `a11y-judge` oracle honest |
| **Observability** | Sentry, the dashboards, and the response when a game day starts |
| **Docs and handoff** | The [`pawtograder/mintlify-docs`](https://github.com/pawtograder/mintlify-docs) site, 96 pages across student, staff and developer audiences, plus the ops playbooks January depends on and the `docs/` tree in the platform repo |
| **AI research** | The repo's agent context, [`CLAUDE.md`](https://github.com/pawtograder/platform/blob/main/CLAUDE.md) and [`AGENTS.md`](https://github.com/pawtograder/platform/blob/main/AGENTS.md), and the evidence about what agents are and aren't good for in this codebase |

The function is a standing responsibility, and it is not a second project. You are the person who notices CI is broken and owns getting it fixed; you do not have to do all the CI work yourself.

AI research is the one function whose subject is the course itself. Every team here works with agents all term, on the same codebase, under the same [AI policy](#ai-policy), and nobody currently writes down what that produces. This function does: it keeps the repo's context files accurate as the codebase moves, collects what worked and what wasted a week across all the project teams, and turns that into something the January cohort inherits rather than rediscovers. The standard is the same one [LO6](#grading) asks for everywhere else, which is evidence rather than assertion. "Agents are bad at migrations" is a claim; the three migration PRs where it went wrong, and what the prompts looked like, is a finding.

This structure is borrowed from TUM's iPraktikum, where 8 to 12 client projects run alongside cross-project release-management and usability-engineering teams (Brügge, Krusche & Alperowitz, *ACM Transactions on Computing Education* 15(4), 2015). It is also, roughly, the stream-aligned and enabling teams of Team Topologies, and it is how a great many companies you will work for are actually organized.

You will therefore meet the failure modes of a matrix organization, on purpose:

- **Divided loyalty.** Your project wants the feature shipped; your function wants CI unbroken. Both are legitimate, and they will collide in the same week.
- **Diffusion of responsibility.** "That's the release team's problem" is how work falls between the two structures and dies there.
- **The role becomes a title.** You are the accessibility person and nothing about accessibility changes.
- **Coordination tax.** Two standing commitments, and only one of them has a demo.

There is a fifth one that this course deliberately corrects. In industry, project work is visible and demoable while cross-cutting glue work is invisible, so recognition follows the visible half. Here, cross-project delivery is a named Distinction requirement with an owner. Companies often have the structure without the correction.

### Phase 3: Hardening and handoff (weeks 13–14, Nov 30 – Dec 10)

No new features. Bug triage, documentation, and the ops playbook for whatever your team shipped, aimed at the January 2027 release. The phase closes with a retrospective and a Learning Summary Report workshop, then final demos.

## Participation {#participation}

This is a studio course. The work happens in the room. Standups surface blockers, demo days create the accountability that makes deadlines real, game days can't be replayed, and integration sessions exist precisely because the work degrades when done asynchronously. A student who is absent misses information; their team misses a person.

So attendance is a **gate, not a band requirement**. It earns you nothing on its own, and it can cap your grade no matter which band you complete.

### The attendance floor

There are 36 scheduled sessions. **You may miss six, or two full weeks, without explaining yourself to anyone.**

| Unexcused absences | Highest grade you can earn |
|:---:|:---|
| 0–6 | A |
| 7–9 | B |
| 10–12 | C |
| 13 or more | F |

This cap applies **last**, after your band is settled. A complete Distinction claim and eleven absences is a B.

Six is deliberately generous. It's two weeks of interviews, illness, or a bad month, with nothing owed to anyone and no explanation required. Spend it carefully anyway, because the sessions you skip are the ones your team notices.

### Sessions that count double

Demo days, game days, integration sessions, and the session where you present are performances. They can't be reconstructed later. Missing one without arranging it in advance counts as **two** absences and scores zero for that instance.

### Excused absences

Illness, family emergency, religious observance, a job interview, a conference, an approved co-op obligation. Tell us in advance where you can, and after the fact where you can't. Excused absences don't count toward the cap, but they do come with a make-up: a short written artifact, due within a week, covering what you would have contributed. For a standup that's your written status and blocker; for a game day it's your reading of the incident from the logs, plus the postmortem.

### Async sessions

Three sessions in October run asynchronously while the instructor is traveling. For those, participation *is* the written artifact, whether that's the standup post, the discussion thread, or the triage log. Not posting is an absence, marked the same as an empty chair.

### If you can't meet the floor

We would rather have this conversation in September than in December. If something in your life makes the floor look impossible, come talk to us early. There is almost always an arrangement to be made, and almost never one available retroactively.

## Grading

There are no points in this course, so there is no weighted average and no category you can be weak in and average your way past.

There are four bands instead. Each band is a published list of things you have demonstrably done. You declare which band you are working toward, you do the work, and in December you make the case that you met it. Your grade is that claim, verified.

This is **task-oriented portfolio assessment**, from Cain, Grundy & Woodward, "Focusing on learning through constructive alignment with task-oriented portfolio assessment," *European Journal of Engineering Education* 43(4), 569–584, 2018.

What you actually do is ordinary software engineering: assignments, artifacts, demos, and drills. The bands change how that work converts to a grade, not what the work is.

### Learning Outcomes

There are eight outcomes, and all eight are required at Pass. There is no route to a grade in this course that leaves one of them out.

By December you can:

- **LO1:** Get productive in a large, unfamiliar, live codebase. Read code you did not write, with a purpose, and land a change in it.
- **LO2:** Work out what is actually needed, and what "good" would mean, before you build it. Solicit high-level requirements from the people who will live with the result. Separate what somebody asked for from what they need. Reason explicitly about quality on **both faces**: what a user experiences (e.g., correctness, usability, performance, accessibility) and what the next maintainer inherits (e.g., testability, modifiability, comprehensibility). Say which you traded away when they pulled against each other. 
- **LO3:** Take a change from problem through design, implementation, review, merge, deploy, and observation. Every stage of it, including the ones on either side of writing the code.
- **LO4:** Review others' work substantively, and respond to review. 
- **LO5:** Design for operability with tests, flags, rollback, and monitoring, and act during an incident.
- **LO6:** Decide from evidence about real users rather than assertion. LO2 asks what to build; this one asks whether it worked, measured rather than claimed.
- **LO7:** Collaborate on a shared codebase. Coordinate, unblock, document, hand off.
- **LO8:** Teach technical work to peers.

**The scaffolding comes off as the term goes on.** Every early assignment is one of these outcomes at deliberately reduced scale, with far more support than you should still need in December. The onboarding task is LO2 in miniature: the problem has already been named for you, the scope is bounded, the stakeholder is in the room and will answer questions, and a reference implementation is coming afterwards. By the studio phase the problem is unbounded, the stakeholder does not yet know what they want, and nobody has done it before you.

### The four bands

The question behind each band is entrustment: how much can you be trusted to do without someone checking first.

**Each band requires everything in the band below it.** The tags in brackets say which outcome a requirement demonstrates.

#### Pass: *trusted to contribute under review*

All eight outcomes at minimum standard. This is the comprehensive band, and a student who can't complete it has a real gap rather than a points shortfall.

- Ticket hunt: two tickets filed, two items triaged, by Sep 16 **(LO1, LO2)**
- Onboarding column-groups submission at **Pass level or above**: schema, RLS, and a backfill, with the gradebook reading groups from real data, plus your statement of the requirement and the qualities you traded **(LO1, LO2)**
- First implementation ticket merged, deployed, and verified running **(LO3)**
- At least 6 substantive code reviews across the term, at least 2 outside your own team **(LO4)**
- You answer review on your own PRs, with no thread left dead. Judged as a habit across the term rather than per comment **(LO4)**
- Drill Zero triage log + all 3 game-day postmortems **(LO5)**
- Your merged work carries tests where the change warrants them, and a flag when user-visible work is unfinished **(LO5)**
- At least one user-visible change shipped in your team's project area **(LO6)**
- Async sprint artifact committed; standup #1 posted and standup #2 delivered in the room on Oct 14 **(LO7)**
- Reading presentation delivered with a co-presenter, pre-read posted 48h ahead, plus a substantive contribution in at least two of the three sessions **(LO8)**
- Checkpoints 1–3 submitted
- Learning Summary Report submitted
- Attendance floor met

The onboarding assignment is itself banded. Completing it at **Pass** satisfies the requirement above. Completing it at Credit or Distinction does not skip you ahead a band. It supplies evidence toward the requirements below, because a Credit-level onboarding submission already contains the written analysis of rejected alternatives that Credit asks for.

#### Credit: *trusted to exercise judgment, not just execute*

Pass, plus:

- An ADR or design note recording alternatives you rejected and why, which a teammate acted on
- Review depth: at least 3 reviews where your comment changed the code
- One incident you triaged rather than watched, whether on a game day or a real one

#### Distinction: *trusted to own what ships*

Credit, plus **four of these five**:

- A feature owned end to end: problem framed, design noted, built, reviewed, deployed, and monitored, with the dashboard or query you would actually check
- A design decision you documented and defended in review, with the tradeoff stated plainly and the thing you gave up named
- Work delivered through your cross-project function, outside your own project area
- Evidence about users you gathered and then acted on
- A checklist entry you proposed for the [code review checklist](/docs/assignments/code-review#the-checklist), with its citation and what it would have caught

Four of five, not five, on purpose. Some of these depend partly on how your project goes, and a requirement you could not reach because the work went another way should not cost you a letter grade.

What counts as evidence about users depends on the project, and the range is wide on purpose: a usability study, a pattern across support threads, a migration failure rate, a setup time you measured before and after. The Usability Strike Force will do this differently than the Forgejo migration team, and that is fine. Settle what it means for your work at a [checkpoint](#checkpoints) rather than in December.

#### High Distinction: *trusted to extend the system*

Every option here is something that outlasts your enrollment. Three of them are artifacts and one is a person.

Distinction, plus **one** of:

- Something in the January 2027 handoff that another course depends on, with the ops playbook to run it
- A subsystem or tool the maintainers keep after you leave
- A measurement that settled a question the team was answering by assumption: the belief named and dated, a method somebody else could rerun, and the result written down where the next person will find it. A result that *confirms* the assumption counts. Afterwards the team knows instead of guessing, which is what earns this a High Distinction.
- You made somebody else more capable: sustained enough that they now do unsupervised what they needed you for in September

### Reference letters

**High Distinction is not a separate letter grade.** Distinction already earns an A, and Northeastern does not offer an A+. What it earns instead: You should expect a reference letter testifying to the high distinctions you've made in this class, and our apologies that A+ is not offered at NEU.

Everyone who asks gets a reference letter. What High Distinction changes is *what the letter can truthfully say.* This is how references work. A letter reading *this student found the failure mode in the autograder's retry path, wrote the postmortem that changed how we deploy, and shipped the ops playbook that now runs on a dozen courses* is worth a great deal. The High Distinction band is defined as precisely the set of things that will stand out in a reference letter.

For all students: Your Learning Summary Report has already assembled the evidence for a strong letter, with links, so the specifics are on hand when you come back in 5 months and ask for a letter.

### Letter Grade Requirements {#letter-grade-requirements}

Distinction is the A. High Distinction adds no letter grade, as explained above. Bands are countable, so partial progress into the next band is countable too: Distinction has five requirements, Credit has three.

| Achieved | Letter |
|---|---|
| Distinction, plus High Distinction | **A** |
| Distinction (4 of 5) | **A** |
| Credit (3 of 3), plus up to 3 of Distinction | **A−** |
| Pass, plus 2 of 3 Credit | **B+** |
| Pass (all requirements) | **B** |
| Pass, 1–2 requirements unmet | **C+** |
| Pass, 3–4 unmet | **C** |
| Pass, 5–6 unmet | **D** |
| Pass, 7 or more unmet | **F** |


**The [participation floor](#participation) caps your letter regardless of your band.** Complete a clean Distinction claim, miss ten sessions, and you get a C. The gate applies last, after your band is settled.

### Declaring a target band

You declare a target band on **Thu Oct 1**, after onboarding, after teams are set, in the last session before the async sprint. By then you know what the work actually is.

Change it in either direction at any time through **Thu Dec 3**, with no penalty. Declaring Distinction in September and finishing at Credit costs you nothing that finishing at Credit would have cost anyway, so declare the band you want rather than the one you're confident of. If you're running ahead of your declared band we'll tell you to raise it.

### The Learning Summary Report

Due **Thu Dec 10**.

You state the band you are applying for and justify it against the criteria on this page, linking each requirement to the artifact that satisfies it: the PR, the review thread, the ADR, the postmortem, the dashboard.

Grading it verifies a claim; it does not re-assess the work. Everything in it was reviewed when it happened, and a merged PR is a task already checked at the required standard. The final pass checks that the claim is true, so the report is quick to write if you did the work and unwritable if you didn't.

The report includes a reflection, and that reflection is the one artifact in this course you may not use AI for. See the [AI policy](#ai-policy).

### Checkpoints

Checkpoints 1–3 (**Oct 14 · Nov 5 · Dec 3**) are where you find out whether the claim you plan to make in December will hold. At each one you get a written per-student judgment: *on track for your declared band, yes or no, and why.*

Expect that answer to be blunt when it's no. Softening it at a checkpoint would delay the bad news to a week when you could no longer act on it.

### Late Work, Regrades and Grievances

**Deadlines.** Most of what you're graded on is continuous: commits, reviews, demos. Continuous work can't be turned in late, only not done. For the discrete deliverables (i.e., the onboarding column-groups PR, checkpoints, the pre-read for your presentation, and the Learning Summary Report) the deadline is real, and the way to move it is to ask before it passes, not after.

**Extensions.** Ask early and you'll usually get one. The mechanism is a conversation rather than a bank of late tokens.

**Regrades.** Open a regrade request in Pawtograder within **7 days** of receiving the grade. If the response doesn't satisfy you, appeal to the instructor within 3 days of the request being closed.

**Grievances about a teammate.** Raise it in your team first, using your charter. If that doesn't resolve it, bring it to clinic, early. A team problem raised in week 6 is fixable; the same problem raised in week 13 is a grade dispute.

### What counts as evidence

Every band requirement is met with a natural artifact of professional software development. These are what you link in the Learning Summary Report:

| Artifact | Where it lives | What it shows |
|----------|---------------|---------------|
| Pull requests | GitHub | Code quality, scope, description, test coverage |
| PR reviews | GitHub | Feedback quality, engagement, technical judgment |
| Commits | GitHub | Contribution cadence, commit hygiene |
| Design docs & ADRs | GitHub wiki or repo docs | Design thinking, alternatives considered |
| User research | Project deliverables | Stakeholder engagement, evidence-based decisions |
| Feature flags & ops playbooks | Codebase + docs | Production readiness, stability mindset |
| Discord threads | Discord | Helping others, cross-team collaboration |
| Monitoring & dashboards | Sentry, deployment logs | Operational ownership |
| Learning Summary Report | Final submission | Synthesis, self-awareness, articulation |

## AI Policy {#ai-policy}

### The short version

Use AI for everything except personal reflection. For reflection, use your own words and thoughts.

### The longer version

In CS 3100, we restricted AI tools early while you built foundational competence. This course assumes you have that competence. AI coding agents are expected, not merely permitted. Use Claude Code, Cursor, Copilot, whatever you prefer. AI-assisted development is part of professional software engineering now.

You are encouraged to use AI tools for:

| Area | What that looks like |
|------|----------------------|
| Implementation | Generating code, writing tests, debugging, refactoring |
| Design | Exploring architectural alternatives, drafting ADRs, prototyping approaches |
| Operations | Writing CI workflows, monitoring configs, deployment scripts |
| Code review | Using AI to help you understand unfamiliar code before reviewing it |
| Documentation | Drafting docs, READMEs, onboarding guides |
| Research | Understanding unfamiliar parts of the stack, exploring libraries, reading docs |

You are responsible for everything you ship, regardless of who or what wrote it. If Claude Code generates a migration that drops a table in staging, that's on you, and on the peer who approved the PR, and on us for deploying it. Accountability here follows the whole chain rather than just the person who typed the code. Using AI well means reviewing what it produces with the same rigor you'd apply to a junior teammate's PR, because that's essentially what it is.

### What we ask you not to use AI for

**Personal reflection.** The reflection in your Learning Summary Report asks you to articulate what you learned, what surprised you, what you'd do differently. We respectfully ask that you use your own words and thoughts for this. The point of reflection is the thinking itself. Outsourcing it defeats the purpose. A short, honest paragraph you actually wrote is worth more than a polished page you didn't.

### What we'll teach

This course explicitly teaches agentic software engineering practices. You'll learn to:
- Craft effective prompts and context for AI coding agents
- Evaluate AI-generated code critically for correctness, security, performance, and maintainability
- Know when AI accelerates you and when it wastes your time or leads you astray
- Use AI for tasks beyond code generation: debugging, code review, architecture exploration, documentation
- Build workflows where AI handles the routine so you can focus on judgment

### How we use AI

We use these tools the same way we're asking you to, and we hold ourselves to the same standard we grade you against.

Concretely: lecture decks are drafted from learning objectives and then rewritten by hand. Cover art and diagrams are generated, and the prompt that produced each one is kept in the slide source next to the image, so you can read it. Parts of Pawtograder itself are written with coding agents, and assignment handouts and draft rubrics start as drafts from a model.

What we don't delegate: what to teach and in what order, what your grade is, and the feedback we give you on your work.

In CS 3100 this statement existed to model restraint, because AI use was restricted there for the first five weeks. Here it exists to make a different point. You have no restrictions, so the only thing separating our use from yours is that everything we hand you has been read, corrected and owned by a person whose name is on it. That's the standard we'll apply to what you ship.

### What we keep from your sessions

Your agent sessions are captured as you work and pushed to a course-owned repository. The tool is [Entire](https://github.com/entireio/cli), an MIT-licensed CLI that hooks whichever agent you use and stores each session as a git object alongside the commit it produced. Setup is one command in the first working session, and after that it rides along on `git push` and you stop thinking about it.

This is part of the course rather than an extra, for three reasons:

- The [AI research function](#project-teams-and-cross-project-functions) works from it. That function owns the question of what agents are actually good for in this codebase, and it can't answer that from memory at the end of the term.
- It's the evidence behind the standard above. "The agent wrote it" is not a defense, and a session record is what makes that checkable rather than merely asserted, including in your favor when you did the work and the diff doesn't show it.
- It tells us where the class is stuck early enough to teach into it.

The corpus is private to the course staff. It isn't public, it isn't shared with other students, and nothing in it is graded on its own.

We expect to study it later, de-identified, to learn how a course like this one works. If that happens your sessions are pseudonymized first, and the mapping back to you is destroyed once grades are final. If you would rather yours were left out of that, tell us any time up to Dec 10 and they will be. It changes nothing about your grade and we won't ask why.

Two rules follow from transcripts existing at all. First, don't paste credentials into an agent. Redaction is best-effort, and a code snapshot can carry a hardcoded secret straight through it. If you think something sensitive went into a session, say so and we'll purge it and rotate the key. And nothing about production data belongs in a session, for the reasons in the next section.

## Working with Real Student Data

**You will never have access to production data**, under any arrangement: not per-task, not read-only, not for debugging.

Pawtograder holds real coursework, real grades, and real records for ten courses this term, including this one. Those are educational records protected under FERPA, a federal law. Whatever the level of trust, keeping students out of them is the only defensible arrangement, and it isn't negotiable or appealable.

What you work against instead:

- A local instance seeded by `npm run seed`, with fabricated students and assignments.
- Staging, which carries synthetic data only.

That constraint has two consequences:

- A bug you can't reproduce on seeded data is still your bug. You'll sometimes have to reason about a production failure from a stack trace, a metric, and a log line, without ever seeing the row. That's the normal condition of on-call engineering, and learning to work that way is part of the course rather than an obstacle to it.
- If you ever find yourself looking at real data, stop and tell us the same day. Misconfigurations, mislabeled dumps, and over-broad staging refreshes happen, and none of them are your fault. Reporting immediately is never penalized. Continuing to look, or saying nothing, is an integrity violation.

We cover the technical side of this in the Architecture II session in week 2: row-level security, authorization boundaries, and what the database enforces on your behalf.

## Academic Integrity

Most of this course is collaborative by design, so the usual framing doesn't map cleanly. Working together is the assignment. What follows are the things that are still violations.

- Misrepresenting contribution. Claiming work you didn't do, or padding your Learning Summary Report with a teammate's commits. Note that git records all of it, which makes this both unusually easy to detect and unusually pointless to attempt.
- Fabricating evidence. A demo of something that doesn't run, a metric you didn't measure, findings from a user study you didn't conduct.
- Bypassing the review process. Merging without required review, or force-pushing over someone else's work to obscure what changed.
- Unauthorized access to production data, grading infrastructure, or other students' private repositories, as described above.

You are responsible for everything you submit, regardless of who or what produced it. The instructor reserves the right to ask you to explain the reasoning behind any code or artifact bearing your name, and to adjust your grade based on that conversation. "The agent wrote it" is not a defense, because you shipped it.

The minimum penalty for a violation is a zero on the work in question and a report to the [Office of Student Conduct and Conflict Resolution](https://osccr.sites.northeastern.edu/). Penalties increase with aggravating factors. See the [University Academic Integrity Policy](https://osccr.sites.northeastern.edu/academic-integrity-policy/).

If you're unsure whether something crosses a line, ask before you do it. If you feel that cheating is your only option, ask for help instead.

## Tech Stack

Pawtograder is a production application. This is what you'll be working in:

**Core:** TypeScript (everywhere), Next.js 15 / React, Supabase (PostgreSQL) with auth/realtime/edge functions, Deno (edge functions runtime)

**Infrastructure & Ops:** GitHub Actions (CI/CD), Docker (local dev)

**Integrations:** GitHub API (Octokit), LangChain / OpenAI / Anthropic (AI-powered hints and grading), Amazon Chime SDK (video for office hours), Sentry (error monitoring), Discord bot for course operations (e.g., syncs discussion posts, help requests, and regrade requests, and manages server ACLs), MCP server (supports TAs debugging student issues)

**Testing:** Jest (unit), Playwright (E2E), k6 (load testing)

Experience with any of these is a bonus, not a prerequisite. You'll learn what you need as you go.

## Prerequisites

- CS 3100 or equivalent (software engineering fundamentals)
- At least one systems or data course (CS 3500, DS 3000, or similar)
- Comfortable with Git, command line, at least one backend language

## January 2027: The Next Semester

January 2027 is the first semester after this course, and the first semester where classes rely entirely on what you shipped. That's your target. New features that can't be battle-tested by end of semester don't ship to 100% of classes. Untested features are opt-in only via feature flags and must have ops playbooks. This is a real constraint. You'll learn what it means to hand off a codebase that's better than you found it.

## Communication

**Discord is the primary channel.** Join the [Pawtograder Community Discord](https://discord.gg/tZRR36bcgQ). Setup problems, "is this expected?", and anything fast belongs there.

**Ask in public by default.** Your question is somebody else's answer next week, and a DM helps exactly one person. We'll usually redirect a DM to a channel rather than answer it privately.

**Scope questions belong in the ticket**, where they stay attached to the work permanently.

**Monday clinic** is for design tradeoffs, architecture questions, and "we're stuck as a team," the things that need a conversation rather than a message.

**Email the instructor** for anything private: accommodations, absences, a conflict on your team, or anything you wouldn't post in a channel. Expect a reply within one business day.

**The 30-minute rule:** thirty minutes of no progress on the same problem, and you owe the team a question. Asking early is always safe here.

## Open Source

All Pawtograder repositories are **public and open source** on [GitHub](https://github.com/pawtograder). You can explore the codebase, file issues, and submit PRs before the course begins.

## Inclusive Environment

To create and preserve a classroom atmosphere that optimizes teaching and learning, all participants share a responsibility in creating a civil and non-disruptive forum for the discussion of ideas. Students are expected to conduct themselves at all times in a manner that does not disrupt teaching or learning. Your comments to others should be constructive and free from harassing statements. You are encouraged to disagree with other students and the instructor, but such disagreements need to be respectful and based upon facts and documentation (rather than prejudices and personalities). The instructor reserves the right to interrupt conversations that deviate from these expectations. Repeated unprofessional or disrespectful conduct may result in a lower grade or more severe consequences. Part of the learning process in this course is respectful engagement of ideas with others.

We believe that diversity and inclusiveness are essential to excellence in academic discourse and innovation. In this class, the perspective of people of all races, ethnicities, gender expressions and gender identities, religions, sexual orientations, disabilities, socioeconomic backgrounds, and nationalities will be respected and viewed as a resource and benefit throughout the semester. Suggestions to further diversify class materials and assignments are encouraged. If any course meetings conflict with your religious events, please do not hesitate to reach out to make alternative arrangements.

## Name and Pronoun Usage

As this course includes some discussion, it is vitally important for us to create an educational environment of inclusion and mutual respect. This includes the ability for all students to have their chosen gender pronoun(s) and chosen name affirmed. If the class roster does not align with your name and/or pronouns, please inform us of the necessary changes.

## Accommodations

If you have a documented disability, please register with [Disability Access Services](https://disabilityaccessservices.northeastern.edu/) to get the accommodations that will help you succeed. Please do this even if you are unsure whether you will need accommodations, since there may be a delay if you decide you need them later. Please do not wait until it has seriously impacted your work, as accommodations are not retroactive. See [additional information for Oakland students](https://oakland.northeastern.edu/student-life/access-services/accommodations/#request).

## Policy on Recording

Massachusetts and California laws prohibit students from recording classes without the consent of all participants, unless a disability accommodation is in place. We encourage you to seek accommodations to which you are legally entitled.

## University Resources

### Title IX

Title IX of the Education Amendments of 1972 protects individuals from sex or gender-based discrimination, including discrimination based on gender-identity, in educational programs and activities that receive federal financial assistance.

Northeastern's Title IX Policy prohibits Prohibited Offenses, which are defined as sexual harassment, sexual assault, relationship or domestic violence, and stalking. The Title IX Policy applies to the entire community, including male, female, transgender students, faculty and staff.

If you or someone you know has been a survivor of a Prohibited Offense, confidential support and guidance can be found through University Health and Counseling Services and the Center for Spiritual Dialogue and Service clergy members. By law, those employees are not required to report allegations of sex or gender-based discrimination to the University.

Alleged violations can be reported non-confidentially to the Title IX Coordinator within The Office for Gender Equity and Compliance at titleix@northeastern.edu and/or through NUPD. Reporting Prohibited Offenses to NUPD does NOT commit the victim/affected party to future legal action.

Faculty members are considered "responsible employees" at Northeastern University, meaning they are required to report all allegations of sex or gender-based discrimination to the Title IX Coordinator.

In case of an emergency, please call 911.

Please visit https://www.northeastern.edu/titleix for a complete list of reporting options and resources both on- and off-campus.

### International Tutoring Center

The [International Tutoring Center (ITC)](https://international.northeastern.edu/itc/) provides current Northeastern University international and non-native English-speaking students with free, comprehensive English language and academic support. The ITC includes student-centered one-on-one tutoring sessions and workshops on reading, writing, and language and culture. For more on tutoring and workshops, see https://cps.northeastern.edu/academic-resources/global-student-success/international-tutoring.

### WeCare

WeCare is a program operated through the Office for Student Affairs. The mission is to assist students experiencing unexpected challenges to maintaining their academic progress. WeCare works with students to coordinate among university offices and to offer appropriate on and off campus referrals to support successfully resolving the issue. WeCare also provides information to faculty and staff to identify Northeastern resources and policies to help students succeed.

For more information see https://studentlife.northeastern.edu/we-care/. Call 617.373.4384 or email wecare@northeastern.edu.

### Libraries

Students can access research resources at the [F.W. Olin library (Oakland)](https://library.northeastern.edu/global_campus/global-campus-portals/oakland/) and through the [Snell Library (Boston and online)](https://library.northeastern.edu/). The Snell Library collaborates with both the First-Year Writing and Advanced Writing in the Disciplines programs to support students' information literacy. Online research tutorials can be found here: https://subjectguides.lib.neu.edu/researchtutorials/getstarted

### Global Learner Support

Northeastern University's Global Learner Support (GLS) offers "language, cultural, and academic support while promoting the development of intercultural competence and global understanding." They offer tutoring, workshops, and much more. Visit https://gls.northeastern.edu/ to learn more.
