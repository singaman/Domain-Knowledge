# Year 3 - Month 9 - Week 1

**Epic Focus:** Automation: PDF Document Generation Worker

## Sprint Goals
- Automatically assemble the final legal document when approved.
- Remove the need for Bankers to use Microsoft Word.
- Stamp digital watermarks.

## Jira Stories & Tasks Worked On

### 1. WBC-30320: Dynamic HTML to PDF Engine
- **Story Points:** 8
- **Status:** Done
- **Technical Implementation:**
  - Utilized `Puppeteer` (Headless Chrome) inside the worker container.
  - The script fetched the finalized JSON Bank Guarantee data, injected it deeply into a legal HTML template, and converted that HTML directly into a finalized PDF.
  - Handled varied logic: e.g., if the currency was USD, rendering specific legal clauses dynamically.

### 2. WBC-30321: Background Worker Setup
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Since generating PDFs blocks the Node.js event pool, I created an asynchronous background worker process listening to an Event Queue.
  - When a guarantee hit `Completed` status, an event fired off to the worker.

### 3. WBC-30322: Watermarking and Final S3 Upload
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Added digital watermarks and approval timestamps to the footer of the generated PDF.
  - Streamed the completed legal PDF directly to the AWS S3 vault and notified the Banker via email that their final document was ready for the customer.

## Agile Ceremonies Attended
- **Daily Standup:** 15 mins daily (Reported on what I did yesterday, what I will do today, and any technical blockers).
- **Sprint Planning:** 2 hours at the start of the week (Estimated story points using planning poker).
- **Sprint Retrospective:** 1 hour at the end of the 2-week sprint cycle (Discussed what went well and areas for process improvement).
- **Backlog Grooming:** Refined upcoming stories for Automation: PDF Document Generation Worker.
