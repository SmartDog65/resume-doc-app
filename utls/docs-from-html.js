const fs = require("fs");
const htmlToDocx = require("html-to-docx");

const html = fs.readFileSync("utls/template.html", "utf8");

const generateResume = async () => {
  const fileBuffer = await htmlToDocx(html, null, {
    table: { row: { cantSplit: true } },
    footer: false,
    pageNumber: false,
  });

  fs.writeFileSync("Victor_Elizondo_Resume.docx", fileBuffer);
  console.log("Resume.docx has been generated.");
};

generateResume()
