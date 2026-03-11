# Year 2 - Month 7 - Week 2

**Epic Focus:** Complex Locking and Concurrency Management

## Sprint Goals
- Prevent multiple Reviewers from simultaneously acting on the exact same Bank Guarantee.
- Implement Pessimistic/Optimistic database locks.
- Enhance application stability under high load.

## Jira Stories & Tasks Worked On

### 1. WBC-20189: Reviewer Assignment and Redis Locks
- **Story Points:** 8
- **Status:** Done
- **Technical Implementation:**
  - Implemented a "Checkout" feature: When Reviewer 1 opens Bank Guarantee #47, the API sets a distributed Redis lock with a TTL of 15 minutes.
  - If a second Reviewer 1 tries to open Guarantee #47, the API returns a `423 Locked` response indicating "Currently being reviewed by John Doe".
  - Built a background Node cron-job to safely release orphaned locks if a reviewer closed their browser tab without clicking "Save".

### 2. WBC-20190: Caching Common Dictionary/Dropdown Data
- **Story Points:** 3
- **Status:** Done
- **Technical Implementation:**
  - Implemented Redis caching for static dropdown data used across the Bank Guarantee forms (e.g., "Guarantee Types", "Approved Currency Codes").
  - Reduced load on the PostgreSQL database for highly read, rarely mutated configuration tables.
  - Added immediate cache invalidation whenever a system admin added a new Guarantee Type.

## Agile Ceremonies Attended
- **Daily Standup:** 15 mins daily (Reported on what I did yesterday, what I will do today, and any technical blockers).
- **Sprint Planning:** 2 hours at the start of the week (Estimated story points using planning poker).
- **Sprint Retrospective:** 1 hour at the end of the 2-week sprint cycle (Discussed what went well and areas for process improvement).
- **Backlog Grooming:** Refined upcoming stories for Complex Locking and Concurrency Management.
