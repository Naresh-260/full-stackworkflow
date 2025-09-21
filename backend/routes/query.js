import express from 'express';
import { findMostRelevant } from '../services/vectorStore.js';
import { mockAnswer } from '../services/mockLLM.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: 'query is required' });

    const { doc, score } = await findMostRelevant(query);
    const context = doc?.text || '';
    const response = mockAnswer(query, context);

    res.json({ response, source: doc?.id || null, score });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error handling query' });
  }
});

export default router;
