---
path: "/github-is-starting-to-impress-me"
date: "2017-07-05"
title: "Github is Starting to Impress Me"
author: "kain"
---

### Preface

I have never been a fan of Agile. I realize that this is a can of worms and there are as many opinions as there are stars in the sky, but please allow me to at least provide some reasoning. First, there is the high-level Agile opinions and then there are people who practice Agile, and these two things are **very** often at odds with one another. Second, Agile fits one type of project and people who practice Agile **very** often treat Agile as their hammer, and that causes all projects to look like nails. Third, people who practice Agile **very** often assume that everyone else also sees the programming world from their vantage. Fourth, people who practice Agile **very** often estimate using 'story points' which **very** often do not translate to actual developer hours.

Let me tackle that second statement first. There are TONS of types of projects which do not benefit the Agile practices, and there is really only **one** type of project that does (though, the definition is broad): the long-lived project long-lived developers with "infinite" budget. Practitioners of Agile will be quick to tell me that the methodology works on short projects or projects where members are dropped/replaced often, but that has never been my experience in either case. First, short-lived projects usually mean that they have an end date; some tangible stop that needs to be met. That is, "after XDate, we will no longer work on this project," and that usually scares Agilers (I am just going to use this... it reads annoyingly to me, but I cannot keep typing 'Agile Practitioners' and the like) because of the fourth reason listed above.

Which brings me to point #4. Agilers are reluctant to put an actual estimate of time to a task because Agilers are **very** often not experienced at estimating work in terms of hours and therefore very bad at it. Additionally, though this is simply my experience, the person(s) leading the team are very often not developers themselves, and as such truly have no idea how to estimate work in terms of hours. In the **few** projects wherein the project lead **was** a developer, they often had enough experience and understanding of the entire project to be able to come up with tangible estimates in terms of hours, but very often were inexperienced in doing so and therefore grossly underestimated the work required.

I have no segue (I have never typed this word correctly before today) for this, but the first and second issues listed above are basically the first and last problems. Agilers are so sure that everyone added to the team is also an Agiler that all knowledge required to get up to speed on the project is taken as given. For example, Agilers almost **always** assume that everyone knows the following:

1. Documentation is on Confluence/ReadTheDocs/etc
2. Github houses the code
3. Issues are in Jira
4. Discussions are either in-person or on Slack/Skype/etc

I, personally, cannot stand having this many services involved in any one project. One project should have one source of truth, right? Why on earth would I update some documentation service that does not live with the project? Why are tasks captured in Jira AND (or AND NOT) in Github? Why would design discussions happen anywhere but the issues to which they belong?

### Actual Blog Post

Github has answered basically all my problems with the separation of concerns in a single project.

I have long been a proponent of "we should only have **one** issue list" and I usually follow that up with "and it should live alongside the code." Github has provided this since inception, which is a good thing; the issue list can be curated by the developers/managers on the team and all discussions can occur there and capture a living history. Great; done... Jira is gone forever and the "everyone knows everyone uses Jira for issues (and maybe in addition to mirrored issues on Github)" taken-as-given can get lost. This covers my complaints #2/3/4 very nicely, and actually has been available for a long time. Addressing #1 is pretty easy as Github has had Wiki pages for the repository as well as `README.md` support as well.

Enter the problem, project leads are **often** (in my experience) not technical folk; they want some way to gather data about the performance of the team and the schedule of the project. This is where Jira shines - you get a kanban, you get milestones, you get a burndown, you get tracking of task position (in progress, todo, etc), and Jira does this in a pretty way that until recently Github did not provide.

Recently (I believe), Github added a view called `Projects` to every repository. `Projects` is basically a kanban on steroids. I can create a `Project`, create a bunch of columns on the board, and organize/manage the project. However, where this really shines is in the fact that it completely integrates with everything I already get from Github - issue tracker, pull request tracker, documentation, releases, etc. I can create a `Project` in the traditional Agile way called "Sprint 12," set and end-date for it, triage all untriaged issues into the correct columns, view activity in the `Project` (who did what and when), filter as needed, and so on and so on.

Okay, so Github naturally answers all the questions from above **and** solves the problem the managers created.
