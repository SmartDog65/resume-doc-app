const lightBlueBackgroundColor = "D9E7F7";
const defaultFont = "Cambria";

const {
    Document,
    Packer,
    Paragraph,
    TextRun,
    Table, TableRow, TableCell, WidthType, BorderStyle, TabStopType, TabStopPosition,
    HeadingLevel,
    AlignmentType,
} = require("docx");
const documentStyle = {
    default: {
        document: {
            run: {
                font: "Cambria (Headings)",
                size: 22
            },
            paragraph: {
                spacing: {
                    after: 120,
                },
            },
        },
    }
}
const sectionsProperties = {
    page: {
        margin: {
            top: 720,
            right: 720,
            bottom: 720,
            left: 720,
        },
    },
}


const textParagraphElement = (text) => new Paragraph(text);
const textElement = ({ text, bold = false, font = defaultFont }) => new TextRun({ text, bold, font });
const boldTextElement = ({ text, font = defaultFont, size = 24 }) => textElement({ text, font, size, bold: true });
const paragraphHeading = (headingText) => new Paragraph({
    alignment: AlignmentType.CENTER,
    shading: {
        fill: lightBlueBackgroundColor, // Light blue background (hex without #)
    },
    children: [
        boldTextElement({ text: headingText })
    ],
});
const tabStopElements = (leftElm, rightElm) => new Paragraph({
    tabStops: [
        {
            type: TabStopType.RIGHT,
            position: 12000, // align to far right margin
        },
    ],
    children: [
        boldTextElement({text: leftElm}),
        boldTextElement({text: `\t${rightElm}`})
    ],
});
const bulletParagraph =(text) => new Paragraph({
        children: [new TextRun({
            text: "• ",
            font: "Cambria",
            size: 22,  // ~7pt (small bullet)
        }), new TextRun({ text: `${text}`, font: "Cambria" })],
    })
const summaryParagraph = (content) => [
    paragraphHeading("SUMMARY"),
    textParagraphElement("Architect-level engineer with 12+ years in enterprise eCommerce development and 5+ years leading Shopify Plus architecture, platform migrations, and third-party integrations. Skilled in building scalable Shopify ecosystems with ERP, CRM, and SaaS interoperability. Proven record of full lifecycle implementations focused on performance, security, and business value."),
];
const skillSetsParagraph = (skills) => [
    paragraphHeading("SKILLS"),
    textParagraphElement("Shopify Plus, Shopify 2.0 Migration, Liquid Templates, Custom Themes, Shopify CLI, Polaris, GraphQL, REST APIs, ERP/CRM Integration, SaaS Platforms, SEO Optimization, Page Speed Tuning, Google Analytics, Shopify Apps, Payment Gateway Integration, Shipping Configuration, Inventory Systems, CI/CD for eCommerce, Agile Scrum/Kanban, DevOps, Cloudflare, CDN, Lighthouse Audits, Conversion Optimization, Uptime Monitoring, Jira, Bitbucket Pipelines, Technical Leadership, Multi-Region Store Management"),
];
const educationParagraph = ({university, period, level, location}) => [
    paragraphHeading("EDUCATION"),
    tabStopElements(level, period),
    tabStopElements(university, location)
]
const workExperiencesParagraph = (companies) => {
    return [
        paragraphHeading("WORK EXPERIENCE"),
        ...companies.flatMap(({company, role, period, location, experiences}) => [
            tabStopElements(company, period),
            tabStopElements(role, location),
            ...experiences.map(exp => bulletParagraph(exp))
        ])
    ]
}

const createResumeDoc = ({summary, skills, companies, education}) => new Document({
        styles: documentStyle,
        sections: [
            {
                properties: sectionsProperties,
                children: [
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: "VICTOR ELIZONDO",
                                bold: true,
                                font: "Cambria", // optional: to match the rest of your document
                                size: 44, // optional: 24pt (docx uses half-points)
                            }),
                        ],
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: "SENIOR SOFTWARE ENGINEER",
                                bold: true,
                                allCaps: true,
                                size: 24, // 16pt (docx uses half-points)
                                color: "000000", // Black
                            }),
                        ],
                    }),

                    new Paragraph({
                        text: "MISSION, TX 78572 | +1 (956) 253-0717 | victor.elizondo930319@gmail.com",
                        alignment: AlignmentType.CENTER,
                    }),
                    ...summaryParagraph(summary),
                    ...skillSetsParagraph(skills),
                    ...workExperiencesParagraph(companies),
                    ...educationParagraph(education)
                ],
            },
        ],
    });

module.exports = {
    workExperiencesParagraph,
    createResumeDoc
}


