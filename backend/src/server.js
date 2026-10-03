const express = require('express');

const app = express();
const port = 3000;

app.get('/', (_req, res) => {
  res.send('Server Express aktif');
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});