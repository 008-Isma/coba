// const jadwal = [
//   {
//     id: 1,
//     mataKuliah: 'Pemrograman Platform',
//     hari: 'Senin',
//     jam: '08:00',
//     ruangan: 'Lab 1',
//     status: 'aktif'
//   },
//   {
//     id: 2,
//     mataKuliah: 'Basis Data',
//     hari: 'Selasa',
//     jam: '10:00',
//     ruangan: 'Lab 2',
//     status: 'aktif'
//   },
//   {
//     id: 3,
//     mataKuliah: 'Pemrograman Web',
//     hari: 'Rabu',
//     jam: '13:00',
//     ruangan: 'Lab 3',
//     status: 'selesai'
//   }
// ];

// module.exports = {
//   jadwal
// };

const jadwal = [
  {
    id: 1,
    mataKuliah: 'Pemrograman Berbasis Platform',
    status: 'aktif'
  },
  {
    id: 2,
    mataKuliah: 'Basis Data',
    status: 'aktif'
  },
  {
    id: 3,
    mataKuliah: 'Jaringan Komputer',
    status: 'selesai'
  }
];

const peserta = [
  {
    id: 1001,
    jadwalId: 1,
    nim: '20200001',
    nama: 'Mela'
  },
  {
    id: 1002,
    jadwalId: 1,
    nim: '20200002',
    nama: 'Rania'
  },
  {
    id: 1003,
    jadwalId: 2,
    nim: '20200003',
    nama: 'Cindy'
  }
];

module.exports = {
  jadwal,
  peserta
};