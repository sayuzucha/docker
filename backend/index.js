const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || 'sayuri_user',
  password: process.env.DB_PASSWORD || 'SuperSeguroR00tP@ss',
  database: process.env.DB_DATABASE || 'sayuri_db',
});

async function initDB() {
  const client = await pool.connect();
  try {
    await client.query(`CREATE TABLE IF NOT EXISTS items (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL
    )`);
    console.log('Table items ensured.');
  } finally {
    client.release();
  }
}

app.get('/api/zuniga', (req, res) => {
  res.json({ fullName: 'Sayuri Estefania Zuniga Chacon' });
});


app.get('/api/items', async (req, res) => {
  const result = await pool.query('SELECT * FROM items ORDER BY id');
  res.json(result.rows);
});

app.post('/api/items', async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'name is required' });
  const result = await pool.query('INSERT INTO items(name) VALUES($1) RETURNING *', [name]);
  res.status(201).json(result.rows[0]);
});

app.delete('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  await pool.query('DELETE FROM items WHERE id = $1', [id]);
  res.json({ deleted: id });
});


app.listen(PORT, '0.0.0.0', async () => {
  console.log(`Backend listening on port ${PORT}`);
  try {
    await initDB();
    console.log('DB initialized');
  } catch (err) {
    console.error('DB init error', err);
  }
});
