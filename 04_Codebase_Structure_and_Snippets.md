# Codebase Structure & Snippets

This document helps you visualize what the actual codebase looked like. Assume a **NestJS** application structure.

## Folder Structure

```text
westpac-payments-service/
├── src/
│   ├── main.ts                     # Application entry point, swagger setup, global pipes
│   ├── app.module.ts               # Root module
│   ├── config/                     # Environment configs (DB, Kafka, AWS)
│   ├── common/
│   │   ├── interceptors/
│   │   │   └── idempotency.interceptor.ts  # Redis-based idempotency logic
│   │   ├── middleware/
│   │   │   └── pii-logger.middleware.ts    # Masks PII data before Splunk logging
│   │   └── exceptions/
│   │       └── custom-rpc.exception.ts
│   ├── modules/
│   │   ├── transfer/
│   │   │   ├── dto/
│   │   │   │   └── create-transfer.dto.ts  # Input validation (class-validator)
│   │   │   ├── transfer.controller.ts      # REST API endpoints
│   │   │   ├── transfer.service.ts         # Business logic
│   │   │   ├── transfer.repository.ts      # DB interactions (Postgres/TypeORM)
│   │   │   └── transfer.service.spec.ts    # Jest unit tests
│   │   ├── messaging/
│   │   │   ├── kafka-producer.service.ts
│   │   │   └── kafka-consumer.service.ts
│   └── utils/
├── test/
│   ├── app.e2e-spec.ts             # E2E testing with Supertest
├── Dockerfile                      # Multistage docker build for AWS EKS
├── package.json
└── tsconfig.json
```

## Code Snippet Example: Idempotency Interceptor (The feature from Year 2)

This is a great real-world piece of code you can talk about writing.

```typescript
import { CallHandler, ExecutionContext, Injectable, NestInterceptor, HttpException, HttpStatus } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Injectable()
export class IdempotencyInterceptor implements NestInterceptor {
  constructor(@InjectRedis() private readonly redis: Redis) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    const idempotencyKey = request.headers['x-idempotency-key'];

    if (!idempotencyKey) {
      // For safe methods (GET), skip. Handled by guards/validation elsewhere for POST.
      return next.handle();
    }

    const cacheKey = `idempotency:${request.user.id}:${idempotencyKey}`;
    
    // Check if we already processed this request
    const cachedResponse = await this.redis.get(cacheKey);
    if (cachedResponse) {
      console.log(`[Idempotency] Returning cached response for key: ${idempotencyKey}`);
      return of(JSON.parse(cachedResponse));
    }

    // Check if it's currently processing (prevent race conditions)
    const setLock = await this.redis.set(cacheKey + ':lock', 'LOCKED', 'EX', 10, 'NX');
    if (!setLock) {
      throw new HttpException('Request already processing', HttpStatus.CONFLICT);
    }

    return next.handle().pipe(
      tap(async (response) => {
        // Cache the successful response for 24 hours
        await this.redis.set(cacheKey, JSON.stringify(response), 'EX', 60 * 60 * 24);
        // Release the lock
        await this.redis.del(cacheKey + ':lock');
      }),
    );
  }
}
```

## Setting the Scene: CI/CD & Deployments
- You coded locally on a Macbook Pro.
- Used Docker Compose locally to spin up Postgres, Redis, and Kafka.
- Code mapped to Jira tickets (e.g., branch name: `feature/WBC-345-idempotency`).
- PRs required 2 approvals from team members and a passing Jenkins pipeline (Linting, Jest Tests, SonarQube quality gate).
- Deployment was automated to Development -> SIT (System Integration Testing) -> UAT -> Prod using Helm charts on Kubernetes.
