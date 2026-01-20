const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve root-level static files (index.html, Game.js, Plane.js, Explosion.js, etc.)
app.use(express.static(path.join(__dirname)));

// Also expose common folders explicitly (optional, but clearer)
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/libs', express.static(path.join(__dirname, 'libs')));

['three125', 'three128', 'three134', 'three137'].forEach((dir) => {
  app.use('/' + dir, express.static(path.join(__dirname, dir)));
});

// Serve index.html at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// If a request includes a file extension and wasn't served above, return 404
app.use((req, res, next) => {
  if (path.extname(req.path)) {
    return res.status(404).send('Not found');
  }
  next();
});

app.listen(PORT, () => {
  console.log(`Simple Flight Game server running: http://localhost:${PORT}`);
});
