# Year 2 - Month 2 - Week 3

**Epic Focus:** PayID Lookup and Resolution API

## Sprint Goals
- Integrate with the central NPP addressing service.
- Provide low-latency resolution of PayIDs to account names.
- Protect against malicious directory harvesting attacks.

## Jira Stories & Tasks Worked On

### 1. WBC-10139: Redis Caching Layer for PayID Resolution
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Implemented a Redis caching layer using Node.js to store resolved PayIDs with a short TTL (Time-To-Live).
  - Designed cache-fallback logic: hit Redis first, on cache-miss query the central NPP service, then populate Redis.
  - Used Redis pipelines to batch multiple lookup requests from bulk payment files.

### 2. WBC-10140: NPP Central Service Integration
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Wrote robust HTTP clients with exponential backoff to handle transient network issues with the central NPP addressing service.
  - Masked partial phone numbers and emails in the response to comply with Westpac privacy standards.
  - Added extensive endpoint monitoring using Datadog APM.

## Agile Ceremonies Attended
- **Daily Standup:** 15 mins daily (Reported on what I did yesterday, what I will do today, and any technical blockers).
- **Sprint Planning:** 2 hours at the start of the week (Estimated story points using planning poker).
- **Sprint Retrospective:** 1 hour at the end of the 2-week sprint cycle (Discussed what went well and areas for process improvement).
- **Backlog Grooming:** Refined upcoming stories for PayID Lookup and Resolution API.
