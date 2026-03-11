# Banking Domain Knowledge: Interview Cheat Sheet

If an interviewer sees "Westpac" or any major bank on your resume, they **will inevitably ask you basic domain-specific questions** just to verify you actually worked in a real banking environment. 

As a Node.js backend developer, they don't expect you to be a financial advisor or a Wall Street trader. They expect your domain knowledge to be centered around **Security, Compliance, and Data Integrity**.

Here are the most common Domain Knowledge questions you must be ready to answer quickly:

---

## 1. "What exactly IS a Bank Guarantee?"
*(The Core Product You Built)*

**Your Answer:** "In simple terms, a Bank Guarantee is a promise made by Westpac. If our customer signs a contract with a third party (like a landlord or a supplier) and our customer fails to pay them, Westpac promises to cover the debt. Because the bank takes on a massive financial risk by making this promise, the approval process I built was incredibly strict and required multiple levels of internal reviews."

## 2. "How did you handle PII (Personally Identifiable Information)?"
*(The Security Domain Question)*

**Your Answer:** "Because we handled Bank Guarantees, our database contained highly sensitive PII, like a customer's full address, passport copies, and business registration numbers. 
1. We never returned full PII payloads to the frontend dashboards unless the user explicitly requested detailed views and had the required RBAC (Role-Based Access Control) permissions.
2. We ensured the database was encrypted at rest.
3. For uploaded legal documents containing PII, we implemented temporary, short-lived Pre-Signed AWS S3 URLs. We never allowed permanent links to exist, ensuring that if a URL leaked, it expired within 5 minutes."

## 3. "Why did you use PostgreSQL instead of MongoDB to store the Guarantees?"
*(The ACID Compliance Domain Question)*

**Your Answer:** "In banking, data integrity is everything. When a Reviewer approves a guarantee, multiple things must happen simultaneously: the status changes, the user who approved it is logged, and an audit trail is created. 

We used PostgreSQL because it strictly enforces **ACID transactions**. We could wrap all those actions in a single SQL transaction (`BEGIN...COMMIT`). If the database suddenly crashed right before the audit log was written, the entire state change automatically rolled back. MongoDB (NoSQL) is much harder to make fully ACID compliant across multiple collections, which is too risky for a bank's core workflow engine."

## 4. "How did you prevent two Bankers from corrupting a document at the same time?"
*(The Concurrent Editing Question)*

**Your Answer:** "We utilized a distributed lock. If Reviewer 1 opened a Bank Guarantee to audit it, our Node.js API set a lock in **Redis** flagging that document as 'Checked Out by Reviewer 1'. 

If Reviewer 2 tried to open the exact same ID, our API fetched the Redis lock and immediately returned a `409 Conflict` error to the frontend, displaying a message: *'This Guarantee is currently under review by another user.'* This is critical in banking to prevent 'Dirty Reads' and 'Lost Updates'."

## 5. "Why were Audit Logs such a huge focus of your project?"
*(The Compliance/Regulatory Question)*

**Your Answer:** "Banks like Westpac are heavily regulated by government bodies (like APRA in Australia). If an unauthorized 1-million-dollar guarantee is issued by mistake, auditors will demand to know exactly who approved it. My backend had to generate an immutable (unchangeable) history log for every single state transition, including the exact timestamp, the user's SSO ID from the JWT token, and the exact previous state vs the new state. Without those logs, the application legally couldn't go to production."

---

### Pro-Tip for the Interview:
Whenever you are asked an open-ended technical question, **always tie the answer back to "Compliance" or "Security Risk"**. 
* *"Why did you write unit tests?"* $\rightarrow$ "To prevent bugs that could accidentally skip the workflow state and cause a compliance breach."
* *"Why did you optimize the dashboard?"* $\rightarrow$ "Because Reviewers were getting frustrated waiting 5 seconds for PII to load over the network."
