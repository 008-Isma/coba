// const express = require('express');

// const app = express();

// const jadwalRouter = require('./routes/jadwal');

// app.use(express.json());

// app.get('/', (_req, res) => {
//   res.send('Server Express aktif');
// });

// app.get('/api/v1', (_req, res) => {
//   res.json({
//     message: 'API v1 aktif'
//   });
// });

// app.use('/api/v1/jadwal', jadwalRouter);

// module.exports = app;

const express = require('express');
const indexRouter = require('./routes');

const app = express();

app.use(express.json());

app.use('/api/v1', indexRouter);

app.use((req, res) => {
  res.status(404).json({
    status: false,
    message: `Route ${req.method} ${req.originalUrl} tidak ditemukan`,
  });
});

module.exports = app;