# Year 1 - Month 9 - Week 1

**Epic Focus:** Data Visibility and Private Commenting System

## Sprint Goals
- Allow multi-user collaboration to exist safely within the same application.
- Implement private commenting visible only to specific roles.
- Develop notification triggers.

## Jira Stories & Tasks Worked On

### 1. WBC-20085: Role-Based Comment Filtering (GET)
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Implemented complex filtering within the `GET /api/guarantees/:id` payload response.
  - If a Banker (Role = Banker) fetched the Bank Guarantee history, the Node.js API explicitly stripped out any comments flagged as "Internal Review Only".
  - If a Reviewer fetched the same Guarantee, they received the full unabridged array of comments.

### 2. WBC-20086: Workflow Asynchronous Notifications via Kafka
- **Story Points:** 3
- **Status:** Done
- **Technical Implementation:**
  - When a Bank Guarantee transitioned to `PENDING_R1`, published a Kafka event (`GuaranteeAssigned`).
  - A separate consumer microservice picked up this event to trigger internal Westpac emails notifying Reviewer 1 that they had a pending task.
  - Ensured the event publisher was resilient, using at-least-once delivery mechanisms.

## Agile Ceremonies Attended
- **Daily Standup:** 15 mins daily (Reported on what I did yesterday, what I will do today, and any technical blockers).
- **Sprint Planning:** 2 hours at the start of the week (Estimated story points using planning poker).
- **Sprint Retrospective:** 1 hour at the end of the 2-week sprint cycle (Discussed what went well and areas for process improvement).
- **Backlog Grooming:** Refined upcoming stories for Data Visibility and Private Commenting System.
