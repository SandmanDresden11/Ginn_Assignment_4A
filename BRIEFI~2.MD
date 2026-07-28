# Negotiation Prep Briefing — Salesforce–Marriott Renewal (Fictional)
**Generated:** 2026-07-28 00:14 UTC  
**Meeting with:** Devon Osei  
**Focus:** seats

> This dataset is a fictional classroom exercise. Salesforce and Marriott International are real companies referenced only as a realistic setting for a negotiation-preparation training assignment. All prices, contract terms, metrics, stakeholders, communications, alternatives, and negotiation positions in the six source files (crm_account_overview.csv, current_contract_terms.csv, discovery_call_notes.md, usage_outcomes_report.md, email_thread_excerpt.md, salesforce_marriott_internal_pricing_limits.csv) are invented for this assignment. Nothing in this file should be treated as real confidential, financial, or business information belonging to either company.

## Account Snapshot
- Account: Marriott International (Hospitality) — ID SFDC-MI-00291, tier Strategic
- Product line: Sales Cloud + Service Cloud Enterprise Edition
- Salesforce owner: Jorge Alvarez
- Official renewal target date (per CRM): 2027-01-31 _(see conflicts log — a later email states a different internal deadline)_

### Stakeholders in the Room
- **Devon Osei** (Marriott) — Director of Sales Operations. Secondary contact; represents Sales Ops and contact center perspective; raised Service Cloud wins and AI/Einstein bundling question.

### Current Contract Terms (relevant to focus)
- licensed seats: 4200 _(source: current_contract_terms.csv)_ — Matches crm_account_overview.csv current_licensed_users (4200).

### Marriott's Requested Terms
- Move from a flat 4,200-seat commitment to a usage-based/true-up (and true-down) seat model. _(source: email_thread_excerpt.md, discovery_call_notes.md (raised as an open idea before being formalized in the email))_

### Salesforce Internal Limits (Deal Desk)
**seat floor:**
```
{
  "minimum_seat_floor": {
    "value": 3800,
    "source": "salesforce_marriott_internal_pricing_limits.csv",
    "note": "Below this (including Marriott's stated 3,600 target, per email_thread_excerpt.md), VP of Sales approval is required."
  },
  "gap_to_marriotts_stated_target": {
    "value": 200,
    "unit": "seats",
    "note": "Marriott's stated confidently-committable seat count (3,600) is 200 seats below Salesforce's no-escalation floor (3,800). Both values are known; how the gap is closed is unresolved."
  }
}
```
**walkaway guidance:**
```
{
  "value": "Do not offer full-org AI/Einstein bundling or a seat floor below 3,800 without VP sign-off; do not cross the $1,650,000/year floor without CRO approval.",
  "source": "salesforce_marriott_internal_pricing_limits.csv"
}
```

### Marriott's Interests
**Inferred (not confirmed):**
- Avoid paying for underutilized seats; achieve cost efficiency relative to actual usage. — **confidence: high**. Evidence: Regional utilization is uneven (EMEA 58%, APAC 49% vs. NA 91%), and Rachel is explicitly pushing for a true-up/true-down model instead of a flat 4,200-seat block. _(source: usage_outcomes_report.md, discovery_call_notes.md)_

### Salesforce's Interests
**Inferred (not confirmed):**
- Preserve existing ACV and resist a seat-count renegotiation that erodes contract value. — **confidence: high**. Evidence: Seats are the largest driver of contract value; Marriott's true-up ask (targeting ~3,600 vs. 4,200) directly threatens the current revenue level. _(source: current_contract_terms.csv, email_thread_excerpt.md)_

### Salesforce's Objectives
**Confirmed:**
- The Salesforce AE stated he needs to run the seat-reduction and AI-bundling requests by the deal desk before confirming anything on pricing. _(source: email_thread_excerpt.md)_

### Marriott's Leverage
_No items in this section match the selected focus._

### Salesforce's Leverage
- Switching costs associated with migrating 4,200 seats and embedded Sales Cloud + Service Cloud workflows. (confidence: medium; status: inferred) _(source: current_contract_terms.csv, crm_account_overview.csv)_

### Available Concessions (confirmed, Deal-Desk-backed)
- AI/Einstein features bundled at no incremental charge for up to 2,600 Service Cloud (contact-center) seats, contingent on a signed 3-year term. Bundling beyond this limit or org-wide requires VP approval. _(source: salesforce_marriott_internal_pricing_limits.csv)_

### Possible Concessions (speculative)
- Offer a modified banded seat commitment (e.g., a seat floor with tiered true-up) rather than full usage-based flexibility, using the 3,800-seat internal floor as the anchor. (confidence: low) _(source: salesforce_marriott_internal_pricing_limits.csv, email_thread_excerpt.md)_

### Likely Objections
- Salesforce's deal desk may object to reducing the committed seat floor from 4,200 to ~3,600, since it directly cuts committed revenue. (confidence: medium) _(source: email_thread_excerpt.md)_

### Unresolved Questions
- Can AI/Einstein features be priced flexibly for this account? (status: resolved) _(source: discovery_call_notes.md, salesforce_marriott_internal_pricing_limits.csv)_

### Conflicting Information (unresolved — do not silently pick a value)
_No conflicts directly tied to this focus area._
_(Full conflict log has 3 entries: C-1, C-2, C-3. Shown above for this focus: none. Review the full packet's `conflicts` array before treating any figure above as settled.)_

### Full Source List
- `crm_account_overview.csv` — Fictional CRM record with core account metadata: account owner, contacts, contract dates, current ACV, seat count, product line, account tier, and last QBR date.
- `current_contract_terms.csv` — Fictional contract line-item detail: contract ID, effective date, term length, list/negotiated pricing, discount, seats, support tier, payment terms, auto-renewal clause, sandboxes, and data storage allotment.
- `discovery_call_notes.md` — Fictional raw notes from a March 3, 2026 renewal-prep call between the Salesforce AE and Marriott's Rachel Kim and Devon Osei, including budget pressure, seat model pushback, sandbox constraints, competitor mention, and open follow-ups.
- `usage_outcomes_report.md` — Fictional Q1 2026 Customer Success report on adoption (weekly active users, license utilization by region) and outcomes (case resolution time, sales cycle length, support ticket SLA).
- `email_thread_excerpt.md` — Fictional two-message email exchange (May 12 and May 14, 2026) between Rachel Kim and Jorge Alvarez formalizing Marriott's five renewal asks and the AE's initial response.
- `salesforce_marriott_internal_pricing_limits.csv` — Fictional Salesforce-internal Deal Desk memo (dated 2026-05-20, authored after the AE's 2026-05-14 email committing to check with Deal Desk). Not part of the original five uploaded files -- authored on 2026-07-27 at the account executive's explicit request to fill sign-off gaps. Contains opening/target/acceptable/minimum annual pricing positions, seat floor, discount escalation thresholds, AI/Einstein and sandbox concession limits, term-length pricing adjustments, an internal (unconfirmed) estimate of Marriott's budget ceiling, and competitive-context notes. Internal to Salesforce; not shared with Marriott.

---
_This briefing is generated entirely from salesforce_marriott_negotiation_packet.json. It does not recommend which offer to make or accept — that decision is the account executive's. Fictional classroom exercise; not real Salesforce or Marriott information._