# Negotiation Prep Briefing — Salesforce–Marriott Renewal (Fictional)
**Generated:** 2026-07-28 00:14 UTC  
**Meeting with:** Rachel Kim, Devon Osei  
**Focus:** deadline

> This dataset is a fictional classroom exercise. Salesforce and Marriott International are real companies referenced only as a realistic setting for a negotiation-preparation training assignment. All prices, contract terms, metrics, stakeholders, communications, alternatives, and negotiation positions in the six source files (crm_account_overview.csv, current_contract_terms.csv, discovery_call_notes.md, usage_outcomes_report.md, email_thread_excerpt.md, salesforce_marriott_internal_pricing_limits.csv) are invented for this assignment. Nothing in this file should be treated as real confidential, financial, or business information belonging to either company.

## Account Snapshot
- Account: Marriott International (Hospitality) — ID SFDC-MI-00291, tier Strategic
- Product line: Sales Cloud + Service Cloud Enterprise Edition
- Salesforce owner: Jorge Alvarez
- Official renewal target date (per CRM): 2027-01-31 _(see conflicts log — a later email states a different internal deadline)_

### Stakeholders in the Room
- **Rachel Kim** (Marriott) — VP of Procurement / Director of Procurement, reports up to the VP of Procurement (title is CONFLICTING — see conflicts log). Primary contact; leads pricing/terms conversation; will escalate final approval to Marriott's CFO's office.
- **Devon Osei** (Marriott) — Director of Sales Operations. Secondary contact; represents Sales Ops and contact center perspective; raised Service Cloud wins and AI/Einstein bundling question.

### Current Contract Terms (relevant to focus)
- end date: 2027-01-31 _(source: crm_account_overview.csv)_ — Consistent with a 36-month term starting 2024-02-01. See conflicts log (C-3).

### Marriott's Requested Terms
- Finalize the renewal by December 15, 2026 due to a corporate budget cycle change communicated by Marriott Legal. _(source: email_thread_excerpt.md)_

### Salesforce Internal Limits (Deal Desk)
**term length adjustments:**
```
{
  "single_year_term_price_uplift_pct": {
    "value": 4,
    "source": "salesforce_marriott_internal_pricing_limits.csv",
    "note": "Applied to each price tier above if Marriott signs a 1-year term instead of 3-year."
  },
  "five_year_term_additional_discount_pct": {
    "value": 2,
    "source": "salesforce_marriott_internal_pricing_limits.csv"
  },
  "preferred_term_length_months": {
    "value": 36,
    "source": "salesforce_marriott_internal_pricing_limits.csv"
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
_No items in this section match the selected focus._

### Salesforce's Interests
_No items in this section match the selected focus._

### Salesforce's Objectives
**Confirmed:**
- Deal Desk recommends prioritizing contact-center retention terms over maximizing price on this renewal, citing 2 competitive displacements fiscal-year-to-date in Hospitality-vertical Service Cloud renewals. _(source: salesforce_marriott_internal_pricing_limits.csv)_

### Marriott's Leverage
_No items in this section match the selected focus._

### Salesforce's Leverage
- Salesforce is proactively aware of the competitive pattern in this vertical (2 displacements fiscal-year-to-date) and has already directed prioritization toward contact-center retention terms, rather than being caught flat-footed. (status: confirmed) _(source: salesforce_marriott_internal_pricing_limits.csv)_

### Available Concessions (confirmed, Deal-Desk-backed)
_No items in this section match the selected focus._

### Possible Concessions (speculative)
_No items in this section match the selected focus._

### Likely Objections
- Salesforce may push back on the compressed December 15, 2026 deadline relative to the original January 31, 2027 contract end date, citing less time to negotiate and internally approve terms. (confidence: medium) _(source: email_thread_excerpt.md, crm_account_overview.csv)_

### Unresolved Questions
- How should the conflicting renewal deadlines (2027-01-31 contract end date vs. 2026-12-15 legal deadline) be reconciled? _(source: crm_account_overview.csv, current_contract_terms.csv, email_thread_excerpt.md, salesforce_marriott_internal_pricing_limits.csv)_

### Conflicting Information (unresolved — do not silently pick a value)
- **C-3 — Renewal / finalization deadline**
    - 2027-01-31 _(source: crm_account_overview.csv (renewal_target_date) and current_contract_terms.csv (implied contract end date from a 36-month term starting 2024-02-01))_
    - 2026-12-15 _(source: email_thread_excerpt.md (Rachel Kim: 'Legal now wants everything finalized by December 15, 2026... because of a corporate budget cycle change'))_
    - Status: unresolved. May represent a genuine update (deadline moved) rather than a data error, but no source confirms the contract record was ever formally updated to reflect the new date. Both retained.
_(Full conflict log has 3 entries: C-1, C-2, C-3. Shown above for this focus: C-3. Review the full packet's `conflicts` array before treating any figure above as settled.)_

### Full Source List
- `crm_account_overview.csv` — Fictional CRM record with core account metadata: account owner, contacts, contract dates, current ACV, seat count, product line, account tier, and last QBR date.
- `current_contract_terms.csv` — Fictional contract line-item detail: contract ID, effective date, term length, list/negotiated pricing, discount, seats, support tier, payment terms, auto-renewal clause, sandboxes, and data storage allotment.
- `discovery_call_notes.md` — Fictional raw notes from a March 3, 2026 renewal-prep call between the Salesforce AE and Marriott's Rachel Kim and Devon Osei, including budget pressure, seat model pushback, sandbox constraints, competitor mention, and open follow-ups.
- `usage_outcomes_report.md` — Fictional Q1 2026 Customer Success report on adoption (weekly active users, license utilization by region) and outcomes (case resolution time, sales cycle length, support ticket SLA).
- `email_thread_excerpt.md` — Fictional two-message email exchange (May 12 and May 14, 2026) between Rachel Kim and Jorge Alvarez formalizing Marriott's five renewal asks and the AE's initial response.
- `salesforce_marriott_internal_pricing_limits.csv` — Fictional Salesforce-internal Deal Desk memo (dated 2026-05-20, authored after the AE's 2026-05-14 email committing to check with Deal Desk). Not part of the original five uploaded files -- authored on 2026-07-27 at the account executive's explicit request to fill sign-off gaps. Contains opening/target/acceptable/minimum annual pricing positions, seat floor, discount escalation thresholds, AI/Einstein and sandbox concession limits, term-length pricing adjustments, an internal (unconfirmed) estimate of Marriott's budget ceiling, and competitive-context notes. Internal to Salesforce; not shared with Marriott.

---
_This briefing is generated entirely from salesforce_marriott_negotiation_packet.json. It does not recommend which offer to make or accept — that decision is the account executive's. Fictional classroom exercise; not real Salesforce or Marriott information._
