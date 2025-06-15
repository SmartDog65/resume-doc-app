import express from 'express';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/generate', (req, res) => {
  const { companyName, jdText } = req.body;

  if (!companyName || !jdText) {
    return res.status(400).json({ message: 'Missing input data' });
  }

  const filename = `${companyName.replace(/\s+/g, '_')}_Resume.doc`;
  const outputPath = path.join('D:/', filename);

  const html = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office'
          xmlns:w='urn:schemas-microsoft-com:office:word'
          xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Resume</title></head>
      <body>
        <h2>${companyName}</h2>
        <p>${jdText.replace(/\n/g, '<br>')}</p>
      </body>
    </html>`;

  try {
    fs.writeFileSync(outputPath, '\ufeff' + html, 'utf8');
    res.json({ message: `✅ Resume saved to D:/ as ${filename}` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error writing file' });
  }
});

app.listen(3300, () => {
  console.log('📝 Resume generator running at http://localhost:3300');
});
