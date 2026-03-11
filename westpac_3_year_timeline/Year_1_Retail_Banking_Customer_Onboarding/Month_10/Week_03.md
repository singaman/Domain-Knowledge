# Year 1 - Month 10 - Week 3

**Epic Focus:** Secure Document Upload & Virus Scanning

## Sprint Goals
- Enable secure streaming of customer trailing documents (payslips, passports).
- Ensure no malicious payloads enter the Westpac network.
- Optimize memory usage for large PDF files.

## Jira Stories & Tasks Worked On

### 1. WBC-10098: ClamAV Virus Scanning Integration vGRPC
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Integrated a ClamAV microservice via gRPC to scan uploaded documents for malware.
  - Implemented a webhook callback system to notify the frontend when a file was marked "SAFE" or "QUARANTINED".
  - Blocked processing of documents with dangerous mime-types or mismatched file signatures.

### 2. WBC-10099: AWS S3 Multipart Document Upload Streaming
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Built a Node.js streaming API to pipe large document uploads directly to AWS S3, preventing memory heap crashes.
  - Generated pre-signed URLs to allow the front-end to upload directly, reducing backend load.
  - Stored metadata (file size, mime type, hash) in MongoDB for quick retrieval.

## Agile Ceremonies Attended
- **Daily Standup:** 15 mins daily (Reported on what I did yesterday, what I will do today, and any technical blockers).
- **Sprint Planning:** 2 hours at the start of the week (Estimated story points using planning poker).
- **Sprint Retrospective:** 1 hour at the end of the 2-week sprint cycle (Discussed what went well and areas for process improvement).
- **Backlog Grooming:** Refined upcoming stories for Secure Document Upload & Virus Scanning.
