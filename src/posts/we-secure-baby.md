---
title: We Secure, Baby!
date: '2017-05-18'
description: Wherein I discuss implementing SSL/HTTPS security for my blog using Let's Encrypt and CertBot, achieving an A grade on SSL Labs, and setting up automatic certificate renewal.
categories:
  - ssl
  - https
  - lets encrypt
  - certbot
  - security
  - nginx
  - deployment
  - web development
published: true
---

I played with [Let's Encrypt](https://letsencrypt.org/) and eventually got it working, as well as all the correct
redirects and whatnot. I am happy to say that my [SSLLabs score](https://letsencrypt.org/) is a solid **A**. This was
actually quite a bit easier than I had originally anticipated. The [CertBot](https://certbot.eff.org/) application
provided by EFF was extremely intuitive, and after setting up the certificates (and a `cron` job to acquire new
certificates twice a day... which seems aggressive, but it was recommended) the `nginx` configuration was relatively
straight-forward.

Now that the bookkeeping (one of my favorite words in the English language as it has three consecutive double-letters)
is done, I can focus on improving some of the functionality and aesthetics of this lil' blog. I think my next item in
the `TODO` list is the create a more robust user profile set of settings (no registration yet, but it would be nice to
change some of my things a bit).
