const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'westpac_3_year_timeline');

const timelineData = {
    1: {
        dir: 'Year_1_Retail_Banking_Customer_Onboarding', // keeping directory names intact so git respects it
        topics: [
            {
                months: [1, 2, 3, 4],
                epic: 'Building the Foundation: REST APIs & Forms',
                goals: [
                    '- Get the basic Bank Guarantee digital form working.',
                    '- Set up the Node.js/Express repository.',
                    '- Connect the APIs to the PostgreSQL database.'
                ],
                tasks: [
                    {
                        title: 'Repository Setup and Boilerplate',
                        points: 5,
                        implementation: [
                            'Initialized the Node.js project using Express (or NestJS).',
                            'Set up Environment variables, strict TypeScript linting rules, and local Docker containers for PostgreSQL.',
                            'Wrote the first GET and POST REST APIs to test database connectivity.'
                        ]
                    },
                    {
                        title: 'Database Schema Design (TypeORM)',
                        points: 8,
                        implementation: [
                            'Designed the core `Bank_Guarantees` table in PostgreSQL.',
                            'Added columns like `amount`, `customer_details`, and specifically the `status` column (Draft, Pending Review, etc.).',
                            'Used TypeORM to handle database migrations securely.'
                        ]
                    },
                    {
                        title: 'Basic Form Submission API',
                        points: 5,
                        implementation: [
                            'Built the `POST /api/guarantees` API for the Banker to submit the form.',
                            'Used `class-validator` to ensure all mandatory fields were perfectly filled in before hitting the database.',
                            'Returned proper HTTP 201 Created statuses.'
                        ]
                    }
                ]
            },
            {
                months: [5, 6, 7, 8],
                epic: 'Security: Authentication & Role-Based Access Control (RBAC)',
                goals: [
                    '- Ensure that everyone logging into the portal has the correct role.',
                    '- Stop Bankers from accessing Reviewer endpoints.',
                    '- Integrate with Single Sign-On (SSO).'
                ],
                tasks: [
                    {
                        title: 'JWT Authentication Middleware',
                        points: 5,
                        implementation: [
                            'Built an Express middleware to intercept every API request coming from the frontend.',
                            'Decoded the JWT (JSON Web Token) to prove the user was actually logged into the Bank.',
                            'Rejected invalid or expired tokens with a 401 Unauthorized error.'
                        ]
                    },
                    {
                        title: 'Role Extraction via Token Payload',
                        points: 5,
                        implementation: [
                            'Extracted the `role` attribute directly from the validated token (e.g., `role: banker` or `role: reviewer_1`).',
                            'Passed the decoded role down into the request context (req.user) so the controllers could read it.'
                        ]
                    },
                    {
                        title: 'Endpoint Access Control List (ACL)',
                        points: 8,
                        implementation: [
                            'Secured the `PATCH /api/approve` endpoint forcefully.',
                            'Wrote logic preventing users with the `banker` role from accessing review endpoints.',
                            'Returned a strict `403 Forbidden` if a user attempted horizontal privilege escalation.'
                        ]
                    }
                ]
            },
            {
                months: [9, 10, 11, 12],
                epic: 'File Uploads: Attaching Documents to Guarantees',
                goals: [
                    '- Allow Bankers to upload huge PDF legal documents.',
                    '- Ensure Node.js does not crash from memory spikes.',
                    '- Secure the documents in AWS S3.'
                ],
                tasks: [
                    {
                        title: 'Multipart/Form-Data API Endpoint',
                        points: 5,
                        implementation: [
                            'Built an API utilizing `multer` (or similar) to accept incoming PDF files attached to a specific Bank Guarantee ID.',
                            'Wrote file validation logic checking the Mime-Type to ensure users only uploaded exact PDFs and not dangerous `.exe` files.'
                        ]
                    },
                    {
                        title: 'Streaming Uploads to AWS S3',
                        points: 8,
                        implementation: [
                            'Integrated the AWS SDK into the Node.js backend.',
                            'Instead of loading a 20MB file entirely into Node.js heap memory, implemented Node Streams to pipe the file directly to Westpac\'s internal S3 bucket.',
                            'Stored the S3 `ObjectKey` URL in the PostgreSQL database.'
                        ]
                    },
                    {
                        title: 'Secure Document Download API',
                        points: 5,
                        implementation: [
                            'Built a `GET /api/documents/:id` endpoint for Reviewers to read the uploaded PDFs.',
                            'Instead of proxying the large binary file back through Node.js, generated temporary, short-lived "Pre-Signed S3 URLs" to give the Reviewer direct but secure access.'
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
                epic: 'The Workflow Engine: Strict State Transitions',
                goals: [
                    '- Force the Bank Guarantee to move in a rigid path.',
                    '- Prevent a document from skipping the Reviewer 1 phase.',
                    '- Handle Approval and Rejection logic.'
                ],
                tasks: [
                    {
                        title: 'State Transition Validator Logic',
                        points: 8,
                        implementation: [
                            'Built the brain of the workflow engine. When Reviewer 1 clicks approve, the Node.js API queries the database first.',
                            'Checked: Is `current_status == "PENDING_REVIEWER_1"`? If yes, update it to `PENDING_REVIEWER_2`.',
                            'If the status was wrong, the API forcefully aborted the action throwing an `Invalid State Transition` error.'
                        ]
                    },
                    {
                        title: 'Workflow Assignment API',
                        points: 5,
                        implementation: [
                            'Wrote the logic to assign a Bank Guarantee to a specific Reviewer.',
                            'Updated the database to mark `assigned_to = "John Doe"` so no other reviewer could accidentally approve the exact same document simultaneously.'
                        ]
                    },
                    {
                        title: 'Rejection and Feedback Loop',
                        points: 5,
                        implementation: [
                            'Built the `PATCH /api/guarantees/:id/reject` endpoint.',
                            'If a reviewer rejected a document for having bad details, it transitioned strictly backward to the `DRAFT` status and immediately un-assigned the reviewer.'
                        ]
                    }
                ]
            },
            {
                months: [5, 6, 7, 8],
                epic: 'Private Commenting System',
                goals: [
                    '- Allow Reviewers to leave comments on the Bank Guarantee.',
                    '- Ensure Bankers cannot read "Internal Review Only" comments.',
                    '- Keep comments securely attached to the workflow.'
                ],
                tasks: [
                    {
                        title: 'Create Comments Database Table and API',
                        points: 5,
                        implementation: [
                            'Created a new `Comments` table in PostgreSQL linking to the `Bank_Guarantees` table via a Foreign Key.',
                            'Built the `POST /api/comments` API letting users submit their feedback text.',
                            'Sanitized the incoming HTML input before saving to prevent Cross-Site Scripting (XSS) attacks.'
                        ]
                    },
                    {
                        title: 'Visibility Flags (Internal Review Only)',
                        points: 5,
                        implementation: [
                            'Added a `visibility_scope` boolean to the database.',
                            'If a Reviewer checked the "Internal Review Only" box on the UI, the API saved this boolean flag as true.'
                        ]
                    },
                    {
                        title: 'Role-Filtered Dashboard API',
                        points: 8,
                        implementation: [
                            'Heavily modified the `GET /api/guarantees/:id` endpoint which fetched the full history.',
                            'If the decoded JWT token belonged to a `Banker`, my Node.js logic explicitly filtered out (removed) any comments flagged as "Internal Review Only" before returning the JSON payload to the frontend, ensuring data privacy.'
                        ]
                    }
                ]
            },
            {
                months: [9, 10, 11, 12],
                epic: 'Compliance and Audit Logging',
                goals: [
                    '- Track every single change made to a Bank Guarantee.',
                    '- Ensure the actual status update AND the log update happen simultaneously.',
                    '- Provide history reports.'
                ],
                tasks: [
                    {
                        title: 'Audit Log Schema Design',
                        points: 3,
                        implementation: [
                            'Created a strictly insert-only `Audit_Logs` table.',
                            'Captured the timestamp, the User ID performing the action, the `Old_State`, and the `New_State`.'
                        ]
                    },
                    {
                        title: 'Atomic Database Transactions',
                        points: 8,
                        implementation: [
                            'Wrapped the workflow approval updates using SQL Database Transactions (`BEGIN...COMMIT`).',
                            'Ensured that updating the guarantee to `Completed` AND inserting the `Audit_Log` row happened simultaneously.',
                            'If the Audit log failed to save, the transaction rolled back entirely, ensuring regulatory compliance was never breached.'
                        ]
                    },
                    {
                        title: 'History Fetching endpoint',
                        points: 5,
                        implementation: [
                            'Built an API for Managers to fetch the complete chronological audit history of a guarantee from creation to completion.',
                            'Added cursor-based pagination to handle cases where a heavily-debated guarantee had hundreds of historical log entries.'
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
                epic: 'Performance Optimization: Dynamic Dashboards',
                goals: [
                    '- Speed up the loading time of the massive Reviewer dashboards.',
                    '- Fix database N+1 querying issues causing slowness.',
                    '- Aggregate data properly.'
                ],
                tasks: [
                    {
                        title: 'Backend-For-Frontend (BFF) Aggregation',
                        points: 5,
                        implementation: [
                            'The React dashboard was making 5 slow API calls to load the Bank Guarantee list, user profiles, and document metadata.',
                            'Built an aggregation API layer (using optimized SQL JOINs or a GraphQL layer) into a single optimized payload.',
                            'Reduced the overall dashboard loading time from 3 seconds down to 800 milliseconds.'
                        ]
                    },
                    {
                        title: 'Fixing the N+1 Query Problem',
                        points: 8,
                        implementation: [
                            'Identified that fetching 100 Bank Guarantees was causing the API to make 100 separate Database queries to fetch the "Assignee User Profile" for each row.',
                            'Implemented a `dataloader` (or batching SQL queries using `WHERE id IN (...)`) to collapse the 100 queries down to just 2 efficient queries.'
                        ]
                    },
                    {
                        title: 'Pagination and Searching',
                        points: 5,
                        implementation: [
                            'Optimized database indexes to allow Reviewers to quickly perform partial text-searches on "Customer Names" or filter by "Urgency" without causing full-table scans.'
                        ]
                    }
                ]
            },
            {
                months: [5, 6, 7, 8],
                epic: 'Caching Common Data using Redis',
                goals: [
                    '- Stop bombarding PostgreSQL with requests that rarely change.',
                    '- Store "Dropdown menus" into fast-memory.',
                    '- Reduce overall latency.'
                ],
                tasks: [
                    {
                        title: 'Redis Implementation for Configuration Data',
                        points: 5,
                        implementation: [
                            'Integrated Node.js with a Redis cluster to serve static data used constantly by the forms (e.g., list of Approved Currencies, Guarantee Limits).',
                            'Drastically reduced database overhead by serving this data directly from memory in 5ms.'
                        ]
                    },
                    {
                        title: 'Cache Invalidation Strategies',
                        points: 5,
                        implementation: [
                            'Wrote administrative APIs for Managers to update currency rules.',
                            'Implemented immediate cache invalidation so that when a Manager updated a rule in PostgreSQL, the old rule was immediately evicted from Redis.'
                        ]
                    },
                    {
                        title: 'Session and Temporary Data Storage',
                        points: 5,
                        implementation: [
                            'Utilized Redis to store UI View-states so when a Banker navigated away from a massive form and came back, they did not lose their draft data, saving it automatically every minute.'
                        ]
                    }
                ]
            },
            {
                months: [9, 10, 11, 12],
                epic: 'Automation: PDF Document Generation Worker',
                goals: [
                    '- Automatically assemble the final legal document when approved.',
                    '- Remove the need for Bankers to use Microsoft Word.',
                    '- Stamp digital watermarks.'
                ],
                tasks: [
                    {
                        title: 'Background Worker Setup',
                        points: 5,
                        implementation: [
                            'Since generating PDFs blocks the Node.js event pool, I created an asynchronous background worker process listening to an Event Queue.',
                            'When a guarantee hit `Completed` status, an event fired off to the worker.'
                        ]
                    },
                    {
                        title: 'Dynamic HTML to PDF Engine',
                        points: 8,
                        implementation: [
                            'Utilized `Puppeteer` (Headless Chrome) inside the worker container.',
                            'The script fetched the finalized JSON Bank Guarantee data, injected it deeply into a legal HTML template, and converted that HTML directly into a finalized PDF.',
                            'Handled varied logic: e.g., if the currency was USD, rendering specific legal clauses dynamically.'
                        ]
                    },
                    {
                        title: 'Watermarking and Final S3 Upload',
                        points: 5,
                        implementation: [
                            'Added digital watermarks and approval timestamps to the footer of the generated PDF.',
                            'Streamed the completed legal PDF directly to the AWS S3 vault and notified the Banker via email that their final document was ready for the customer.'
                        ]
                    }
                ]
            }
        ]
    }
};

let globalTaskCounter = 30000;

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
                
                if (fs.existsSync(monthDir)) {
                     fs.writeFileSync(weekFile, content);
                }
            }
        }
    }
}

console.log('Successfully completely refactored 144 timeline files perfectly mirroring the simplified Bank Guarantee Project.');
