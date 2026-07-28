/*
 * Negotiation-Prep Briefing Generator — shared logic
 * ----------------------------------------------------
 * Pure functions, no DOM dependency. Ported 1:1 from
 * negotiation_prep_briefing_generator.py so the CLI tool and the web
 * version stay in sync. Usable in Node (for testing) and in the browser
 * (index.html loads this file via <script src>).
 *
 * Design rule: this module never invents content. Every fact rendered
 * must already exist in the packet object passed in. meetingWith/focus/
 * notes are situational inputs, rendered as labeled context, never
 * merged into "confirmed" facts.
 */
(function (root, factory) {
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else {
    root.BriefingLogic = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  var VALID_FOCUS = ["pricing", "seats", "ai_einstein", "sandboxes", "deadline", "competitive", "general"];

  var FOCUS_LABELS = {
    pricing: "Pricing",
    seats: "Seats / licensing",
    ai_einstein: "AI / Einstein",
    sandboxes: "Sandboxes",
    deadline: "Deadline / timeline",
    competitive: "Competitive situation",
    general: "General (full briefing)"
  };

  var FOCUS_KEYWORDS = {
    pricing: ["price", "pricing", "discount", "usd", "cost", "acv", "annual", "$"],
    seats: ["seat", "user", "true-up", "true up", "license", "licensed"],
    ai_einstein: ["ai", "einstein", "bundl"],
    sandboxes: ["sandbox"],
    deadline: ["deadline", "december", "january", "2027-01", "2026-12", "fiscal", "finaliz"],
    competitive: ["competitor", "competitive", "benchmark", "displacement", "vendor"]
  };

  var LIMITS_FOCUS_MAP = {
    pricing_positions_usd_annual_3yr_term: ["pricing"],
    term_length_adjustments: ["pricing", "deadline"],
    seat_floor: ["seats"],
    discount_limits: ["pricing"],
    ai_einstein_limits: ["ai_einstein"],
    sandbox_limits: ["sandboxes"],
    estimated_customer_budget_ceiling_usd_annual: ["pricing", "competitive"],
    walkaway_guidance: ["always"]
  };

  function matchesFocus(item, focus) {
    if (focus === "general") return true;
    var text = JSON.stringify(item).toLowerCase();
    var kws = FOCUS_KEYWORDS[focus] || [];
    for (var i = 0; i < kws.length; i++) {
      if (text.indexOf(kws[i]) !== -1) return true;
    }
    return false;
  }

  function fmtSource(src) {
    if (src === null || src === undefined) return "no source (flagged gap)";
    if (Array.isArray(src)) return src.join(", ");
    return String(src);
  }

  function humanizeKey(k) {
    return String(k).replace(/_/g, " ");
  }

  // ---- Section builders. Each returns a plain-data section object that
  // both the HTML renderer and the Markdown renderer can consume. ----

  function buildStakeholderSection(stakeholders, meetingWith) {
    var namesRequested = String(meetingWith || "")
      .split(",")
      .map(function (n) { return n.trim().toLowerCase(); })
      .filter(Boolean);
    var matched = [];
    (stakeholders.confirmed || []).forEach(function (s) {
      var name = (s.name || "").toLowerCase();
      if (!name) return;
      var isMatch = namesRequested.some(function (nr) {
        return name.indexOf(nr) !== -1 || nr.indexOf(name) !== -1;
      });
      if (isMatch) matched.push(s);
    });
    return { id: "stakeholders", title: "Stakeholders in the room", type: "stakeholders", matched: matched, queried: meetingWith };
  }

  function buildFactListSection(id, title, obj, focus) {
    var items = [];
    Object.keys(obj).forEach(function (key) {
      var v = obj[key];
      var entry = (v && typeof v === "object" && !Array.isArray(v)) ? Object.assign({ label: key }, v) : { label: key, value: v };
      if (matchesFocus(entry, focus)) items.push(entry);
    });
    return { id: id, title: title, type: "fact-list", items: items };
  }

  function buildStatementListSection(id, title, list, focus, textKeys) {
    textKeys = textKeys || ["statement", "question", "request"];
    var items = (list || []).filter(function (i) { return matchesFocus(i, focus); });
    return { id: id, title: title, type: "statement-list", items: items, textKeys: textKeys };
  }

  function buildConfirmedInferredSection(id, title, section, focus) {
    var confirmedRaw = section.confirmed;
    var confirmedList = Array.isArray(confirmedRaw) ? confirmedRaw : (confirmedRaw ? Object.values(confirmedRaw) : []);
    var confirmed = confirmedList.filter(function (i) { return matchesFocus(i, focus); });
    var inferred = (section.inferred || []).filter(function (i) { return matchesFocus(i, focus); });
    return { id: id, title: title, type: "confirmed-inferred", confirmed: confirmed, inferred: inferred };
  }

  function buildLimitsSection(minimumLimits, focus) {
    var blocks = [];
    Object.keys(minimumLimits).forEach(function (key) {
      if (key === "note") return;
      var tags = LIMITS_FOCUS_MAP[key] || [];
      if (focus !== "general" && tags.indexOf("always") === -1 && tags.indexOf(focus) === -1) return;
      blocks.push({ key: key, value: minimumLimits[key] });
    });
    return { id: "minimum_limits", title: "Salesforce internal limits (Deal Desk)", type: "json-blocks", blocks: blocks };
  }

  function buildConflictsSection(conflicts, focus) {
    var relevant = conflicts.filter(function (c) { return matchesFocus(c, focus); });
    var allIds = conflicts.map(function (c) { return c.id; });
    var shownIds = relevant.map(function (c) { return c.id; });
    return { id: "conflicts", title: "Conflicting information", type: "conflicts", relevant: relevant, allIds: allIds, shownIds: shownIds, total: conflicts.length };
  }

  function buildBriefingModel(packet, meetingWith, focus, notes) {
    meetingWith = meetingWith || "Unspecified";
    focus = VALID_FOCUS.indexOf(focus) !== -1 ? focus : "general";
    notes = notes || "";

    var meta = {
      generatedAt: new Date().toISOString(),
      meetingWith: meetingWith,
      focus: focus,
      focusLabel: FOCUS_LABELS[focus],
      notes: notes,
      disclaimer: packet.classroom_use_disclaimer.statement
    };

    var ao = packet.account_overview;
    var accountSnapshot = {
      id: "account",
      title: "Account snapshot",
      type: "lines",
      lines: [
        ao.account_name.value + " (" + ao.industry.value + ") — ID " + ao.account_id.value + ", tier " + ao.account_tier.value,
        "Product line: " + ao.product_line.value,
        "Salesforce owner: " + ao.salesforce_account_owner.value,
        "Official renewal target date (per CRM): " + ao.official_renewal_target_date.value + " — see conflicts log, a later email states a different internal deadline"
      ]
    };

    var sections = [
      buildStakeholderSection(packet.stakeholders, meetingWith),
      buildFactListSection("current_contract", "Current contract terms", packet.current_contract, focus),
      buildStatementListSection("requested_terms", "Marriott's requested terms", packet.requested_terms.confirmed, focus),
      buildLimitsSection(packet.minimum_limits, focus),
      buildConfirmedInferredSection("marriott_interests", "Marriott's interests", packet.marriott_interests, focus),
      buildConfirmedInferredSection("salesforce_interests", "Salesforce's interests", packet.salesforce_interests, focus),
      buildConfirmedInferredSection("salesforce_objectives", "Salesforce's objectives", packet.salesforce_objectives, focus),
      buildStatementListSection("marriott_leverage", "Marriott's leverage", packet.leverage.marriott_leverage, focus),
      buildStatementListSection("salesforce_leverage", "Salesforce's leverage", packet.leverage.salesforce_leverage, focus),
      buildStatementListSection("concessions_confirmed", "Available concessions (confirmed, Deal-Desk-backed)", packet.concessions.confirmed_available_concessions, focus),
      buildStatementListSection("concessions_inferred", "Possible concessions (speculative)", packet.concessions.inferred_possible_concessions, focus),
      buildStatementListSection("likely_objections", "Likely objections", packet.likely_objections, focus),
      buildStatementListSection("unresolved_questions", "Unresolved questions", packet.unresolved_questions, focus),
      buildConflictsSection(packet.conflicts, focus)
    ];

    return {
      meta: meta,
      accountSnapshot: accountSnapshot,
      sections: sections,
      sourceReferences: packet.source_references
    };
  }

  // ---- Markdown renderer (mirrors the Python CLI's output format) ----

  function itemLine(i, textKeys) {
    var text = null;
    for (var k = 0; k < textKeys.length; k++) {
      if (i[textKeys[k]] !== undefined) { text = i[textKeys[k]]; break; }
    }
    if (text === null) text = JSON.stringify(i);
    var extra = [];
    if (i.confidence) extra.push("confidence: " + i.confidence);
    if (i.status) extra.push("status: " + i.status);
    var extraStr = extra.length ? " (" + extra.join("; ") + ")" : "";
    return "- " + text + extraStr + " _(source: " + fmtSource(i.source) + ")_";
  }

  function renderMarkdown(model) {
    var lines = [];
    var m = model.meta;
    lines.push("# Negotiation prep briefing — Salesforce–Marriott renewal (fictional)");
    lines.push("**Generated:** " + m.generatedAt + "  ");
    lines.push("**Meeting with:** " + m.meetingWith + "  ");
    lines.push("**Focus:** " + m.focusLabel);
    if (m.notes) lines.push("**Session notes (user-entered, not a packet fact):** " + m.notes);
    lines.push("\n> " + m.disclaimer);

    lines.push("\n## Account snapshot");
    model.accountSnapshot.lines.forEach(function (l) { lines.push("- " + l); });

    model.sections.forEach(function (sec) {
      lines.push("\n### " + sec.title);
      if (sec.type === "stakeholders") {
        if (sec.matched.length === 0) {
          lines.push('_No stakeholder in the packet matched "' + sec.queried + '" by name. Proceeding with a general briefing; verify who is actually attending before the meeting._');
        } else {
          sec.matched.forEach(function (s) {
            var titleStr;
            if (s.title && typeof s.title === "object") {
              titleStr = s.title.values.map(function (v) { return v.value; }).join(" / ") + " (title is CONFLICTING — see conflicts log)";
            } else {
              titleStr = s.title;
            }
            lines.push("- **" + s.name + "** (" + s.organization + ") — " + titleStr + ". " + (s.role_in_negotiation || ""));
          });
        }
      } else if (sec.type === "fact-list") {
        if (sec.items.length === 0) { lines.push("_No fields match the selected focus._"); }
        sec.items.forEach(function (i) {
          lines.push("- " + humanizeKey(i.label) + ": " + i.value + " _(source: " + fmtSource(i.source) + ")_" + (i.note ? " — " + i.note : ""));
        });
      } else if (sec.type === "statement-list") {
        if (sec.items.length === 0) { lines.push("_No items match the selected focus._"); }
        sec.items.forEach(function (i) { lines.push(itemLine(i, sec.textKeys)); });
      } else if (sec.type === "confirmed-inferred") {
        if (sec.confirmed.length) {
          lines.push("**Confirmed:**");
          sec.confirmed.forEach(function (i) {
            var stmt = i.statement || i.value || i.name || JSON.stringify(i);
            lines.push("- " + stmt + " _(source: " + fmtSource(i.source) + ")_");
          });
        }
        if (sec.inferred.length) {
          lines.push("**Inferred (not confirmed):**");
          sec.inferred.forEach(function (i) {
            lines.push("- " + i.statement + " — **confidence: " + i.confidence + "**. Evidence: " + i.evidence + " _(source: " + fmtSource(i.source) + ")_");
          });
        }
        if (!sec.confirmed.length && !sec.inferred.length) lines.push("_No items match the selected focus._");
      } else if (sec.type === "json-blocks") {
        if (sec.blocks.length === 0) { lines.push("_No limits sub-sections match the selected focus._"); }
        sec.blocks.forEach(function (b) {
          lines.push("**" + humanizeKey(b.key) + ":**");
          lines.push("```\n" + JSON.stringify(b.value, null, 2) + "\n```");
        });
      } else if (sec.type === "conflicts") {
        if (sec.relevant.length === 0) {
          lines.push("_No conflicts directly tied to this focus area._");
        } else {
          sec.relevant.forEach(function (c) {
            lines.push("- **" + c.id + " — " + c.topic + "**");
            c.conflicting_values.forEach(function (cv) {
              lines.push("    - " + cv.value + " _(source: " + cv.source + ")_");
            });
            lines.push("    - Status: " + c.resolution_status + ". " + (c.note || ""));
          });
        }
        lines.push("_(Full conflict log has " + sec.total + " entries: " + sec.allIds.join(", ") + ". Shown above for this focus: " + (sec.shownIds.join(", ") || "none") + ". Review the full packet's `conflicts` array before treating any figure above as settled.)_");
      }
    });

    lines.push("\n### Full source list");
    model.sourceReferences.forEach(function (s) {
      lines.push("- `" + s.file + "` — " + s.description);
    });

    lines.push("\n---\n_This briefing is generated entirely from the negotiation packet. It does not recommend which offer to make or accept — that decision is the account executive's. Fictional classroom exercise; not real Salesforce or Marriott information._");

    return lines.join("\n");
  }

  return {
    VALID_FOCUS: VALID_FOCUS,
    FOCUS_LABELS: FOCUS_LABELS,
    matchesFocus: matchesFocus,
    fmtSource: fmtSource,
    buildBriefingModel: buildBriefingModel,
    renderMarkdown: renderMarkdown
  };
});
