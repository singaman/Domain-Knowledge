# Year 2 - Month 9 - Week 3

**Epic Focus:** Reporting & Guarantee Generation

## Sprint Goals
- Automatically assemble PDF legal documents based on approved workflow data.
- Generate compliance reports for management.
- Export Bank Guarantee data to legacy systems.

## Jira Stories & Tasks Worked On

### 1. WBC-20211: Multi-Role Search and Reporting Aggregation API
- **Story Points:** 8
- **Status:** Done
- **Technical Implementation:**
  - Built robust reporting APIs for management users hitting MongoDB analytical read-replicas.
  - Used the MongoDB Aggregation Pipeline to generate reports like "Average Time Spent in PENDING_R1 Status" and "Total Dollar Value of Guarantees Issued this Month".
  - Secured the API with pagination and query timeouts to prevent heavy analytical queries from degrading the primary API performance.

### 2. WBC-20212: Metrics and APM (Datadog) Instrumentation
- **Story Points:** 3
- **Status:** Done
- **Technical Implementation:**
  - Instrumented all mission-critical workflow transition endpoints thoroughly using Datadog APM tracing.
  - Set up performance alerts if the `Approve` API latency breached 1.5 seconds, specifically monitoring the time taken by the atomic transaction and audit log inserts.
  - Tracked "Invalid State Transition" 400 errors to identify frontend application bugs.

### 3. WBC-20213: PDF Generation from Approved Guarantees
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - When a guarantee reached the `COMPLETED` state, a Kafka event triggered a worker service.
  - Utilized `Puppeteer` (or PDFKit) inside Node.js to dynamically generate the official legal Bank Guarantee document based on an HTML template populated with the database payload.
  - Stamped the generated PDF with watermarks and a digital signature hash.

## Agile Ceremonies Attended
- **Daily Standup:** 15 mins daily (Reported on what I did yesterday, what I will do today, and any technical blockers).
- **Sprint Planning:** 2 hours at the start of the week (Estimated story points using planning poker).
- **Sprint Retrospective:** 1 hour at the end of the 2-week sprint cycle (Discussed what went well and areas for process improvement).
- **Backlog Grooming:** Refined upcoming stories for Reporting & Guarantee Generation.
