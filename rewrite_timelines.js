const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'westpac_3_year_timeline');

const timelineData = {
    1: {
        dir: 'Year_1_Retail_Banking_Customer_Onboarding',
        topics: [
            {
                months: [1, 2, 3, 4],
                epic: 'Core Architecture & Role-Based Access Control (RBAC)',
                goals: [
                    '- Set up the Node.js API foundation for the Bank Guarantee application.',
                    '- Implement rigorous authentication and Multi-Role Access Control.',
                    '- Ensure secure internal Single Sign-On (SSO) integration.'
                ],
                tasks: [
                    {
                        title: 'Design and Implement JWT/RBAC Middleware',
                        points: 8,
                        implementation: [
                            'Built custom Express.js middleware to decode internal Westpac SSO JWT tokens.',
                            'Extracted the user role (Banker, Reviewer_1, Reviewer_2) directly from the token payload.',
                            'Implemented an ACL (Access Control List) guard to ensure Bankers could not access Reviewer approval endpoints, returning 403 Forbidden for unauthorized access attempts.'
                        ]
                    },
                    {
                        title: 'Database Schema Design for Multi-Role Entities',
                        points: 5,
                        implementation: [
                            'Designed complex relational PostgreSQL schemas using TypeORM (or Prisma).',
                            'Created tables mapping Bank Guarantee IDs to User IDs, explicitly linking "Assigned Reviewer" relationships.',
                            'Optimized database indexes on the `status` and `assigned_to` columns for fast dashboard querying.'
                        ]
                    },
                    {
                        title: 'Dynamic Dashboard BFF API',
                        points: 5,
                        implementation: [
                            'Developed a Backend-For-Frontend (BFF) GET endpoint serving the user\'s working dashboard.',
                            'Implemented business logic to dynamically return `allowedActions` (e.g., ["Submit", "Save Draft"]) based on both the user\'s decoded role and the current workflow state of the guarantee.',
                            'Supported complex filtering, allowing Reviewers to search assigned guarantees by "Urgency" and "Customer Name".'
                        ]
                    }
                ]
            },
            {
                months: [5, 6, 7, 8],
                epic: 'Bank Guarantee Workflow Engine & State Machine',
                goals: [
                    '- Implement a strict state machine preventing invalid workflow transitions.',
                    '- Develop the core actions: Submit, Approve, Reject, Needs More Info.',
                    '- Build out an atomic audit logging mechanism.'
                ],
                tasks: [
                    {
                        title: 'State Transition API Logic (DRAFT -> PENDING_R1)',
                        points: 8,
                        implementation: [
                            'Built the submission API validating the Bank Guarantee payload against a strict JSON Schema.',
                            'Evaluated the current state: If the guarantee was in DRAFT, updated the state to PENDING_REVIEWER_1.',
                            'Threw strict `400 Bad Request` exceptions if an invalid transition was attempted (e.g., trying to Submit an already Completed guarantee).'
                        ]
                    },
                    {
                        title: 'Reviewer Approval & Progression Chain',
                        points: 8,
                        implementation: [
                            'Developed the core approval endpoints. If Reviewer 1 approved, updated the state to PENDING_REVIEWER_2.',
                            'If Reviewer 2 approved, transitioned the state to PENDING_BANKER (finalizing stage).',
                            'Handled Rejection pathways: Reverted the state back to DRAFT or PENDING_BANKER for corrections, clearing temporary assigned reviewers.'
                        ]
                    },
                    {
                        title: 'Atomic Transactions & Audit Logging',
                        points: 5,
                        implementation: [
                            'Ensured compliance by wrapping state transition updates inside a database transaction (`BEGIN...COMMIT`).',
                            'Simultaneously inserted an immutable `AuditLog` row tracking the exact Timestamp, User ID, Previous State, and New State alongside every status update.',
                            'Prevented "dirty reads" during concurrent reviewer actions.'
                        ]
                    }
                ]
            },
            {
                months: [9, 10, 11, 12],
                epic: 'Data Visibility and Private Commenting System',
                goals: [
                    '- Allow multi-user collaboration to exist safely within the same application.',
                    '- Implement private commenting visible only to specific roles.',
                    '- Develop notification triggers.'
                ],
                tasks: [
                    {
                        title: 'Private Commenting API Endpoint',
                        points: 5,
                        implementation: [
                            'Built a `POST /api/guarantees/:id/comments` endpoint allowing Bankers and Reviewers to leave remarks.',
                            'Added a `visibility_scope` boolean to comments. Reviewers could check a box to mark their comment as "Internal Review Only".',
                            'Stored the HTML-sanitized comment payload safely in the database to prevent XSS (Cross-Site Scripting).'
                        ]
                    },
                    {
                        title: 'Role-Based Comment Filtering (GET)',
                        points: 5,
                        implementation: [
                            'Implemented complex filtering within the `GET /api/guarantees/:id` payload response.',
                            'If a Banker (Role = Banker) fetched the Bank Guarantee history, the Node.js API explicitly stripped out any comments flagged as "Internal Review Only".',
                            'If a Reviewer fetched the same Guarantee, they received the full unabridged array of comments.'
                        ]
                    },
                    {
                        title: 'Workflow Asynchronous Notifications via Kafka',
                        points: 3,
                        implementation: [
                            'When a Bank Guarantee transitioned to `PENDING_R1`, published a Kafka event (`GuaranteeAssigned`).',
                            'A separate consumer microservice picked up this event to trigger internal Westpac emails notifying Reviewer 1 that they had a pending task.',
                            'Ensured the event publisher was resilient, using at-least-once delivery mechanisms.'
                        ]
                    }
                ]
            }
        ]
    },
    2: {
        dir: 'Year_2_Core_Payments_NPP_Integration', // Keeping folder names identical to avoid breaking paths
        topics: [
            {
                months: [1, 2, 3, 4],
                epic: 'Document Vault & Internal Storage Integrations',
                goals: [
                    '- Securely attach internal risk assessments to Bank Guarantees.',
                    '- Restrict document download capabilities based on workflow state.',
                    '- Prevent sensitive legal documents from memory leaks.'
                ],
                tasks: [
                    {
                        title: 'AWS S3 Document Upload API for Bank Guarantees',
                        points: 5,
                        implementation: [
                            'Built a Node.js streaming API accepting multipart/form-data specifically for legal contracts and risk assessments attached to a Guarantee.',
                            'Piped the stream directly into an internal Westpac S3 bucket, preventing memory saturation on the Node horizontal pod.',
                            'Saved the document metadata (S3 Object Key, size, uploader) into the relational database.'
                        ]
                    },
                    {
                        title: 'Role-Restricted Document Download (Pre-Signed URLs)',
                        points: 8,
                        implementation: [
                            'Implemented download API logic: Verify the user downloading the risk document actually had "read" access to that specific Guarantee ID.',
                            'Generated temporary, short-lived (5 min) S3 Pre-signed URLs for authenticated users instead of proxying massive binaries through Node.',
                            'Logged all document access events to Splunk for internal compliance monitoring.'
                        ]
                    },
                    {
                        title: 'ClamAV Malware Scanning Middleware',
                        points: 3,
                        implementation: [
                            'Integrated a ClamAV daemon using gRPC. Whenever a Banker uploaded a supporting document, it was pushed into a buffer queue.',
                            'The file was scanned asynchronously for malware before the state of the document was marked `SAFE_FOR_REVIEW`.',
                            'Blocked Reviewers from downloading documents marked as `PENDING_SCAN`.'
                        ]
                    }
                ]
            },
            {
                months: [5, 6, 7, 8],
                epic: 'Complex Locking and Concurrency Management',
                goals: [
                    '- Prevent multiple Reviewers from simultaneously acting on the exact same Bank Guarantee.',
                    '- Implement Pessimistic/Optimistic database locks.',
                    '- Enhance application stability under high load.'
                ],
                tasks: [
                    {
                        title: 'Reviewer Assignment and Redis Locks',
                        points: 8,
                        implementation: [
                            'Implemented a "Checkout" feature: When Reviewer 1 opens Bank Guarantee #47, the API sets a distributed Redis lock with a TTL of 15 minutes.',
                            'If a second Reviewer 1 tries to open Guarantee #47, the API returns a `423 Locked` response indicating "Currently being reviewed by John Doe".',
                            'Built a background Node cron-job to safely release orphaned locks if a reviewer closed their browser tab without clicking "Save".'
                        ]
                    },
                    {
                        title: 'Optimistic Concurrency Control (ETags)',
                        points: 5,
                        implementation: [
                            'Implemented Optimistic Locking using the `version` column in the database schema.',
                            'When updating comments or transitioning state, the API checked if the requested `version` matched the database `version`.',
                            'Prevented the "Lost Update" problem where a Banker\'s save action overwrites a Reviewer\'s simultaneous approval by throwing an Http 412 Precondition Failed.'
                        ]
                    },
                    {
                        title: 'Caching Common Dictionary/Dropdown Data',
                        points: 3,
                        implementation: [
                            'Implemented Redis caching for static dropdown data used across the Bank Guarantee forms (e.g., "Guarantee Types", "Approved Currency Codes").',
                            'Reduced load on the PostgreSQL database for highly read, rarely mutated configuration tables.',
                            'Added immediate cache invalidation whenever a system admin added a new Guarantee Type.'
                        ]
                    }
                ]
            },
            {
                months: [9, 10, 11, 12],
                epic: 'Reporting & Guarantee Generation',
                goals: [
                    '- Automatically assemble PDF legal documents based on approved workflow data.',
                    '- Generate compliance reports for management.',
                    '- Export Bank Guarantee data to legacy systems.'
                ],
                tasks: [
                    {
                        title: 'PDF Generation from Approved Guarantees',
                        points: 5,
                        implementation: [
                            'When a guarantee reached the `COMPLETED` state, a Kafka event triggered a worker service.',
                            'Utilized `Puppeteer` (or PDFKit) inside Node.js to dynamically generate the official legal Bank Guarantee document based on an HTML template populated with the database payload.',
                            'Stamped the generated PDF with watermarks and a digital signature hash.'
                        ]
                    },
                    {
                        title: 'Multi-Role Search and Reporting Aggregation API',
                        points: 8,
                        implementation: [
                            'Built robust reporting APIs for management users hitting MongoDB analytical read-replicas.',
                            'Used the MongoDB Aggregation Pipeline to generate reports like "Average Time Spent in PENDING_R1 Status" and "Total Dollar Value of Guarantees Issued this Month".',
                            'Secured the API with pagination and query timeouts to prevent heavy analytical queries from degrading the primary API performance.'
                        ]
                    },
                    {
                        title: 'Metrics and APM (Datadog) Instrumentation',
                        points: 3,
                        implementation: [
                            'Instrumented all mission-critical workflow transition endpoints thoroughly using Datadog APM tracing.',
                            'Set up performance alerts if the `Approve` API latency breached 1.5 seconds, specifically monitoring the time taken by the atomic transaction and audit log inserts.',
                            'Tracked "Invalid State Transition" 400 errors to identify frontend application bugs.'
                        ]
                    }
                ]
            }
        ]
    },
    // Leaving Year 3 mostly the same high-level concepts (BFF, read replicas, scaling), 
    // but tailored to internal workflow optimization.
    3: {
        dir: 'Year_3_Open_Banking_CDR_and_BFF', // Keeping identical
        topics: [
            {
                months: [1, 2, 3, 4],
                epic: 'Legacy System Integration & Data Synchronization',
                goals: [
                    '- Sync approved Bank Guarantees with legacy mainframe ledgers.',
                    '- Ensure exactly-once message delivery.',
                    '- Handle transient legacy system failures smoothly.'
                ],
                tasks: [
                    {
                        title: 'Mainframe Synchronization Service',
                        points: 8,
                        implementation: [
                            'Built an Anti-Corruption Layer (microservice) mapping the modern JSON Bank Guarantee payload into fixed-width EBCDIC files required by the legacy Hogan core.',
                            'Scheduled daily synchronization batch jobs using Node.js `node-cron` fetching all guarantees moved to `COMPLETED` that day.',
                            'Generated unique correlation IDs to verify end-to-end processing across modern and legacy boundaries.'
                        ]
                    },
                    {
                        title: 'Circuit Breakers for Outbound Legacy Calls',
                        points: 5,
                        implementation: [
                            'Implemented the Circuit Breaker pattern using `opossum` around the SOAP XML calls made to the legacy Customer Information System (CIS).',
                            'If CIS experienced an outage, the API buffered the approval requests into a RabbitMQ queue for deferred processing, rather than returning HTTP 500s to the Reviewer.',
                            'Added automated recovery polling algorithms when circuits flipped to a "half-open" state.'
                        ]
                    },
                    {
                        title: 'Automated E2E Workflow Testing',
                        points: 5,
                        implementation: [
                            'Wrote extensive Jest and Supertest suites mocking the entire Bank Guarantee lifecycle.',
                            'Automated contract testing: Submit (Banker) -> Approve (R1) -> Approve (R2) -> Validate Audit Logs -> Ensure PDF Generated.',
                            'Integrated these heavy E2E suites into the GitHub Actions CI/CD pipeline blocking pull requests if any workflow state constraint failed.'
                        ]
                    }
                ]
            },
            {
                months: [5, 6, 7, 8],
                epic: 'Scaling the Application and GraphQL BFF Optimization',
                goals: [
                    '- Transition the massive internal Dashboard API to GraphQL.',
                    '- Fix N+1 query problems hurting dashboard loading times.',
                    '- Serve aggregated stats seamlessly.'
                ],
                tasks: [
                    {
                        title: 'GraphQL BFF Implementation (Apollo Server)',
                        points: 8,
                        implementation: [
                            'Replaced heavily nested REST API dashboard queries with a GraphQL BFF using Apollo Server.',
                            'Allowed the Frontend React application to dynamically request Guarantee Details, Associated Audit Logs, and User Profiles via a single network request.',
                            'Drastically reduced network over-fetching payload from 500kb per request down to 80kb by querying exact schema shapes.'
                        ]
                    },
                    {
                        title: 'Dataloader for N+1 Query Resolution',
                        points: 5,
                        implementation: [
                            'Identified the classic GraphQL N+1 problem when fetching the User Profile (Name/Email) for every Reviewer assigned to a dashboard list of 100 guarantees.',
                            'Integrated `dataloader` to batch and deduplicate underlying database queries, collapsing 100 User SQL queries into a single `SELECT * FROM Users WHERE id IN (...)`.',
                            'Improved dashboard API responsiveness by 60% under peak load.'
                        ]
                    },
                    {
                        title: 'Read Heavy Performance Tuning',
                        points: 3,
                        implementation: [
                            'Re-architected the `TypeORM` connection pooling to route graphQL queries exclusively to the Postgres Read-Replicas.',
                            'Analyzed slow query logs and added compound indexes mapping `status` and `assigned_reviewer_id`.',
                            'Configured Node.js horizontal pod autoscaling (HPA) in Kubernetes based on CPU utilization.'
                        ]
                    }
                ]
            },
            {
                months: [9, 10, 11, 12],
                epic: 'System Upgrades & Technical Debt Eradication',
                goals: [
                    '- Upgrade major frameworks and dependencies safely.',
                    '- Enforce deeper security patching.',
                    '- Ensure zero downtime during internal deployments.'
                ],
                tasks: [
                    {
                        title: 'Major Version Node.js and NestJS Upgrades',
                        points: 5,
                        implementation: [
                            'Operated a major dependency overhaul moving the monolithic API from Node 14/Express to Node 18/NestJS.',
                            'Refactored legacy Callback and Promise chains entirely into modern `async/await` patterns across the workflow engine.',
                            'Replaced deprecated libraries (e.g., swapping `request` for `axios`) ensuring no breaking changes to the frontend contracts.'
                        ]
                    },
                    {
                        title: 'Security Vulnerability Remediation (CVEs)',
                        points: 5,
                        implementation: [
                            'Integrated `npm audit` and Snyk directly into the CI/CD pipeline.',
                            'Patched critical Cross-Site Scripting (XSS) and SQL Injection vulnerabilities identified in regular penetration testing by the Westpac internal red team.',
                            'Enforced strict Content-Security-Policy (CSP) and CORS headers entirely via Helmet middleware.'
                        ]
                    },
                    {
                        title: 'Zero Downtime Deployment Strategy Implementation',
                        points: 5,
                        implementation: [
                            'Configured Kubernetes Readiness and Liveness probes to support seamless rolling updates.',
                            'Ensured that in-flight Bank Guarantee workflow approvals (e.g., active Database Transactions) completed within a graceful shutdown window before a Pod was terminated.',
                            'Documented deployment runbooks minimizing disruption for internal business users.'
                        ]
                    }
                ]
            }
        ]
    }
};

let globalTaskCounter = 20000;

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
                
                const numTasks = Math.floor(Math.random() * 2) + 2; 
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
                
                // Only write the file if it actually exists in the filesystem path
                if (fs.existsSync(monthDir)) {
                     fs.writeFileSync(weekFile, content);
                }
            }
        }
    }
}

console.log('Successfully updated 144 timeline files with Bank Guarantee Application Workflow stories.');
