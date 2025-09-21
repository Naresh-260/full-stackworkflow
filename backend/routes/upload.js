// backend/routes/upload.js

import express from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import { addDocument } from '../services/vectorStore.js'; // your service to save text

const router = express.Router();
const upload = multer(); // stores uploaded file in memory

// POST /upload-pdf
router.post('/', upload.single('file'), async (req, res) => {
  try {
    // Check if a file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Parse PDF from uploaded buffer
    const pdfBuffer = req.file.buffer;
    const pdfData = await pdfParse(pdfBuffer); // extracts text

    // Save text in your vector store or database
    await addDocument(req.file.originalname, pdfData.text);

    res.json({ message: `${req.file.originalname} uploaded & indexed successfully.` });
  } catch (err) {
    console.error('Error processing PDF:', err);
    res.status(500).json({ error: 'Error processing PDF' });
  }
});

export default router;
