# Year 1 - Month 1 - Week 1

**Epic Focus:** Building the Foundation: REST APIs & Forms

## Sprint Goals
- Get the basic Bank Guarantee digital form working.
- Set up the Node.js/Express repository.
- Connect the APIs to the PostgreSQL database.

## Jira Stories & Tasks Worked On

### 1. WBC-30001: Database Schema Design (TypeORM)
- **Story Points:** 8
- **Status:** Done
- **Technical Implementation:**
  - Designed the core `Bank_Guarantees` table in PostgreSQL.
  - Added columns like `amount`, `customer_details`, and specifically the `status` column (Draft, Pending Review, etc.).
  - Used TypeORM to handle database migrations securely.

### 2. WBC-30002: Repository Setup and Boilerplate
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Initialized the Node.js project using Express (or NestJS).
  - Set up Environment variables, strict TypeScript linting rules, and local Docker containers for PostgreSQL.
  - Wrote the first GET and POST REST APIs to test database connectivity.

## Agile Ceremonies Attended
- **Daily Standup:** 15 mins daily (Reported on what I did yesterday, what I will do today, and any technical blockers).
- **Sprint Planning:** 2 hours at the start of the week (Estimated story points using planning poker).
- **Sprint Retrospective:** 1 hour at the end of the 2-week sprint cycle (Discussed what went well and areas for process improvement).
- **Backlog Grooming:** Refined upcoming stories for Building the Foundation: REST APIs & Forms.
