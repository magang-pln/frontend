import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Untuk link navigasi
import Sidebar from './SidebarNew';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function TambahAset() {
  const [formData, setFormData] = useState({
    unitInduk: '',
    namaAset: '',
    nomorSAP: '',
    luas: '',
    hargaPerolehan: '',
    nilaiSaatIni: '',
    tanggalPenilaian: '',
    sumberPerolehan: '',
    alamat: {
      jalan: '',
      kelurahan: '',
      kecamatan: '',
      provinsi: '',
      kotaKabupaten: '',
    },
    nomorSertifikat: '',
    tanggalBerlakuSertifikat: '',
    tanggalBerakhirSertifikat: '',
    penguasaanTanah: '',
    permasalahanAset: '',
    kantahBPN: '',
    fileKronologis: null, // Menyimpan file yang diupload
    fileSertifikat: null, // Menyimpan file yang diupload
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [kecamatanOptions, setKecamatanOptions] = useState([]);
  const [kelurahanOptions, setKelurahanOptions] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.files[0], // Menyimpan file pertama yang diupload
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Data yang dikirim:', formData);
  };

  const handleAddressChange = () => {
    setIsModalOpen(false);
  };

  const citiesByProvince = {
    'Sulawesi Utara': {
      'Kota Manado': {
        kecamatan: ['Kecamatan Wenang', 'Kecamatan Malalayang'],
        kelurahan: {
          'Kecamatan Wenang': ['Kelurahan Wenang Utara', 'Kelurahan Wenang Selatan'],
          'Kecamatan Malalayang': ['Kelurahan Malalayang Satu', 'Kelurahan Malalayang Dua'],
        },
      },
      'Kota Bitung': {
        kecamatan: ['Kecamatan Aertembaga', 'Kecamatan Maesa'],
        kelurahan: {
          'Kecamatan Aertembaga': ['Kelurahan Aertembaga', 'Kelurahan Winenet'],
          'Kecamatan Maesa': ['Kelurahan Maesa', 'Kelurahan Batubulan'],
        },
      },
      'Kota Kotamobagu': {
        kecamatan: ['Kecamatan Kotamobagu Barat', 'Kecamatan Kotamobagu Timur'],
        kelurahan: {
          'Kecamatan Kotamobagu Barat': ['Kelurahan Pobundayan', 'Kelurahan Kotobangon'],
          'Kecamatan Kotamobagu Timur': ['Kelurahan Molinow', 'Kelurahan Poyowa Kecil'],
        },
      },
    },
    'Sulawesi Tengah': {
      'Kota Palu': {
        kecamatan: ['Kecamatan Palu Selatan', 'Kecamatan Palu Utara'],
        kelurahan: {
          'Kecamatan Palu Selatan': ['Kelurahan Talise', 'Kelurahan Watusampu'],
          'Kecamatan Palu Utara': ['Kelurahan Baluase', 'Kelurahan Kawatuna'],
        },
      },
    },
    'Gorontalo': {
      'Kota Gorontalo': {
        kecamatan: ['Kecamatan Hulonthalangi', 'Kecamatan Dungingi'],
        kelurahan: {
          'Kecamatan Hulonthalangi': ['Kelurahan Hulonthalangi', 'Kelurahan Molingkapoto'],
          'Kecamatan Dungingi': ['Kelurahan Dungingi', 'Kelurahan Dungingi Barat'],
        },
      },
    },
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    const selectedProvince = formData.alamat.provinsi;

    setFormData({
      ...formData,
      alamat: {
        ...formData.alamat,
        kotaKabupaten: city,
        kecamatan: '',
        kelurahan: '',
      },
    });

    const kecamatanData = citiesByProvince[selectedProvince][city] || {};
    setKecamatanOptions(kecamatanData.kecamatan || []);
    setKelurahanOptions([]);
  };

  const handleKecamatanChange = (e) => {
    const kecamatan = e.target.value;
    setFormData({
      ...formData,
      alamat: {
        ...formData.alamat,
        kecamatan: kecamatan,
        kelurahan: '',
      },
    });

    const selectedCity = formData.alamat.kotaKabupaten;
    const kelurahanData = citiesByProvince[formData.alamat.provinsi][selectedCity]?.kelurahan[kecamatan] || [];
    setKelurahanOptions(kelurahanData);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6 bg-white shadow-lg rounded-lg ml-64"> {/* Menambahkan ml-64 di sini */}
        <section className="rounded-lg shadow-md p-6">
          <h2 className="text-3xl font-semibold mb-4 text-blue-600">Tambah Aset</h2>
          <form onSubmit={handleSubmit} className="space-y-4 pl-4">
            {Object.keys(formData).map((key) => {
              if (key === 'alamat') {
                return (
                  <div key={key} onClick={() => setIsModalOpen(true)} className="cursor-pointer">
                    <label className="block text-sm font-medium mb-1 text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                    <input
                      type="text"
                      value={`${formData.alamat.jalan}, ${formData.alamat.kelurahan}, ${formData.alamat.kecamatan}, ${formData.alamat.provinsi}`}
                      readOnly
                      className="w-full p-3 border border-gray-300 rounded-md bg-gray-200"
                      placeholder="Klik untuk mengisi alamat"
                    />
                  </div>
                );
              } else if (key === 'luas') {
                return (
                  <div key={key}>
                    <label className="block text-sm font-medium mb-1 text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                    <div className="flex items-center">
                      <input
                        type="text"
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Masukkan Luas"
                      />
                      <span className="ml-2 text-gray-700">m²</span>
                    </div>
                  </div>
                );
              } else if (key === 'hargaPerolehan' || key === 'nilaiSaatIni') {
                return (
                  <div key={key}>
                    <label className="block text-sm font-medium mb-1 text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                    <div className="flex items-center">
                      <span className="mr-2 text-gray-700">Rp</span>
                      <input
                        type="text"
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={`Masukkan ${key.replace(/([A-Z])/g, ' $1')}`}
                      />
                    </div>
                  </div>
                );
              } else if (key === 'sumberPerolehan') {
                return (
                  <div key={key}>
                    <label className="block text-sm font-medium mb-1 text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                    <select
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Pilih Sumber Perolehan</option>
                      <option value="Pembelian">Pembelian</option>
                      <option value="Hibah">Hibah</option>
                    </select>
                  </div>
                );
              } else if (key === 'penguasaanTanah') {
                return (
                  <div key={key}>
                    <label className="block text-sm font-medium mb-1 text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                    <select
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Pilih Penguasaan Tanah</option>
                      <option value="Dikuasai">Dikuasai</option>
                      <option value="Tidak Dikuasai">Tidak Dikuasai</option>
                    </select>
                  </div>
                );
              } else if (key === 'fileKronologis' || key === 'fileSertifikat') {
                return (
                  <div key={key}>
                    <label className="block text-sm font-medium mb-1 text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, key)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                );
              } else {
                return (
                  <div key={key}>
                    <label className="block text-sm font-medium mb-1 text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                    <input
                      type={key.includes('tanggal') ? 'date' : 'text'}
                      name={key}
                      value={formData[key]}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                );
              }
            })}
            <button type="submit" className="mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200">Simpan</button>
          </form>
        </section>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onRequestClose={() => setIsModalOpen(false)} 
        className="modal flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div className="bg-gray-100 p-6 rounded-md shadow-md w-full max-w-md">
          <h2 className="text-xl font-semibold mb-4 text-center">Isi Alamat</h2>
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            value={formData.alamat.provinsi}
            onChange={(e) => {
              setFormData({ ...formData, alamat: { ...formData.alamat, provinsi: e.target.value, kotaKabupaten: '', kecamatan: '', kelurahan: '' } });
              setKecamatanOptions([]);
              setKelurahanOptions([]);
            }}
          >
            <option value="">Pilih Provinsi</option>
            <option value="Sulawesi Utara">Sulawesi Utara</option>
            <option value="Sulawesi Tengah">Sulawesi Tengah</option>
            <option value="Gorontalo">Gorontalo</option>
          </select>
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            value={formData.alamat.kotaKabupaten}
            onChange={handleCityChange}
          >
            <option value="">Pilih Kota/Kabupaten</option>
            {Object.keys(citiesByProvince[formData.alamat.provinsi] || {}).map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            value={formData.alamat.kecamatan}
            onChange={handleKecamatanChange}
          >
            <option value="">Pilih Kecamatan</option>
            {kecamatanOptions.map((kecamatan) => (
              <option key={kecamatan} value={kecamatan}>{kecamatan}</option>
            ))}
          </select>
          <select
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            value={formData.alamat.kelurahan}
            onChange={(e) => setFormData({ ...formData, alamat: { ...formData.alamat, kelurahan: e.target.value } })}
          >
            <option value="">Pilih Kelurahan</option>
            {kelurahanOptions.map((kelurahan) => (
              <option key={kelurahan} value={kelurahan}>{kelurahan}</option>
            ))}
          </select>
          <input
            type="text"
            name="jalan"
            placeholder="Jalan"
            value={formData.alamat.jalan}
            onChange={(e) => setFormData({ ...formData, alamat: { ...formData.alamat, jalan: e.target.value } })}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
          />
          <div className="mt-4 flex justify-center space-x-4">
            <button onClick={() => setIsModalOpen(false)} className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md">Batal</button>
            <button onClick={handleAddressChange} className="bg-blue-600 text-white py-2 px-4 rounded-md">Simpan Alamat</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default TambahAset;
