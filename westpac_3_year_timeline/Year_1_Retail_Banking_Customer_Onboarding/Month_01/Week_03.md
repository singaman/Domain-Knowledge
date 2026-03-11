# Year 1 - Month 1 - Week 3

**Epic Focus:** Core Architecture & Role-Based Access Control (RBAC)

## Sprint Goals
- Set up the Node.js API foundation for the Bank Guarantee application.
- Implement rigorous authentication and Multi-Role Access Control.
- Ensure secure internal Single Sign-On (SSO) integration.

## Jira Stories & Tasks Worked On

### 1. WBC-20006: Design and Implement JWT/RBAC Middleware
- **Story Points:** 8
- **Status:** Done
- **Technical Implementation:**
  - Built custom Express.js middleware to decode internal Westpac SSO JWT tokens.
  - Extracted the user role (Banker, Reviewer_1, Reviewer_2) directly from the token payload.
  - Implemented an ACL (Access Control List) guard to ensure Bankers could not access Reviewer approval endpoints, returning 403 Forbidden for unauthorized access attempts.

### 2. WBC-20007: Database Schema Design for Multi-Role Entities
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Designed complex relational PostgreSQL schemas using TypeORM (or Prisma).
  - Created tables mapping Bank Guarantee IDs to User IDs, explicitly linking "Assigned Reviewer" relationships.
  - Optimized database indexes on the `status` and `assigned_to` columns for fast dashboard querying.

## Agile Ceremonies Attended
- **Daily Standup:** 15 mins daily (Reported on what I did yesterday, what I will do today, and any technical blockers).
- **Sprint Planning:** 2 hours at the start of the week (Estimated story points using planning poker).
- **Sprint Retrospective:** 1 hour at the end of the 2-week sprint cycle (Discussed what went well and areas for process improvement).
- **Backlog Grooming:** Refined upcoming stories for Core Architecture & Role-Based Access Control (RBAC).
