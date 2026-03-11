# Year 2 - Month 11 - Week 4

**Epic Focus:** Compliance and Audit Logging

## Sprint Goals
- Track every single change made to a Bank Guarantee.
- Ensure the actual status update AND the log update happen simultaneously.
- Provide history reports.

## Jira Stories & Tasks Worked On

### 1. WBC-30229: Audit Log Schema Design
- **Story Points:** 3
- **Status:** Done
- **Technical Implementation:**
  - Created a strictly insert-only `Audit_Logs` table.
  - Captured the timestamp, the User ID performing the action, the `Old_State`, and the `New_State`.

### 2. WBC-30230: History Fetching endpoint
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Built an API for Managers to fetch the complete chronological audit history of a guarantee from creation to completion.
  - Added cursor-based pagination to handle cases where a heavily-debated guarantee had hundreds of historical log entries.

## Agile Ceremonies Attended
- **Daily Standup:** 15 mins daily (Reported on what I did yesterday, what I will do today, and any technical blockers).
- **Sprint Planning:** 2 hours at the start of the week (Estimated story points using planning poker).
- **Sprint Retrospective:** 1 hour at the end of the 2-week sprint cycle (Discussed what went well and areas for process improvement).
- **Backlog Grooming:** Refined upcoming stories for Compliance and Audit Logging.
