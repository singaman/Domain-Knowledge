# Year 3 - Month 9 - Week 1

**Epic Focus:** Mobile App BFF (Backend-For-Frontend) Aggregator

## Sprint Goals
- Reduce network chatter for the mobile application.
- Provide a unified GraphQL/REST interface.
- Handle downstream service failures gracefully.

## Jira Stories & Tasks Worked On

### 1. WBC-10326: GraphQL Dashboard Aggregation Service
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Implemented a Node.js/Apollo Server layer acting as the BFF for the mobile app.
  - Aggregated data from 5 different backend microservices (Accounts, Loans, Cards, Rewards, Notifications) into a single query.
  - Reduced mobile client overhead by filtering out unnecessary payloads and sending exact requested shapes.

### 2. WBC-10327: Circuit Breaker Pattern via Resilience4j/Opossum
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Implemented the Circuit Breaker pattern (using `opossum`) on outgoing requests to fragile legacy downstream services.
  - Prevented cascading failures by automatically opening the circuit when the downstream error rate exceeded 50%.
  - Provided automated "half-open" recovery polling and fallback mock responses when circuits were open.

## Agile Ceremonies Attended
- **Daily Standup:** 15 mins daily (Reported on what I did yesterday, what I will do today, and any technical blockers).
- **Sprint Planning:** 2 hours at the start of the week (Estimated story points using planning poker).
- **Sprint Retrospective:** 1 hour at the end of the 2-week sprint cycle (Discussed what went well and areas for process improvement).
- **Backlog Grooming:** Refined upcoming stories for Mobile App BFF (Backend-For-Frontend) Aggregator.
