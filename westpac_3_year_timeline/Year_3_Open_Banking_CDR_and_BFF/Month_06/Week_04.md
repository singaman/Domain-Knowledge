# Year 3 - Month 6 - Week 4

**Epic Focus:** Consent & FAPI (Financial-grade API) Validation

## Sprint Goals
- Validate consumer consent strictly before serving data.
- Implement highly secure FAPI mutual TLS authentication.
- Handle consent revocation scenarios.

## Jira Stories & Tasks Worked On

### 1. WBC-10306: OAuth2/OIDC Token Scope & Consent Enforcement
- **Story Points:** 8
- **Status:** Done
- **Technical Implementation:**
  - Decoded JWT access tokens directly checking for required Open Banking scopes (e.g., `bank:transactions.read`).
  - Queried the "Consent Store" database to verify if the user actively consented to share data with the calling third party.
  - Enforced 12-month consent expiry rules, returning standard HTTP 403 Forbidden with specific DSB error codes if expired.

### 2. WBC-10307: MTLS Header Validation Middleware
- **Story Points:** 5
- **Status:** Done
- **Technical Implementation:**
  - Developed an Express.js middleware to validate Mutual TLS (mTLS) client certificates injected by the API gateway.
  - Verified the Certificate Authority and ensuring the thumbprint matched the registered third-party data recipient.
  - Logged unauthorized access attempts with high-severity to the SIEM (Security Information and Event Management) system.

## Agile Ceremonies Attended
- **Daily Standup:** 15 mins daily (Reported on what I did yesterday, what I will do today, and any technical blockers).
- **Sprint Planning:** 2 hours at the start of the week (Estimated story points using planning poker).
- **Sprint Retrospective:** 1 hour at the end of the 2-week sprint cycle (Discussed what went well and areas for process improvement).
- **Backlog Grooming:** Refined upcoming stories for Consent & FAPI (Financial-grade API) Validation.
