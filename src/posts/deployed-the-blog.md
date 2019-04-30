---
path: "/deployed-the-blog"
date: "2019-04-30"
title: "Deployed the Blog"
---

Because Gatsby builds into a fully static site, my needs have changed. I no longer need an actual running instance to serve the site anymore. Instead, I elected to serve my site directly via `S3`.

However, I still wanted to support SSL/TLS, which meant that I had to use CloudFront and a certificate issued through AWS as well. That turned into a big hassle to move the TeamClerks.net domain control from my [previous provider](http://beyonddomains.net) to [Route53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/Welcome.html).

Next, I had to set up a certificate (and for [reasons] it has to be on N. Virginia to work with CloudFront... something that took me a while to figure out). Next, I had to set up CloudFront to use that certificate and point to the S3 bucket as its source, but not in the way that CloudFront recommends (another thing that took me a while; for [reasons] you have to specify the S3 public URL rather than naming the bucket for proper handling in the app like 300/301/404/etc).

Okay, well... we are back up on TeamClerks.net with the latest Gatsby build and deployed fully in AWS, except now I am saving \$11/mo - woo!
