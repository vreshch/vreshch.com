---
title: 'My Vibecoded Server Went Down'
subtitle: 'An AI wrote the app in six weeks and the app was fine. Everything that broke was around the code.'
description: 'An AI-built directory took five production sites down for sixteen hours. The generated code was fine. The certificate default and the CPU cap were not.'
date: '2026-08-18'
publishAt: '2026-08-18T14:08:00Z'
category: coding
cover: images/cover.png
ogImage: images/cover.png
readingTime: '10 min read'
mediumUrl: 'https://medium.com/@vreshch/5e5be97f44cd'
tags:
  - programming
  - vibe-coding
  - devops
  - web-performance
  - developer-tools
---

**[Read on Medium →](https://medium.com/@vreshch/5e5be97f44cd)**

On August 3, every site I run went down at once, came back twelve minutes later, and did it again.
About twenty-one times, over sixteen hours. What knocked them over was the least important thing I
own: a public directory I built in six weeks of prompting, 203 commits, almost none of them typed by
hand.

The generated code was never the problem. Twenty-seven requests a second took down five production
sites, and the bug was a certificate key type I never chose, sitting behind a CPU limit I wrote into
my own notes months earlier and never reopened. Everything that failed sat around the code, in the
defaults I never opened.

## The five rules

1. **Isolate first, and keep the parts small.** Anything public and unpredictable gets its own
   machine before it gets traffic. A second box was a rounding error on the monthly bill. Sixteen
   hours of five domains down was not.
2. **Decide the defaults you inherited.** The one most dangerous to skip. A generated app arrives
   with a certificate key type, a CPU ceiling, a cache with no eviction policy and a placement, none
   of which anybody chose. They are still your production decisions.
3. **Make the thing cheap before you try to make the traffic small.** An index that carries its own
   sort order and a cached render bought more headroom than a day of throttles, and they keep working
   when the throttles get bypassed.
4. **Buy observability before you need it.** Alarm on saturation rather than on errors. My outage
   produced no errors at all: the proxy stopped accepting connections, so there was nothing to log.
5. **Treat every interface you publish as a contract.** robots.txt, the filter URL space, the apex
   redirect, the certificate key type. Every failure in this story is one I shipped without reading
   it back.

> _A default you never chose is still a decision you shipped._

I did not block a single crawler. 99.6% of the requests to my public pages were machines, and a
directory that blocks crawlers is a directory nobody finds. What shipped was a contract instead of a
wall: six filter parameters disallowed in robots.txt, ten AI crawlers named and allowed by name, and
one cap on how many renders may run at once.

**[Read on Medium →](https://medium.com/@vreshch/5e5be97f44cd)**

---

Related: [catalog.agentage.io](https://catalog.agentage.io/mcp) - the directory that fell over, now on
its own box · [agentage.io](https://agentage.io) - the memory product that was sharing the machine
with it · [@vreshch on GitHub](https://github.com/vreshch).
