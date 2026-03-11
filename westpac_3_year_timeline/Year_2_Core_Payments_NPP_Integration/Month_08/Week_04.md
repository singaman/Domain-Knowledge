# Year 2 - Month 8 - Week 4

**Epic Focus:** Real-Time Payment Initiation (ISO 20022 pacs.008)

## Sprint Goals
- Facilitate instant Osko payments via the mobile app.
- Translate JSON requests into ISO 20022 XML formats.
- Implement rigorous pre-flight validation rules.

## Jira Stories & Tasks Worked On

### 1. WBC-10201: Pre-flight Payment Validation Logic
- **Story Points:** 8
- **Status:** Done
- **Technical Implementation:**
  - Implemented business logic to verify sufficient funds and check Daily Payment Limits ($10,000 max) before sending the payment.
  - Checked the destination account against the OFAC sanctions list to block illicit transfers.
  - Returned rich error descriptions to the mobile app (e.g., "Insufficient Funds", "Limit Exceeded") rather than generic HTTP 500s.

### 2. WBC-10202: Duplicate Payment Detection
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Generated unique idempotency keys per transaction based on device ID, timestamp, and amount.
  - Stored payment execution hashes in Redis for 24 hours to aggressively reject duplicate payment submissions within milliseconds.
  - Conducted chaos engineering experiments to verify the idempotency layer under extreme network latency.

## Agile Ceremonies Attended
- **Daily Standup:** 15 mins daily (Reported on what I did yesterday, what I will do today, and any technical blockers).
- **Sprint Planning:** 2 hours at the start of the week (Estimated story points using planning poker).
- **Sprint Retrospective:** 1 hour at the end of the 2-week sprint cycle (Discussed what went well and areas for process improvement).
- **Backlog Grooming:** Refined upcoming stories for Real-Time Payment Initiation (ISO 20022 pacs.008).
