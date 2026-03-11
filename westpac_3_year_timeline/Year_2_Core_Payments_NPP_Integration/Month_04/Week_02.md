# Year 2 - Month 4 - Week 2

**Epic Focus:** The Workflow Engine: Strict State Transitions

## Sprint Goals
- Force the Bank Guarantee to move in a rigid path.
- Prevent a document from skipping the Reviewer 1 phase.
- Handle Approval and Rejection logic.

## Jira Stories & Tasks Worked On

### 1. WBC-30154: Rejection and Feedback Loop
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Built the `PATCH /api/guarantees/:id/reject` endpoint.
  - If a reviewer rejected a document for having bad details, it transitioned strictly backward to the `DRAFT` status and immediately un-assigned the reviewer.

### 2. WBC-30155: State Transition Validator Logic
- **Story Points:** 8
- **Status:** Done
- **Technical Implementation:**
  - Built the brain of the workflow engine. When Reviewer 1 clicks approve, the Node.js API queries the database first.
  - Checked: Is `current_status == "PENDING_REVIEWER_1"`? If yes, update it to `PENDING_REVIEWER_2`.
  - If the status was wrong, the API forcefully aborted the action throwing an `Invalid State Transition` error.

## Agile Ceremonies Attended
- **Daily Standup:** 15 mins daily (Reported on what I did yesterday, what I will do today, and any technical blockers).
- **Sprint Planning:** 2 hours at the start of the week (Estimated story points using planning poker).
- **Sprint Retrospective:** 1 hour at the end of the 2-week sprint cycle (Discussed what went well and areas for process improvement).
- **Backlog Grooming:** Refined upcoming stories for The Workflow Engine: Strict State Transitions.
