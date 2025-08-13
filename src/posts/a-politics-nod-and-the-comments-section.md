---
title: A Politics Nod and The Comments Section
description: Wherein I discuss how I think the Comments Section will play out
date: '2024-02-26'
hero: a-politics-nod-and-the-comments-section.webp
bluesky_post_id: 3kmdqr5tx522c
categories:
  - comments
  - social media
  - twitter
  - bluesky
  - politics
  - protest
published: true
---

Understand that the subject matter at the start of this post is graphic. Consider this a trigger warning - I have decided not to link to external sources; search the internet at your own risk.

I was going going to write about politics. I had outlined what I wanted to say and what I wanted to share in my head, but then I identified a sticking point. See, I wanted to talk about Aaron Bushnell and his political protest, and I wanted to share his image. You probably read the introductory warning - I decided I needed a content filter for people to opt into. It was a self-imposed trap, and an obvious one. I thought about a simple approach where I just have an `onClick` handler, I thought about adding a confirmation modal that the reader would have to purposefully agree to. Ultimately, I decided to skip the pothole, write a bit about it, include a warning, and move on to write about something else.

The last thing I am going to say on the matter in this post is this: Aaron Bushnell believed he lived in a world where everyone is more comfortable ignoring suffering and death from needless war than confronting that ugly truth and doing something about it.

---

Let's talk about some tech stuff. I have never included a comments section in my blog build-outs, but it has always been a piece of Blog History. Every prominent blog has had a comments section below the article where the community can engage with the author, the publisher sometimes, and more often than not each other. In fact, I feel like the comments section has always been the crucible for what eventually became Social Media (I hate this term, but you immediately know what I'm talking about). The early implementations tried everything: anonymous comments, self-signed, login-required, 3rd party login, etc. I believe most modern systems have basically relegated themselves to requiring authentication to post a reply, but this is just a microcosm of any pillar of Social Media: echo chambers.

There were points where I would have said Twitter was a decent place for people to share ideas, find news and stories, and generally comment on the information around them. The available voices were varied, diverse, and myriad. However, Twitter was still an echo chamber most of the time. If I posted some opinion, I would get comments from mainly followers who, by virtue of following me, mostly agreed. Rarely, someone who did not follow me would add a comment, and a dog-pile would ensue.

Twitter is now in its last stages of _Fall of the Western Roman Empire_, which is a shame. I am hoping that BlueSky can provide more in community building, information sharing, and debate. So, my plan is relatively simple to start: publish my blog post, link it on my BlueSky account, and treat that post as the comment section. I might be able to do more; I have not read the AT Protocol documentation yet, but I may be able to leverage that to actually gather and render those comments into a section on each post. I think that would be kind of neat.

Moderation becomes a bit of a concern with this model - how do I handle bad faith actors who are only trying to make noise? I suppose I could build out a squelch list for each post that I could edit as needed. By default, I assume, the AT Protocol would allow me to get an ordered list of comments to the thread, then I could hide by id. Obviously, in the actual thread on BlueSky all replies would remain; I would simply be cherry-picking comments to display on each post. Oh well, the experiment continues.

[Come and leave a comment on BlueSky!](https://bsky.app/profile/teamclerks.net/post/3kmdqr5tx522c)
