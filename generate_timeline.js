const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'westpac_3_year_timeline');

if (!fs.existsSync(baseDir)) {
    fs.mkdirSync(baseDir, { recursive: true });
}

const themes = [
    {
        year: 1,
        title: "Retail_Banking_Customer_Onboarding",
        epics: [
            "Setup and Initial Architecture",
            "Third-Party Equifax Integration",
            "Document Upload and S3 Integration",
            "Rate Limiting and Security Checks",
            "Testing and CI/CD Pipeline Setup",
            "Production Deployment and Post-Launch bug fixes"
        ]
    },
    {
        year: 2,
        title: "Core_Payments_NPP_Integration",
        epics: [
            "Kafka Event Driven Architecture Setup",
            "Idempotency Implementation with Redis",
            "Saga Pattern for Distributed Transactions",
            "Fraud Detection Alert Consumer",
            "Database Optimizations for Transaction Ledgers",
            "Load Testing and Auto-Scaling"
        ]
    },
    {
        year: 3,
        title: "Open_Banking_CDR_and_BFF",
        epics: [
            "MTLS and OAuth Scope Setup for Open Banking",
            "BFF GraphQL Architecture Design",
            "Legacy Monolith to Microservice Data Aggregation",
            "Cursor-based Pagination and Performance tuning",
            "Security Audits and Code Reviews",
            "Final Delivery and Architecture Handover"
        ]
    }
];

const generatedContent = (year, month, week, epic) => {
    return "# Year " + year + " - Month " + month + " - Week " + week + "\n\n" +
"**Epic Focus:** " + epic + "\n\n" +
"## Sprint Goals\n" +
"- Focus on delivering story points related to the overall epic: " + epic + ".\n" +
"- Participate in daily standups, sprint planning, and backlog grooming sessions.\n" +
"- Maintain >85% code coverage for all new Node.js services.\n\n" +
"## Jira Stories & Tasks Worked On\n\n" +
"### 1. WBC-" + year + String(month).padStart(2, '0') + String(week).padStart(2, '0') + "1: Implement Core Logic for " + epic + "\n" +
"- **Story Points:** 5\n" +
"- **Status:** Done\n" +
"- **Technical Implementation:**\n" +
"  - Developed Node.js/NestJS service layers containing the core business logic.\n" +
"  - Implemented interfaces and DTOs using TypeScript for strict type-checking.\n" +
"  - Added comprehensive unit tests using Jest, testing positive flows and edge cases.\n\n" +
"### 2. WBC-" + year + String(month).padStart(2, '0') + String(week).padStart(2, '0') + "2: API Integration and Error Handling\n" +
"- **Story Points:** 3\n" +
"- **Status:** Done\n" +
"- **Technical Implementation:**\n" +
"  - Wired up the controllers to expose RESTful endpoints (or GraphQL resolvers).\n" +
"  - Used `class-validator` to validate incoming request payloads.\n" +
"  - Implemented custom Exception Filters to standardize API HTTP error responses (e.g., 400 Bad Request, 500 Internal Server Error).\n" +
"  - Ensured no PII (Personally Identifiable Information) was leaked by masking sensitive fields before logging to Splunk.\n\n" +
"### 3. WBC-" + year + String(month).padStart(2, '0') + String(week).padStart(2, '0') + "3: Peer Review & Technical Debt Refactoring\n" +
"- **Story Points:** 2\n" +
"- **Status:** Done\n" +
"- **Technical Implementation:**\n" +
"  - Conducted code reviews for 2 other backend developers, focusing on performance, security, and adherence to clean architecture principles.\n" +
"  - Refactored common utility functions into a shared `common-utils` module to adhere to DRY principles.\n\n" +
"## Agile Ceremonies Attended\n" +
"- **Daily Standup:** 15 mins daily (Reported on what I did yesterday, what I will do today, and any technical blockers).\n" +
"- **Sprint Planning:** 2 hours at the start of the week (Estimated story points using planning poker).\n" +
"- **Sprint Retrospective:** 1 hour at the end of the 2-week sprint cycle (Discussed what went well and areas for process improvement).\n";
};

let totalFiles = 0;

for (let y = 0; y < themes.length; y++) {
    const yearData = themes[y];
    const yearName = "Year_" + yearData.year + "_" + yearData.title;
    const yearDir = path.join(baseDir, yearName);
    
    if (!fs.existsSync(yearDir)) fs.mkdirSync(yearDir);

    for (let m = 1; m <= 12; m++) {
        const monthName = "Month_" + m.toString().padStart(2, '0');
        const monthDir = path.join(yearDir, monthName);
        
        if (!fs.existsSync(monthDir)) fs.mkdirSync(monthDir);

        const epicIndex = Math.floor((m - 1) / 2); // Rotate epic every 2 months
        const currentEpic = yearData.epics[epicIndex];

        // 4 weeks a month representation
        for (let w = 1; w <= 4; w++) {
            const weekName = "Week_" + w.toString().padStart(2, '0') + ".md";
            const weekFile = path.join(monthDir, weekName);
            
            fs.writeFileSync(weekFile, generatedContent(yearData.year, m, w, currentEpic));
            totalFiles++;
        }
    }
}
console.log("Successfully generated " + totalFiles + " weekly Jira story files across 3 years in " + baseDir);
