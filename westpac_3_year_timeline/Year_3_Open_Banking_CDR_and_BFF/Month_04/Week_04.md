# Year 3 - Month 4 - Week 4

**Epic Focus:** Performance Optimization: Dynamic Dashboards

## Sprint Goals
- Speed up the loading time of the massive Reviewer dashboards.
- Fix database N+1 querying issues causing slowness.
- Aggregate data properly.

## Jira Stories & Tasks Worked On

### 1. WBC-30279: Fixing the N+1 Query Problem
- **Story Points:** 8
- **Status:** Done
- **Technical Implementation:**
  - Identified that fetching 100 Bank Guarantees was causing the API to make 100 separate Database queries to fetch the "Assignee User Profile" for each row.
  - Implemented a `dataloader` (or batching SQL queries using `WHERE id IN (...)`) to collapse the 100 queries down to just 2 efficient queries.

### 2. WBC-30280: Pagination and Searching
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Optimized database indexes to allow Reviewers to quickly perform partial text-searches on "Customer Names" or filter by "Urgency" without causing full-table scans.

## Agile Ceremonies Attended
- **Daily Standup:** 15 mins daily (Reported on what I did yesterday, what I will do today, and any technical blockers).
- **Sprint Planning:** 2 hours at the start of the week (Estimated story points using planning poker).
- **Sprint Retrospective:** 1 hour at the end of the 2-week sprint cycle (Discussed what went well and areas for process improvement).
- **Backlog Grooming:** Refined upcoming stories for Performance Optimization: Dynamic Dashboards.
