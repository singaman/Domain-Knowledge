# Year 3 - Month 11 - Week 4

**Epic Focus:** Mobile App BFF (Backend-For-Frontend) Aggregator

## Sprint Goals
- Reduce network chatter for the mobile application.
- Provide a unified GraphQL/REST interface.
- Handle downstream service failures gracefully.

## Jira Stories & Tasks Worked On

### 1. WBC-10352: Circuit Breaker Pattern via Resilience4j/Opossum
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Implemented the Circuit Breaker pattern (using `opossum`) on outgoing requests to fragile legacy downstream services.
  - Prevented cascading failures by automatically opening the circuit when the downstream error rate exceeded 50%.
  - Provided automated "half-open" recovery polling and fallback mock responses when circuits were open.

### 2. WBC-10353: Promise.allSettled & Graceful Degradation
- **Story Points:** 8
- **Status:** Done
- **Technical Implementation:**
  - Utilized `Promise.allSettled()` to fetch data concurrently instead of sequentially, reducing the dashboard load time from 2s to 600ms.
  - Implemented graceful degradation: If the "Rewards" microservice experienced an outage, the API still returned the Account balances successfully with a "partial data" flag.
  - Implemented Redis caching for relatively static data (like user profile info) to further improve latency.

## Agile Ceremonies Attended
- **Daily Standup:** 15 mins daily (Reported on what I did yesterday, what I will do today, and any technical blockers).
- **Sprint Planning:** 2 hours at the start of the week (Estimated story points using planning poker).
- **Sprint Retrospective:** 1 hour at the end of the 2-week sprint cycle (Discussed what went well and areas for process improvement).
- **Backlog Grooming:** Refined upcoming stories for Mobile App BFF (Backend-For-Frontend) Aggregator.
