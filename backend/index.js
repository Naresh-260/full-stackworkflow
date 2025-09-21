import express from 'express';
import cors from 'cors';
import uploadRouter from './routes/upload.js';
import queryRouter from './routes/query.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/upload-doc', uploadRouter);
app.use('/query', queryRouter);

// List uploaded docs (id + excerpt)
app.get('/docs', async (req, res) => {
  try {
    const dataPath = path.join(__dirname, 'data', 'docs.json');
    const txt = await fs.readFile(dataPath, 'utf-8');
    const docs = JSON.parse(txt);
    const list = docs.map(d => ({ id: d.id, excerpt: d.text.slice(0, 200) }));
    return res.json(list);
  } catch (err) {
    return res.json([]);
  }
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`🚀 Backend running: http://localhost:${PORT}`);
});
