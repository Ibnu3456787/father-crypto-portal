// server/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// simple file DB
const DB_FILE = path.join(__dirname, 'data.json');
let db = { projects: [] };
if (fs.existsSync(DB_FILE)) {
  try { db = JSON.parse(fs.readFileSync(DB_FILE)); } catch(e) { db = { projects: [] }; }
}

function saveDb() {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

// GET projects
app.get('/api/projects', (req, res) => {
  res.json(db.projects);
});

// POST create project
app.post('/api/projects', (req, res) => {
  const { name } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: 'name required' });
  }
  const project = {
    id: 'p' + (db.projects.length + 1),
    name,
    apiKey: 'fc_' + Math.random().toString(36).slice(2,12),
    rpc: `https://rpc.fathercrypto.dev/${encodeURIComponent(name.replace(/\s+/g,'-').toLowerCase())}`,
    createdAt: new Date().toISOString()
  };
  db.projects.push(project);
  saveDb();
  res.json(project);
});

// health check
app.get('/', (req,res) => res.send('Father Crypto Dev Portal Backend'));

// Render & Vercel compatible PORT
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
