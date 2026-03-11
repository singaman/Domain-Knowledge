# Year 3 - Month 5 - Week 2

**Epic Focus:** Scaling the Application and GraphQL BFF Optimization

## Sprint Goals
- Transition the massive internal Dashboard API to GraphQL.
- Fix N+1 query problems hurting dashboard loading times.
- Serve aggregated stats seamlessly.

## Jira Stories & Tasks Worked On

### 1. WBC-20292: Dataloader for N+1 Query Resolution
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Identified the classic GraphQL N+1 problem when fetching the User Profile (Name/Email) for every Reviewer assigned to a dashboard list of 100 guarantees.
  - Integrated `dataloader` to batch and deduplicate underlying database queries, collapsing 100 User SQL queries into a single `SELECT * FROM Users WHERE id IN (...)`.
  - Improved dashboard API responsiveness by 60% under peak load.

### 2. WBC-20293: GraphQL BFF Implementation (Apollo Server)
- **Story Points:** 8
- **Status:** Done
- **Technical Implementation:**
  - Replaced heavily nested REST API dashboard queries with a GraphQL BFF using Apollo Server.
  - Allowed the Frontend React application to dynamically request Guarantee Details, Associated Audit Logs, and User Profiles via a single network request.
  - Drastically reduced network over-fetching payload from 500kb per request down to 80kb by querying exact schema shapes.

### 3. WBC-20294: Read Heavy Performance Tuning
- **Story Points:** 3
- **Status:** Done
- **Technical Implementation:**
  - Re-architected the `TypeORM` connection pooling to route graphQL queries exclusively to the Postgres Read-Replicas.
  - Analyzed slow query logs and added compound indexes mapping `status` and `assigned_reviewer_id`.
  - Configured Node.js horizontal pod autoscaling (HPA) in Kubernetes based on CPU utilization.

## Agile Ceremonies Attended
- **Daily Standup:** 15 mins daily (Reported on what I did yesterday, what I will do today, and any technical blockers).
- **Sprint Planning:** 2 hours at the start of the week (Estimated story points using planning poker).
- **Sprint Retrospective:** 1 hour at the end of the 2-week sprint cycle (Discussed what went well and areas for process improvement).
- **Backlog Grooming:** Refined upcoming stories for Scaling the Application and GraphQL BFF Optimization.
