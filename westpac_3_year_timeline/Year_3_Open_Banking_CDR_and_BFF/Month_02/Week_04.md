# Year 3 - Month 2 - Week 4

**Epic Focus:** CDR Account & Transaction APIs (Read-Only)

## Sprint Goals
- Implement standards mandated by the Australian Data Standards Body.
- Serve massive amounts of transaction history efficiently.
- Ensure strict uptime and performance SLAs.

## Jira Stories & Tasks Worked On

### 1. WBC-10262: Data Masking and Transformation Layer
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Implemented response interceptors to strip out internal bank reference codes and format the output entirely to the open banking DSB specification.
  - Masked standard account numbers (BSB/Account) replacing them with unique masked identifiers as required.
  - Wrote automated contract tests using Postman/Newman to verify DSB schema compliance.

### 2. WBC-10263: High-Availability Database Read Replicas
- **Story Points:** 3
- **Status:** Done
- **Technical Implementation:**
  - Configured the TypeORM connections to direct all Open Banking read traffic to dedicated read-replicas, isolating analytical load from core banking transactions.
  - Implemented logic to handle replica-lag scenarios and fallback mechanisms.
  - Monitored database connection pools strictly to avoid exhausting max connections during traffic spikes.

## Agile Ceremonies Attended
- **Daily Standup:** 15 mins daily (Reported on what I did yesterday, what I will do today, and any technical blockers).
- **Sprint Planning:** 2 hours at the start of the week (Estimated story points using planning poker).
- **Sprint Retrospective:** 1 hour at the end of the 2-week sprint cycle (Discussed what went well and areas for process improvement).
- **Backlog Grooming:** Refined upcoming stories for CDR Account & Transaction APIs (Read-Only).
