---
Status: superseded by LR-0002
---

# tc.canada.ca and mirrors are unreachable from this workspace's network

When asked to verify Lesson 0004's TP 1332 claims against the source PDF, every Transport Canada domain (`tc.canada.ca`, `www.tc.gc.ca`) was rejected at the network policy level, and every mirror tried (`laws-lois.justice.gc.ca`, `web.archive.org`, `scribd.com`) was also blocked or unsupported. This is a durable environment limitation, not a one-off fetch failure — future sessions in this workspace should not re-attempt fetching these domains and expect a different result; instead, ask the user to fetch/paste the primary text, or verify it outside this session.

## Implications
- Any future lesson that cites a Transport Canada / Justice Canada primary source should be flagged the same way Lesson 0004 was: clearly marked as search-summary-derived unless the user supplies the primary text directly.
- Of the two TP 1332-related claims checked: the ABYC-alternative policy (title, effective date Oct 30 2019, Table 1/2 structure) has two independent corroborating search results and is reasonably solid; the flame-retardant-resin-in-engine-space claim has only one and remains explicitly unverified in RESOURCES.md and Lesson 0004.
