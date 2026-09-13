# WebFetch cannot reach any external domain from this workspace's network — confirmed blanket, not TC-specific

Supersedes LR-0001, which suspected a Transport-Canada-specific block. Testing this session confirmed it's broader: `en.wikipedia.org`, `westsystem.com`, `soundingsonline.com`, and `www.marinadockage.com` all failed identically to `tc.canada.ca`. This is a network-policy-level restriction on outbound WebFetch entirely, not something tied to government or any particular domain.

## Implications
- Stop testing whether "this specific domain" is reachable — it won't be. WebSearch (which apparently uses a different backend) remains the only way to pull external information in this workspace, and it returns search-engine summaries, never full primary-source text.
- Every claim in this workspace sourced from an external page is therefore summary-derived, never a direct primary-source read. Corroboration strength (how many independent search results support a claim) is the only proxy for confidence available here, and every lesson citing an external source should keep saying so explicitly, per the pattern established in Lessons 0004 and 0005.
- If a user wants a claim verified against real primary text, the actual fix is: they fetch/paste it themselves, or a session with working web access does it — not another attempt from here.
