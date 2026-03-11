# Year 2 - Month 12 - Week 2

**Epic Focus:** Compliance and Audit Logging

## Sprint Goals
- Track every single change made to a Bank Guarantee.
- Ensure the actual status update AND the log update happen simultaneously.
- Provide history reports.

## Jira Stories & Tasks Worked On

### 1. WBC-30234: Atomic Database Transactions
- **Story Points:** 8
- **Status:** Done
- **Technical Implementation:**
  - Wrapped the workflow approval updates using SQL Database Transactions (`BEGIN...COMMIT`).
  - Ensured that updating the guarantee to `Completed` AND inserting the `Audit_Log` row happened simultaneously.
  - If the Audit log failed to save, the transaction rolled back entirely, ensuring regulatory compliance was never breached.

### 2. WBC-30235: History Fetching endpoint
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
