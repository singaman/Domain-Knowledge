# Year 1 - Month 3 - Week 4

**Epic Focus:** Core Architecture & Role-Based Access Control (RBAC)

## Sprint Goals
- Set up the Node.js API foundation for the Bank Guarantee application.
- Implement rigorous authentication and Multi-Role Access Control.
- Ensure secure internal Single Sign-On (SSO) integration.

## Jira Stories & Tasks Worked On

### 1. WBC-20028: Database Schema Design for Multi-Role Entities
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Designed complex relational PostgreSQL schemas using TypeORM (or Prisma).
  - Created tables mapping Bank Guarantee IDs to User IDs, explicitly linking "Assigned Reviewer" relationships.
  - Optimized database indexes on the `status` and `assigned_to` columns for fast dashboard querying.

### 2. WBC-20029: Dynamic Dashboard BFF API
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Developed a Backend-For-Frontend (BFF) GET endpoint serving the user's working dashboard.
  - Implemented business logic to dynamically return `allowedActions` (e.g., ["Submit", "Save Draft"]) based on both the user's decoded role and the current workflow state of the guarantee.
  - Supported complex filtering, allowing Reviewers to search assigned guarantees by "Urgency" and "Customer Name".

## Agile Ceremonies Attended
- **Daily Standup:** 15 mins daily (Reported on what I did yesterday, what I will do today, and any technical blockers).
- **Sprint Planning:** 2 hours at the start of the week (Estimated story points using planning poker).
- **Sprint Retrospective:** 1 hour at the end of the 2-week sprint cycle (Discussed what went well and areas for process improvement).
- **Backlog Grooming:** Refined upcoming stories for Core Architecture & Role-Based Access Control (RBAC).
