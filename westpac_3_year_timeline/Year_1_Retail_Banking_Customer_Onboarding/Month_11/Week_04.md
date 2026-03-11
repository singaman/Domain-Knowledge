# Year 1 - Month 11 - Week 4

**Epic Focus:** File Uploads: Attaching Documents to Guarantees

## Sprint Goals
- Allow Bankers to upload huge PDF legal documents.
- Ensure Node.js does not crash from memory spikes.
- Secure the documents in AWS S3.

## Jira Stories & Tasks Worked On

### 1. WBC-30112: Streaming Uploads to AWS S3
- **Story Points:** 8
- **Status:** Done
- **Technical Implementation:**
  - Integrated the AWS SDK into the Node.js backend.
  - Instead of loading a 20MB file entirely into Node.js heap memory, implemented Node Streams to pipe the file directly to Westpac's internal S3 bucket.
  - Stored the S3 `ObjectKey` URL in the PostgreSQL database.

### 2. WBC-30113: Secure Document Download API
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Built a `GET /api/documents/:id` endpoint for Reviewers to read the uploaded PDFs.
  - Instead of proxying the large binary file back through Node.js, generated temporary, short-lived "Pre-Signed S3 URLs" to give the Reviewer direct but secure access.

## Agile Ceremonies Attended
- **Daily Standup:** 15 mins daily (Reported on what I did yesterday, what I will do today, and any technical blockers).
- **Sprint Planning:** 2 hours at the start of the week (Estimated story points using planning poker).
- **Sprint Retrospective:** 1 hour at the end of the 2-week sprint cycle (Discussed what went well and areas for process improvement).
- **Backlog Grooming:** Refined upcoming stories for File Uploads: Attaching Documents to Guarantees.
