# Year 2 - Month 7 - Week 2

**Epic Focus:** Private Commenting System

## Sprint Goals
- Allow Reviewers to leave comments on the Bank Guarantee.
- Ensure Bankers cannot read "Internal Review Only" comments.
- Keep comments securely attached to the workflow.

## Jira Stories & Tasks Worked On

### 1. WBC-30183: Role-Filtered Dashboard API
- **Story Points:** 8
- **Status:** Done
- **Technical Implementation:**
  - Heavily modified the `GET /api/guarantees/:id` endpoint which fetched the full history.
  - If the decoded JWT token belonged to a `Banker`, my Node.js logic explicitly filtered out (removed) any comments flagged as "Internal Review Only" before returning the JSON payload to the frontend, ensuring data privacy.

### 2. WBC-30184: Visibility Flags (Internal Review Only)
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Added a `visibility_scope` boolean to the database.
  - If a Reviewer checked the "Internal Review Only" box on the UI, the API saved this boolean flag as true.

## Agile Ceremonies Attended
- **Daily Standup:** 15 mins daily (Reported on what I did yesterday, what I will do today, and any technical blockers).
- **Sprint Planning:** 2 hours at the start of the week (Estimated story points using planning poker).
- **Sprint Retrospective:** 1 hour at the end of the 2-week sprint cycle (Discussed what went well and areas for process improvement).
- **Backlog Grooming:** Refined upcoming stories for Private Commenting System.
