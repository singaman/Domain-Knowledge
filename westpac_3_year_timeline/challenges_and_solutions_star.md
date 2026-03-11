# Interview Prep: Challenges Faced & How You Fixed Them

When interviewers ask, *"Tell me about a complex challenge you faced,"* or *"Describe a time you solved a performance/security issue,"* use these exact scenarios from your **Bank Guarantee Project**. 

They are formatted using the **STAR Method** (Situation, Task, Action, Result), which is exactly what hiring managers want to hear.

---

## Challenge 1: The Out-of-Memory File Upload Crash (Year 1)

**The Situation:**
Bankers were attaching massive 50MB legal PDF contracts (scanning multiple documents) to their Bank Guarantee requests via our frontend portal. 

**The Task:**
Our Node.js API kept crashing with "Heap Out of Memory" errors whenever multiple Bankers uploaded large files at the same exact time. Node was trying to load the entire 50MB file into RAM `(using something like express.bodyParser)` before transferring it to our AWS S3 storage.

**The Action (How you fixed it):**
I had to completely rewrite the upload controller. Instead of buffering the file into memory or saving it temporarily to the Docker container's local disk, I implemented **Node.js Streams** using a library like `multer-s3`. As the frontend uploaded the chunks of the PDF, my code piped those incoming stream chunks *directly* into the AWS S3 bucket.

**The Result:**
Node.js never touched the full file in memory. Our pod memory usage dropped by almost 70%, and we successfully enabled the business to upload documents up to 200MB without dropping a single API request or crashing the server.

---

## Challenge 2: The N+1 Dashboard Slowness (Year 3)

**The Situation:**
As the application grew, the Reviewers complained that their main "Pending Approvals Dashboard" was taking over 4 seconds to load. 

**The Task:**
I investigated using our Application Performance Monitoring (Datadog) and found a severe **N+1 Database Query problem**. The dashboard was fetching a list of 100 pending Bank Guarantees. But for *each* row, the frontend requested the Name and Email of the "Assigned Reviewer". Our ORM (TypeORM) was making 1 initial database query for the 100 guarantees, and then firing off 100 separate `SELECT * FROM users WHERE id = X` queries in a loop.

**The Action (How you fixed it):**
I injected a GraphQL aggregator layer (BFF) and implemented a **DataLoader**. Instead of firing 100 individual queries sequentially, dataloader batched all the requested User IDs locally in memory. It then grouped them into a single, highly efficient query: `SELECT * FROM users WHERE id IN (1, 2, 3... 100)`.

**The Result:**
I reduced 101 database queries down to exactly 2 queries. The dashboard loading time dropped instantly from 4 seconds down to 600 milliseconds, and the PostgreSQL database saw a massive reduction in connection fatigue. 

---

## Challenge 3: Horizontal Privilege Escalation Security Risk (Year 2)

**The Situation:**
During an internal penetration test (or code review), we realized a potential security flaw in the Bank Guarantee API workflow.

**The Task:**
A Banker (who is only allowed to fill drafts) theoretically could intercept network traffic and manually send an HTTP PATCH request to the `/api/guarantees/:id/approve` endpoint. Because they were authenticated with a valid SSO token, the API might accept it, allowing them to approve their own guarantees and bypass the Reviewer entirely.

**The Action (How you fixed it):**
I built a global, strictly enforced **RBAC (Role-Based Access Control) Guard / Interceptor** in NestJS/Express. 
1. The middleware decoded the user's JWT token to extract their strictly assigned `role` field.
2. I decorated my API endpoints with specific metadata (e.g., `@Roles('Reviewer_1', 'Reviewer_2')`).
3. If the user's extracted role from the token didn't explicitly match the decorated allowed roles, my middleware threw an immediate `403 Forbidden` Exception before the database was ever touched.

**The Result:**
The internal security auditors approved the system, and we guaranteed that the state machine could never be maliciously advanced by unauthorized internal staff.

---

## Quick Reference Summary for Interivews:
- *Security question?* $\rightarrow$ Talk about grabbing Roles from JWT payloads to block malicious endpoint hits.
- *Performance question?* $\rightarrow$ Talk about N+1 queries being solved by batching/Dataloader.
- *Architecture question?* $\rightarrow$ Talk about replacing Memory-heavy buffers with direct Node.js Streams to S3.
- *Business Logic question?* $\rightarrow$ Talk about the rigid State Machine (Draft $\rightarrow$ Pending R1) preventing invalid workflow jumps.
