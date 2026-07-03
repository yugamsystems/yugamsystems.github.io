# Yugam AI Transformation — Engagement SOP
**Version:** 1.0  
**Date:** 3 July 2026  
**Status:** Working draft — to be fleshed out with workbooks, templates, comms, and stakeholder management detail at each phase

---

## Purpose

This SOP defines how a Yugam AI transformation engagement is structured and delivered. It is the operational reference document for running live engagements — not a marketing description of the methodology.

Every engagement uses this framework as its backbone. Not every phase runs in every engagement. Entry point and scope are agreed in the initial scoping conversation based on where the client is.

---

## Scope

Applies to all three engagement tiers:
- **Assess** — Phases 1 (and optionally 2)
- **Build** — Phases 2, 3, and 4
- **Train** — Phase 5 (can be standalone or follow Build)
- **Full engagement** — all six phases, Phases 1 through 6

---

## Roles

| Role | Who | Responsibility |
|---|---|---|
| Engagement Lead | Rohit Maskara | Accountable for all six phases; sole delivery resource for Assess and smaller Build engagements |
| Specialist Contractors | Brought in per engagement | Data engineers, developers, domain specialists — engaged at Phase 3 start if required; scoped and briefed before Phase 2 closes |
| Client Sponsor | Named executive at client | Single point of authority; approves phase gates and major decisions |
| Client Operations Lead | Named manager at client | Day-to-day coordination; facilitates access to people and data |
| Super-users | 2–3 per team, identified in Phase 5 | Internal champions post-handover |

---

## Decision Gates

Each phase ends with a formal decision gate before the next phase begins. Gate is a written brief (not a meeting), reviewed and signed off by the Client Sponsor.

Gate outputs:
- What was completed in the current phase
- What was found or decided
- Go/no-go recommendation for next phase
- Any scope changes to note

---

## Phase 1 — Discovery & Assessment

**Duration:** 2–4 weeks  
**Applies to:** All engagements (entry point for Assess tier)  
**Objective:** Understand how the business actually operates — people, processes, data, and technology — before recommending anything.

### Steps

| # | Step | Duration | Output |
|---|---|---|---|
| 1.1 | Stakeholder interviews | 3–5 days | Interview notes; verbatim quotes organised by theme |
| 1.2 | Business & operations mapping | 2–3 days | Process map; list of decision points and bottlenecks |
| 1.3 | Technology & systems audit | 2–3 days | Systems inventory; data flow diagram; cost summary |
| 1.4 | Data audit | 3–5 days | Data inventory; quality assessment; ownership matrix |
| 1.5 | Opportunity mapping | 2–3 days | Scored opportunity register (impact × feasibility × data × time-to-value) |
| 1.6 | Go/no-go recommendation | 2–3 days | Written recommendation brief with proposed sequencing and preliminary cost range |

### Who to interview (1.1)
- CEO / MD — strategic priorities, pressure points, AI appetite
- COO / Operations lead — process bottlenecks, manual work volume, team structure
- Finance lead — cost structure, budget authority, ROI expectations
- IT / Systems lead — current stack, integration constraints, data infrastructure
- Team managers (2–3) — day-to-day friction, what takes longest, what breaks most
- Frontline staff (3–5) — what they actually spend time on; where the workarounds live

### Data audit checklist (1.4)
- [ ] Where is data stored? (databases, spreadsheets, email, paper, cloud)
- [ ] Who owns each data source?
- [ ] Is data structured, semi-structured, or unstructured?
- [ ] What is the update frequency?
- [ ] Are there access controls? Who can read/write?
- [ ] Is data documented (data dictionary, schema)?
- [ ] Are there known quality issues (duplicates, gaps, inconsistencies)?
- [ ] Is data subject to regulatory requirements (GDPR, PDPA, industry-specific)?

### Opportunity scoring criteria (1.5)
Rate each candidate 1–5 on each dimension. Weighted total = priority score.

| Dimension | Weight | What it measures |
|---|---|---|
| Business impact | 30% | Value if the problem is solved (revenue, cost, time, risk) |
| Feasibility | 25% | Technical and organisational complexity to implement |
| Data readiness | 25% | Quality and accessibility of data required |
| Time to value | 20% | How quickly a result can be demonstrated |

### Exit criteria
- [ ] All six steps complete
- [ ] Opportunity register has at least 3 scored candidates
- [ ] Go/no-go brief written and reviewed with Client Sponsor
- [ ] Phase 1 gate signed off

---

## Phase 2 — Strategy & Planning

**Duration:** 2–4 weeks (overlaps with Phase 1 end)  
**Applies to:** Assess (optional) and Build engagements  
**Objective:** Convert Phase 1 findings into a committed plan with selected use cases, confirmed tools, defined architecture, and a signed-off budget before any build work starts.

### Steps

| # | Step | Duration | Output |
|---|---|---|---|
| 2.1 | AI strategy design | 1 week | Use case selection brief; build/buy/configure decision per use case; sequencing rationale |
| 2.2 | Vendor & tool evaluation | 3–5 days | Evaluation scorecard; shortlist with rationale; recommended tool per use case |
| 2.3 | Architecture design | 3–5 days | Architecture diagram; data flow design; integration spec; security model |
| 2.4 | Business case & full cost model | 2–3 days | Total cost model (licences + internal time + data prep + training + maintenance); ROI projection |
| 2.5 | Baseline measurement | 1–2 days | Baseline metrics captured and documented (before numbers for ROI proof) |
| 2.6 | Risk register | 1–2 days | Risk register with likelihood, impact, and mitigation for each risk |
| 2.7 | Governance & compliance review | 1–2 days | Compliance checklist; audit trail design; data privacy assessment |
| 2.8 | Stakeholder & change management plan | 1–2 days | Stakeholder map; resistance assessment; communication plan; sponsor alignment |

### Baseline metrics to capture (2.5)
Document the current-state numbers for each process being automated or changed:
- Time per task (hours/minutes)
- Volume per period (daily, weekly, monthly)
- Error rate or rework rate
- Cost per unit or per transaction
- Response time or cycle time
- Manual headcount involved

*These numbers are the foundation of the post-engagement ROI report. Without them, ROI is an estimate. With them, it's a fact.*

### Risk register categories (2.6)
- **Technical risks** — integration failures, model accuracy, data pipeline issues
- **Data risks** — quality degradation, access changes, regulatory gaps
- **Change management risks** — team resistance, adoption failure, champion departure
- **Vendor risks** — pricing changes, product pivots, support quality
- **Commercial risks** — budget changes, sponsor turnover, scope creep

### Vendor evaluation scorecard (2.2)
Rate each vendor 1–5 on each criterion:

| Criterion | Weight |
|---|---|
| Fit to specific use case requirements | 25% |
| Integration with existing systems | 20% |
| Data security and compliance | 20% |
| Total cost of ownership (3-year) | 15% |
| Vendor stability and support quality | 10% |
| Implementation complexity | 10% |

### Exit criteria
- [ ] Use cases selected and sequenced
- [ ] Tools confirmed — vendor contracts initiated if needed
- [ ] Architecture signed off by IT / Systems lead
- [ ] Full cost model reviewed by Finance lead
- [ ] Baseline metrics captured and documented
- [ ] Risk register complete
- [ ] Compliance checklist complete
- [ ] Stakeholder plan signed off by Client Sponsor
- [ ] Phase 2 gate signed off; budget approved for Phase 3

---

## Phase 3 — Build & Pilot

**Duration:** 8–16 weeks  
**Applies to:** Build engagements  
**Objective:** Build and validate the AI system in a controlled environment before full deployment.

*Duration is highly variable. The data preparation step is the most common source of delays — the Phase 1 data audit should have surfaced the risk; Phase 3 planning should account for it explicitly.*

### Steps

| # | Step | Duration | Output |
|---|---|---|---|
| 3.1 | Data preparation | 2–4 weeks | Clean, structured, accessible data ready for AI use |
| 3.2 | Solution development | 4–8 weeks | Working AI system — configured, integrated, and internally tested |
| 3.3 | Internal QA & testing | 1–2 weeks | QA report; pass/fail against test cases defined in Phase 2 |
| 3.4 | Controlled pilot | 2–4 weeks | Pilot results report; performance vs. baseline; issues log |
| 3.5 | Post-pilot iteration | 1–2 weeks | Updated system; documented changes; scale/redesign decision |
| 3.6 | Hypercare period | 2–4 weeks | Incident log; resolution record; system stabilised |

### Hypercare protocol (3.6)
During the first 2–4 weeks post-go-live:
- Daily check-in with Client Operations Lead (15 min)
- Issue triage within 4 hours of report
- Weekly summary to Client Sponsor
- Formal exit from hypercare when: zero P1 incidents for 5 consecutive business days AND adoption rate above agreed threshold

### Exit criteria
- [ ] QA test cases all passed or exceptions documented and accepted
- [ ] Pilot results reviewed with Client Sponsor
- [ ] Scale decision made (proceed / redesign / stop)
- [ ] Hypercare period complete
- [ ] System running stably in production
- [ ] Phase 3 gate signed off

---

## Phase 4 — Measurement & Governance

**Duration:** 2–3 weeks (runs in parallel with Phase 3)  
**Applies to:** Build engagements  
**Objective:** Build the reporting infrastructure and governance framework while the AI system is being developed — so both are live on day one of production.

### Steps

| # | Step | Duration | Output |
|---|---|---|---|
| 4.1 | Executive dashboard | 3–5 days | Live dashboard showing agreed KPIs; accessible to Client Sponsor |
| 4.2 | Automated alerts & anomaly detection | 2–3 days | Alert rules configured; escalation path documented |
| 4.3 | Reporting cadence & templates | 2–3 days | Weekly ops report template; monthly executive report template; owner assigned |
| 4.4 | Data governance framework | 2–3 days | Data ownership register; access control policy; quality check schedule |
| 4.5 | ROI documentation | 1–2 days | ROI report template with Phase 2 baseline pre-populated; updated at handover |

### Dashboard design principles (4.1)
The executive dashboard should answer three questions at a glance:
1. Is the AI system running? (system health)
2. Is it delivering against the baseline? (performance vs. target)
3. Is anything flagging attention? (alerts and anomalies)

Resist the temptation to show everything the system tracks. Build to the three questions above.

### Exit criteria
- [ ] Dashboard live and reviewed with Client Sponsor
- [ ] Alert rules tested and confirmed
- [ ] Report templates complete and owner assigned
- [ ] Data governance policy reviewed by IT lead
- [ ] ROI template complete with baseline pre-populated

---

## Phase 5 — Training & Enablement

**Duration:** 4–8 weeks (can follow Phase 3 or run as standalone Train engagement)  
**Applies to:** Train engagements (standalone or following Build)  
**Objective:** Make the change stick. A working AI system that the team doesn't use is a failed AI implementation.

### Steps

| # | Step | Duration | Output |
|---|---|---|---|
| 5.1 | Role-based needs assessment | 1 week | Training needs matrix by role; identified skill gaps |
| 5.2 | SOP rewrite | 1–2 weeks | Updated SOPs for all AI-augmented workflows |
| 5.3 | Training material development | 1 week | Role-specific playbooks; quick reference guides; worked examples |
| 5.4 | Executive briefings | 2–3 sessions | Leadership briefing pack; governance reference card |
| 5.5 | Team workshops | 2–4 weeks | Completed training by role; attendance and exercise completion records |
| 5.6 | Super-user programme | 1 week setup + ongoing | 2–3 super-users per team identified, trained, and confirmed in role |
| 5.7 | Adoption measurement | 4–6 weeks ongoing | Weekly usage report; adoption rate vs. target; intervention log if needed |

### Super-user selection criteria (5.6)
A super-user is not the most senior person. Look for:
- Uses the system daily
- Comfortable helping colleagues with tools
- Trusted by peers — not just management-nominated
- Willing to escalate issues clearly when they find them

### Adoption measurement framework (5.7)
Define the following before training starts:
- **Active users** — how many people are expected to use the system daily/weekly?
- **Target adoption rate** — what % should be using it at 30/60/90 days post-training?
- **Usage proxy** — what action in the system counts as "used"? (login alone is not enough)
- **Intervention trigger** — at what adoption rate does a follow-up action kick in?

Weekly adoption report format:
| Week | Active users | Adoption rate | Target | Gap | Action |
|---|---|---|---|---|---|

### Exit criteria
- [ ] All target roles trained (attendance records complete)
- [ ] SOPs updated and distributed
- [ ] Super-users confirmed and briefed
- [ ] Adoption rate at or above 60-day target
- [ ] Phase 5 gate signed off

---

## Phase 6 — Handover & Close

**Duration:** 2–3 weeks  
**Applies to:** All Build and full engagements  
**Objective:** Transfer full operational ownership to the client. The engagement closes only when the client can operate independently.

### Steps

| # | Step | Duration | Output |
|---|---|---|---|
| 6.1 | Documentation package | 1 week | Runbooks; architecture diagrams; vendor contacts; maintenance schedule; troubleshooting guide |
| 6.2 | Internal ownership transfer | 2–3 days | Signed ownership register (system → named owner); escalation path documented; vendor contacts transferred |
| 6.3 | Executive handover session | Half day | Handover presentation; signed-off ROI report; 90-day plan |
| 6.4 | 90-day post-engagement review | 1 session (at day 90) | Post-engagement review notes; any follow-up actions agreed |
| 6.5 | Optional retainer scope | As agreed | Retainer agreement with defined scope, SLA, and pricing (if applicable) |

### Documentation package checklist (6.1)
- [ ] System architecture diagram (current state)
- [ ] Data flow diagram
- [ ] Runbook: daily operations
- [ ] Runbook: monthly maintenance
- [ ] Runbook: incident response
- [ ] Vendor contact list with account details and SLA reference
- [ ] Licence inventory with renewal dates
- [ ] Known issues log with status
- [ ] Super-user contact list
- [ ] Escalation path (internal → Yugam retainer if applicable)

### Handover session agenda (6.3)
1. What was built — system overview (10 min)
2. What it returned — ROI report review (15 min)
3. What to watch — dashboard walkthrough and alert thresholds (10 min)
4. Who owns what — ownership register review (10 min)
5. Next 90 days — plan and check-in date confirmed (10 min)
6. Sign-off (5 min)

### 90-day review agenda (6.4)
1. Is the system still running as expected?
2. Has adoption held above the Phase 5 targets?
3. Any data quality drift observed?
4. Any alerts triggered — and how were they handled?
5. Any new use cases or opportunities surfaced?
6. Is the client operating independently, or is additional support needed?

### Exit criteria
- [ ] Documentation package complete and handed over
- [ ] Ownership register signed by Client Sponsor
- [ ] Handover session complete
- [ ] 90-day review date confirmed
- [ ] Retainer agreement in place if applicable
- [ ] Engagement formally closed

---

## Appendix A — Engagement Entry Points

| Client situation | Recommended entry | Phases |
|---|---|---|
| No AI in place, not sure where to start | Phase 1 | 1 (and optionally 2) |
| Has a strategy, needs someone to build | Phase 2 | 2, 3, 4 |
| System built, team not using it | Phase 5 | 5 (standalone Train) |
| Full transformation from scratch | Phase 1 | 1 → 2 → 3 → 4 → 5 → 6 |
| Existing engagement — add governance | Phase 4 | 4 (standalone) |

---

## Appendix B — Future Additions (v2+)

The following will be developed and added to subsequent versions of this SOP:

- [ ] **Phase 1 workbook** — interview question bank, observation framework, opportunity scoring template
- [ ] **Phase 2 workbook** — vendor evaluation scorecard (live), architecture decision record template, cost model spreadsheet
- [ ] **Phase 3 workbook** — QA test case template, pilot measurement tracker, hypercare incident log
- [ ] **Phase 4 workbook** — dashboard design brief, alert configuration guide, governance policy template
- [ ] **Phase 5 workbook** — training needs matrix, SOP rewrite template, super-user onboarding guide, adoption tracker
- [ ] **Phase 6 workbook** — documentation package template, handover presentation deck, 90-day review framework
- [ ] **Comms templates** — kickoff email, weekly status update, phase gate brief, stakeholder announcement
- [ ] **Stakeholder management guide** — resistance patterns and responses, executive communication cadence, sponsor briefing format
- [ ] **Risk management playbook** — standard risk register, escalation triggers, incident response protocol
- [ ] **Pricing guide** — day rate, phase-level pricing bands, retainer structure

---

*This document is an internal Yugam operational reference. Not for client distribution.*
