# The Easy-to-Explain Interview Guide: Westpac Bank Guarantee Project

When the interviewer asks what you did at Westpac for 3 years, you want a simple, logical story that flows well and isn't too clouded with heavy technical jargon. 

Here is exactly how you can structure your 3-year experience so it sounds incredibly natural and easy to explain.

---

## The Core Application: What did it do?

"I worked on an internal portal called the **Bank Guarantee Application**. 

Before this portal, issuing a bank guarantee involved a lot of paper forms, emails, and manual signatures between different departments. Our goal was to digitize the **entire approval workflow**.

The application was a multi-user, multi-role portal. We had three main roles: **Bankers**, **Reviewer 1**, and **Reviewer 2**. 

The main flow was simple:
1. A **Banker** fills out the digital form and attaches documents (State: *Draft*).
2. The Banker submits it, and it goes to the first approval queue (State: *Pending Reviewer 1*).
3. **Reviewer 1** logs in, checks it, adds any private comments, and hits approve. It moves to the next queue (State: *Pending Reviewer 2*).
4. After **Reviewer 2** approves, it routes back to the portal (State: *Completed*). 

To build this over 3 years, here is how we broke down the work:"

---

## Year 1: Building the Core Application (Make it Work)

**The Story:** "In my first year, my primary job was building the foundational Node.js APIs to get the digital forms working securely."

*   **API Development:** "I built the REST APIs in Node.js (using Express/NestJS) that allowed the frontend React app to submit the form data and save it into our PostgreSQL database."
*   **Role-Based Security (JWT):** "Since everyone logged into the same portal, security was critical. I wrote the authentication middleware. When a user logged in, my code decoded their JWT token to find out their role. If a Banker manually tried to access a Reviewer's API endpoint to approve a document, my code automatically blocked them with a `403 Forbidden` error."
*   **File Uploads:** "Bank guarantees require supporting legal documents. I built an API that streamed PDF document uploads directly from the frontend into an internal AWS S3 bucket, and saved the link in our database."

---

## Year 2: The Workflow Engine & State Machine (Make it Safe)

**The Story:** "In my second year, we focused heavily on the state machine and the complex business rules of the approval process."

*   **Strict State Transitions:** "I built the backend logic that enforced the workflow. I had to write complex validations ensuring a document couldn't jump straight from *Draft* to *Completed*. It strictly had to go *Draft -> Pending Reviewer 1 -> Pending Reviewer 2*."
*   **Private Commenting System:** "The reviewers needed a way to talk to each other without the Banker seeing it until the end. I built a private commenting API. When Reviewer 1 added a comment, my Node.js logic checked a 'visibility flag'. If a Banker tried to fetch the comments, my API would filter the internal comments out of the response."
*   **Audit Logging:** "For compliance, every time someone clicked 'Approve' or 'Reject', I wrapped the database update in a transaction. My code simultaneously saved a pristine 'Audit Log' entry recording the exact timestamp, who clicked it, and what the previous status was."

---

## Year 3: Scaling & User Experience (Make it Fast)

**The Story:** "By year 3, the application had lots of users and lots of historical data. My job shifted to optimizing performance and adding the final polished features."

*   **Dynamic Dashboards:** "Reviewers complained the dashboard was loading slowly because it had to fetch data from different tables (User Details, Bank Guarantees, Document Metadata). I optimized this by building an Aggregation API (using GraphQL or optimized SQL joins) to fetch everything in one fast network request."
*   **PDF Generation:** "Once a guarantee reached the *Completed* status, the business needed a formal legal document. I wrote a background worker in Node.js (using Puppeteer/PDFKit) that took the final approved JSON database payload, injected it into an HTML template, and converted it into a stamped PDF."
*   **Database Caching:** "To speed up the forms, I implemented a Redis cache to store common dropdown data (like 'Approved Currencies' or 'Guarantee Types') so we didn't have to hit the PostgreSQL database for every small query."

---

## Summary of Your "Selling Points" for the Interviewer
If you use this story, you are checking all the boxes the interviewer is looking for without getting overly complicated:
1. You understand **Authentication and Roles** (JWT, RBAC).
2. You understand **Business Logic** (State machines, workflow enforcement).
3. You handle **File Storage** (Streaming PDFs to S3).
4. You care about **Security/Compliance** (Private commenting, Audit logs).
5. You understand **Performance** (Redis caching, optimizing slow dashboards).
