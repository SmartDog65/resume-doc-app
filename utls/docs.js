const fs = require("fs");
const {
    Document,
    Packer,
    Paragraph,
    TextRun,
    Table, TableRow, TableCell, WidthType, BorderStyle, TabStopType, TabStopPosition,
    HeadingLevel,
    AlignmentType,
} = require("docx");
const { createResumeDoc } = require("./doc-elements");


// Convert to Paragraphs
const createResume = async () => {
    const experienceBullets = [
        "Led migration of three regional Shopify 1.0 stores to a unified Shopify 2.0 platform, reducing maintenance overhead by 40%.",
        "Designed scalable integrations between Shopify, NetSuite (ERP), Salesforce (CRM), and middleware.",
        "Built reusable components using Liquid, JSON templates, and Polaris.",
        "Worked with marketing/SEO to boost Core Web Vitals and improve organic traffic by 15%.",
        "Architected headless storefronts with Shopify Storefront API and React.",
        "Managed CI/CD in Bitbucket Pipelines, enforced code standards, and mentored a global team.",
        "Enabled platform observability with New Relic and Shopify Alerting APIs.",
        "Documented eCommerce systems and onboarded offshore teams.",
        "Acted as technical liaison translating business goals into Shopify architecture.",
    ];
    const companies = [
        {
            company: "SpinSystems",
            period: "Sep 2022 – Apr 2025",
            role: "Senior Software Engineer",
            location: "Remote",
            experiences: experienceBullets
        },
        {
            company: "SpinSystems",
            period: "Sep 2022 – Apr 2025",
            role: "Senior Software Engineer",
            location: "Remote",
            experiences: experienceBullets
        },
        {
            company: "SpinSystems",
            period: "Sep 2022 – Apr 2025",
            role: "Senior Software Engineer",
            location: "Remote",
            experiences: experienceBullets
        }
    ];
   
    const resumeInfo = {
        summary: "Architect-level engineer with 12+ years in enterprise eCommerce development and 5+ years leading Shopify Plus architecture, platform migrations, and third-party integrations. Skilled in building scalable Shopify ecosystems with ERP, CRM, and SaaS interoperability. Proven record of full lifecycle implementations focused on performance, security, and business value.",
        skills: "Shopify Plus, Shopify 2.0 Migration, Liquid Templates, Custom Themes, Shopify CLI, Polaris, GraphQL, REST APIs, ERP/CRM Integration, SaaS Platforms, SEO Optimization, Page Speed Tuning, Google Analytics, Shopify Apps, Payment Gateway Integration, Shipping Configuration, Inventory Systems, CI/CD for eCommerce, Agile Scrum/Kanban, DevOps, Cloudflare, CDN, Lighthouse Audits, Conversion Optimization, Uptime Monitoring, Jira, Bitbucket Pipelines, Technical Leadership, Multi-Region Store Management",
        companies,
        education: { 
            university: "Texas Tech University",
            period: "Sep 2011 – May 2015",
            level: "Bachelor’s Degree in Computer Science",
            location: "Lubbock, TX"
        }
    }
    const doc = createResumeDoc(resumeInfo)
    const buffer = await Packer.toBuffer(doc);
    fs.writeFileSync("Shopify_Solution_Architect_Resume.docx", buffer);
};

createResume();
