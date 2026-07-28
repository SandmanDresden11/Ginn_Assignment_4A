#!/usr/bin/env python3
"""
Negotiation-Prep Briefing Generator
------------------------------------
Fictional classroom tool (Stage 2). Reads the fixed Stage 1 data source
(salesforce_marriott_negotiation_packet.json) and, given a few situational
inputs about an upcoming meeting, renders a short pre-meeting briefing.

Design rule (see Stage 2 GRASP brief, "Autonomy limits"):
  This tool NEVER invents content. Every fact, price, or quote in the
  rendered briefing must already exist in the packet JSON. Runtime inputs
  (who you're meeting, what the focus is, free-text notes) are rendered
  as labeled situational context, never merged into "confirmed" facts.

Usage (non-interactive, for scripting/testing):
    python3 negotiation_prep_briefing_generator.py \
        --packet salesforce_marriott_negotiation_packet.json \
        --meeting-with "Rachel Kim" \
        --focus pricing \
        --notes "Follow-up call after the May email thread" \
        --out briefing_pricing.md

Usage (interactive):
    python3 negotiation_prep_briefing_generator.py
    (prompts for meeting_with / focus / notes, then writes and prints the briefing)

Valid --focus values: pricing, seats, ai_einstein, sandboxes, deadline,
competitive, general (default: general)
"""

import argparse
import json
import sys
from datetime import datetime, timezone

VALID_FOCUS = ["pricing", "seats", "ai_einstein", "sandboxes", "deadline", "competitive", "general"]

FOCUS_KEYWORDS = {
    "pricing": ["price", "pricing", "discount", "usd", "cost", "acv", "annual", "$"],
    "seats": ["seat", "user", "true-up", "true up", "license", "licensed"],
    "ai_einstein": ["ai", "einstein", "bundl"],
    "sandboxes": ["sandbox"],
    "deadline": ["deadline", "december", "january", "2027-01", "2026-12", "fiscal", "finaliz"],
    "competitive": ["competitor", "competitive", "benchmark", "displacement", "vendor"],
}

# Which minimum_limits sub-sections are relevant to which focus values.
# "always" sections render regardless of focus (critical guardrails).
LIMITS_FOCUS_MAP = {
    "pricing_positions_usd_annual_3yr_term": ["pricing"],
    "term_length_adjustments": ["pricing", "deadline"],
    "seat_floor": ["seats"],
    "discount_limits": ["pricing"],
    "ai_einstein_limits": ["ai_einstein"],
    "sandbox_limits": ["sandboxes"],
    "estimated_customer_budget_ceiling_usd_annual": ["pricing", "competitive"],
    "walkaway_guidance": ["always"],
}


def load_packet(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def matches_focus(item, focus):
    """Return True if a JSON item's text content is relevant to the selected focus.
    focus == 'general' always matches (a general briefing surfaces everything)."""
    if focus == "general":
        return True
    text = json.dumps(item).lower()
    return any(kw in text for kw in FOCUS_KEYWORDS.get(focus, []))


def fmt_source(src):
    if src is None:
        return "no source (flagged gap)"
    if isinstance(src, list):
        return ", ".join(src)
    return str(src)


def render_confirmed_inferred_block(section, focus, title):
    """Render a {'confirmed': [...], 'inferred': [...]} style section, filtered by focus."""
    lines = [f"### {title}"]
    confirmed = section.get("confirmed", [])
    inferred = section.get("inferred", [])

    # confirmed may be a list of dicts, or a dict of scalar fact-objects
    conf_items = confirmed if isinstance(confirmed, list) else list(confirmed.values())
    conf_shown = [i for i in conf_items if matches_focus(i, focus)]
    if conf_shown:
        lines.append("**Confirmed:**")
        for i in conf_shown:
            stmt = i.get("statement") or i.get("value") or i.get("name") or json.dumps(i)
            src = fmt_source(i.get("source"))
            lines.append(f"- {stmt} _(source: {src})_")

    inf_shown = [i for i in inferred if matches_focus(i, focus)]
    if inf_shown:
        lines.append("**Inferred (not confirmed):**")
        for i in inf_shown:
            stmt = i.get("statement", "")
            conf = i.get("confidence", "unknown")
            ev = i.get("evidence", "")
            src = fmt_source(i.get("source"))
            lines.append(f"- {stmt} — **confidence: {conf}**. Evidence: {ev} _(source: {src})_")

    if not conf_shown and not inf_shown:
        lines.append("_No items in this section match the selected focus._")
    return "\n".join(lines)


def render_list_block(items, focus, title, text_key_candidates=("statement", "question", "request")):
    lines = [f"### {title}"]
    shown = [i for i in items if matches_focus(i, focus)]
    if not shown:
        lines.append("_No items in this section match the selected focus._")
        return "\n".join(lines)
    for i in shown:
        text = None
        for k in text_key_candidates:
            if k in i:
                text = i[k]
                break
        if text is None:
            text = json.dumps(i)
        extra = []
        if "confidence" in i:
            extra.append(f"confidence: {i['confidence']}")
        if "status" in i:
            extra.append(f"status: {i['status']}")
        src = fmt_source(i.get("source"))
        extra_str = f" ({'; '.join(extra)})" if extra else ""
        lines.append(f"- {text}{extra_str} _(source: {src})_")
    return "\n".join(lines)


def render_minimum_limits(ml, focus):
    lines = ["### Salesforce Internal Limits (Deal Desk)"]
    for key, val in ml.items():
        if key == "note":
            continue
        tags = LIMITS_FOCUS_MAP.get(key, [])
        if focus != "general" and "always" not in tags and focus not in tags:
            continue
        lines.append(f"**{key.replace('_', ' ')}:**")
        lines.append(f"```\n{json.dumps(val, indent=2)}\n```")
    if len(lines) == 1:
        lines.append("_No limits sub-sections match the selected focus._")
    return "\n".join(lines)


def render_conflicts(conflicts, focus):
    """Always shows conflicts relevant to the focus in full, AND always includes a
    pointer to the complete conflict log — per Stage 2 autonomy limits, a focus
    filter must never make the rest of the conflict log invisible."""
    lines = ["### Conflicting Information (unresolved — do not silently pick a value)"]
    relevant = [c for c in conflicts if matches_focus(c, focus)]
    if relevant:
        for c in relevant:
            lines.append(f"- **{c['id']} — {c['topic']}**")
            for cv in c["conflicting_values"]:
                lines.append(f"    - {cv['value']} _(source: {cv['source']})_")
            lines.append(f"    - Status: {c['resolution_status']}. {c.get('note', '')}")
    else:
        lines.append("_No conflicts directly tied to this focus area._")

    all_ids = ", ".join(c["id"] for c in conflicts)
    shown_ids = ", ".join(c["id"] for c in relevant)
    lines.append(
        f"_(Full conflict log has {len(conflicts)} entries: {all_ids}. "
        f"Shown above for this focus: {shown_ids or 'none'}. "
        f"Review the full packet's `conflicts` array before treating any figure above as settled.)_"
    )
    return "\n".join(lines)


def render_stakeholders(stakeholders, meeting_with):
    lines = ["### Stakeholders in the Room"]
    names_requested = [n.strip().lower() for n in meeting_with.split(",") if n.strip()]
    matched_any = False
    for s in stakeholders.get("confirmed", []):
        name = (s.get("name") or "").lower()
        if any(nr in name or name in nr for nr in names_requested if name):
            matched_any = True
            title = s.get("title")
            if isinstance(title, dict):
                title_str = " / ".join(v["value"] for v in title.get("values", []))
                title_str += " (title is CONFLICTING — see conflicts log)"
            else:
                title_str = title
            lines.append(f"- **{s['name']}** ({s['organization']}) — {title_str}. {s.get('role_in_negotiation', '')}")
    if not matched_any:
        lines.append(f"_No stakeholder in the packet matched \"{meeting_with}\" by name. Proceeding with a general briefing; verify who is actually attending before the meeting._")
    return "\n".join(lines)


def build_briefing(packet, meeting_with, focus, notes):
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    parts = []
    parts.append(f"# Negotiation Prep Briefing — Salesforce–Marriott Renewal (Fictional)")
    parts.append(f"**Generated:** {now}  \n**Meeting with:** {meeting_with}  \n**Focus:** {focus}")
    if notes:
        parts.append(f"**Session notes (user-entered, not a packet fact):** {notes}")
    parts.append("\n> " + packet["classroom_use_disclaimer"]["statement"])

    ao = packet["account_overview"]
    parts.append("\n## Account Snapshot")
    parts.append(
        f"- Account: {ao['account_name']['value']} ({ao['industry']['value']}) — "
        f"ID {ao['account_id']['value']}, tier {ao['account_tier']['value']}\n"
        f"- Product line: {ao['product_line']['value']}\n"
        f"- Salesforce owner: {ao['salesforce_account_owner']['value']}\n"
        f"- Official renewal target date (per CRM): {ao['official_renewal_target_date']['value']} "
        f"_(see conflicts log — a later email states a different internal deadline)_"
    )

    parts.append("\n" + render_stakeholders(packet["stakeholders"], meeting_with))

    cc = packet["current_contract"]
    parts.append("\n### Current Contract Terms (relevant to focus)")
    cc_items = [{"label": k, **v} if isinstance(v, dict) else {"label": k, "value": v} for k, v in cc.items()]
    cc_shown = [i for i in cc_items if matches_focus(i, focus)]
    if cc_shown:
        for i in cc_shown:
            parts.append(f"- {i['label'].replace('_', ' ')}: {i.get('value')} _(source: {fmt_source(i.get('source'))})_"
                          + (f" — {i['note']}" if i.get("note") else ""))
    else:
        parts.append("_No current-contract fields match the selected focus._")

    rt = packet["requested_terms"]
    parts.append("\n" + render_list_block(rt.get("confirmed", []), focus, "Marriott's Requested Terms"))

    parts.append("\n" + render_minimum_limits(packet["minimum_limits"], focus))

    parts.append("\n" + render_confirmed_inferred_block(packet["marriott_interests"], focus, "Marriott's Interests"))
    parts.append("\n" + render_confirmed_inferred_block(packet["salesforce_interests"], focus, "Salesforce's Interests"))
    parts.append("\n" + render_confirmed_inferred_block(packet["salesforce_objectives"], focus, "Salesforce's Objectives"))

    lev = packet["leverage"]
    parts.append("\n" + render_list_block(lev["marriott_leverage"], focus, "Marriott's Leverage"))
    parts.append("\n" + render_list_block(lev["salesforce_leverage"], focus, "Salesforce's Leverage"))

    conc = packet["concessions"]
    parts.append("\n" + render_list_block(conc.get("confirmed_available_concessions", []), focus, "Available Concessions (confirmed, Deal-Desk-backed)"))
    parts.append("\n" + render_list_block(conc.get("inferred_possible_concessions", []), focus, "Possible Concessions (speculative)"))

    parts.append("\n" + render_list_block(packet["likely_objections"], focus, "Likely Objections"))
    parts.append("\n" + render_list_block(packet["unresolved_questions"], focus, "Unresolved Questions"))

    parts.append("\n" + render_conflicts(packet["conflicts"], focus))

    parts.append("\n### Full Source List")
    for s in packet["source_references"]:
        parts.append(f"- `{s['file']}` — {s['description']}")

    parts.append("\n---\n_This briefing is generated entirely from salesforce_marriott_negotiation_packet.json. "
                  "It does not recommend which offer to make or accept — that decision is the account executive's."
                  " Fictional classroom exercise; not real Salesforce or Marriott information._")

    return "\n".join(parts)


def main():
    parser = argparse.ArgumentParser(description="Generate a negotiation-prep briefing from the Stage 1 packet.")
    parser.add_argument("--packet", default="salesforce_marriott_negotiation_packet.json")
    parser.add_argument("--meeting-with", default=None)
    parser.add_argument("--focus", default=None, choices=VALID_FOCUS)
    parser.add_argument("--notes", default="")
    parser.add_argument("--out", default=None, help="Output markdown file path")
    args = parser.parse_args()

    interactive = args.meeting_with is None and args.focus is None

    if interactive:
        print("Negotiation Prep Briefing Generator (interactive mode)")
        meeting_with = input("Who are you meeting with today? (e.g. 'Rachel Kim'): ").strip() or "Unspecified"
        print(f"Valid focus values: {', '.join(VALID_FOCUS)}")
        focus = input("Focus area [general]: ").strip() or "general"
        if focus not in VALID_FOCUS:
            print(f"Unrecognized focus '{focus}', defaulting to 'general'.")
            focus = "general"
        notes = input("Any session notes to include (optional): ").strip()
    else:
        meeting_with = args.meeting_with or "Unspecified"
        focus = args.focus or "general"
        notes = args.notes

    try:
        packet = load_packet(args.packet)
    except FileNotFoundError:
        print(f"ERROR: packet file not found: {args.packet}", file=sys.stderr)
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"ERROR: packet file is not valid JSON: {e}", file=sys.stderr)
        sys.exit(1)

    briefing = build_briefing(packet, meeting_with, focus, notes)

    if args.out:
        with open(args.out, "w", encoding="utf-8") as f:
            f.write(briefing)
        print(f"Briefing written to {args.out}\n")

    print(briefing)


if __name__ == "__main__":
    main()
