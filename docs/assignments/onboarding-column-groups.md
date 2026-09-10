---
title: "Onboarding: Gradebook Column Groups"
description: Sep 9–24. Everyone builds the same feature, independently. A pull request that never merges, on purpose.
sidebar_position: 3
---

# Onboarding: Gradebook Column Groups

**Assigned:** Wed Sep 9 · **Due:** Thu Sep 24, 23:59 · **Form:** a pull request from your fork of the handout repo, which never merges

## Overview

Open the gradebook for any course in Pawtograder and the columns are grouped. Assignments together, labs together, exams together, each cluster under a collapsible header. It looks like a feature somebody built.

Nobody built it. The grouping is computed in the browser on every render, in the [`groupedColumns` memo](https://github.com/pawtograder/platform/blob/main/app/course/%5Bcourse_id%5D/manage/gradebook/gradebookTable.tsx#L2556-L2615) in `manage/gradebook/gradebookTable.tsx`. It [splits `col.slug` on `-`](https://github.com/pawtograder/platform/blob/main/app/course/%5Bcourse_id%5D/manage/gradebook/gradebookTable.tsx#L2567), takes a prefix off the front, [special-cases anything shaped `assignment-<type>-*`](https://github.com/pawtograder/platform/blob/main/app/course/%5Bcourse_id%5D/manage/gradebook/gradebookTable.tsx#L2571-L2577), and then runs a [contiguity check on `sort_order`](https://github.com/pawtograder/platform/blob/main/app/course/%5Bcourse_id%5D/manage/gradebook/gradebookTable.tsx#L2580-L2587) to decide where one group ends and the next begins.

The same heuristic is copy-pasted elsewhere in the app. The student-facing what-if view at [`gradebook/whatIf.tsx`](https://github.com/pawtograder/platform/blob/main/app/course/%5Bcourse_id%5D/gradebook/whatIf.tsx#L543-L599) is one of those places, and it is not the only one. Deliverable 3 below is about the instructor gradebook. If you convert the other copies as well, say so in the PR.

Now read the schema. [`gradebook_columns`](https://github.com/pawtograder/platform/blob/main/supabase/migrations/20250614231720_gradebook.sql#L98-L113) is created in `supabase/migrations/20250614231720_gradebook.sql`. There is no group column and no group table. There is [`sort_order`](https://github.com/pawtograder/platform/blob/main/supabase/migrations/20250614231720_gradebook.sql#L112), an integer, and that's all there is. The table's [existing RLS policies](https://github.com/pawtograder/platform/blob/main/supabase/migrations/20250614231720_gradebook.sql#L648-L661) are the ones your new table has to sit consistently beside.

Those line numbers are current as of September 2026 and will drift as the class works. If a link lands somewhere that makes no sense, search the file for `groupedColumns` rather than trusting the anchor.

So a group is a real concept, and it's written down nowhere. Instructors talk about it and the UI renders it, but it exists in everyone's head and in a naming convention.

**Your job is to make it a first-class thing in the database, and to make the table read it from there.**

This is the one assignment in the course whose work doesn't ship. You do it through Pawtograder, which gives you a fork of the handout repository, and your submission is a pull request from that fork back to the handout repo, which never merges: I write the implementation the class actually uses. Everyone solves the same problem independently, which is what makes it a bake-off. A class each fixing a different ticket produces submissions I can't hold side by side, and when one is thin I have no way to tell whether the student was thin or the ticket was nasty. It pays you back too, because every submission arrives as a PR on the same repository, so after Sep 24 you can read everyone else's design for a problem you just spent two weeks inside.

## Learning Outcomes

By completing this assignment, you will:

- **Get productive in an unfamiliar codebase** by finding, reading and changing the gradebook's grouping logic and the schema underneath it ([LO1](/syllabus#grading))
- **Work out what is actually needed** by writing down what you took a column group to be, and which qualities you traded against each other to get there ([LO2](/syllabus#grading))

## Credit for your ideas

The code doesn't ship; the ideas do. I'll write the implementation that goes into Pawtograder, and I'll build it out of what you all did. If the shape of your table is the one that survives, or the way you resolved an ambiguous case in the backfill, or a constraint that makes a broken grouping impossible to express, it goes into the ADR with your name on it.

## What You Hand In

One pull request from your fork to the handout repository, final by **Thu Sep 24, 23:59**; commits after that are not read. Start from the assignment page in Pawtograder rather than cloning [`pawtograder/platform`](https://github.com/pawtograder/platform) yourself: the fork, the PR and the naming are handled there, and a PR opened by hand somewhere else won't be collected. If your fork hasn't appeared by **Mon Sep 15**, say so in Discord. Open early: a PR that appears on Sep 19 gets read carefully, and one that appears at 23:00 on Sep 24 gets read at 23:00 on Sep 24. It needs six things in it:

1. **A migration:** schema for groups, and the RLS that goes with it. Groups describe student-visible data in one Postgres database holding ten courses' grades at once. The policies are part of the design, not paperwork you attach at the end.
2. **A backfill.** Every gradebook that already exists comes out of your migration grouped. Not "new columns get groups from now on," but the columns that are already there, in the courses that are already there.
3. **The table reading from your data.** The `groupedColumns` memo stops splitting slugs. If something similar still exists, it should be doing nothing more interesting than shaping rows you handed it.
4. **The design writeup**, in the PR description. Two parts, covered in [the section below](#the-design-writeup).
5. **The band you are claiming, stated in the PR description**, with a sentence justifying it. The bands are under [Grading](#grading) below. At Credit, that's the written list. I assess by checking whether the claim is true, so a Pass that's true is worth more to you than a Distinction that isn't.
6. **What you tested against, and the down path.** Which courses, which columns, what you actually ran, and what happens if this has to be undone after it has already run once.

You'll need the full local stack for this one, since a migration is exactly the case the staging backend can't serve. [Local Development](../local-dev.md) has the setup. Seed with `npm run seed -- --template cs4535`: that's the class whose gradebook everything above describes, and the stock `npm run seed` gives you one where almost every column is already a group of one. The loop you'll be in all week is four commands: `npx supabase migration new <name>`, write the SQL, `npx supabase db reset` to replay it from scratch, and `npm run client-local` to regenerate the TypeScript types your new table needs to appear in. Skipping `npm run client-local` is the most common way this assignment goes wrong, because the type errors it produces point at files you never touched. `db reset` also drops the seeded class, so re-seed after every replay or you'll be reading an empty gradebook.

### What CI tells you, and what it doesn't

Three checks run on your pull request.

`lint` is `npm run lint`: `next lint` plus `prettier --check .` over the whole tree. This is the round trip [Local Development](../local-dev.md#before-you-push) warns you about, and `npm run format` before you commit avoids all of it.

`deno-unit-tests` runs the Deno tests under `supabase/functions`.

`gradebook-e2e` is the one worth waiting for. It brings up a throwaway Supabase, replays every migration including yours, seeds the `cs4535` class, and drives the instructor gradebook in a real browser. Three things can go wrong there, and each is worth knowing about. Your migration can fail to apply from scratch, which is what `npx supabase db reset` catches locally. Your committed `SupabaseTypes.d.ts` can disagree with the schema your migration produces, which is what `npm run client-local` is for. Or the gradebook can come up with nothing grouped.

It also uploads screenshots of your gradebook, collapsed and expanded, as a build artifact. Download them: that's what your grouping actually looks like, and it's the same view I read when I grade. If you want to see a case handled a particular way, this is where you check that it is.

None of this is a claim that your design is good. Green means it applies, the types match, and the table still groups something. Your design is assessed from the writeup instead.

## The design writeup

The migration is half the submission. The other half is a written account of what you decided and why, and it's the half that makes this [LO2](/syllabus#grading) rather than a SQL exercise. Nobody wrote down what a column group is; you are recovering that requirement, and the writeup is where you say what you recovered.

It has two parts, both in the PR description. Part one is about what you built; part two is about what should exist.

### Part one: the design you built

A paragraph on each of four questions:

1. **What is a column group for?** Not what it is in your schema, but what an instructor is doing when they group columns, and what would be worse for them if groups didn't exist.
2. **Who would you ask to check that you got it right?** Name a person or a role, and say what you'd put in front of them.
3. **Which qualities did you optimize for?** Quality has two faces here. There's what a user experiences: the gradebook still renders the same headers, and it stays fast on a 40-column course. And there's what the next maintainer inherits: whether your schema can be tested, changed and understood by somebody who wasn't in the room. Say which of those you pushed on.
4. **Where those pulled against each other, which did you choose?** Name the trade and what you gave up for it, not just the winner. A constraint that makes bad groupings impossible to express may also make a legitimate edge case impossible to express, and if you hit that, say so.

The test I apply is whether a reader could predict your schema from your answers. A writeup that would describe anybody's submission hasn't answered the questions.

### Part two: a design for the hard case

The gradebook you just changed is this course's, and this course's is small. The one that actually defeats the current display is CS 2100's. Every assessed topic there gets its own gradebook column, and every topic is assessed more than once, so the column list grows roughly as topics times attempts. Slug-prefix grouping has nothing useful to say about that. The columns recording attempts at one topic share a concept, and the heuristic can at best notice that they share a string.

The seed shows you a milder version of the same thing: it builds [twelve `skill-N` columns and three expectation-level aggregates](https://github.com/pawtograder/platform/blob/main/scripts/DatabaseSeedingUtils.ts#L4899-L4952) whose scores are computed from the skills with `countif(gradebook_columns("skill-*"), ...)`. Those three aggregates belong to one concept and share no prefix, so today they scatter into three groups of one.

Propose a design for that. You don't have to build it, and no band requires that you do. Roughly a page:

1. **What structure is actually there.** Name the relationship the column list is failing to express. Attempts at a topic are not the same relationship as columns that happen to sort next to each other.
2. **What the display should do with it.** A group is one answer. It may not be the best one, and saying why it isn't counts for more than picking it.
3. **What it would cost.** Schema, migration, query load on a 500-student course, and instructor effort per course to set up. Say what breaks for a course that isn't organized this way.
4. **What you'd need to know to be sure, and who you'd ask.**

Some of the raw material is already in the schema and untouched by the grouping code: [`dependencies`](https://github.com/pawtograder/platform/blob/main/supabase/migrations/20250614231720_gradebook.sql#L104) records which columns a computed column is built from, and [`score_expression` and `render_expression`](https://github.com/pawtograder/platform/blob/main/supabase/migrations/20250614231720_gradebook.sql#L108-L109) say how. A display that knows a column is derived, and knows what from, can do things the current one can't.

Both parts are Pass requirements. A missing writeup keeps a Distinction implementation at Pass until you write it. Part two is also where [High Distinction](#high-distinction-the-design-that-holds-up) is decided.

## AI Policy

Use whatever agent you like, for all of it: reading the gradebook code, writing the migration, drafting the PR. Your sessions are captured and pushed to a course-owned repository as you work, which is set up in the Sep 10 working session and needs nothing from you afterwards. The [syllabus](/syllabus#ai-policy) says what's kept, who sees it, and how to opt out of the research half.

### How we tell whether you did it

The two outcomes this assignment carries, [LO1 and LO2](/syllabus#grading), aren't things an agent can hand you, and every place this assignment is assessed is a place where that shows:

- **The design writeup.** An agent can answer the four questions. It can't answer them about the schema you built, which is why the test is whether a reader could predict your schema from your answers.
- **The conversation.** Any of us may ask why the schema is shaped that way, why you chose that key, why the backfill resolves an ambiguous row in that direction. The [syllabus](/syllabus#ai-policy) says "the agent wrote it" is not an answer, and this is the first assignment where we mean it.

That thread runs all term rather than stopping here. Checkpoints 1–3 return a written judgment on whether your band claim is holding up, and the Learning Summary Report in December asks you to link an artifact to every requirement you claim. Both are quick to produce if you did the work.

One practical note: agent-written answers to the same prompt look like each other, and I'm reading them side by side.

### What you'd be skipping

This is the most scaffolded version of [LO2](/syllabus#grading) you'll get all semester. The problem is already named, the scope is bounded, the stakeholder is in the room and will answer questions, and a reference implementation arrives in October so you can check your judgment against a real one. By the studio phase the problem is unbounded, the stakeholder doesn't yet know what they want, and nobody has done it before you. Deciding what a thing is *for* is a skill with a small number of reps in it, and this is the cheapest one you'll be offered.

[LO1](/syllabus#grading) is the same shape. Being able to work in a system larger than your working memory is earned by reading the gradebook, not by watching an agent read it. You'll be reading your classmates' answers to this same problem after Sep 24, and from Sep 28 you'll be making calls in a corner of Pawtograder that nobody has mapped for you.

## Grading

This course has no points. You work toward one of four bands, each a published list of things you've demonstrably done, and in December you make the case that you met it. The [syllabus](/syllabus#grading) carries the full scheme.

That scheme is also why this assignment exists. A course graded on eight outcomes across four bands wants a gradebook whose columns can be grouped by outcome and by band, and Pawtograder can't express that today: the grouping you see is a string-splitting heuristic in the browser, and there's nothing underneath it. If this course's own gradebook makes sense in December, that's your work.

This assignment is banded too, and each band includes the one below it. You choose the depth you go to, and what you're assessed on is whether you reached the band you claimed. An over-claim falls back to the band you actually reached rather than failing the assignment. If your submission doesn't reach Pass, I'll tell you what's missing within a week and you get one revision. This is a Pass requirement, and I'd rather you meet it in October than not at all.

| Band | What it means here |
|---|---|
| **Pass** | All six deliverables above, with schema, RLS and a backfill that **reproduces today's behavior**, and the table reading groups from real data instead of string-splitting slugs |
| **Credit** | **Backfill with fixes:** you found the cases where the current heuristic gets the grouping wrong, and your migration corrects them |
| **Distinction** | **Full CRUD:** create, rename, reorder and delete groups, and assign columns between them. Reorder preserves group membership |
| **High Distinction** | **A design that holds up:** part two of the writeup, answering the CS 2100 case rather than the easy one. No implementation required |

### Pass: reproduce what the gradebook does today

Reproducing current behavior faithfully is the correct answer at this band. If your migration produces exactly the grouping the memo produces today, for every column in every seeded course, you did the task. Moving a behavior out of a render-time heuristic and into the database without changing what anyone sees is a real skill, and a large fraction of production migrations are precisely that.

### Credit: analysis before implementation

The current heuristic gets some cases wrong, and I'm not going to tell you which ones. Finding them *is* this band.

Credit needs at least three demonstrated failures. A list of one is a Pass with a note attached, and a submission that corrects the cases by accident hasn't met it. So part of the deliverable is a **written list**: what you found, how you found it, and what your backfill does about each case. A migration that quietly does the right thing and says nothing about it is a Pass.

### Distinction: full CRUD (Create, Rename, Update, Delete)

Groups you can create, rename, delete and reorder; columns you can move between them. The constraint that makes this more than four forms is that **reordering must preserve group membership**. Build the CRUD first and the reorder path last, because the reorder path is where the design either holds or doesn't.

### High Distinction: the design that holds up

Pass through Distinction all take the current grouping as the requirement: reproduce it, correct it, make it editable. This band is earned in [part two of the writeup](#part-two-a-design-for-the-hard-case), where you say what the display should do that it doesn't do at all. There's no additional code, and no implementation of your proposal is required.

Four things separate a High Distinction proposal from a competent one. It answers the CS 2100 case rather than the seeded one. It names a structure the current model can't express, rather than a nicer way to draw the same thing. It prices what the design costs instead of only what it gives. And it's specific enough that somebody could build it from your description and get what you meant.

The syllabus asks this band for something that outlasts your enrollment, and a design does when it's the one that gets built. I write the implementation the class uses in October out of what you all did, so a proposal that shapes it is exactly that; see [credit for your ideas](#credit-for-your-ideas).

### What each expectation is judged on

| Expectation | Standard |
|---|---|
| **Schema** | A group is a row, not a substring. Constraints that make a broken grouping hard to express |
| **RLS** | Policies on the new table, consistent with the ones already on `gradebook_columns`. Nobody sees another course's groups, RLS is performant |
| **Backfill** | Runs against gradebooks that already exist and produces a grouping you can defend, with a stated policy for rows it can't classify |
| **The table** | Reads groups from your data. No slug splitting left at render time |
| **Band claim** | Stated in the PR, justified, and true. At Credit, an explicit written list of what you found and what the migration does about each case |
| **Testing** | What you ran it against, said out loud, including what you didn't cover |
| **Design writeup, part one** | Four questions answered against the design you actually built, with the trade named and what it cost |
| **Design writeup, part two** | A design proposal for the CS 2100 shape: the structure the column list can't express, what the display should do with it, and what that would cost |

### What strong looks like

A schema where a broken grouping is hard to write down, because the database is what says which group a column is in. A backfill with a named policy for the rows that don't fit, and you can point at the rows. You claimed Credit and the list has four entries, three found by reading and one found by running. In October, the ADR for the implementation the class uses cites your writeup by name.

### What weak looks like

A group table with no RLS on it. The string-splitting moved from TypeScript into Postgres' plpgsql and the problem moved with it. A Credit claim with no list. A list of things an agent guessed rather than things you demonstrated. Everything grouped correctly on seeded data and not one sentence about a course that might look different. A PR opened at 23:47 on Sep 24 described only as "implement column groups." A writeup that would describe any other submission equally well.

## Dates

| | |
|---|---|
| Assigned; project slate pitched | Wed Sep 9 |
| Local dev running: bring it to class | Thu Sep 10 |
| Architecture II: Supabase, RLS, student-data privacy | Mon Sep 14 |
| Ticket hunt due | Wed Sep 16, 23:59 |
| Reliably Releasing Software: safe migrations, rollback | Thu Sep 17 |
| Project bids due | Thu Sep 17, 23:59 |
| No class (Yom Kippur) | Mon Sep 21 |
| **Pull request due** | Thu Sep 24, 23:59 |
| Teams announced | Thu Sep 24 (in class) |
| Studio kickoff; target band assigned | Mon Sep 28 |
| Target band declared | Thu Oct 1 |

If local dev isn't running by **Mon Sep 14**, that's a setup problem rather than a design problem. Work through [Local Development](../local-dev.md), then ask in Discord or come to office hours. 