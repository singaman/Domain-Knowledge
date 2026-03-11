# Year 2 - Month 1 - Week 3

**Epic Focus:** Document Vault & Internal Storage Integrations

## Sprint Goals
- Securely attach internal risk assessments to Bank Guarantees.
- Restrict document download capabilities based on workflow state.
- Prevent sensitive legal documents from memory leaks.

## Jira Stories & Tasks Worked On

### 1. WBC-20131: AWS S3 Document Upload API for Bank Guarantees
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Built a Node.js streaming API accepting multipart/form-data specifically for legal contracts and risk assessments attached to a Guarantee.
  - Piped the stream directly into an internal Westpac S3 bucket, preventing memory saturation on the Node horizontal pod.
  - Saved the document metadata (S3 Object Key, size, uploader) into the relational database.

### 2. WBC-20132: Role-Restricted Document Download (Pre-Signed URLs)
- **Story Points:** 8
- **Status:** Done
- **Technical Implementation:**
  - Implemented download API logic: Verify the user downloading the risk document actually had "read" access to that specific Guarantee ID.
  - Generated temporary, short-lived (5 min) S3 Pre-signed URLs for authenticated users instead of proxying massive binaries through Node.
  - Logged all document access events to Splunk for internal compliance monitoring.

### 3. WBC-20133: ClamAV Malware Scanning Middleware
- **Story Points:** 3
- **Status:** Done
- **Technical Implementation:**
  - Integrated a ClamAV daemon using gRPC. Whenever a Banker uploaded a supporting document, it was pushed into a buffer queue.
  - The file was scanned asynchronously for malware before the state of the document was marked `SAFE_FOR_REVIEW`.
  - Blocked Reviewers from downloading documents marked as `PENDING_SCAN`.

## Agile Ceremonies Attended
- **Daily Standup:** 15 mins daily (Reported on what I did yesterday, what I will do today, and any technical blockers).
- **Sprint Planning:** 2 hours at the start of the week (Estimated story points using planning poker).
- **Sprint Retrospective:** 1 hour at the end of the 2-week sprint cycle (Discussed what went well and areas for process improvement).
- **Backlog Grooming:** Refined upcoming stories for Document Vault & Internal Storage Integrations.
