# Year 3 - Month 10 - Week 3

**Epic Focus:** Mobile App BFF (Backend-For-Frontend) Aggregator

## Sprint Goals
- Reduce network chatter for the mobile application.
- Provide a unified GraphQL/REST interface.
- Handle downstream service failures gracefully.

## Jira Stories & Tasks Worked On

### 1. WBC-10341: Promise.allSettled & Graceful Degradation
- **Story Points:** 8
- **Status:** Done
- **Technical Implementation:**
  - Utilized `Promise.allSettled()` to fetch data concurrently instead of sequentially, reducing the dashboard load time from 2s to 600ms.
  - Implemented graceful degradation: If the "Rewards" microservice experienced an outage, the API still returned the Account balances successfully with a "partial data" flag.
  - Implemented Redis caching for relatively static data (like user profile info) to further improve latency.

### 2. WBC-10342: GraphQL Dashboard Aggregation Service
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Implemented a Node.js/Apollo Server layer acting as the BFF for the mobile app.
  - Aggregated data from 5 different backend microservices (Accounts, Loans, Cards, Rewards, Notifications) into a single query.
  - Reduced mobile client overhead by filtering out unnecessary payloads and sending exact requested shapes.

## Agile Ceremonies Attended
- **Daily Standup:** 15 mins daily (Reported on what I did yesterday, what I will do today, and any technical blockers).
- **Sprint Planning:** 2 hours at the start of the week (Estimated story points using planning poker).
- **Sprint Retrospective:** 1 hour at the end of the 2-week sprint cycle (Discussed what went well and areas for process improvement).
- **Backlog Grooming:** Refined upcoming stories for Mobile App BFF (Backend-For-Frontend) Aggregator.
