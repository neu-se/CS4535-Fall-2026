---
title: "Project Bids"
description: Due Sep 17. Ranked preferences, a case for your top two, and a project proposal if the slate doesn't fit
sidebar_position: 2
---

# Project Bids

**Assigned:** Wed Sep 9 · **Due:** Thu Sep 17, 23:59 · **Teams announced:** Thu Sep 24

## Overview

A semester is a long time to spend on a problem you don't care about. It's also long enough that a team formed around genuine interest pulls away from one formed by a spreadsheet, and the gap widens every week.

So we don't assign you. You tell us where your energy is, and we resolve the demand.

The bid is also the last cheap moment to change your mind. After Sep 24 you own an area, your teammates are planning around you being in it, and switching costs somebody else their semester.

## What You Hand In

A bid has four parts. It's about an hour's work if you've been paying attention during onboarding, and considerably longer if you haven't.

### 1. Ranked preferences

Rank **every project on [the slate](/#projects)** from most to least wanted. Not just your top three.

The bottom of your ranking matters more than you'd think. Projects you'd be actively unhappy on are more useful for us to know than one more project you'd enjoy, and the form asks about them in its own question, so name them there.

Rank honestly. We resolve by demand rather than by second-guessing, and there is no ordering trick that improves your odds. What misreporting reliably does is put a project you don't want somewhere we can legitimately place you on it.

### 2. A case for your top two

A paragraph each. We're reading for one thing: do you understand the problem, and have you touched it?

> *Weak:* "Office hours seems like an interesting product challenge and I'd love to work on the UX."

> *Strong:* "I used office hours a few times in CS 3100 last spring. The queue position estimate was wrong every single time, because it counts the people ahead of you but not how long each one is likely to take, so a queue of three can mean five minutes or fifty. I'd start by measuring actual time-to-resolution per help request and find out whether that estimate can be made honest before touching anything visual."

The second one isn't better because it's longer. It's better because it names a specific behavior, says why that behavior is wrong, and proposes a first step that could turn out to be a dead end.

### 3. Where your energy is

Not a job title, and not binding. Somewhere on this map:

- **Implementation:** you want to be in the code
- **Product:** you want to decide what gets built, on evidence
- **User research & design:** you want to talk to users and change what they experience
- **Ops & infrastructure:** you want the pipelines, the environments, the reliability
- **Coordination:** you want to hold the architecture and the seams between teams

Name a primary and a secondary. We use it to keep a team from being four of the same person. You should use it to be honest with yourself about what you'll still enjoy in week nine.

### 4. Evidence

Anything concrete that supports your case. A ticket you filed in the hunt. Something you noticed while getting local dev running. A specific thing that went wrong for you as a Pawtograder user, described precisely. A Discord answer that unstuck somebody. It doesn't have to be code. On Sep 17 nobody has shipped anything, and we're reading for whether you've looked.

A bid without evidence is still complete. A bid with one specific, checkable observation in it is easier to act on.

## Proposing a project that isn't on the slate

Teams are **3–4 people**, and **one team owns one project**. So the number of projects that run is set by the size of the room, and in a room this size that number is **three or four out of the seven on the slate.**

Say that plainly, because it changes how you should bid: most of the slate **will not run**. A project you rank first may simply not exist on Sep 24, and that's not a reflection on the project or on you. It means fewer than three people wanted it enough. This is why ranking all seven honestly matters more than making a case for one.

You can still propose something that isn't listed. Understand what you're asking, though: a proposal has to be better than a slate project that would otherwise have run, and it has to attract two or three other people who rank it highly. That's a real bar. Proposals do clear it, but it's a competition, not a gap to fill.

A proposal needs five things:

- The problem, stated as something that happens to somebody. A bad outcome, not a missing feature. "There's no bulk export" is a feature request. "Graders re-key the same twelve scores every week because there's no bulk export, and two of them have started keeping a private spreadsheet" is a problem.
- Who it affects, and roughly how many. "Students in intro courses" is a guess. "The students in CS 2000 who submit through the web UI rather than git" is a claim, and claims can be checked.
- Evidence it's real. An open issue, a forum thread, a measurement, a user you talked to. Your own frustration counts if you can describe it precisely enough for somebody else to reproduce.
- What shipped looks like by Nov 23. Feature freeze is a real date. If the honest answer is "a prototype behind a flag plus a written plan for January," write that. It beats an implausible answer, and we'll believe it more.
- Why it needs 3–4 people for the eight weeks between Sep 28 and feature freeze on Nov 23. Some genuinely good ideas are one PR. If yours is, say so, file it as a ticket, and bid on something else.

Proposals are due with your bid, and we'll tell you on Sep 24 whether yours is running. A proposal that doesn't run isn't wasted. Some become tickets, and the good ones have a way of turning up on next year's slate.

## How bids get resolved

Demand decides, and it resolves like this:

- A project needs **at least three people who ranked it highly** to run. Below that it doesn't, and its bidders go to their next choice. At this class size that floor will eliminate most of the slate, which is what it's for.
- A project with more than four gets the four whose bids and skill mix fit best. Everyone else moves down their list. This is the ordinary outcome for the popular projects, and it isn't a judgment about you.
- Skill mix inside a team beats individual preference. Four implementers with nobody who will talk to a user is a team that ships the wrong thing beautifully.
- You hear on **Thu Sep 24, in class.** Not before. We can't resolve any of it until the last bid is in.

Many of you will get your first or second choice, and more of you than usual will not, simply because there are seven projects and only three or four slots. If you land somewhere you didn't rank near the top, come to the first Monday clinic and say so. There is usually something to be done about it in week four and almost nothing to be done about it in week nine.

## AI Policy

Use an agent to read the slate, dig into the code behind a project you're considering, or check whether something you noticed is already filed. That's the same permission [the ticket hunt](./ticket-hunt.md) gives you, and this is a good week to spend it.

The two case paragraphs have to be yours. We're reading them for whether you've touched the problem, which is the one thing an agent can't do on your behalf, and a generated case comes back as a fluent restatement of the slate blurb we wrote ourselves. If your case comes from something you actually hit, say what you hit and the difference will be obvious.

## Submission

One **survey in Pawtograder**, open Wed Sep 9 and closing **Thu Sep 17, 23:59 ET**. It follows the four sections above: drag all seven projects into rank order, name any you'd be actively unhappy on, write the two paragraphs, pick a primary and a secondary energy, and attach evidence if you have it. Filling in the form takes about fifteen minutes. The thinking behind it takes about an hour.

If you're proposing a project that isn't on the slate, check the box at the end of the same survey and the five proposal questions appear.

## Grading Rubric

This one isn't banded, and no band requirement depends on it.

It's still required. If no bid arrives by Sep 17, you get placed wherever there's room once everyone who did bid is settled.

## Dates

| | |
|---|---|
| Slate pitched in class | Wed Sep 9 |
| Bids and project proposals due | Thu Sep 17, 23:59 |
| Teams and running projects announced | Thu Sep 24 (in class) |
| Studio phase begins: team charters | Mon Sep 28 |
