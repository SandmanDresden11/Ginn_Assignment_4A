# Negotiation Prep Briefing — Salesforce–Marriott Renewal (Fictional)
**Generated:** 2026-07-28 00:14 UTC  
**Meeting with:** Unknown Person  
**Focus:** ai_einstein

> This dataset is a fictional classroom exercise. Salesforce and Marriott International are real companies referenced only as a realistic setting for a negotiation-preparation training assignment. All prices, contract terms, metrics, stakeholders, communications, alternatives, and negotiation positions in the six source files (crm_account_overview.csv, current_contract_terms.csv, discovery_call_notes.md, usage_outcomes_report.md, email_thread_excerpt.md, salesforce_marriott_internal_pricing_limits.csv) are invented for this assignment. Nothing in this file should be treated as real confidential, financial, or business information belonging to either company.

## Account Snapshot
- Account: Marriott International (Hospitality) — ID SFDC-MI-00291, tier Strategic
- Product line: Sales Cloud + Service Cloud Enterprise Edition
- Salesforce owner: Jorge Alvarez
- Official renewal target date (per CRM): 2027-01-31 _(see conflicts log — a later email states a different internal deadline)_

### Stakeholders in the Room
_No stakeholder in the packet matched "Unknown Person" by name. Proceeding with a general briefing; verify who is actually attending before the meeting._

### Current Contract Terms (relevant to focus)
_No current-contract fields match the selected focus._

### Marriott's Requested Terms
- Move from a flat 4,200-seat commitment to a usage-based/true-up (and true-down) seat model. _(source: email_thread_excerpt.md, discovery_call_notes.md (raised as an open idea before being formalized in the email))_
- Include AI/Einstein features in the base price, at minimum for the contact center team, rather than as a billed add-on. _(source: email_thread_excerpt.md, discovery_call_notes.md (raised as an open question))_
- Move to a 3-year term if the effective annual price drops meaningfully. _(source: email_thread_excerpt.md)_
- Two additional full sandboxes at no incremental cost. _(source: email_thread_excerpt.md, discovery_call_notes.md (generic mention of wanting more sandboxes, no number given))_
- Finalize the renewal by December 15, 2026 due to a corporate budget cycle change communicated by Marriott Legal. _(source: email_thread_excerpt.md)_

### Salesforce Internal Limits (Deal Desk)
**ai einstein limits:**
```
{
  "list_price_usd_per_seat_monthly": {
    "value": 15,
    "source": "salesforce_marriott_internal_pricing_limits.csv"
  },
  "no_charge_bundling_limit_seats": {
    "value": 2600,
    "source": "salesforce_marriott_internal_pricing_limits.csv",
    "note": "Contingent on a signed 3-year term; scope is Service Cloud/contact-center seats. Full-org bundling requires VP approval."
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
- Relieve internal development team constraints via more sandbox capacity. — **confidence: high**. Evidence: Rachel directly said their dev team has been 'fighting over sandbox slots' and the follow-up email formalizes a request for two additional free sandboxes. _(source: discovery_call_notes.md, email_thread_excerpt.md)_
- Preserve negotiating leverage/optionality by keeping a competitive evaluation active for the contact center piece. — **confidence: medium**. Evidence: Devon mentioned evaluating an unnamed competitor specifically for the contact center, without volunteering full detail; Salesforce's AE treats this as a signal worth investigating rather than a confirmed threat. _(source: discovery_call_notes.md, email_thread_excerpt.md)_
- Simplify internal budget approval by avoiding a separate AI/Einstein add-on line item. — **confidence: medium**. Evidence: Devon framed AI/Einstein inclusion as a potential differentiator tied to pricing structure, and the follow-up email formalizes this as a base-price inclusion request. _(source: discovery_call_notes.md, email_thread_excerpt.md)_

### Salesforce's Interests
**Inferred (not confirmed):**
- Preserve existing ACV and resist a seat-count renegotiation that erodes contract value. — **confidence: high**. Evidence: Seats are the largest driver of contract value; Marriott's true-up ask (targeting ~3,600 vs. 4,200) directly threatens the current revenue level. _(source: current_contract_terms.csv, email_thread_excerpt.md)_
- Lock in a multi-year term for revenue predictability. — **confidence: medium**. Evidence: The AE responded constructively to the 3-year term proposal in his email rather than resisting it. _(source: email_thread_excerpt.md)_
- Treat AI/Einstein as a future expansion-revenue opportunity rather than a free bundled feature. — **confidence: medium**. Evidence: The AE routed the AI-bundling question to deal desk rather than declining outright, consistent with protecting it as a paid upsell path. _(source: email_thread_excerpt.md)_
- Prevent loss of the Service Cloud/contact center business to a competitor. — **confidence: high**. Evidence: The AE explicitly flagged the secondhand competitive-benchmarking report as important to validate and prioritize. _(source: email_thread_excerpt.md)_

### Salesforce's Objectives
**Confirmed:**
- The Salesforce AE stated he needs to run the seat-reduction and AI-bundling requests by the deal desk before confirming anything on pricing. _(source: email_thread_excerpt.md)_
- The Salesforce AE wants to gauge how serious the competitive evaluation of the contact center piece is, in order to prioritize Salesforce's response. _(source: email_thread_excerpt.md)_
**Inferred (not confirmed):**
- Retain and protect the existing ~$1.78-1.85M ACV Strategic-tier account. — **confidence: high**. Evidence: Account is tagged 'Strategic' tier with a Premier Success Plan, and the AE is actively managing renewal prep many months ahead of contract expiration. _(source: crm_account_overview.csv, current_contract_terms.csv)_
- Convert the account to a 3-year term to lock in revenue predictability. — **confidence: medium**. Evidence: The AE engaged constructively on the multi-year structure in his email reply rather than declining; Rachel independently noted multi-year deals are easier to get approved 'if the price is right.' _(source: email_thread_excerpt.md, discovery_call_notes.md)_
- Grow/expand AI-Einstein adoption as a monetizable upsell rather than giving it away for free. — **confidence: medium**. Evidence: The AE deferred the AI-bundling question to deal desk instead of rejecting it outright, suggesting it is being treated as a negotiable commercial lever rather than a simple no. _(source: email_thread_excerpt.md)_
- Defend against competitive displacement in the Service Cloud/contact center segment. — **confidence: high**. Evidence: The AE explicitly flagged the secondhand report of competitive benchmarking as something worth prioritizing internally, and Deal Desk's internal vertical-wide displacement data corroborates that this is a recognized pattern, not just a one-off rumor. _(source: email_thread_excerpt.md, salesforce_marriott_internal_pricing_limits.csv)_

### Marriott's Leverage
- Willingness to commit to a multi-year term functions as a bargaining chip in exchange for price concessions. (confidence: high; status: inferred) _(source: discovery_call_notes.md)_

### Salesforce's Leverage
_No items in this section match the selected focus._

### Available Concessions (confirmed, Deal-Desk-backed)
- Up to 2 additional full sandboxes at no charge, contingent on a minimum 2-year term. _(source: salesforce_marriott_internal_pricing_limits.csv)_
- AI/Einstein features bundled at no incremental charge for up to 2,600 Service Cloud (contact-center) seats, contingent on a signed 3-year term. Bundling beyond this limit or org-wide requires VP approval. _(source: salesforce_marriott_internal_pricing_limits.csv)_
- Price flexibility down to $1,650,000/year on a 3-year term without escalation beyond Deal Desk; below that requires CRO approval. _(source: salesforce_marriott_internal_pricing_limits.csv)_
- A 5-year term (longer than Marriott's proposed 3-year) would qualify for an additional 2% discount off the target/acceptable price tiers. _(source: salesforce_marriott_internal_pricing_limits.csv)_

### Possible Concessions (speculative)
- Offer a modified banded seat commitment (e.g., a seat floor with tiered true-up) rather than full usage-based flexibility, using the 3,800-seat internal floor as the anchor. (confidence: low) _(source: salesforce_marriott_internal_pricing_limits.csv, email_thread_excerpt.md)_

### Likely Objections
- Marriott may object if the effective annual price does not move meaningfully from ~$1.78-1.85M toward its $1.5-1.6M target. (confidence: high) _(source: email_thread_excerpt.md)_
- Marriott may object to losing AI/Einstein as a free bundle if Salesforce insists on add-on pricing. (confidence: medium) _(source: discovery_call_notes.md, email_thread_excerpt.md)_
- Salesforce's deal desk may object to reducing the committed seat floor from 4,200 to ~3,600, since it directly cuts committed revenue. (confidence: medium) _(source: email_thread_excerpt.md)_
- Salesforce may push back on the compressed December 15, 2026 deadline relative to the original January 31, 2027 contract end date, citing less time to negotiate and internally approve terms. (confidence: medium) _(source: email_thread_excerpt.md, crm_account_overview.csv)_

### Unresolved Questions
- Which competitor is Marriott evaluating for the contact center piece? _(source: discovery_call_notes.md, email_thread_excerpt.md)_
- Can AI/Einstein features be priced flexibly for this account? (status: resolved) _(source: discovery_call_notes.md, salesforce_marriott_internal_pricing_limits.csv)_
- What does the detailed usage-by-region data (beyond the Q1 2026 summary) show? _(source: discovery_call_notes.md)_
- How should the conflicting renewal deadlines (2027-01-31 contract end date vs. 2026-12-15 legal deadline) be reconciled? _(source: crm_account_overview.csv, current_contract_terms.csv, email_thread_excerpt.md, salesforce_marriott_internal_pricing_limits.csv)_
- How serious/advanced is the competitor evaluation, really? _(source: email_thread_excerpt.md)_

### Conflicting Information (unresolved — do not silently pick a value)
- **C-1 — Rachel Kim's job title**
    - VP of Procurement _(source: crm_account_overview.csv (field: primary_contact_title))_
    - Director of Procurement (reports up to the VP of Procurement) _(source: discovery_call_notes.md (Rachel's own verbal correction to Devon on the call))_
    - Status: unresolved. Not silently resolved. The discovery-call correction came directly from Rachel Kim herself and is more recent, but the packet retains both values rather than overwriting the CRM record.
- **C-2 — Current annual contract value**
    - 1850000 _(source: crm_account_overview.csv (field: current_annual_contract_value_usd))_
    - 1780000 _(source: current_contract_terms.csv (field: annual_negotiated_price_usd))_
    - Status: unresolved. The contract-terms figure is internally consistent with list price minus discount (1,920,000 x (1 - 0.073) ≈ 1,779,840), but this does not resolve why the CRM record shows a different figure. Both retained.
- **C-3 — Renewal / finalization deadline**
    - 2027-01-31 _(source: crm_account_overview.csv (renewal_target_date) and current_contract_terms.csv (implied contract end date from a 36-month term starting 2024-02-01))_
    - 2026-12-15 _(source: email_thread_excerpt.md (Rachel Kim: 'Legal now wants everything finalized by December 15, 2026... because of a corporate budget cycle change'))_
    - Status: unresolved. May represent a genuine update (deadline moved) rather than a data error, but no source confirms the contract record was ever formally updated to reflect the new date. Both retained.
_(Full conflict log has 3 entries: C-1, C-2, C-3. Shown above for this focus: C-1, C-2, C-3. Review the full packet's `conflicts` array before treating any figure above as settled.)_

### Full Source List
- `crm_account_overview.csv` — Fictional CRM record with core account metadata: account owner, contacts, contract dates, current ACV, seat count, product line, account tier, and last QBR date.
- `current_contract_terms.csv` — Fictional contract line-item detail: contract ID, effective date, term length, list/negotiated pricing, discount, seats, support tier, payment terms, auto-renewal clause, sandboxes, and data storage allotment.
- `discovery_call_notes.md` — Fictional raw notes from a March 3, 2026 renewal-prep call between the Salesforce AE and Marriott's Rachel Kim and Devon Osei, including budget pressure, seat model pushback, sandbox constraints, competitor mention, and open follow-ups.
- `usage_outcomes_report.md` — Fictional Q1 2026 Customer Success report on adoption (weekly active users, license utilization by region) and outcomes (case resolution time, sales cycle length, support ticket SLA).
- `email_thread_excerpt.md` — Fictional two-message email exchange (May 12 and May 14, 2026) between Rachel Kim and Jorge Alvarez formalizing Marriott's five renewal asks and the AE's initial response.
- `salesforce_marriott_internal_pricing_limits.csv` — Fictional Salesforce-internal Deal Desk memo (dated 2026-05-20, authored after the AE's 2026-05-14 email committing to check with Deal Desk). Not part of the original five uploaded files -- authored on 2026-07-27 at the account executive's explicit request to fill sign-off gaps. Contains opening/target/acceptable/minimum annual pricing positions, seat floor, discount escalation thresholds, AI/Einstein and sandbox concession limits, term-length pricing adjustments, an internal (unconfirmed) estimate of Marriott's budget ceiling, and competitive-context notes. Internal to Salesforce; not shared with Marriott.

---
_This briefing is generated entirely from salesforce_marriott_negotiation_packet.json. It does not recommend which offer to make or accept — that decision is the account executive's. Fictional classroom exercise; not real Salesforce or Marriott information._