import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Untuk link navigasi
import Sidebar from './SidebarNew';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faArrowLeft } from '@fortawesome/free-solid-svg-icons';


Modal.setAppElement('#root');

function TambahAset() {
  const [formData, setFormData] = useState({
    unitInduk: 'UID SULUTTENGGO',
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
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [kecamatanOptions, setKecamatanOptions] = useState([]);
  const [kelurahanOptions, setKelurahanOptions] = useState([]);
  const [assets, setAssets] = useState([]); // State untuk menyimpan data aset

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch('http://backend-production-a671.up.railway.app/api/v1/assets/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAssets(data); // Simpan data aset ke state
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };

    fetchAssets(); // Panggil fungsi fetch saat komponen dimuat
  }, []); // Array kosong sebagai dependency untuk memanggil sekali saat mount

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Cek jika input berasal dari bagian 'alamat'
    if (name === 'provinsi' || name === 'kotaKabupaten' || name === 'kecamatan' || name === 'kelurahan' || name === 'jalan') {
      setFormData({
        ...formData,
        alamat: {
          ...formData.alamat,
          [name]: value, // Update bagian dari alamat yang sedang diubah
        },
      });
    } else {
      // Untuk input lainnya, update secara biasa
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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
      <div className="flex-1 p-6 bg-white shadow-lg rounded-lg ml-64">
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
                      value={`${formData.alamat.jalan}, ${formData.alamat.kelurahan}, ${formData.alamat.kecamatan}, ${formData.alamat.provinsi}` }
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
                        type="number"
                        name={key}
                        value={formData[key]}
                        onChange={handleChange}
                        className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder={`Masukkan ${key.replace(/([A-Z])/g, ' $1')}`}
                      />
                    </div>
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
                      placeholder={`Masukkan ${key.replace(/([A-Z])/g, ' $1')}`}
                    />
                  </div>
                  
                );
              }
            })}

{/* Input untuk meng-upload file sertifikat */}
<div>
  <label className="block text-sm font-medium mb-1 text-gray-700">Upload Sertifikat</label>
  <input
    type="file"
    onChange={(e) => handleFileChange(e, 'fileSertifikat')}
    className="border border-gray-300 rounded-md p-4 w-full h-12" // Memperbesar padding dan tinggi
  />
</div>

{/* Input untuk meng-upload file kronologis */}
<div>
  <label className="block text-sm font-medium mb-1 text-gray-700">Upload Kronologis</label>
  <input
    type="file"
    onChange={(e) => handleFileChange(e, 'fileKronologis')}
    className="border border-gray-300 rounded-md p-4 w-full h-12" // Memperbesar padding dan tinggi
  />
</div>


            <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Simpan Aset
            </button>
          </form>
        </section>

        {/* Modal untuk mengisi alamat */}
        <Modal
  isOpen={isModalOpen}
  onRequestClose={() => setIsModalOpen(false)}
  className="fixed inset-0 flex items-center justify-center z-50" // Menempatkan modal di tengah
  overlayClassName="fixed inset-0 bg-black bg-opacity-50" // Overlay transparan
>
  <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative"> {/* Mengatur ukuran modal dan menambahkan relative positioning */}
    {/* Tombol X di kanan atas */}
    <button
      className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
      onClick={() => setIsModalOpen(false)}
    >
      X
    </button>

    <h2 className="text-xl font-semibold mb-4">Isi Alamat</h2>
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Provinsi</label>
        <select
          name="provinsi"
          value={formData.alamat.provinsi}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Pilih Provinsi</option>
          <option value="Sulawesi Utara">Sulawesi Utara</option>
          <option value="Sulawesi Tengah">Sulawesi Tengah</option>
          <option value="Gorontalo">Gorontalo</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Kota/Kabupaten</label>
        <select
          name="kotaKabupaten"
          value={formData.alamat.kotaKabupaten}
          onChange={handleCityChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Pilih Kota/Kabupaten</option>
          {formData.alamat.provinsi === 'Sulawesi Utara' && (
            <>
              <option value="Kota Manado">Kota Manado</option>
              <option value="Kota Bitung">Kota Bitung</option>
              <option value="Kota Kotamobagu">Kota Kotamobagu</option>
            </>
          )}
          {formData.alamat.provinsi === 'Sulawesi Tengah' && (
            <option value="Kota Palu">Kota Palu</option>
          )}
          {formData.alamat.provinsi === 'Gorontalo' && (
            <option value="Kota Gorontalo">Kota Gorontalo</option>
          )}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Kecamatan</label>
        <select
          name="kecamatan"
          value={formData.alamat.kecamatan}
          onChange={handleKecamatanChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Pilih Kecamatan</option>
          {kecamatanOptions.map((kecamatan) => (
            <option key={kecamatan} value={kecamatan}>{kecamatan}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Kelurahan</label>
        <select
          name="kelurahan"
          value={formData.alamat.kelurahan}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Pilih Kelurahan</option>
          {kelurahanOptions.map((kelurahan) => (
            <option key={kelurahan} value={kelurahan}>{kelurahan}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">Jalan</label>
        <input
          type="text"
          name="jalan"
          value={formData.alamat.jalan}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Masukkan Nama Jalan"
        />
      </div>

      <button
        onClick={handleAddressChange}
        className="mt-4 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Simpan Alamat
      </button>
    </div>
  </div>
</Modal>



      </div>
    </div>
  );
}

export default TambahAset;
