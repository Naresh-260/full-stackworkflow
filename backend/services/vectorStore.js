import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_PATH = path.join(__dirname, '..', 'data', 'docs.json');

// read docs from disk (returns array)
async function readDocs() {
  try {
    const txt = await fs.readFile(DATA_PATH, 'utf-8');
    return JSON.parse(txt);
  } catch (err) {
    return [];
  }
}

// write docs to disk
async function writeDocs(docs) {
  await fs.mkdir(path.dirname(DATA_PATH), { recursive: true });
  await fs.writeFile(DATA_PATH, JSON.stringify(docs, null, 2), 'utf-8');
}

// deterministic "embedding" generator (no OpenAI)
// Produces an array of length `dim` with floats in [-1,1]
function computeEmbedding(text, dim = 128) {
  const emb = [];
  for (let i = 0; i < dim; i++) {
    const h = crypto.createHash('sha256').update(text + '|' + i).digest();
    // take first 4 bytes as unsigned int
    const num = h.readUInt32BE(0);
    emb.push(((num / 0xffffffff) * 2) - 1);
  }
  return emb;
}

function dot(a, b) {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * b[i];
  return s;
}
function norm(a) {
  let s = 0;
  for (let i = 0; i < a.length; i++) s += a[i] * a[i];
  return Math.sqrt(s);
}
function cosine(a, b) {
  const d = dot(a, b);
  const n = norm(a) * norm(b);
  return n === 0 ? 0 : d / n;
}

export async function addDocument(id, text) {
  const docs = await readDocs();
  const embedding = computeEmbedding(text);
  docs.push({ id, text, embedding });
  await writeDocs(docs);
}

export async function findMostRelevant(query) {
  const docs = await readDocs();
  if (docs.length === 0) return { doc: null, score: 0 };
  const qEmb = computeEmbedding(query);
  let best = null;
  let bestScore = -Infinity;
  for (const d of docs) {
    const score = cosine(qEmb, d.embedding);
    if (score > bestScore) {
      bestScore = score;
      best = d;
    }
  }
  return { doc: best, score: bestScore };
}
