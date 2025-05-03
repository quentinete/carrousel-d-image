import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const name = fileURLToPath(import.meta.url);
const dir = path.dirname(name);
const app = express();

app.use(express.static(path.join(dir, '../frontend')));

app.get('/images', (req, res) => {
  const imgDir = path.join(dir, '../frontend/img');
  fs.readdir(imgDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Erreur de lecture des images' });
    }
    const imagePaths = files
      .map(file => `img/${file}`);
    res.json(imagePaths);
  });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});

