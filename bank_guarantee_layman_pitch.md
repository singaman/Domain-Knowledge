# The "Elevator Pitch" (15 seconds)

**Interviewer:** "Can you tell me about the main application you worked on at Westpac?"

**You:** "Sure! I worked on an internal portal called the **Bank Guarantee Application**. In simple terms, a Bank Guarantee is just a promise from the bank to cover a loss if a customer can't pay their bills. Before my project, issuing one of these was a very slow, messy process involving physical papers, emails, and PDFs bouncing between different departments. We built a modern, centralized web portal to digitize that entire workflow from start to finish."

---

# How It Works For The User (30 seconds)

**Interviewer:** "How did the application actually work?"

**You:** "It’s basically a massive approval and workflow engine for our internal staff. We had three main types of users logging into the exact same application: the **Bankers**, **Reviewer 1s**, and **Reviewer 2s**. 

Here is how the journey works:
1. A **Banker** logs in, fills out a digital form with the customer's details and the guarantee amount, and attaches any supporting legal documents. At this point, it is in 'Draft' status.
2. When they hit submit, the application automatically routes it to the queue for **Reviewer 1**. 
3. Reviewer 1 logs in, checks the documents, and they basically have two buttons: 'Approve' or 'Reject/Need More Info'. They can also leave private comments that only other reviewers can see.
4. If they approve it, my backend code automatically shifts the status to **Reviewer 2** for final sign-off.
5. Once fully approved, the system generates the final PDF legal document and sends it back to the Banker."

---

# The Technical Challenge (What YOU did)

**Interviewer:** "What was your main role on the backend?"

**You:** "My main job as a Node.js developer was building the 'brain' of that workflow. 

The biggest challenge was **Security and Access Control**. Because everyone logs into the exact same URL, I had to build strict APIs so that a Banker could never accidentally (or maliciously) click an 'Approve' button meant for a Reviewer. 

Secondly, I had to build a rigid **State Engine**. I had to write the logic that ensured a request went from *Draft* -> *Reviewer 1* -> *Reviewer 2* -> *Completed*. My code made sure you could never 'skip' a step in the process, and every single time the status changed, I logged it immutably into an Audit Database for compliance reasons."
