# Year 2 - Month 11 - Week 1

**Epic Focus:** Reporting & Guarantee Generation

## Sprint Goals
- Automatically assemble PDF legal documents based on approved workflow data.
- Generate compliance reports for management.
- Export Bank Guarantee data to legacy systems.

## Jira Stories & Tasks Worked On

### 1. WBC-20226: Multi-Role Search and Reporting Aggregation API
- **Story Points:** 8
- **Status:** Done
- **Technical Implementation:**
  - Built robust reporting APIs for management users hitting MongoDB analytical read-replicas.
  - Used the MongoDB Aggregation Pipeline to generate reports like "Average Time Spent in PENDING_R1 Status" and "Total Dollar Value of Guarantees Issued this Month".
  - Secured the API with pagination and query timeouts to prevent heavy analytical queries from degrading the primary API performance.

### 2. WBC-20227: PDF Generation from Approved Guarantees
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
