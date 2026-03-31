---
title: Syllabus
description: CS 4535 Course Syllabus
---

# CS 4535: Software Design & Delivery

**Professional Practicum Capstone — AI & Open Source**

**Instructor:** Jonathan Bell

**Credits:** 4

**Section 3:** MWR 10:30–11:35 AM

**Class size:** 50 students

:::info
This syllabus is a **draft** and is subject to adjustment before the Fall 2026 semester begins. Project offerings, grading weights, and course structure may change based on enrollment, staffing, and community feedback.
:::

## Course Description

When you join a company, you'll be working on a product that predates you. Lots of features. Lots of code. Lots of technical debt. Some teams struggle under that weight — barely satisfying their users, burning through resources. But the best teams find ways to make a codebase better than they found it, ship features that users didn't know they needed, and turn inherited complexity into a platform for something new. The difference isn't luck — it's skill. This course teaches you that skill, using a product that you should be familiar with: Pawtograder.

Pawtograder is developed by Prof. Bell in collaboration with students and other instructors, and is used across CS 2000, 2100, and 3100 to support course operations. It goes beyond a platform to submit assignments — Pawtograder administers group projects, manages grading workflows, has a complex gradebook supporting a rich query language, and provides an integrated discussion forum, surveying, live polling, and real-time office hours.

Pawtograder is already in production — 1,500+ weekly active users and shipping continuously. Students in this course will practice the complete software development lifecycle from design to operations. The goal: leave the codebase in an excellent place for January 2027, when the next semester's classes pick it up and depend on everything you built.

## Philosophy

How much do you do? I define the minimum for an A. You decide the minimum for your goals. Choose the topic focus that you want. Make the GitHub resume that you want. Use the AI that you want, too.

### A wide range of backgrounds welcome

Real products need more than people who can write code. They need people who can talk to users, design interfaces, write documentation, set up monitoring, optimize queries, wrangle CI pipelines, and figure out why the thing that worked yesterday doesn't work today. This course has room for all of those people.

A student who is passionate about user research and student experience — who conducts usability studies, synthesizes findings into design recommendations, and uses Claude Code to implement and ship those changes — is just as valued as the distributed systems hacker who profiles the gradebook and rewrites the query layer. Both are doing real engineering. Both are accountable for what ships. The difference is where you focus, not whether your work counts.

What matters is that you can engage with a production codebase, contribute meaningfully to a team, and take ownership of your work from design through deployment — whatever your entry point into that process is.

## Course Structure

### Phase 1: Onboarding (Weeks 1–3)

**Lecture topics** (ordered to unblock hands-on work first, then broaden):

*Week 1 — Get into the code:*
1. **The architecture of Pawtograder** — Walkthrough of the actual codebase. How the pieces fit together: Next.js frontend, Supabase backend, edge functions, GitHub integrations, Discord bot, MCP server. Where the complexity lives. Where the debt lives.
2. **Software processes & continuous delivery** — How modern teams ship software. CI/CD pipelines, trunk-based development, deployment strategies, feature flags. Why waterfall doesn't work here and what does. How to get your first PR merged.
3. **Serverless & microservices** — Focused discussion: when serverless (edge functions, Deno) makes sense, when it doesn't. Microservices vs. monolith tradeoffs in the context of a small team on a real product.

*Week 2 — Work effectively:*
4. **End-to-end testing & performance testing** — Playwright for E2E, k6 for load testing. What to test, what not to test, and how to avoid a test suite that's slower than the features it protects.
5. **Monitoring & incident response** — Observability (logs, metrics, traces). Setting up alerts that matter. Incident response: detection, triage, mitigation, postmortem. Preventing incidents from happening in the first place.
6. **Estimation & scrum** — Story points, sprint planning, velocity. How to scope work when you're new to a codebase. When estimation is useful and when it's theater.

*Week 3 — Think bigger:*
7. **Risk management** — Identifying what can go wrong before it does. Risk registers, mitigation strategies, the relationship between risk and the January 2027 release constraint.
8. **User research** — Talking to users, usability studies, synthesizing findings into actionable design decisions. How to learn what users need vs. what they say they want.

**Hands-on work (parallel with lectures):**

Ticket burn-down activity. Everyone participates. Includes documentation tickets — this is effectively the onboarding assignment. You'll get familiar with the codebase, the contribution workflow, and the team norms before touching production features.

Then an implementation task: a small, scoped ticket that requires reading existing code, understanding the architecture in that area, and shipping a change through the full pipeline (branch → PR → review → merge → deploy).

### Phase 2: Studio (Weeks 4–14)

Students choose from a slate of projects. Each project has defined deliverables but significant latitude in approach. Projects span the full SDLC — you'll do user research, design, implementation, testing, and operations within your chosen area.

**Weekly rhythm (MWR, all sessions required):**

| Day | Format |
|-----|--------|
| Day 1 | **Standup + Clinic** — 15-min all-hands standup (what shipped, what's blocked, what's next), then teams sign up for instructor/TA consultation slots on specific blockers, architectural questions, or design tradeoffs. |
| Day 2 | **Design/Code Review** — 1–2 teams present a design decision, significant PR, or user research finding. Structured critique from the room. Rotates so every team presents roughly every 2–3 weeks. |
| Day 3 | **Team work session** — Dedicated in-class time for team coordination, pair programming, and co-located work. Instructor and TAs available for drop-in support. |

**Biweekly demo days:** Every two weeks, each team demos what they shipped. Live product, real environment, 5 minutes per team plus questions. Replaces one of the regular sessions.

#### Project Slate

**Usability Strike Force**
User research and UX improvements across Pawtograder. Conduct usability studies with real users (current and past students, TAs and instructors). Identify pain points, propose design changes, implement and validate improvements. Deliverables include research findings, design proposals, and shipped UX improvements.

**Office Hours Reconceptualization**
Rethink and rebuild the office hours experience. The current system works but was designed under assumptions that may no longer hold. Research how office hours actually get used, identify what's working and what isn't, design and implement a better system. This is a full product design challenge — from user research through deployment.

**Docusaurus Integration**
Build deep integrations between Pawtograder and Docusaurus-based course content sites like the "CS 3100 Public Resources." Lecture schedule synchronization, office hours widgets, search, live polls embedded into slides. This project bridges two ecosystems and requires understanding both the Pawtograder platform and the Docusaurus plugin architecture.

**Gradebook Performance & Refactor**
The gradebook supports a rich query language and complex grading policies, but performance degrades at scale and the codebase has accumulated technical debt. On the backend: database query optimization, architectural refactoring, and performance testing. On the frontend: handling massive React tables with 1,000+ rows and hundreds of columns with real-time updates — virtualization, incremental rendering, and state management at a scale that breaks naive approaches. Profile, optimize, and refactor across the full stack.

**Operations**
Monitoring, general performance tuning, CLI tools, CI workflow improvements. You own the infrastructure that makes everything else possible. Build dashboards, set up alerting, create developer tooling, improve the build and deploy pipeline. This is the "you built it, you run it" project for the people who want to build the tools to build the features.

## Grading

Students can earn up to 1000 points. I define the minimum for an A. You decide the minimum for your goals.

| Category | Points | What it measures |
|----------|--------|-----------------|
| Onboarding (Phase 1) | 100 | Can you get productive in an unfamiliar codebase? |
| Engineering Process | 250 | How you work |
| Shipped Product | 250 | What you deliver |
| Code Review & Collaboration | 250 | How you make the team better |
| Portfolio & Reflection | 150 | Can you articulate what you learned? |

### Onboarding (100 pts, weeks 1–3)

Ticket burn-down: complete assigned documentation and small implementation tickets. Graded on completion and quality of contributions. This is baseline — everyone should earn full marks here if they're ready for the course.

### Engineering Process (250 pts, continuous)

Evaluated through natural artifacts, not artificial submissions:

- **Design documentation** (100 pts): User research artifacts, feature proposals, ADRs, data model designs. Assessed at 3 checkpoints (~weeks 5, 9, 13). Quality over quantity — a single well-reasoned ADR that prevented a bad architectural decision is worth more than ten boilerplate docs.

- **Development practice** (75 pts): PR quality (clear descriptions, appropriate scope, test coverage), branch hygiene, CI discipline, commit quality. Assessed through Git history — this is your professional record.

- **Operations & stability** (75 pts): Feature flags on unfinished work, rollback plans, monitoring for shipped features, incident response. Weighted more heavily as the January 2027 release approaches. Teams that ship recklessly score poorly here even if their features work.

### Shipped Product (250 pts, continuous)

What actually made it to users. Assessed by project team:

- **Impact** (125 pts): Did your work solve a real problem for real users? Evidence can include user feedback, usage metrics, bug reduction, performance improvements — depends on the project. The Usability Strike Force measures this differently than the Ops team, and that's fine.

- **Quality** (125 pts): Code quality, test coverage, documentation, feature flag discipline, ops readiness. A feature that ships with tests, monitoring, and a rollback plan scores higher than a flashier feature that doesn't.

**Key principle:** Partial features behind feature flags with excellent quality score higher than complete features with no tests and no ops story.

### Code Review & Collaboration (250 pts, continuous)

Code review is a first-class activity in this course — not a checkbox, but a core engineering skill. Reviews follow an escalation model that mirrors how real engineering organizations work:

**Review Escalation Model:**
1. **Peer review (required first pass):** Every PR receives review from at least one teammate before escalation. Students learn to give and receive substantive feedback.
2. **TA mentor review:** TA mentors review PRs that peers have already reviewed — they assess both the code and the quality of the peer review itself. TAs focus on architectural alignment, test coverage, and ops readiness.
3. **Instructor review:** Prof. Bell reviews architectural decisions, contentious PRs, and cross-team concerns. Not every PR — only what matters at the system level.

This means you are graded on **both sides** of the review process:

- **Reviews given** (125 pts): Quality of feedback you provide on peers' PRs. Not "LGTM" — real feedback that makes code better. Did you catch a bug? Push back on a design decision with a reasoned alternative? Suggest a test case the author missed? Ask a question that surfaced a hidden assumption? Assessed through GitHub PR review history.

- **Reviews received & responded to** (50 pts): How you respond to feedback. Do you engage constructively? Revise thoughtfully? Push back with evidence when you disagree? Or do you ignore comments and force-merge?

- **Cross-team contribution** (75 pts): Helping other project teams, Discord engagement, unblocking others, contributing to shared infrastructure. The best engineers make everyone around them more productive.

### Portfolio & Reflection (150 pts, end of semester)

- **Contribution portfolio** (75 pts): Curated summary of your semester's work — what you shipped, what you designed, what you learned. This is your GitHub resume artifact. Includes links to PRs, design docs, and deployed features.

- **Reflection** (75 pts): Honest assessment of what worked, what didn't, what you'd do differently. Specific, not generic. Address: a technical decision you'd reverse, a collaboration moment that changed your approach, what surprised you about production engineering.

### Letter Grade Requirements

Your letter grade is determined by both total points AND meeting minimum thresholds. You must satisfy **all** requirements for a grade level.

| Grade | Total | Process ≥ | Product ≥ | Review ≥ |
|-------|-------|-----------|-----------|----------|
| A | ≥900 | 200 (80%) | 200 (80%) | 200 (80%) |
| B | ≥800 | 175 (70%) | 175 (70%) | 175 (70%) |
| C | ≥700 | 150 (60%) | 150 (60%) | 150 (60%) |

Same logic as CS 3100: you can't compensate for poor process with great product, or vice versa. And you can't ignore code review — it's 25% of your grade because it's 25% of what makes a team effective.

### What counts as evidence

All grading uses natural artifacts of professional software development:

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
| Portfolio & reflection | Final submission | Synthesis, self-awareness, articulation |

## AI Policy {#ai-policy}

### The short version

Use AI for everything except personal reflection. For reflection, use your own words and thoughts.

### The longer version

In CS 3100, we restricted AI tools early while you built foundational competence. This course assumes you have that competence. AI coding agents — Claude Code, Cursor, Copilot, whatever you prefer — are not merely permitted. They are expected. This is a course about professional software engineering, and AI-assisted development is now part of professional software engineering.

You are encouraged to use AI tools for:
- **Implementation** — generating code, writing tests, debugging, refactoring
- **Design** — exploring architectural alternatives, drafting ADRs, prototyping approaches
- **Operations** — writing CI workflows, monitoring configs, deployment scripts
- **Code review** — using AI to help you understand unfamiliar code before reviewing it
- **Documentation** — drafting docs, READMEs, onboarding guides
- **Research** — understanding unfamiliar parts of the stack, exploring libraries, reading docs

You are responsible for everything you ship, regardless of who or what wrote it. If Claude Code generates a migration that drops a table in staging, that's on you — and on the reviewer who approved the PR, and on the TA who signed off, and on us for deploying it. Accountability in this course mirrors accountability in industry: it follows the whole chain, not just the person who typed the code. Using AI well means reviewing what it produces with the same rigor you'd apply to a junior teammate's PR — because that's essentially what it is.

### What we ask you not to use AI for

**Personal reflection.** The portfolio reflection at the end of the semester asks you to articulate what you learned, what surprised you, what you'd do differently. We respectfully ask that you use your own words and thoughts for this. The point of reflection is the thinking itself — outsourcing it defeats the purpose. A short, honest paragraph you actually wrote is worth more than a polished page you didn't.

### What we'll teach

This course explicitly teaches agentic software engineering practices. You'll learn to:
- Craft effective prompts and context for AI coding agents
- Evaluate AI-generated code critically — correctness, security, performance, maintainability
- Know when AI accelerates you and when it wastes your time or leads you astray
- Use AI for tasks beyond code generation: debugging, code review, architecture exploration, documentation
- Build workflows where AI handles the routine so you can focus on judgment

## Tech Stack

Pawtograder is a production application. This is what you'll be working in:

**Core:** TypeScript (everywhere), Next.js 15 / React, Supabase (PostgreSQL) with auth/realtime/edge functions, Deno (edge functions runtime)

**Infrastructure & Ops:** GitHub Actions (CI/CD), Docker (local dev)

**Integrations:** GitHub API (Octokit), LangChain / OpenAI / Anthropic (AI-powered hints and grading), Amazon Chime SDK (video for office hours), Sentry (error monitoring), Discord bot (course operations — syncs discussion posts, help requests, regrade requests + server ACL management), MCP server (supports TAs debugging student issues)

**Testing:** Jest (unit), Playwright (E2E), k6 (load testing)

Experience with any of these is a bonus, not a prerequisite. You'll learn what you need on the job — that's the point.

## Prerequisites

- CS 3100 or equivalent (software engineering fundamentals)
- At least one systems or data course (CS 3500, DS 3000, or similar)
- Comfortable with Git, command line, at least one backend language

## January 2027: The Next Semester

January 2027 is the first semester after this course — and the first semester where classes rely entirely on what you shipped. That's your target. New features that can't be battle-tested by end of semester don't ship to 100% of classes. Untested features are opt-in only via feature flags and must have ops playbooks. This is a real constraint — you'll learn what it means to hand off a codebase that's better than you found it.

## Communication

Discord is the primary communication platform for this course. Join the [Pawtograder Community Discord](https://discord.gg/tZRR36bcgQ).

## Open Source

All Pawtograder repositories are **public and open source** on [GitHub](https://github.com/pawtograder). You can explore the codebase, file issues, and submit PRs before the course begins.
