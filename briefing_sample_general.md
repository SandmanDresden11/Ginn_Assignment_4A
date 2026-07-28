# Negotiation Prep Briefing — Salesforce–Marriott Renewal (Fictional)
**Generated:** 2026-07-28 00:14 UTC  
**Meeting with:** CFO's office  
**Focus:** general

> This dataset is a fictional classroom exercise. Salesforce and Marriott International are real companies referenced only as a realistic setting for a negotiation-preparation training assignment. All prices, contract terms, metrics, stakeholders, communications, alternatives, and negotiation positions in the six source files (crm_account_overview.csv, current_contract_terms.csv, discovery_call_notes.md, usage_outcomes_report.md, email_thread_excerpt.md, salesforce_marriott_internal_pricing_limits.csv) are invented for this assignment. Nothing in this file should be treated as real confidential, financial, or business information belonging to either company.

## Account Snapshot
- Account: Marriott International (Hospitality) — ID SFDC-MI-00291, tier Strategic
- Product line: Sales Cloud + Service Cloud Enterprise Edition
- Salesforce owner: Jorge Alvarez
- Official renewal target date (per CRM): 2027-01-31 _(see conflicts log — a later email states a different internal deadline)_

### Stakeholders in the Room
_No stakeholder in the packet matched "CFO's office" by name. Proceeding with a general briefing; verify who is actually attending before the meeting._

### Current Contract Terms (relevant to focus)
- contract id: MSA-2024-0187 _(source: current_contract_terms.csv)_
- effective date: 2024-02-01 _(source: current_contract_terms.csv)_ — Matches crm_account_overview.csv current_contract_start_date (02/01/2024).
- term length months: 36 _(source: current_contract_terms.csv)_
- end date: 2027-01-31 _(source: crm_account_overview.csv)_ — Consistent with a 36-month term starting 2024-02-01. See conflicts log (C-3).
- annual list price usd: 1920000 _(source: current_contract_terms.csv)_
- annual negotiated price usd: 1780000 _(source: current_contract_terms.csv)_ — Internally consistent with list price minus discount (1,920,000 x (1-0.073) ≈ 1,779,840). See conflicts log (C-2) re: CRM's differing 'current_annual_contract_value_usd'.
- discount pct applied: 7.3 _(source: current_contract_terms.csv)_
- current annual contract value usd per crm: 1850000 _(source: crm_account_overview.csv)_ — Conflicts with current_contract_terms.csv annual_negotiated_price_usd. See conflicts log (C-2).
- licensed seats: 4200 _(source: current_contract_terms.csv)_ — Matches crm_account_overview.csv current_licensed_users (4200).
- support tier: Premier Success Plan _(source: current_contract_terms.csv)_
- payment terms: Net 45 _(source: current_contract_terms.csv)_
- auto renewal clause: Yes - 60-day opt-out notice required _(source: current_contract_terms.csv)_
- included sandboxes: 3 _(source: current_contract_terms.csv)_
- data storage allotment gb: 500 _(source: current_contract_terms.csv)_

### Marriott's Requested Terms
- Move from a flat 4,200-seat commitment to a usage-based/true-up (and true-down) seat model. _(source: email_thread_excerpt.md, discovery_call_notes.md (raised as an open idea before being formalized in the email))_
- Include AI/Einstein features in the base price, at minimum for the contact center team, rather than as a billed add-on. _(source: email_thread_excerpt.md, discovery_call_notes.md (raised as an open question))_
- Move to a 3-year term if the effective annual price drops meaningfully. _(source: email_thread_excerpt.md)_
- Two additional full sandboxes at no incremental cost. _(source: email_thread_excerpt.md, discovery_call_notes.md (generic mention of wanting more sandboxes, no number given))_
- Finalize the renewal by December 15, 2026 due to a corporate budget cycle change communicated by Marriott Legal. _(source: email_thread_excerpt.md)_

### Salesforce Internal Limits (Deal Desk)
**pricing positions usd annual 3yr term:**
```
{
  "opening": {
    "value": 1950000,
    "source": "salesforce_marriott_internal_pricing_limits.csv"
  },
  "target": {
    "value": 1840000,
    "source": "salesforce_marriott_internal_pricing_limits.csv"
  },
  "acceptable": {
    "value": 1750000,
    "source": "salesforce_marriott_internal_pricing_limits.csv"
  },
  "minimum": {
    "value": 1650000,
    "source": "salesforce_marriott_internal_pricing_limits.csv",
    "note": "Below this figure, CRO approval is required under the Strategic account exception process."
  }
}
```
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
**discount limits:**
```
{
  "max_discount_pct_without_escalation": {
    "value": 12,
    "source": "salesforce_marriott_internal_pricing_limits.csv"
  },
  "vp_approval_required_pct_range": {
    "value": [
      12,
      18
    ],
    "source": "salesforce_marriott_internal_pricing_limits.csv"
  },
  "cro_approval_required_above_pct": {
    "value": 18,
    "source": "salesforce_marriott_internal_pricing_limits.csv"
  }
}
```
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
**sandbox limits:**
```
{
  "incremental_internal_cost_usd_annual_per_sandbox": {
    "value": 8000,
    "source": "salesforce_marriott_internal_pricing_limits.csv"
  },
  "no_charge_concession_limit_units": {
    "value": 2,
    "source": "salesforce_marriott_internal_pricing_limits.csv",
    "note": "Contingent on a minimum 2-year term."
  }
}
```
**estimated customer budget ceiling usd annual:**
```
{
  "value": 1700000,
  "confidence": "low",
  "source": "salesforce_marriott_internal_pricing_limits.csv",
  "note": "This is Salesforce Deal Desk's own internal estimate based on account tier and Hospitality-vertical benchmarks. It is NOT confirmed by Marriott and must not be treated as a fact about the customer -- it is a Salesforce-side guess, labeled accordingly."
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
**Confirmed:**
- Corporate is requiring every department to justify renewals over $1M this budget season. _(source: discovery_call_notes.md)_
**Inferred (not confirmed):**
- Avoid paying for underutilized seats; achieve cost efficiency relative to actual usage. — **confidence: high**. Evidence: Regional utilization is uneven (EMEA 58%, APAC 49% vs. NA 91%), and Rachel is explicitly pushing for a true-up/true-down model instead of a flat 4,200-seat block. _(source: usage_outcomes_report.md, discovery_call_notes.md)_
- Relieve internal development team constraints via more sandbox capacity. — **confidence: high**. Evidence: Rachel directly said their dev team has been 'fighting over sandbox slots' and the follow-up email formalizes a request for two additional free sandboxes. _(source: discovery_call_notes.md, email_thread_excerpt.md)_
- Preserve negotiating leverage/optionality by keeping a competitive evaluation active for the contact center piece. — **confidence: medium**. Evidence: Devon mentioned evaluating an unnamed competitor specifically for the contact center, without volunteering full detail; Salesforce's AE treats this as a signal worth investigating rather than a confirmed threat. _(source: discovery_call_notes.md, email_thread_excerpt.md)_
- Simplify internal budget approval by avoiding a separate AI/Einstein add-on line item. — **confidence: medium**. Evidence: Devon framed AI/Einstein inclusion as a potential differentiator tied to pricing structure, and the follow-up email formalizes this as a base-price inclusion request. _(source: discovery_call_notes.md, email_thread_excerpt.md)_
- Marriott's actual internal budget ceiling for this renewal may be somewhat above its stated $1.5-1.6M/year opening ask. — **confidence: low**. Evidence: This is Salesforce Deal Desk's own unconfirmed estimate ($1,700,000/year) based on account tier and vertical benchmarks -- not information from Marriott. It is included here only as a labeled, low-confidence internal estimate, not a fact about Marriott's real budget. _(source: salesforce_marriott_internal_pricing_limits.csv)_

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
- Deal Desk has pre-approved a 3-year term structure with defined opening/target/acceptable/minimum annual price positions ($1,950,000 / $1,840,000 / $1,750,000 / $1,650,000) and will not approve pricing below $1,650,000/year without CRO sign-off. _(source: salesforce_marriott_internal_pricing_limits.csv)_
- Deal Desk recommends prioritizing contact-center retention terms over maximizing price on this renewal, citing 2 competitive displacements fiscal-year-to-date in Hospitality-vertical Service Cloud renewals. _(source: salesforce_marriott_internal_pricing_limits.csv)_
**Inferred (not confirmed):**
- Retain and protect the existing ~$1.78-1.85M ACV Strategic-tier account. — **confidence: high**. Evidence: Account is tagged 'Strategic' tier with a Premier Success Plan, and the AE is actively managing renewal prep many months ahead of contract expiration. _(source: crm_account_overview.csv, current_contract_terms.csv)_
- Convert the account to a 3-year term to lock in revenue predictability. — **confidence: medium**. Evidence: The AE engaged constructively on the multi-year structure in his email reply rather than declining; Rachel independently noted multi-year deals are easier to get approved 'if the price is right.' _(source: email_thread_excerpt.md, discovery_call_notes.md)_
- Grow/expand AI-Einstein adoption as a monetizable upsell rather than giving it away for free. — **confidence: medium**. Evidence: The AE deferred the AI-bundling question to deal desk instead of rejecting it outright, suggesting it is being treated as a negotiable commercial lever rather than a simple no. _(source: email_thread_excerpt.md)_
- Defend against competitive displacement in the Service Cloud/contact center segment. — **confidence: high**. Evidence: The AE explicitly flagged the secondhand report of competitive benchmarking as something worth prioritizing internally, and Deal Desk's internal vertical-wide displacement data corroborates that this is a recognized pattern, not just a one-off rumor. _(source: email_thread_excerpt.md, salesforce_marriott_internal_pricing_limits.csv)_

### Marriott's Leverage
- An active competitive evaluation is underway for the contact center piece. (status: confirmed) _(source: discovery_call_notes.md)_
- Budget pressure narrative (corporate scrutiny of renewals over $1M) is being used to justify pushing for lower/more flexible pricing. (status: confirmed) _(source: discovery_call_notes.md)_
- Willingness to commit to a multi-year term functions as a bargaining chip in exchange for price concessions. (confidence: high; status: inferred) _(source: discovery_call_notes.md)_

### Salesforce's Leverage
- Measurable positive outcomes support renewal value: case resolution time down 22% YoY, sales cycle length down 9% YoY. (status: confirmed) _(source: usage_outcomes_report.md)_
- The North America contact center team is an internal advocate willing to serve as a case study reference. (status: confirmed) _(source: usage_outcomes_report.md)_
- Switching costs associated with migrating 4,200 seats and embedded Sales Cloud + Service Cloud workflows. (confidence: medium; status: inferred) _(source: current_contract_terms.csv, crm_account_overview.csv)_
- Salesforce is proactively aware of the competitive pattern in this vertical (2 displacements fiscal-year-to-date) and has already directed prioritization toward contact-center retention terms, rather than being caught flat-footed. (status: confirmed) _(source: salesforce_marriott_internal_pricing_limits.csv)_

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
- Who at Marriott has final sign-off authority for the renewal? _(source: discovery_call_notes.md)_
- Which competitor is Marriott evaluating for the contact center piece? _(source: discovery_call_notes.md, email_thread_excerpt.md)_
- What is the actual root cause of the APAC utilization gap? _(source: usage_outcomes_report.md)_
- Can AI/Einstein features be priced flexibly for this account? (status: resolved) _(source: discovery_call_notes.md, salesforce_marriott_internal_pricing_limits.csv)_
- What does the detailed usage-by-region data (beyond the Q1 2026 summary) show? _(source: discovery_call_notes.md)_
- How should the conflicting renewal deadlines (2027-01-31 contract end date vs. 2026-12-15 legal deadline) be reconciled? _(source: crm_account_overview.csv, current_contract_terms.csv, email_thread_excerpt.md, salesforce_marriott_internal_pricing_limits.csv)_
- Which figure correctly represents the current annual contract value: $1,850,000 (CRM) or $1,780,000 (contract terms)? _(source: crm_account_overview.csv, current_contract_terms.csv)_
- How serious/advanced is the competitor evaluation, really? _(source: email_thread_excerpt.md)_
- What is Rachel Kim's correct title: VP of Procurement or Director of Procurement? _(source: crm_account_overview.csv, discovery_call_notes.md)_

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
