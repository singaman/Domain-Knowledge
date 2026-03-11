# Year 1 - Month 12 - Week 3

**Epic Focus:** Data Visibility and Private Commenting System

## Sprint Goals
- Allow multi-user collaboration to exist safely within the same application.
- Implement private commenting visible only to specific roles.
- Develop notification triggers.

## Jira Stories & Tasks Worked On

### 1. WBC-20121: Private Commenting API Endpoint
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Built a `POST /api/guarantees/:id/comments` endpoint allowing Bankers and Reviewers to leave remarks.
  - Added a `visibility_scope` boolean to comments. Reviewers could check a box to mark their comment as "Internal Review Only".
  - Stored the HTML-sanitized comment payload safely in the database to prevent XSS (Cross-Site Scripting).

### 2. WBC-20122: Workflow Asynchronous Notifications via Kafka
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
