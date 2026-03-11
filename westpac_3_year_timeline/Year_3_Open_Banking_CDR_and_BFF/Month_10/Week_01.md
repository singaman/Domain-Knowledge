# Year 3 - Month 10 - Week 1

**Epic Focus:** System Upgrades & Technical Debt Eradication

## Sprint Goals
- Upgrade major frameworks and dependencies safely.
- Enforce deeper security patching.
- Ensure zero downtime during internal deployments.

## Jira Stories & Tasks Worked On

### 1. WBC-20340: Major Version Node.js and NestJS Upgrades
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Operated a major dependency overhaul moving the monolithic API from Node 14/Express to Node 18/NestJS.
  - Refactored legacy Callback and Promise chains entirely into modern `async/await` patterns across the workflow engine.
  - Replaced deprecated libraries (e.g., swapping `request` for `axios`) ensuring no breaking changes to the frontend contracts.

### 2. WBC-20341: Zero Downtime Deployment Strategy Implementation
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Configured Kubernetes Readiness and Liveness probes to support seamless rolling updates.
  - Ensured that in-flight Bank Guarantee workflow approvals (e.g., active Database Transactions) completed within a graceful shutdown window before a Pod was terminated.
  - Documented deployment runbooks minimizing disruption for internal business users.

## Agile Ceremonies Attended
- **Daily Standup:** 15 mins daily (Reported on what I did yesterday, what I will do today, and any technical blockers).
- **Sprint Planning:** 2 hours at the start of the week (Estimated story points using planning poker).
- **Sprint Retrospective:** 1 hour at the end of the 2-week sprint cycle (Discussed what went well and areas for process improvement).
- **Backlog Grooming:** Refined upcoming stories for System Upgrades & Technical Debt Eradication.
