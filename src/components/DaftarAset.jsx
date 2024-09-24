import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './SidebarNew';
import 'font-awesome/css/font-awesome.min.css';

function DaftarAset() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const [asetList, setAsetList] = useState([
    {
      id: 1,
      unitInduk: 'Aset 1',
      lokasi: 'Bangunan',
      namaAset: 'Sulawesi Utara',
      nomorSAP: '123456',
      luas: '100 m²',
      hargaPerolehan: 'Rp 500.000.000',
      nilaiSaatIni: 'Rp 450.000.000',
      tanggalPenilaian: '2023-09-01',
      sumberPerolehan: 'Pembelian',
      alamat: 'Jl. Raya No. 1',
      nomorSertifikat: 'AB123456',
      tanggalBerlakuSertifikat: '2020-01-01',
      tanggalBerakhirSertifikat: '2025-01-01',
      penguasaanTanah: 'Hak Milik',
      permasalahanAset: 'Tidak Ada',
      kantahBPN: 'BPN Sulut',
      fileKronologis: '/path/to/kronologis-file.pdf',
      fileSertifikat: '/path/to/sertifikat-file.pdf',
    },
    // Tambahkan aset lain di sini
  ]);

  const filteredAsetList = asetList.filter(aset =>
    aset.namaAset.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aset.lokasi.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aset.nomorSAP.includes(searchTerm)
  );

  const handleEdit = (id) => {
    navigate(`/edit-aset`);
  };

  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus aset ini?')) {
      const updatedAsetList = asetList.filter(aset => aset.id !== id);
      setAsetList(updatedAsetList);
      console.log(`Aset dengan ID ${id} telah dihapus.`);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-100 ml-64">
        <section className="bg-white rounded shadow p-4 mb-6">
          <h2 className="text-xl mb-4">Daftar Aset</h2>

          <div className="mb-4 relative">
            <i className="fa fa-search absolute left-3 top-2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Cari Aset (nama, lokasi, atau nomor SAP)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 rounded"
            />
          </div>

          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="border p-2 bg-blue-500 text-white">Unit Induk</th>
                <th className="border p-2 bg-blue-500 text-white">Lokasi</th>
                <th className="border p-2 bg-blue-500 text-white">Nama Aset</th>
                <th className="border p-2 bg-blue-500 text-white">Nomor SAP</th>
                <th className="border p-2 bg-blue-500 text-white">Luas</th>
                <th className="border p-2 bg-blue-500 text-white">Harga Perolehan</th>
                <th className="border p-2 bg-blue-500 text-white">Nilai Saat Ini</th>
                <th className="border p-2 bg-blue-500 text-white">Tanggal Penilaian</th>
                <th className="border p-2 bg-blue-500 text-white">Sumber Perolehan</th>
                <th className="border p-2 bg-blue-500 text-white">Alamat</th>
                <th className="border p-2 bg-blue-500 text-white">Nomor Sertifikat</th>
                <th className="border p-2 bg-blue-500 text-white">Tanggal Berlaku Sertifikat</th>
                <th className="border p-2 bg-blue-500 text-white">Tanggal Berakhir Sertifikat</th>
                <th className="border p-2 bg-blue-500 text-white">Penguasaan Tanah</th>
                <th className="border p-2 bg-blue-500 text-white">Permasalahan Aset</th>
                <th className="border p-2 bg-blue-500 text-white">Kantah BPN Sertifikasi</th>
                <th className="border p-2 bg-blue-500 text-white">File Kronologis</th>
                <th className="border p-2 bg-blue-500 text-white">File Sertifikat</th>
                <th className="border p-2 bg-blue-500 text-white">Edit</th>
                <th className="border p-2 bg-blue-500 text-white">Hapus</th>
              </tr>
            </thead>
            <tbody>
              {filteredAsetList.length > 0 ? (
                filteredAsetList.map((aset) => (
                  <tr key={aset.id} className={searchTerm && (aset.namaAset.toLowerCase().includes(searchTerm.toLowerCase()) || aset.lokasi.toLowerCase().includes(searchTerm.toLowerCase()) || aset.nomorSAP.includes(searchTerm) ? 'bg-yellow-200' : '')}>
                    <td className="border p-2">{aset.unitInduk}</td>
                    <td className="border p-2">{aset.lokasi}</td>
                    <td className="border p-2">{aset.namaAset}</td>
                    <td className="border p-2">{aset.nomorSAP}</td>
                    <td className="border p-2">{aset.luas}</td>
                    <td className="border p-2">{aset.hargaPerolehan}</td>
                    <td className="border p-2">{aset.nilaiSaatIni}</td>
                    <td className="border p-2">{aset.tanggalPenilaian}</td>
                    <td className="border p-2">{aset.sumberPerolehan}</td>
                    <td className="border p-2">{aset.alamat}</td>
                    <td className="border p-2">{aset.nomorSertifikat}</td>
                    <td className="border p-2">{aset.tanggalBerlakuSertifikat}</td>
                    <td className="border p-2">{aset.tanggalBerakhirSertifikat}</td>
                    <td className="border p-2">{aset.penguasaanTanah}</td>
                    <td className="border p-2">{aset.permasalahanAset}</td>
                    <td className="border p-2">{aset.kantahBPN}</td>
                    <td className="border p-2 text-center">
                      <a href={aset.fileKronologis} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                        <i className="fa fa-file"></i>
                      </a>
                    </td>
                    <td className="border p-2 text-center">
                      <a href={aset.fileSertifikat} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                        <i className="fa fa-file"></i>
                      </a>
                    </td>
                    <td className="border p-2 text-center">
                      <button 
                        onClick={() => handleEdit(aset.id)} 
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <i className="fa fa-pencil"></i>
                      </button>
                    </td>
                    <td className="border p-2 text-center">
                      <button 
                        onClick={() => handleDelete(aset.id)} 
                        className="text-red-500 hover:text-red-700"
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="20" className="border p-2 text-center">Tidak ada aset yang ditemukan.</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default DaftarAset;
