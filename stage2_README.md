# Stage 2 — Negotiation-Prep Briefing Generator

## What this is

`negotiation_prep_briefing_generator.py` is a standalone Python 3 script (standard library only — no installs needed). It reads `salesforce_marriott_negotiation_packet.json` (Stage 1 output) and, given a few inputs about an upcoming meeting, renders a short Markdown briefing.

## Running it

Interactive:
```
python3 negotiation_prep_briefing_generator.py
```
Prompts for who you're meeting with, a focus area, and optional notes, then prints and can save the briefing.

Non-interactive (for scripting or repeatable runs):
```
python3 negotiation_prep_briefing_generator.py \
  --packet salesforce_marriott_negotiation_packet.json \
  --meeting-with "Rachel Kim" \
  --focus pricing \
  --notes "Follow-up call after the May email thread" \
  --out briefing_pricing.md
```

Valid `--focus` values: `pricing`, `seats`, `ai_einstein`, `sandboxes`, `deadline`, `competitive`, `general` (default).

## Sample outputs included (test evidence for the Stage 2 GRASP brief's Proof section)

| File | Meeting with | Focus | What it checks |
|---|---|---|---|
| `briefing_sample_rachel_pricing.md` | Rachel Kim | pricing | Stakeholder title-conflict flag renders; price fields match packet exactly; C-2 conflict surfaces |
| `briefing_sample_devon_seats.md` | Devon Osei | seats | Correct stakeholder match on a different name/title; seat-floor limits render |
| `briefing_sample_deadline.md` | Rachel Kim, Devon Osei | deadline | C-3 (deadline conflict) surfaces in full under a directly relevant focus |
| `briefing_sample_general.md` | CFO's office | general | Unmatched-by-name stakeholder (present in packet as a role, not a name) still produces a full, non-crashing briefing |
| `briefing_sample_ai.md` | Unknown Person | ai_einstein | Attendee not in the packet at all — confirms the tool warns rather than fabricating a stakeholder |

All five runs were verified to: exit cleanly (code 0), contain the classroom-use disclaimer verbatim, contain the "full conflict log" pointer (even when the focus area has zero directly-relevant conflicts), and match at least 5-7 spot-checked numeric/text fields exactly against `salesforce_marriott_negotiation_packet.json`.

## Known limitation

This is a template renderer, not a negotiation strategist. It never decides which offer to make or accept, and it will only ever say what's already in the JSON packet. If the packet is wrong or incomplete, the briefing will be too — the tool is only as good as Stage 1.

## Web version (index.html)

`index.html` and `negotiation_briefing_logic.js` are a browser-based version of the same tool — same filtering logic, same source citations, same disclaimer, styled as a polished single page instead of Markdown output. `negotiation_briefing_logic.js` is a pure, dependency-free JS port of the CLI's rendering logic (`buildBriefingModel` / `renderMarkdown`), tested independently via Node against the same 5 scenarios used to test the CLI (see "Sample outputs" above) before being wired into the page. The packet JSON is embedded directly inside `index.html` at build time, so the page has no external data dependency and no CORS issues when opened locally.

**Run it locally:** just double-click `index.html`, or open it in any browser. No server, no install, no dependencies.

**Host it as a real website (GitHub Pages, free):**
1. Push `index.html` and `negotiation_briefing_logic.js` to the root of your GitHub repo (same repo as the rest of the Stage 1/2 deliverables works fine).
2. On GitHub, go to the repo's **Settings → Pages**.
3. Under "Build and deployment," set Source to **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
4. GitHub gives you a live URL, typically `https://<username>.github.io/<repo-name>/`, ready in a minute or two.

**If the packet changes:** `index.html` has the packet JSON embedded as a static snapshot (inside a `<script id="packet-data" type="application/json">` tag), so editing `salesforce_marriott_negotiation_packet.json` alone won't update the website — re-embed it by replacing the contents of that script tag with the new JSON, or ask me to regenerate the file.
