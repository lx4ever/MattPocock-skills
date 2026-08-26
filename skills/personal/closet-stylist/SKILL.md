---
name: closet-stylist
description: Manage a personal closet in Notion — ingest closet item and outfit inspiration photos with AI tagging, generate outfit match boards against saved inspirations, and produce AI try-on images using a reference photo. Use when the user wants to add closet items, add outfit inspiration, find outfit matches, or try on an outfit.
---

# Closet Stylist

Personal wardrobe assistant backed by four Notion databases. Tags photos on the way in, matches by tags before by vision, and only generates an actual try-on image when explicitly asked.

## Notion databases

All four live under the existing "closet" page (`9c17a51c-1360-82aa-8a00-01cbb46fd66c`, under Mimi's Space → life planner → self care). "Closet Items" is the pre-existing "fashion" database, extended with the properties this skill needs — it keeps its original `Tags` property alongside the new ones. The other three were created fresh. That page also still holds an unrelated "for sale" database (resale listings) — leave that alone.

- Closet Items (data source): `3217a51c-1360-8380-976a-07b2906f1212`
- Outfit Inspirations (data source): `1db68eaf-1bd9-4fd9-b9d7-110f0c0a7ecf`
- Wear Log (data source): `207f3c4e-a57b-4ae7-aca5-0596ccbd634d`
- Profile (data source): `49a89005-d2fa-43fb-8b75-7f86714035d6`

### Schemas (already created — reference only)

**Closet Items** — `Name` (title), `Photo` (files), `Category` (select: Top/Bottom/Dress/Outerwear/Shoes/Bag/Accessory), `Color` (multi-select), `Pattern` (select: Solid/Striped/Floral/Plaid/Print/Other), `Formality` (select: Casual/Smart Casual/Business/Formal/Athletic), `Season` (multi-select: Spring/Summer/Fall/Winter/All-season), `Fit` (select: Fitted/Regular/Relaxed/Oversized), `Times Worn` (number), `Last Worn` (date), `Notes` (text), plus the original `Tags` (multi-select, unused by this skill).

**Outfit Inspirations** — `Name` (title), `Photo` (files), `Style` (multi-select: Minimalist/Streetwear/Boho/Preppy/Classic/Edgy), `Color` (multi-select, same options as Closet Items), `Formality` (select, same options as Closet Items), `Season` (multi-select, same options as Closet Items), `Source` (url), `Notes` (text).

**Wear Log** — `Name` (title), `Date` (date), `Items` (relation → Closet Items, multi), `Inspiration` (relation → Outfit Inspirations), `Notes` (text).

**Profile** — `Name` (title), `Reference Photo` (files) — one or more full-body photos of the user, `Body Notes` (text) — free-text shape/fit notes, e.g. "large bust, narrow waist, slightly full calves".

If any of these IDs stop resolving (e.g. a database was recreated), search Notion for the page/database by name and update the ID here.

## Adding closet items

Trigger: user uploads photo(s) and says something like "add these to my closet."

1. Process in batches of 20-30 images per pass (context limits). For the initial backlog, run multiple passes back to back rather than trying to do everything in one.
2. For each photo, look at the item and propose: `Name`, `Category`, `Color`, `Pattern`, `Formality`, `Season`, `Fit`. Present the whole batch as one list for the user to correct, rather than confirming item-by-item.
3. Write each confirmed item to the Closet Items database (photo + tags) via the Notion MCP tools.

## Adding outfit inspiration

Trigger: user uploads photo(s) and says something like "save this as inspiration" or "add these to my inspiration board."

Same batching and confirmation flow as closet items, but tag `Style`, `Color`, `Formality`, `Season` and write to the Outfit Inspirations database.

## Getting outfit matches

Trigger: user references a saved inspiration (or uploads a new one) and asks for a match, e.g. "what in my closet matches this?"

1. Read the inspiration's tags (`Style`, `Color`, `Formality`, `Season`). Query Closet Items for candidates whose tags plausibly fit — matching formality and season, overlapping color/style. This shortlist is a filter, not the final answer.
2. Look at the shortlisted photos against the inspiration photo and rank the best 3-5 combinations (e.g. top + bottom + shoe options), reasoning about silhouette, color harmony, and formality — not just tag overlap.
3. Read the Profile's `Body Notes`. For each ranked combination, add a short fit note only where the body notes are actually relevant to that specific garment (e.g. flag a fitted top against a "large bust" note) — don't manufacture a note where there's nothing useful to say, and never use body notes to silently exclude an option.
4. Present the ranked match board as an HTML Artifact: the inspiration photo alongside each candidate combination's item photos, with fit notes. **Do not generate a try-on image at this step** — that only happens on explicit request (see below).

## Generating a try-on image

Trigger: user picks one of the presented match-board combinations, e.g. "try on #2."

1. Confirm the exact items in the chosen combination.
2. Run `scripts/generate_tryon.py` with the Profile's reference photo and the chosen item photos (see the script's `--help` for arguments). Requires `GEMINI_API_KEY` in the environment.
3. Show the generated image to the user.
4. Ask if they want to log this as worn today. If yes, create a Wear Log entry (`Date` = today, `Items` = the chosen items, `Inspiration` = the source inspiration if any) and bump `Times Worn` / update `Last Worn` on each item in Closet Items.

## Notes

- Never use Body Notes to filter or hide closet items — they're for advisory fit commentary only, and the user knows their own body better than a heuristic does.
- Try-on generation costs roughly $0.039/image (Gemini 2.5 Flash Image, standard resolution). Only run it when explicitly requested — never speculatively for every match-board candidate.
