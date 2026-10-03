// const express = require('express');

// const router = express.Router();

// const { jadwal } = require('../data/mock');

// // GET SEMUA JADWAL
// // GET /api/v1/jadwal
// // GET /api/v1/jadwal?status=aktif
// router.get('/', (req, res) => {
//   const { status } = req.query;

//   if (!status) {
//     return res.json(jadwal);
//   }

//   const hasil = jadwal.filter(
//     (item) => item.status === status
//   );

//   res.json(hasil);
// });

// // POST TAMBAH JADWAL
// // POST /api/v1/jadwal
// router.post('/', (req, res) => {
//   const dataBaru = {
//     id: jadwal.length + 1,
//     ...req.body
//   };

//   jadwal.push(dataBaru);

//   res.status(201).json(dataBaru);
// });

// // GET JUMLAH JADWAL
// // GET /api/v1/jadwal/jumlah-jadwal
// router.get('/jumlah-jadwal', (_req, res) => {
//   res.json({
//     jumlah: jadwal.length
//   });
// });

// // PUT UBAH JADWAL
// // PUT /api/v1/jadwal/:id
// router.put('/:id', (req, res) => {
//   const id = Number(req.params.id);

//   const index = jadwal.findIndex(
//     (item) => item.id === id
//   );

//   if (index === -1) {
//     return res.status(404).json({
//       message: 'Jadwal tidak ditemukan'
//     });
//   }

//   jadwal[index] = {
//     id,
//     ...req.body
//   };

//   res.json(jadwal[index]);
// });

// // GET SATU JADWAL
// // GET /api/v1/jadwal/:id
// router.get('/:id', (req, res) => {
//   const id = Number(req.params.id);

//   const data = jadwal.find(
//     (item) => item.id === id
//   );

//   if (!data) {
//     return res.status(404).json({
//       message: 'Jadwal tidak ditemukan'
//     });
//   }

//   res.json(data);
// });

// // DELETE JADWAL
// // DELETE /api/v1/jadwal/:id
// router.delete('/:id', (req, res) => {
//   const id = Number(req.params.id);

//   const index = jadwal.findIndex(
//     (item) => item.id === id
//   );

//   if (index === -1) {
//     return res.status(404).json({
//       message: 'Jadwal tidak ditemukan'
//     });
//   }

//   const dataDihapus = jadwal.splice(index, 1);

//   res.json({
//     message: 'Jadwal berhasil dihapus',
//     data: dataDihapus[0]
//   });
// });

// module.exports = router;

const express = require('express');
const { jadwal } = require('../data/mock');
const pesertaRouter = require('./peserta');

const router = express.Router();

// GET SEMUA JADWAL
// GET /api/v1/jadwal
// GET /api/v1/jadwal?status=aktif
router.get('/', (req, res) => {
  const { status } = req.query;

  const data = status
    ? jadwal.filter((item) => item.status === status)
    : jadwal;

  res.status(200).json({
    status: true,
    message: 'Daftar jadwal berhasil diambil',
    data,
  });
});

// JUMLAH JADWAL
// GET /api/v1/jadwal/jumlah-jadwal
router.get('/jumlah-jadwal', (_req, res) => {
  res.status(200).json({
    status: true,
    message: 'Jumlah jadwal berhasil dihitung',
    data: {
      total: jadwal.length
    },
  });
});

// ROUTE BERSARANG PESERTA
router.use('/:jadwalId/peserta', pesertaRouter);

// GET SATU JADWAL
// GET /api/v1/jadwal/1
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id)) {
    return res.status(400).json({
      status: false,
      message: 'id harus berupa angka'
    });
  }

  const item = jadwal.find((row) => row.id === id);

  if (!item) {
    return res.status(404).json({
      status: false,
      message: 'Jadwal tidak ditemukan'
    });
  }

  return res.status(200).json({
    status: true,
    message: 'Jadwal berhasil diambil',
    data: item
  });
});

// TAMBAH JADWAL
// POST /api/v1/jadwal
router.post('/', (req, res) => {
  const {
    mataKuliah,
    status = 'aktif'
  } = req.body || {};

  if (!mataKuliah) {
    return res.status(400).json({
      status: false,
      message: 'mataKuliah wajib diisi'
    });
  }

  const created = {
    id: Math.max(...jadwal.map((item) => item.id), 0) + 1,
    mataKuliah,
    status
  };

  jadwal.push(created);

  return res.status(201).json({
    status: true,
    message: 'Jadwal berhasil ditambahkan',
    data: created
  });
});

// UBAH JADWAL
// PUT /api/v1/jadwal/1
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);

  const item = jadwal.find((row) => row.id === id);

  const body = req.body || {};

  if (!item) {
    return res.status(404).json({
      status: false,
      message: 'Jadwal tidak ditemukan'
    });
  }

  item.mataKuliah = body.mataKuliah ?? item.mataKuliah;
  item.status = body.status ?? item.status;

  return res.status(200).json({
    status: true,
    message: 'Jadwal berhasil diperbarui',
    data: item
  });
});

// HAPUS JADWAL
// DELETE /api/v1/jadwal/1
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);

  const index = jadwal.findIndex(
    (row) => row.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      status: false,
      message: 'Jadwal tidak ditemukan'
    });
  }

  const [deleted] = jadwal.splice(index, 1);

  return res.status(200).json({
    status: true,
    message: 'Jadwal berhasil dihapus',
    data: deleted
  });
});

module.exports = router;