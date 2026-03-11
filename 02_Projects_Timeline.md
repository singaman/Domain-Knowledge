# 3-Year Project Timeline & Progression

This document outlines your trajectory over 3 years, demonstrating growth from a standard developer to a senior contributor.

## Year 1: Retail Banking - Customer Onboarding API (Months 1-12)
**Domain Focus:** Customer Acquisition, KYC (Know Your Customer)
**Goal:** Digitize and streamline the bank account opening process for retail customers.

### Key Achievements & Work:
- Developed RESTful APIs in Express.js/NestJS to capture customer details and documents.
- Integrated with external third-party APIs (e.g., Equifax, Veda) for credit file checking and identity verification.
- Implemented robust error handling, circuit breakers (using `opossum`), and retries to handle flaky third-party integrations.
- Wrote extensive Unit and Integration tests using Jest and Supertest, maintaining a strict >85% code coverage mandate.
- Set up logging middleware to mask PII (Personally Identifiable Information) before sending logs to Splunk.

*Interview story:* "In my first year, I focused heavily on the onboarding flow. A major challenge was dealing with the unpredictable latency of third-party identity verification APIs. I implemented a circuit breaker pattern which stopped cascading failures in our own services when the third-party went down."

---

## Year 2: Core Payments Microservice - NPP Integration (Months 13-24)
**Domain Focus:** Payments, Transaction Processing (NPP - New Payments Platform in Australia)
**Goal:** Build internal microservices to support instant bank transfers (Osko/NPP).

### Key Achievements & Work:
- Transitioned to a heavy asynchronous, event-driven architecture using Apache Kafka.
- Built microservices that subscribe to payment event topics (e.g., `payment.initiated`, `payment.cleared`, `payment.failed`).
- Designed and implemented Idempotency keys using Redis to ensure that duplicate network requests from the mobile app did not result in double-charging a customer.
- Implemented distributed locking using Redis (Redlock) for concurrent balance checking.
- Optimized PostgreSQL queries for high-throughput transaction ledgers.

*Interview story:* "Moving into the payments domain was a step up in complexity. I led the implementation of idempotency for our funds transfer API. We used Redis to store the idempotency key with a 24-hour TTL. If a user had poor network connectivity and the mobile app retried the transfer, our backend would catch the duplicate key and return the original successful response without re-processing the financial transaction."

---

## Year 3: Open Banking (CDR) & BFF Restructuring (Months 25-36)
**Domain Focus:** Open Banking, API Security, BFF (Backend for Frontend)
**Goal:** Comply with the Australian Consumer Data Right (CDR) regulations by securely exposing customer data to accredited third parties, and optimizing mobile app performance.

### Key Achievements & Work:
- Acted as a senior technical resource, designing the architecture for the Open Banking data extraction services.
- Implemented MTLS (Mutual TLS) authentication and complex fine-grained OAuth scopes for third-party access.
- Refactored legacy monolithic endpoints into a GraphQL BFF (using Apollo Server) to reduce over-fetching for the Westpac Mobile App.
- Mentored junior devs, conducted code reviews, and managed CI/CD pipeline optimizations (reducing Jenkins build times by utilizing Docker layer caching).
- Conducted load testing using k6 to ensure the APIs could handle traffic spikes on payday/end of financial year.

*Interview story:* "In my final year, we had strict regulatory deadlines for Open Banking. I designed a highly secure, read-only microservice layer that aggregated data from various legacy systems to present a unified CDR-compliant schema. I also introduced GraphQL for our mobile BFF, which reduced the payload size by 40% on the mobile app dashboard."
