# Year 1 - Month 5 - Week 3

**Epic Focus:** Account Provisioning Service & Saga Pattern

## Sprint Goals
- Automate bank account creation in the core banking system.
- Implement distributed transaction handling using the Saga pattern.
- Handle Rollbacks gracefully to prevent data anomalies.

## Jira Stories & Tasks Worked On

### 1. WBC-10048: Implement Saga Pattern for Everyday and Savings Account Creation
- **Story Points:** 8
- **Status:** Done
- **Technical Implementation:**
  - Implemented distributed transactions: if the Everyday account succeeded but the Savings account failed, triggered a compensating transaction.
  - Ensured idempotency on the account creation API to avoid creating duplicate bank accounts on network retries.
  - Wrote extensive Jest unit tests to mock failures and verify rollback execution.

### 2. WBC-10049: Core Banking API Integration (Hogan / 10x)
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Built a microservice mapping the onboarding API payload to the legacy core banking system requirements.
  - Used class-validator to ensure all mandatory fields (BSB, Account Type, Customer ID) were present.
  - Implemented an anti-corruption layer to isolate legacy XML formats from our modern JSON REST boundaries.

## Agile Ceremonies Attended
- **Daily Standup:** 15 mins daily (Reported on what I did yesterday, what I will do today, and any technical blockers).
- **Sprint Planning:** 2 hours at the start of the week (Estimated story points using planning poker).
- **Sprint Retrospective:** 1 hour at the end of the 2-week sprint cycle (Discussed what went well and areas for process improvement).
- **Backlog Grooming:** Refined upcoming stories for Account Provisioning Service & Saga Pattern.
