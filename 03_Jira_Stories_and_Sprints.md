# Simulated Jira Epics and Stories

Here is a collection of realistic Jira stories you can discuss in interviews to prove your experience.

---

## Project 1: Customer Onboarding (Year 1)
### Epic: Digital KYC Integration [WBC-100]

**Story: WBC-105: Implement Third-Party Identity Verification API Wrapper**
*   **Story Points**: 5
*   **Description**: As a backend system, we need to call the Equifax identity verification API when a new user submits their details to verify their identity and check against PEP (Politically Exposed Persons) lists.
*   **Tasks Developed**:
    *   Created `EquifaxIntegrationService` in NestJS.
    *   Mapped Westpac DTOs to Equifax XML/JSON schemas.
    *   Implemented `axios` with timeout configurations (e.g., 5000ms).
    *   Wrote Jest unit tests mocking the `axios` responses.
*   **Challenge Addressed**: Handling PII securely. Ensured customer TFN (Tax File Number) and unmasked account numbers were never written to application logs.

**Story: WBC-112: Implement Rate Limiting on Document Upload Endpoint**
*   **Story Points**: 3
*   **Description**: Protect the AWS S3 presigned URL generation endpoint from abuse by implementing rate limiting.
*   **Tasks Developed**:
    *   Integrated `express-rate-limit` backed by Redis.
    *   Configured limits: Max 5 document uploads per user session per 15 minutes.

---

## Project 2: NPP Payments (Year 2)
### Epic: Instant Payments (Osko) Processing [WBC-300]

**Story: WBC-345: Implement Idempotency for Funds Transfer API**
*   **Story Points**: 8
*   **Description**: To prevent double-spending due to client retries on timeouts, the POST `/api/v1/transfers` endpoint must be strictly idempotent.
*   **Tasks Developed**:
    *   Added `x-idempotency-key` header requirement in API Gateway/Swagger.
    *   Created an interceptor/middleware that checks Redis for the key.
    *   If key exists: Return cached HTTP status and response.
    *   If key does not exist: Acquire lock, process transaction, save result to Redis with 24h expiration, release lock.

**Story: WBC-360: Kafka Consumer for Payment Fraud Detection Alerts**
*   **Story Points**: 5
*   **Description**: Consume events from the `fraud-alerts` Kafka topic and suspend the outgoing transaction if a high-risk score is received.
*   **Tasks Developed**:
    *   Used `kafkajs` to create a consumer group.
    *   Processed events with "at-least-once" delivery semantics.
    *   Designed a saga compensation transaction to revert the held funds if fraud is confirmed.

---

## Project 3: Open Banking & BFF (Year 3)
### Epic: CDR Data Holder APIs [WBC-600]

**Story: WBC-615: Implement Pagination and Filtering for Transaction History API**
*   **Story Points**: 5
*   **Description**: Open Banking mandated APIs require standardized cursor-based pagination and filtering by date range for the `/accounts/{accountId}/transactions` endpoint.
*   **Tasks Developed**:
    *   Implemented Keyset/Cursor pagination in PostgreSQL (using `WHERE id > last_seen_id LIMIT 50`) instead of offset pagination for better DB performance on large tables.
    *   Added input validation for date ranges using `class-validator` and `zod`.

**Story: WBC-650: Database Query Optimization for Account Aggregation**
*   **Story Points**: 8
*   **Description**: The dashboard API is timing out (taking > 3 seconds) for users with more than 10 linked products.
*   **Tasks Developed**:
    *   Analyzed PostgreSQL slow query logs.
    *   Identified missing composite indexes on `customer_id` and `account_status`.
    *   Refactored 3 sequential DB calls into a single joined query using TypeORM query builder.
    *   Reduced latency from 3200ms to 150ms.
