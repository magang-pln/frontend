import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from './SidebarNew';

function EditAset() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    unitInduk: '',
    namaAset: '',
    nomorSAP: '',
    luas: '',
    hargaPerolehan: '',
    nilaiSaatIni: '',
    tanggalPenilaian: '',
    sumberPerolehan: '',
    alamat: '',
    nomorSertifikat: '',
    tanggalBerlakuSertifikat: '',
    tanggalBerakhirSertifikat: '',
    penguasaanTanah: '',
    permasalahanAset: '',
    kantahBPN: '',
    fileKronologis: '',
    fileSertifikat: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = {
        unitInduk: 'Aset 1',
        namaAset: 'Sulawesi Utara',
        nomorSAP: '123456',
        luas: '100',
        hargaPerolehan: '500000000',
        nilaiSaatIni: '450000000',
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
      };
      setFormData(fetchedData);
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Data yang dikirim:', formData);
    
    // Reset formData ke nilai awal setelah disimpan
    setFormData({
      unitInduk: '',
      namaAset: '',
      nomorSAP: '',
      luas: '',
      hargaPerolehan: '',
      nilaiSaatIni: '',
      tanggalPenilaian: '',
      sumberPerolehan: '',
      alamat: '',
      nomorSertifikat: '',
      tanggalBerlakuSertifikat: '',
      tanggalBerakhirSertifikat: '',
      penguasaanTanah: '',
      permasalahanAset: '',
      kantahBPN: '',
      fileKronologis: '',
      fileSertifikat: '',
    });
  };

  const handleViewFile = (filePath) => {
    window.open(filePath, '_blank');
  };

  return (
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-100 ml-64">
        <section className="bg-white rounded shadow p-4">
          <h2 className="text-2xl mb-4">Edit Aset</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {Object.keys(formData).map((key) => (
              <div key={key}>
                <label className="block text-sm font-medium mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}</label>
                {key === 'luas' ? (
                  <div className="flex">
                    <input
                      type="text"
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <span className="p-2 border border-l-0 border-gray-300">m²</span>
                  </div>
                ) : key === 'hargaPerolehan' || key === 'nilaiSaatIni' ? (
                  <div className="flex">
                    <span className="p-2 border border-gray-300 rounded-l">Rp</span>
                    <input
                      type="text"
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-r"
                    />
                  </div>
                ) : key.includes('file') ? (
                  <div className="flex items-center">
                    <input
                      type="text"
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                    <button
                      type="button"
                      onClick={() => handleViewFile(formData[key])}
                      className="ml-2 text-blue-500 hover:text-blue-700"
                    >
                      <i className="fa fa-eye"></i>
                    </button>
                  </div>
                ) : (
                  <input
                    type={key.includes('tanggal') ? 'date' : 'text'}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                )}
              </div>
            ))}
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Simpan</button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default EditAset;
