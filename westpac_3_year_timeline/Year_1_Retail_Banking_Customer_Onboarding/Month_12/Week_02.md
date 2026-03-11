# Year 1 - Month 12 - Week 2

**Epic Focus:** File Uploads: Attaching Documents to Guarantees

## Sprint Goals
- Allow Bankers to upload huge PDF legal documents.
- Ensure Node.js does not crash from memory spikes.
- Secure the documents in AWS S3.

## Jira Stories & Tasks Worked On

### 1. WBC-30116: Multipart/Form-Data API Endpoint
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Built an API utilizing `multer` (or similar) to accept incoming PDF files attached to a specific Bank Guarantee ID.
  - Wrote file validation logic checking the Mime-Type to ensure users only uploaded exact PDFs and not dangerous `.exe` files.

### 2. WBC-30117: Streaming Uploads to AWS S3
- **Story Points:** 8
- **Status:** Done
- **Technical Implementation:**
  - Integrated the AWS SDK into the Node.js backend.
  - Instead of loading a 20MB file entirely into Node.js heap memory, implemented Node Streams to pipe the file directly to Westpac's internal S3 bucket.
  - Stored the S3 `ObjectKey` URL in the PostgreSQL database.

## Agile Ceremonies Attended
- **Daily Standup:** 15 mins daily (Reported on what I did yesterday, what I will do today, and any technical blockers).
- **Sprint Planning:** 2 hours at the start of the week (Estimated story points using planning poker).
- **Sprint Retrospective:** 1 hour at the end of the 2-week sprint cycle (Discussed what went well and areas for process improvement).
- **Backlog Grooming:** Refined upcoming stories for File Uploads: Attaching Documents to Guarantees.
