# Year 1 - Month 6 - Week 2

**Epic Focus:** Bank Guarantee Workflow Engine & State Machine

## Sprint Goals
- Implement a strict state machine preventing invalid workflow transitions.
- Develop the core actions: Submit, Approve, Reject, Needs More Info.
- Build out an atomic audit logging mechanism.

## Jira Stories & Tasks Worked On

### 1. WBC-20056: Atomic Transactions & Audit Logging
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Ensured compliance by wrapping state transition updates inside a database transaction (`BEGIN...COMMIT`).
  - Simultaneously inserted an immutable `AuditLog` row tracking the exact Timestamp, User ID, Previous State, and New State alongside every status update.
  - Prevented "dirty reads" during concurrent reviewer actions.

### 2. WBC-20057: Reviewer Approval & Progression Chain
- **Story Points:** 8
- **Status:** Done
- **Technical Implementation:**
  - Developed the core approval endpoints. If Reviewer 1 approved, updated the state to PENDING_REVIEWER_2.
  - If Reviewer 2 approved, transitioned the state to PENDING_BANKER (finalizing stage).
  - Handled Rejection pathways: Reverted the state back to DRAFT or PENDING_BANKER for corrections, clearing temporary assigned reviewers.

## Agile Ceremonies Attended
- **Daily Standup:** 15 mins daily (Reported on what I did yesterday, what I will do today, and any technical blockers).
- **Sprint Planning:** 2 hours at the start of the week (Estimated story points using planning poker).
- **Sprint Retrospective:** 1 hour at the end of the 2-week sprint cycle (Discussed what went well and areas for process improvement).
- **Backlog Grooming:** Refined upcoming stories for Bank Guarantee Workflow Engine & State Machine.
