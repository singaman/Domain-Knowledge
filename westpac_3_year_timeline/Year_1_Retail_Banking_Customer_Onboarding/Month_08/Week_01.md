# Year 1 - Month 8 - Week 1

**Epic Focus:** Security: Authentication & Role-Based Access Control (RBAC)

## Sprint Goals
- Ensure that everyone logging into the portal has the correct role.
- Stop Bankers from accessing Reviewer endpoints.
- Integrate with Single Sign-On (SSO).

## Jira Stories & Tasks Worked On

### 1. WBC-30072: JWT Authentication Middleware
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Built an Express middleware to intercept every API request coming from the frontend.
  - Decoded the JWT (JSON Web Token) to prove the user was actually logged into the Bank.
  - Rejected invalid or expired tokens with a 401 Unauthorized error.

### 2. WBC-30073: Role Extraction via Token Payload
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Extracted the `role` attribute directly from the validated token (e.g., `role: banker` or `role: reviewer_1`).
  - Passed the decoded role down into the request context (req.user) so the controllers could read it.

### 3. WBC-30074: Endpoint Access Control List (ACL)
- **Story Points:** 8
- **Status:** Done
- **Technical Implementation:**
  - Secured the `PATCH /api/approve` endpoint forcefully.
  - Wrote logic preventing users with the `banker` role from accessing review endpoints.
  - Returned a strict `403 Forbidden` if a user attempted horizontal privilege escalation.

## Agile Ceremonies Attended
- **Daily Standup:** 15 mins daily (Reported on what I did yesterday, what I will do today, and any technical blockers).
- **Sprint Planning:** 2 hours at the start of the week (Estimated story points using planning poker).
- **Sprint Retrospective:** 1 hour at the end of the 2-week sprint cycle (Discussed what went well and areas for process improvement).
- **Backlog Grooming:** Refined upcoming stories for Security: Authentication & Role-Based Access Control (RBAC).
