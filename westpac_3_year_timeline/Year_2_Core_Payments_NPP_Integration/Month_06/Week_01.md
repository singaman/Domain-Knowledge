# Year 2 - Month 6 - Week 1

**Epic Focus:** Complex Locking and Concurrency Management

## Sprint Goals
- Prevent multiple Reviewers from simultaneously acting on the exact same Bank Guarantee.
- Implement Pessimistic/Optimistic database locks.
- Enhance application stability under high load.

## Jira Stories & Tasks Worked On

### 1. WBC-20175: Caching Common Dictionary/Dropdown Data
- **Story Points:** 3
- **Status:** Done
- **Technical Implementation:**
  - Implemented Redis caching for static dropdown data used across the Bank Guarantee forms (e.g., "Guarantee Types", "Approved Currency Codes").
  - Reduced load on the PostgreSQL database for highly read, rarely mutated configuration tables.
  - Added immediate cache invalidation whenever a system admin added a new Guarantee Type.

### 2. WBC-20176: Optimistic Concurrency Control (ETags)
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Implemented Optimistic Locking using the `version` column in the database schema.
  - When updating comments or transitioning state, the API checked if the requested `version` matched the database `version`.
  - Prevented the "Lost Update" problem where a Banker's save action overwrites a Reviewer's simultaneous approval by throwing an Http 412 Precondition Failed.

## Agile Ceremonies Attended
- **Daily Standup:** 15 mins daily (Reported on what I did yesterday, what I will do today, and any technical blockers).
- **Sprint Planning:** 2 hours at the start of the week (Estimated story points using planning poker).
- **Sprint Retrospective:** 1 hour at the end of the 2-week sprint cycle (Discussed what went well and areas for process improvement).
- **Backlog Grooming:** Refined upcoming stories for Complex Locking and Concurrency Management.
