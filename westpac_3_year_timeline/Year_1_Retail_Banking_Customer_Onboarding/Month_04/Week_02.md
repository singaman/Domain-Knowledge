# Year 1 - Month 4 - Week 2

**Epic Focus:** Digital Identity Verification (KYC/AML) API

## Sprint Goals
- Implement core KYC checks using third-party providers (Equifax/GreenID).
- Ensure strict adherence to AML regulations.
- Build asynchronous event queues for long-running verification processes.

## Jira Stories & Tasks Worked On

### 1. WBC-10037: Design and Implement KYC Provider Interfaces
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Created TypeScript interfaces for bridging multiple identity providers (Equifax, GreenID).
  - Used NestJS HttpModule to handle outbound REST calls to Equifax endpoints.
  - Built robust error handling to catch timeout errors from external SOAP APIs and initiate retries.

### 2. WBC-10038: Database Schema Design for Customer Onboarding States
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Designed PostgreSQL schemas (using TypeORM) to track the state of a customer onboarding application (e.g., PENDING, APPROVED, REJECTED).
  - Stored audit logs of all state transitions to satisfy regulatory compliance requirements.
  - Masked PII (Personally Identifiable Information) before storing sensitive documents.

## Agile Ceremonies Attended
- **Daily Standup:** 15 mins daily (Reported on what I did yesterday, what I will do today, and any technical blockers).
- **Sprint Planning:** 2 hours at the start of the week (Estimated story points using planning poker).
- **Sprint Retrospective:** 1 hour at the end of the 2-week sprint cycle (Discussed what went well and areas for process improvement).
- **Backlog Grooming:** Refined upcoming stories for Digital Identity Verification (KYC/AML) API.
