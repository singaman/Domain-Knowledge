# Year 3 - Month 5 - Week 3

**Epic Focus:** Caching Common Data using Redis

## Sprint Goals
- Stop bombarding PostgreSQL with requests that rarely change.
- Store "Dropdown menus" into fast-memory.
- Reduce overall latency.

## Jira Stories & Tasks Worked On

### 1. WBC-30286: Cache Invalidation Strategies
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Wrote administrative APIs for Managers to update currency rules.
  - Implemented immediate cache invalidation so that when a Manager updated a rule in PostgreSQL, the old rule was immediately evicted from Redis.

### 2. WBC-30287: Redis Implementation for Configuration Data
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Integrated Node.js with a Redis cluster to serve static data used constantly by the forms (e.g., list of Approved Currencies, Guarantee Limits).
  - Drastically reduced database overhead by serving this data directly from memory in 5ms.

## Agile Ceremonies Attended
- **Daily Standup:** 15 mins daily (Reported on what I did yesterday, what I will do today, and any technical blockers).
- **Sprint Planning:** 2 hours at the start of the week (Estimated story points using planning poker).
- **Sprint Retrospective:** 1 hour at the end of the 2-week sprint cycle (Discussed what went well and areas for process improvement).
- **Backlog Grooming:** Refined upcoming stories for Caching Common Data using Redis.
