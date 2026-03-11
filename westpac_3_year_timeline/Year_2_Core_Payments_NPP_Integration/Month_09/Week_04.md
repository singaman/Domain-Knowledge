# Year 2 - Month 9 - Week 4

**Epic Focus:** Real-time Fraud Interceptor & Actimize Integration

## Sprint Goals
- Detect and block scams in real-time.
- Asynchronously process payment risk scoring.
- Provide operators the ability to lift "Debit Holds".

## Jira Stories & Tasks Worked On

### 1. WBC-10211: Fraud Async Webhook Consumer & Debit Holds
- **Story Points:** 8
- **Status:** Done
- **Technical Implementation:**
  - Exposed a secure webhook endpoint for the Fraud Engine (Actimize) to push back real-time risk scores.
  - If the score crossed the high-risk threshold, automatically placed a "Debit Hold" block on the underlying transaction record in PostgreSQL.
  - Sent a push notification trigger to the customer to verify the sketchy payment via the Westpac App (2FA step-up).

### 2. WBC-10212: Operator Override API for Call Center
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Developed an internal administrative REST API for the Fraud Call Center to manually override and release "Debit Holds".
  - Stored audit trails of which operator released the hold for compliance purposes.
  - Implemented strict Role-Based Access Control (RBAC) ensuring only high-level analysts could use the endpoint.

### 3. WBC-10213: Payment Metadata Event Publisher (Kafka)
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Built a Node.js publisher utilizing `kafkajs` to stream payment initiation metadata (IP, Amount, Payee, Device Info) to the Fraud cluster.
  - Ensured high throughput and exactly-once delivery semantics using transactional producers.
  - Handled schema registry evolutions using Avro formats.

## Agile Ceremonies Attended
- **Daily Standup:** 15 mins daily (Reported on what I did yesterday, what I will do today, and any technical blockers).
- **Sprint Planning:** 2 hours at the start of the week (Estimated story points using planning poker).
- **Sprint Retrospective:** 1 hour at the end of the 2-week sprint cycle (Discussed what went well and areas for process improvement).
- **Backlog Grooming:** Refined upcoming stories for Real-time Fraud Interceptor & Actimize Integration.
