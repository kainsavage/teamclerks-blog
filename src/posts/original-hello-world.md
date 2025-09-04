---
title: Hello, World!
date: '2017-05-17'
description: Wherein I introduce my first blog built with ReactJS and Gemini, and discuss the initial setup and future plans.
categories:
  - welcome
  - reactjs
  - gemini
  - nginx
  - web development
  - first post
  - setup
published: true
---

This is the first post of my blog.

I built this blog using `ReactJS` as my front-end and `Gemini` as my back-end. Technically, `nginx` is serving all the
requests though `api.teamclerks.net` is proxied to a localhost route that is behind the firewall to hit the `Resin`
instance servicing the `Gemini` application.

As you can see, this site is extremely unfurnished, and I hope to improve that situation moving forward. For now, I am
content having this set up as such, and I will begin working on transitioning the entire site over to `HTTPS` via
`Let's Encrypt` tomorrow.
