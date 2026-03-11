# Westpac Bank Node.js Backend - Architecture & Tech Stack

## Project Context
- **Employer:** Tech Mahindra
- **Client:** Westpac Bank (Australia)
- **Role:** Node.js Backend Developer
- **Domain:** Banking & Financial Services (Retail Banking, Payments, Open Banking)
- **Team Setup:** Agile Squads (Scrum), consisting of 1 Product Owner, 1 Scrum Master, 3 Backend Devs, 2 Frontend Devs, 2 QA, 1 DevOps.

## The Technology Stack

Over the course of 3 years, you worked in a modern enterprise environment, gradually migrating legacy services to a modern microservices architecture.

### Core Application
- **Runtime:** Node.js (Started on v14, migrated to v18)
- **Language:** TypeScript (Strict mode enabled for type safety)
- **Framework:** NestJS (Primary framework for its structured, Angular-like DI architecture suitable for enterprise) and Express.js (for older microservices).

### Data Layer
- **Relational DB:** PostgreSQL (Used for transactional integrity, account balances, payment limits).
- **NoSQL DB:** MongoDB (Used for unstructured data, audit logs, document metadata, customer interaction history).
- **Caching:** Redis (Distributed caching, session management, idempotency keys, rate limiting).
- **ORM/Query Builder:** TypeORM / Prisma.

### Event-Driven Architecture & Integration
- **Message Broker:** Apache Kafka (Asynchronous event processing for payments, notifications, and audit trails).
- **API Communication:** REST APIs and gRPC (for high-performance internal service-to-service communication).

### Infrastructure, DevOps & Security
- **Cloud & Containerization:** AWS (EKS, RDS, S3), Docker, Kubernetes.
- **CI/CD:** Jenkins and GitLab CI.
- **Observability:** Splunk (Log aggregation), AppDynamics / Datadog (APM), Prometheus & Grafana.
- **Security:** OAuth 2.0, OpenID Connect (OIDC), JWT, MTLS (Mutual TLS) for internal service communication, SonarQube for static code analysis, Veracode for vulnerability scanning.

## Enterprise Architecture Patterns Used
1.  **API Gateway Pattern:** Using Kong or AWS API Gateway to handle routing, rate limiting, and SSL termination.
2.  **Saga Pattern / Outbox Pattern:** Managing distributed transactions across microservices, especially in the payments domain.
3.  **BFF (Backend for Frontend):** specific Node.js APIs tailored for the Westpac Mobile App vs the Web Portal.
4.  **Idempotency:** Designing API endpoints (especially POST requests for transfers) to be idempotent using Redis to prevent duplicate charges.
