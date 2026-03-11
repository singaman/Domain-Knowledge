# Year 3 - Month 1 - Week 4

**Epic Focus:** Performance Optimization: Dynamic Dashboards

## Sprint Goals
- Speed up the loading time of the massive Reviewer dashboards.
- Fix database N+1 querying issues causing slowness.
- Aggregate data properly.

## Jira Stories & Tasks Worked On

### 1. WBC-30249: Backend-For-Frontend (BFF) Aggregation
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - The React dashboard was making 5 slow API calls to load the Bank Guarantee list, user profiles, and document metadata.
  - Built an aggregation API layer (using optimized SQL JOINs or a GraphQL layer) into a single optimized payload.
  - Reduced the overall dashboard loading time from 3 seconds down to 800 milliseconds.

### 2. WBC-30250: Pagination and Searching
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Optimized database indexes to allow Reviewers to quickly perform partial text-searches on "Customer Names" or filter by "Urgency" without causing full-table scans.

## Agile Ceremonies Attended
- **Daily Standup:** 15 mins daily (Reported on what I did yesterday, what I will do today, and any technical blockers).
- **Sprint Planning:** 2 hours at the start of the week (Estimated story points using planning poker).
- **Sprint Retrospective:** 1 hour at the end of the 2-week sprint cycle (Discussed what went well and areas for process improvement).
- **Backlog Grooming:** Refined upcoming stories for Performance Optimization: Dynamic Dashboards.
