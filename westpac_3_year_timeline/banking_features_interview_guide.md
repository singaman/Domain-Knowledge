# Westpac Node.js Backend Developer - Interview Feature Guide

When interviewing for a backend roles, especially in the banking sector, interviewers don't just want to hear "I built REST APIs." They want to hear about the **business value** and **domain complexity** of those APIs. 

As a Node.js developer at Westpac, you worked across three major banking domains over 3 years. This guide explicitly outlines the **banking features**, **APIs**, and **business logic** you should talk about.

---

## Year 1: Retail Banking Customer Onboarding & KYC

**The Business Problem:** Opening a bank account manually takes days. Westpac wanted a digital-first, straight-through processing (STP) onboarding experience for retail customers via the mobile app and web portal.

### Summary of Features & APIs Built:
*   **Digital Identity Verification (KYC/AML) API:** Orchestration API integrating with Equifax/GreenID for KYC checks.
*   **Asynchronous Verification Queues:** RabbitMQ-based queuing for routing "partial match" identity checks to manual review.
*   **Account Provisioning Microservice:** Core banking integration using the Saga pattern for Everyday and Savings account creation with automated transactional rollbacks.
*   **Secure Document Upload API:** Node.js streaming API for large PDF/Image files directly to AWS S3.
*   **Malware Scanning Integration:** gRPC-based ClamAV integration for real-time document virus scanning.

### Detailed Breakdown:


1. **Digital Identity Verification (KYC/AML) API:**
   - **What it is:** Know Your Customer (KYC) and Anti-Money Laundering (AML) checks are legally required.
   - **Your Role:** Built the orchestration API in Node.js that takes customer details (Name, DOB, Address, License/Passport Number) and integrates with third-party verification providers like **Equifax** or **GreenID**.
   - **Business Logic:** Implemented logic to handle "match", "partial match", and "no match" scenarios. If a partial match occurred, the logic routed the application to a manual review queue (saving the state in MongoDB or PostgreSQL).
   - **Tech details:** Handled slow third-party SOAP/REST APIs using asynchronous queues (RabbitMQ/Kafka) so the user interface wouldn't hang while waiting for identity verification.

2. **Account Provisioning Service:**
   - **What it is:** Once approved, the customer needs actual bank accounts created in the core banking system (e.g., Hogan or a modern core like Thought Machine/10x).
   - **Your Role:** Built a microservice that generated the payload to create a "Choice" Everyday account and a "Life" Savings account.
   - **Business Logic:** Implemented transactional rollbacks. If the Everyday account was created but the Savings account failed, your Node.js service had to trigger a compensating transaction (Saga pattern) to roll back the first creation and ensure data consistency.

3. **Secure Document Upload & Virus Scanning:**
   - **What it is:** Customers uploading payslips or trailing documents.
   - **Your Role:** Built a streaming API to accept large PDF/Image files.
   - **Tech details:** Streamed the upload directly to AWS S3 (multipart upload) through Node.js to avoid memory crashes. Integrated a ClamAV microservice via gRPC to scan the file for viruses before marking it as "safe" in the database.

---

## Year 2: Core Payments & NPP (New Payments Platform) Integration

**The Business Problem:** Customers expect instant, 24/7 payments. The traditional batch-based Direct Entry (BSB/Account) system was being supplemented by Australia's NPP (Osko/PayID) for real-time clearing.

### Summary of Features & APIs Built:
*   **PayID Resolution API:** Internal caching API using Redis to resolve PayIDs to account names from the central NPP Addressing Service.
*   **Sliding-Window Rate Limiter:** Redis Lua script implementation to block malicious directory harvesting attacks.
*   **ISO 20022 Payment Initiation Service:** Boundary translation API converting JSON payloads to strict ISO 20022 pacs.008 XML format.
*   **Pre-flight Payment Validator:** Business logic layer for checking sufficient funds, daily payment limits, and OFAC sanctions.
*   **Real-time Fraud Streaming:** Kafka event publisher streaming transaction metadata (IP, Device, Amount) to the Actimize Fraud Engine.
*   **Fraud Webhook & Debit Hold Manager:** Asynchronous webhook receiver that automatically applied "Debit Holds" in PostgreSQL based on high-risk fraud scores.

### Detailed Breakdown:

1. **PayID Lookup and Resolution API:**
   - **What it is:** A service allowing users to type in a phone number or email (PayID) and return the registered account name.
   - **Your Role:** Built the internal API that queried the Westpac PayID registry cache (Redis) and, on cache-miss, queried the central NPP Addressing Service.
   - **Business Logic:** Implemented strict rate-limiting (using Redis) to prevent malicious actors from doing "directory harvesting" (spamming phone numbers to find names). Added caching with a short TTL (Time-To-Live) to ensure high performance.

2. **Real-Time Payment Initiation (pacs.008):**
   - **What it is:** Sending money instantly. NPP uses the ISO 20022 XML messaging standard.
   - **Your Role:** Built the boundary layer service that accepted a JSON payload from the mobile app (Amount, From Account, To PayID, Description) and translated it into the strict **ISO 20022 pacs.008** XML format required by the payment switch.
   - **Business Logic:** Implemented pre-flight checks: Does the user have sufficient funds? Does this breach their daily $10,000 transfer limit? Is the receiving account sanctioned?

3. **Fraud Detection Interceptor:**
   - **What it is:** Catching scams before the money leaves the bank.
   - **Your Role:** Implemented an asynchronous event publisher. When a payment was initiated, your Node.js service published the transaction metadata to Kafka.
   - **Business Logic:** A separate fraud engine (e.g., Actimize) consumed this. If your service received a real-time web-hook back saying "High Risk Score", your code would automatically place a "Debit Hold" block on the API request, pausing the transaction for fraud analyst review.

---

## Year 3: Open Banking (CDR) & BFF (Backend-for-Frontend)

**The Business Problem:** The Australian Government mandated the Consumer Data Right (CDR), meaning Westpac had to expose customer data securely to accredited third parties via standardized APIs.

### Summary of Features & APIs Built:
*   **CDR Account & Transaction APIs (Read-Only):** High-performance GET endpoints compliant with the Australian Data Standards Body (DSB).
*   **Cursor-Based Pagination Engine:** High-performance database querying strategy to efficiently serve thousands of transaction records.
*   **MTLS & FAPI Validation Middleware:** Express.js middleware validating Mutual TLS client certificates and strict OAuth2/OIDC tokens.
*   **Consent Management Enforcement:** Logic verifying user consent scope and 12-month expiry rules against a Consent Store database.
*   **Mobile App BFF (Backend-For-Frontend):** GraphQL API aggregating data concurrently from 5 downstream microservices (Accounts, Loans, Cards, Rewards, Notifications).
*   **Resilience & Graceful Degradation:** `Promise.allSettled()` and Circuit Breaker implementation ensuring partial dashboard loads during downstream service outages.

### Detailed Breakdown:

1. **CDR Account & Transaction APIs (Read-Only):**
   - **What it is:** Standardized REST APIs defined by the Data Standards Body (DSB) that return a customer's account list and transaction history.
   - **Your Role:** Built highly performant GET endpoints in Express/NestJS.
   - **Business Logic:** The trickiest part was **Pagination and Filtering**. You implemented cursor-based pagination to handle millions of transaction records efficiently without crashing the database.

2. **Consent & FAPI (Financial-grade API) Validation:**
   - **What it is:** Third parties can't just access data; the customer must consent, and the request must be cryptographically secure.
   - **Your Role:** Implemented middleware to decode and validate **MTLS (Mutual TLS)** headers and strict OAuth2/OIDC (OpenID Connect) tokens.
   - **Business Logic:** Your code checked the "Consent Database". Did the user consent to share *transactions*, or just *account balances*? Has the consent expired (passed 12 months)? If expired or out of scope, your API threw standard 403 Forbidden errors.

3. **Mobile App BFF (Backend-For-Frontend) Aggregator:**
   - **What it is:** The mobile front-end team needed a single API call to load the dashboard, rather than making 5 different calls to accounts, loans, credit cards, and rewards.
   - **Your Role:** Built a GraphQL (or REST aggregator) layer in Node.js.
   - **Business Logic:** Used `Promise.allSettled()` to fetch data from the underlying microservices concurrently. If the "Rewards Points" service was down, your BFF aggregated the rest of the data successfully and returned a graceful degradation payload (e.g., Accounts loaded, but Rewards show as 'currently unavailable') rather than crashing the whole mobile dashboard.

---

## How to use this in an interview:

* **Interviewer:** "Tell me about a complex API you built."
* **You:** "At Westpac, I built the PayID resolution API. It wasn't just a simple CRUD app. We had to integrate with the central NPP addressing service, but we faced heavy load. I implemented a Redis caching layer to handle volume, but more importantly, I had to build sliding-window rate limiters to prevent directory harvesting fraud, because malicious bots tried to spam phone numbers to scrape customer names."

* **Interviewer:** "How do you handle error management and resilient systems?"
* **You:** "When building the Account Provisioning service, we dealt with distributed transactions. If our service successfully created an Everyday account in the core banking system, but the subsequent API call to create the linked Debit Card failed, we couldn't just leave it half-done. I implemented a Saga pattern where our Node.js service would catch that failure and trigger a compensating transaction to roll back the account creation, ensuring aggregate data consistency."
