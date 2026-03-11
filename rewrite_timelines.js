const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'westpac_3_year_timeline');

const timelineData = {
    1: {
        dir: 'Year_1_Retail_Banking_Customer_Onboarding',
        topics: [
            {
                months: [1, 2, 3, 4],
                epic: 'Digital Identity Verification (KYC/AML) API',
                goals: [
                    '- Implement core KYC checks using third-party providers (Equifax/GreenID).',
                    '- Ensure strict adherence to AML regulations.',
                    '- Build asynchronous event queues for long-running verification processes.'
                ],
                tasks: [
                    {
                        title: 'Design and Implement KYC Provider Interfaces',
                        points: 5,
                        implementation: [
                            'Created TypeScript interfaces for bridging multiple identity providers (Equifax, GreenID).',
                            'Used NestJS HttpModule to handle outbound REST calls to Equifax endpoints.',
                            'Built robust error handling to catch timeout errors from external SOAP APIs and initiate retries.'
                        ]
                    },
                    {
                        title: 'RabbitMQ Integration for Async KYC Verification',
                        points: 8,
                        implementation: [
                            'Integrated RabbitMQ using amqplib to queue identity verification requests so the mobile app wouldn\'t hang on slow responses.',
                            'Implemented logic to route "partial match" identity checks to a dedicated "Manual Review" queue for operations staff.',
                            'Set up dead-letter exchanges (DLX) for failed KYC messages.'
                        ]
                    },
                    {
                        title: 'Database Schema Design for Customer Onboarding States',
                        points: 5,
                        implementation: [
                            'Designed PostgreSQL schemas (using TypeORM) to track the state of a customer onboarding application (e.g., PENDING, APPROVED, REJECTED).',
                            'Stored audit logs of all state transitions to satisfy regulatory compliance requirements.',
                            'Masked PII (Personally Identifiable Information) before storing sensitive documents.'
                        ]
                    }
                ]
            },
            {
                months: [5, 6, 7, 8],
                epic: 'Account Provisioning Service & Saga Pattern',
                goals: [
                    '- Automate bank account creation in the core banking system.',
                    '- Implement distributed transaction handling using the Saga pattern.',
                    '- Handle Rollbacks gracefully to prevent data anomalies.'
                ],
                tasks: [
                    {
                        title: 'Core Banking API Integration (Hogan / 10x)',
                        points: 5,
                        implementation: [
                            'Built a microservice mapping the onboarding API payload to the legacy core banking system requirements.',
                            'Used class-validator to ensure all mandatory fields (BSB, Account Type, Customer ID) were present.',
                            'Implemented an anti-corruption layer to isolate legacy XML formats from our modern JSON REST boundaries.'
                        ]
                    },
                    {
                        title: 'Implement Saga Pattern for Everyday and Savings Account Creation',
                        points: 8,
                        implementation: [
                            'Implemented distributed transactions: if the Everyday account succeeded but the Savings account failed, triggered a compensating transaction.',
                            'Ensured idempotency on the account creation API to avoid creating duplicate bank accounts on network retries.',
                            'Wrote extensive Jest unit tests to mock failures and verify rollback execution.'
                        ]
                    },
                    {
                        title: 'Debit Card Issuance Trigger',
                        points: 3,
                        implementation: [
                            'Published a "CardRequested" event to Kafka once the core banking account was successfully provisioned.',
                            'Secured the topic using TLS and IAM roles to ensure only authorized listeners could process card issuance.',
                            'Added metrics tracing (via Prometheus) to measure the end-to-end latency of account provisioning.'
                        ]
                    }
                ]
            },
            {
                months: [9, 10, 11, 12],
                epic: 'Secure Document Upload & Virus Scanning',
                goals: [
                    '- Enable secure streaming of customer trailing documents (payslips, passports).',
                    '- Ensure no malicious payloads enter the Westpac network.',
                    '- Optimize memory usage for large PDF files.'
                ],
                tasks: [
                    {
                        title: 'AWS S3 Multipart Document Upload Streaming',
                        points: 5,
                        implementation: [
                            'Built a Node.js streaming API to pipe large document uploads directly to AWS S3, preventing memory heap crashes.',
                            'Generated pre-signed URLs to allow the front-end to upload directly, reducing backend load.',
                            'Stored metadata (file size, mime type, hash) in MongoDB for quick retrieval.'
                        ]
                    },
                    {
                        title: 'ClamAV Virus Scanning Integration vGRPC',
                        points: 5,
                        implementation: [
                            'Integrated a ClamAV microservice via gRPC to scan uploaded documents for malware.',
                            'Implemented a webhook callback system to notify the frontend when a file was marked "SAFE" or "QUARANTINED".',
                            'Blocked processing of documents with dangerous mime-types or mismatched file signatures.'
                        ]
                    },
                    {
                        title: 'Performance Tuning & Memory Leak Profiling',
                        points: 3,
                        implementation: [
                            'Used Node Clinic and heapdump to identify and resolve memory leaks in the document upload streams.',
                            'Refactored streams to properly attach \'error\' and \'close\' event listeners, preventing dangling file descriptors.',
                            'Reduced median upload latency for a 5MB payload from 4s down to 1.5s caching temporary streams in memory.'
                        ]
                    }
                ]
            }
        ]
    },
    2: {
        dir: 'Year_2_Core_Payments_NPP_Integration',
        topics: [
            {
                months: [1, 2, 3, 4],
                epic: 'PayID Lookup and Resolution API',
                goals: [
                    '- Integrate with the central NPP addressing service.',
                    '- Provide low-latency resolution of PayIDs to account names.',
                    '- Protect against malicious directory harvesting attacks.'
                ],
                tasks: [
                    {
                        title: 'Redis Caching Layer for PayID Resolution',
                        points: 5,
                        implementation: [
                            'Implemented a Redis caching layer using Node.js to store resolved PayIDs with a short TTL (Time-To-Live).',
                            'Designed cache-fallback logic: hit Redis first, on cache-miss query the central NPP service, then populate Redis.',
                            'Used Redis pipelines to batch multiple lookup requests from bulk payment files.'
                        ]
                    },
                    {
                        title: 'Sliding-Window Rate Limiting System',
                        points: 8,
                        implementation: [
                            'Built a sliding-window rate limiter in Redis using Lua scripts to block directory harvesting (bots guessing phone numbers).',
                            'Configured tiered rate limits based on IP and User ID (e.g., max 5 lookups per minute).',
                            'Emitted security alerts to Splunk when rate limits were breached to notify the SOC (Security Operations Center).'
                        ]
                    },
                    {
                        title: 'NPP Central Service Integration',
                        points: 5,
                        implementation: [
                            'Wrote robust HTTP clients with exponential backoff to handle transient network issues with the central NPP addressing service.',
                            'Masked partial phone numbers and emails in the response to comply with Westpac privacy standards.',
                            'Added extensive endpoint monitoring using Datadog APM.'
                        ]
                    }
                ]
            },
            {
                months: [5, 6, 7, 8],
                epic: 'Real-Time Payment Initiation (ISO 20022 pacs.008)',
                goals: [
                    '- Facilitate instant Osko payments via the mobile app.',
                    '- Translate JSON requests into ISO 20022 XML formats.',
                    '- Implement rigorous pre-flight validation rules.'
                ],
                tasks: [
                    {
                        title: 'JSON to ISO 20022 XML Boundary Translation',
                        points: 5,
                        implementation: [
                            'Developed a mapping layer utilizing `xml2js` to transform JSON payloads into strict ISO 20022 pacs.008 XML format.',
                            'Validated incoming JSON against comprehensive JSON Schemas for missing mandatory fields.',
                            'Handled character set encoding conversion required by the legacy payments switch.'
                        ]
                    },
                    {
                        title: 'Pre-flight Payment Validation Logic',
                        points: 8,
                        implementation: [
                            'Implemented business logic to verify sufficient funds and check Daily Payment Limits ($10,000 max) before sending the payment.',
                            'Checked the destination account against the OFAC sanctions list to block illicit transfers.',
                            'Returned rich error descriptions to the mobile app (e.g., "Insufficient Funds", "Limit Exceeded") rather than generic HTTP 500s.'
                        ]
                    },
                    {
                        title: 'Duplicate Payment Detection',
                        points: 5,
                        implementation: [
                            'Generated unique idempotency keys per transaction based on device ID, timestamp, and amount.',
                            'Stored payment execution hashes in Redis for 24 hours to aggressively reject duplicate payment submissions within milliseconds.',
                            'Conducted chaos engineering experiments to verify the idempotency layer under extreme network latency.'
                        ]
                    }
                ]
            },
            {
                months: [9, 10, 11, 12],
                epic: 'Real-time Fraud Interceptor & Actimize Integration',
                goals: [
                    '- Detect and block scams in real-time.',
                    '- Asynchronously process payment risk scoring.',
                    '- Provide operators the ability to lift "Debit Holds".'
                ],
                tasks: [
                    {
                        title: 'Payment Metadata Event Publisher (Kafka)',
                        points: 5,
                        implementation: [
                            'Built a Node.js publisher utilizing `kafkajs` to stream payment initiation metadata (IP, Amount, Payee, Device Info) to the Fraud cluster.',
                            'Ensured high throughput and exactly-once delivery semantics using transactional producers.',
                            'Handled schema registry evolutions using Avro formats.'
                        ]
                    },
                    {
                        title: 'Fraud Async Webhook Consumer & Debit Holds',
                        points: 8,
                        implementation: [
                            'Exposed a secure webhook endpoint for the Fraud Engine (Actimize) to push back real-time risk scores.',
                            'If the score crossed the high-risk threshold, automatically placed a "Debit Hold" block on the underlying transaction record in PostgreSQL.',
                            'Sent a push notification trigger to the customer to verify the sketchy payment via the Westpac App (2FA step-up).'
                        ]
                    },
                    {
                        title: 'Operator Override API for Call Center',
                        points: 5,
                        implementation: [
                            'Developed an internal administrative REST API for the Fraud Call Center to manually override and release "Debit Holds".',
                            'Stored audit trails of which operator released the hold for compliance purposes.',
                            'Implemented strict Role-Based Access Control (RBAC) ensuring only high-level analysts could use the endpoint.'
                        ]
                    }
                ]
            }
        ]
    },
    3: {
        dir: 'Year_3_Open_Banking_CDR_and_BFF',
        topics: [
            {
                months: [1, 2, 3, 4],
                epic: 'CDR Account & Transaction APIs (Read-Only)',
                goals: [
                    '- Implement standards mandated by the Australian Data Standards Body.',
                    '- Serve massive amounts of transaction history efficiently.',
                    '- Ensure strict uptime and performance SLAs.'
                ],
                tasks: [
                    {
                        title: 'Cursor-Based Pagination for Transaction Ledger',
                        points: 8,
                        implementation: [
                            'Replaced offset-based pagination with high-performance cursor-based pagination to serve accounts with 10,000+ transactions without degrading database performance.',
                            'Serialized the `last_transaction_id` and `timestamp` into base64 encoded cursor tokens.',
                            'Optimized PostgreSQL indexes on date and account_id to support complex filtering queries mandated by CDR.'
                        ]
                    },
                    {
                        title: 'Data Masking and Transformation Layer',
                        points: 5,
                        implementation: [
                            'Implemented response interceptors to strip out internal bank reference codes and format the output entirely to the open banking DSB specification.',
                            'Masked standard account numbers (BSB/Account) replacing them with unique masked identifiers as required.',
                            'Wrote automated contract tests using Postman/Newman to verify DSB schema compliance.'
                        ]
                    },
                    {
                        title: 'High-Availability Database Read Replicas',
                        points: 3,
                        implementation: [
                            'Configured the TypeORM connections to direct all Open Banking read traffic to dedicated read-replicas, isolating analytical load from core banking transactions.',
                            'Implemented logic to handle replica-lag scenarios and fallback mechanisms.',
                            'Monitored database connection pools strictly to avoid exhausting max connections during traffic spikes.'
                        ]
                    }
                ]
            },
            {
                months: [5, 6, 7, 8],
                epic: 'Consent & FAPI (Financial-grade API) Validation',
                goals: [
                    '- Validate consumer consent strictly before serving data.',
                    '- Implement highly secure FAPI mutual TLS authentication.',
                    '- Handle consent revocation scenarios.'
                ],
                tasks: [
                    {
                        title: 'MTLS Header Validation Middleware',
                        points: 5,
                        implementation: [
                            'Developed an Express.js middleware to validate Mutual TLS (mTLS) client certificates injected by the API gateway.',
                            'Verified the Certificate Authority and ensuring the thumbprint matched the registered third-party data recipient.',
                            'Logged unauthorized access attempts with high-severity to the SIEM (Security Information and Event Management) system.'
                        ]
                    },
                    {
                        title: 'OAuth2/OIDC Token Scope & Consent Enforcement',
                        points: 8,
                        implementation: [
                            'Decoded JWT access tokens directly checking for required Open Banking scopes (e.g., `bank:transactions.read`).',
                            'Queried the "Consent Store" database to verify if the user actively consented to share data with the calling third party.',
                            'Enforced 12-month consent expiry rules, returning standard HTTP 403 Forbidden with specific DSB error codes if expired.'
                        ]
                    },
                    {
                        title: 'Consent Revocation Webhook Receiver',
                        points: 5,
                        implementation: [
                            'Built an endpoint to consume real-time consent revocation events from the identity provider (Ping Identity).',
                            'Invalidated cached consent records in Redis immediately upon revocation.',
                            'Ensured in-flight requests involving revoked consent were aborted mid-stream.'
                        ]
                    }
                ]
            },
            {
                months: [9, 10, 11, 12],
                epic: 'Mobile App BFF (Backend-For-Frontend) Aggregator',
                goals: [
                    '- Reduce network chatter for the mobile application.',
                    '- Provide a unified GraphQL/REST interface.',
                    '- Handle downstream service failures gracefully.'
                ],
                tasks: [
                    {
                        title: 'GraphQL Dashboard Aggregation Service',
                        points: 5,
                        implementation: [
                            'Implemented a Node.js/Apollo Server layer acting as the BFF for the mobile app.',
                            'Aggregated data from 5 different backend microservices (Accounts, Loans, Cards, Rewards, Notifications) into a single query.',
                            'Reduced mobile client overhead by filtering out unnecessary payloads and sending exact requested shapes.'
                        ]
                    },
                    {
                        title: 'Promise.allSettled & Graceful Degradation',
                        points: 8,
                        implementation: [
                            'Utilized `Promise.allSettled()` to fetch data concurrently instead of sequentially, reducing the dashboard load time from 2s to 600ms.',
                            'Implemented graceful degradation: If the "Rewards" microservice experienced an outage, the API still returned the Account balances successfully with a "partial data" flag.',
                            'Implemented Redis caching for relatively static data (like user profile info) to further improve latency.'
                        ]
                    },
                    {
                        title: 'Circuit Breaker Pattern via Resilience4j/Opossum',
                        points: 5,
                        implementation: [
                            'Implemented the Circuit Breaker pattern (using `opossum`) on outgoing requests to fragile legacy downstream services.',
                            'Prevented cascading failures by automatically opening the circuit when the downstream error rate exceeded 50%.',
                            'Provided automated "half-open" recovery polling and fallback mock responses when circuits were open.'
                        ]
                    }
                ]
            }
        ]
    }
};

let globalTaskCounter = 10000;

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

for (let year = 1; year <= 3; year++) {
    const yearDir = path.join(baseDir, timelineData[year].dir);
    
    for (const topic of timelineData[year].topics) {
        for (const month of topic.months) {
            const monthDir = path.join(yearDir, `Month_${month.toString().padStart(2, '0')}`);
            
            for (let week = 1; week <= 4; week++) {
                const weekFile = path.join(monthDir, `Week_${week.toString().padStart(2, '0')}.md`);
                
                // Construct the markdown using the topic data.
                // We'll randomly select 2-3 tasks from the topic's tasks to simulate work for the week.
                const numTasks = Math.floor(Math.random() * 2) + 2; // 2 or 3 tasks
                const shuffledTasks = shuffle([...topic.tasks]);
                const selectedTasks = shuffledTasks.slice(0, numTasks);
                
                let content = `# Year ${year} - Month ${month} - Week ${week}\n\n`;
                content += `**Epic Focus:** ${topic.epic}\n\n`;
                
                content += `## Sprint Goals\n`;
                topic.goals.forEach(g => {
                    content += `${g}\n`;
                });
                
                content += `\n## Jira Stories & Tasks Worked On\n\n`;
                
                selectedTasks.forEach((task, index) => {
                    globalTaskCounter++;
                    content += `### ${index + 1}. WBC-${globalTaskCounter}: ${task.title}\n`;
                    content += `- **Story Points:** ${task.points}\n`;
                    content += `- **Status:** Done\n`;
                    content += `- **Technical Implementation:**\n`;
                    task.implementation.forEach(imp => {
                        content += `  - ${imp}\n`;
                    });
                    content += `\n`;
                });
                
                content += `## Agile Ceremonies Attended\n`;
                content += `- **Daily Standup:** 15 mins daily (Reported on what I did yesterday, what I will do today, and any technical blockers).\n`;
                content += `- **Sprint Planning:** 2 hours at the start of the week (Estimated story points using planning poker).\n`;
                content += `- **Sprint Retrospective:** 1 hour at the end of the 2-week sprint cycle (Discussed what went well and areas for process improvement).\n`;
                content += `- **Backlog Grooming:** Refined upcoming stories for ${topic.epic}.\n`;
                
                fs.writeFileSync(weekFile, content);
            }
        }
    }
}

console.log('Successfully updated 144 timeline files with banking-specific features and tasks.');
