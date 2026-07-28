# Source Summary — Salesforce–Marriott Negotiation Packet

**Classroom-use disclaimer:** This is a fictional classroom exercise. Salesforce and Marriott International are real companies used only as a realistic setting. All prices, contract terms, metrics, stakeholders, communications, alternatives, and negotiation positions below are invented for this assignment and are not real confidential information.

This document summarizes the five fictional source files consolidated into `salesforce_marriott_negotiation_packet.json`, what each contributed, and how overlaps and conflicts were handled.

## 1. crm_account_overview.csv

Fictional CRM record. Contributed: account name, industry, account owner, account ID, primary/secondary contacts and titles, current contract start/end dates, current annual contract value, licensed user count, renewal target date, product line, account tier, and last QBR date.

Used to populate: `account_overview`, `stakeholders` (contact names/titles), and parts of `current_contract`.

## 2. current_contract_terms.csv

Fictional contract line-item detail. Contributed: contract ID, effective date, term length, list price, negotiated price, discount percentage, licensed seats, support tier, payment terms, auto-renewal clause, included sandboxes, and data storage allotment.

Used to populate: `current_contract`. Cross-checked against crm_account_overview.csv for dates and seat count (consistent); the annual price figures were **not** consistent with the CRM's stated current contract value (see Conflicts below).

## 3. discovery_call_notes.md

Fictional raw notes from a March 3, 2026 renewal-prep call (Salesforce AE, Rachel Kim, Devon Osei). Contributed: budget pressure context, Marriott's early interest in a true-up/true-down seat model, sandbox constraints, a vague mention of a competing vendor being evaluated for the contact center, Rachel's preference for multi-year deals "if the price is right," an AI/Einstein bundling question, Rachel's title correction, and confirmation that final sign-off sits with Marriott's CFO's office.

Used to populate: `stakeholders`, early/unquantified versions of `requested_terms`, `marriott_interests`, `leverage`, and several `unresolved_questions`.

## 4. usage_outcomes_report.md

Fictional Q1 2026 Customer Success report. Contributed: weekly active users by product, overall and regional license utilization, case resolution time and sales cycle improvements, support ticket volume/SLA, and CS team notes flagging APAC as at-risk with an unvalidated root cause.

Used to populate: `usage_and_outcomes` and supporting evidence for `salesforce_leverage` and `marriott_interests`.

## 5. email_thread_excerpt.md

Fictional two-message email exchange (May 12 and May 14, 2026) between Rachel Kim and Jorge Alvarez. Contributed: Marriott's five formalized renewal asks (true-up seats near 3,600, AI/Einstein included for contact center, 3-year term at $1.5–1.6M/year, two free sandboxes, and a new December 15, 2026 finalization deadline), plus the Salesforce AE's initial response (deal desk review needed, interest in validating how serious the competitive evaluation is).

Used to populate: `requested_terms` (confirmed asks), `salesforce_objectives` (confirmed AE statements), and most `inferred` interest/leverage/concession entries.

## 6. salesforce_marriott_internal_pricing_limits.csv

**Added 2026-07-27, at the user's explicit request, after the initial five-file consolidation.** This is a supplementary fictional Salesforce-internal Deal Desk memo (dated 2026-05-20, positioned as the deal desk's response to Jorge Alvarez's 2026-05-14 commitment to check the seat and AI-bundling asks). It is authored content, not extracted from an uploaded document, and its sole purpose is to fill the gap identified against the GRASP brief's sign-off checklist: the original five files had no source for Salesforce's opening/target/acceptable/minimum pricing positions, seat floor, discount escalation thresholds, or an estimated customer budget ceiling.

Contributed: annual price positions for a 3-year term (opening $1,950,000 / target $1,840,000 / acceptable $1,750,000 / minimum $1,650,000, with CRO approval required below the floor), term-length pricing adjustments (+4% for a 1-year term, -2% for a 5-year term), a 3,800-seat minimum floor (200 seats above Marriott's stated 3,600-seat target), discount escalation tiers (12% / 18% approval thresholds), AI/Einstein bundling and sandbox concession limits that partially match Marriott's asks, an internal (explicitly low-confidence, unconfirmed) estimate of Marriott's budget ceiling at $1,700,000/year, and a note that Marriott's requested December 15, 2026 close date falls within Salesforce's FY2027 Q4 and creates no internal fiscal conflict on Salesforce's side.

Used to populate: `minimum_limits` (previously "No data available"), several `confirmed` entries in `concessions` (previously all speculative/inferred), additional `confirmed` entries in `salesforce_objectives` and `leverage.salesforce_leverage`, resolution of one previously open item in `unresolved_questions` (AI/Einstein pricing flexibility), and a low-confidence corroborating entry in `marriott_interests` regarding budget.

This file is internal to Salesforce and would not be shared with Marriott in the scenario. Every value drawn from it is labeled with this source in the JSON packet so its fictional, internally-authored origin stays traceable and distinguishable from the five originally uploaded files.

## How overlaps were reconciled

Facts appearing in multiple files (e.g., contract dates, seat count, contact titles) were cross-checked. Where sources agreed, a single value was recorded with all supporting file(s) cited. Where sources disagreed, the value was **not** silently chosen — it was recorded in the `conflicts` array of the JSON packet and flagged inline wherever it appears in other sections.

## Conflicts identified

1. **C-1 — Rachel Kim's title:** "VP of Procurement" (crm_account_overview.csv) vs. "Director of Procurement" (discovery_call_notes.md, her own on-call correction).
2. **C-2 — Current annual contract value:** $1,850,000 (crm_account_overview.csv) vs. $1,780,000 (current_contract_terms.csv, consistent with list price minus discount).
3. **C-3 — Renewal/finalization deadline:** January 31, 2027 (crm_account_overview.csv / current_contract_terms.csv, derived from contract term) vs. December 15, 2026 (email_thread_excerpt.md, per Rachel Kim citing a Legal/budget-cycle change).

## Sections with no supporting data

`alternatives.salesforce_alternative` (Salesforce's fallback/BATNA if Marriott doesn't renew) remains marked "No data available." None of the six source files — including the newly added pricing memo — address Salesforce's own alternative accounts or fallback options, and no value was invented to fill it.

`minimum_limits` was previously "No data available" after the five-file consolidation; it is now populated using `salesforce_marriott_internal_pricing_limits.csv` (see section 6 above).
