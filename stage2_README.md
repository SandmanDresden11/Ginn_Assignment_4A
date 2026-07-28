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
