import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./SidebarNew";
import Swal from "sweetalert2";

function EditAset() {
  const [formData, setFormData] = useState({
    unit_induk: "",
    nama_aset: "",
    unit: "",
    nomor_SAP: "",
    luas: "",
    harga_perolehan: "",
    tahun_perolehan: "",
    nilai_saat_ini: "",
    sumber_perolehan: "",
    alamat: "",
    kelurahan: "",
    kecamatan: "",
    kota: "",
    provinsi: "",
    nomor_sertipikat: "",
    tanggal_berlaku_sertipikat: "",
    tanggal_berakhir_sertipikat: "",
    penguasaan_tanah: "",
    permasalahan_aset: "",
    kantah_BPN_sertifiksai: "",
    kronologis: null,
    sertipikat: null,
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://backend-production-a671.up.railway.app/api/v1/assets/${id}`
        );
        if (!response.ok) {
          throw new Error("Error fetching asset data");
        }
        const result = await response.json();
        setFormData(result.data.findAsset);
      } catch (error) {
        console.error("Error fetching asset data:", error);
      }
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

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({
      ...formData,
      [name]: files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Data yang akan dikirim
    const dataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      const value = formData[key] === "" ? null : formData[key];
      dataToSend.append(key, value);
    });

    try {
      // Mengirim request PATCH untuk mengupdate data aset
      const response = await fetch(
        `https://backend-production-a671.up.railway.app/api/v1/assets/update/${id}`,
        {
          method: "PATCH",
          body: dataToSend,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error saat mengedit aset");
      }

      const result = await response.json();
      console.log("Aset berhasil diperbarui:", result);

      // Tampilkan alert sukses
      await Swal.fire({
        title: "Sukses!",
        text: "Aset berhasil diperbarui!",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Redirect ke halaman daftar aset
      navigate("/daftar-aset");
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      await Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar />
      <div className="flex-1 p-6 shadow-lg ml-64">
        <section className="rounded-lg shadow-md p-6 bg-white">
          <h2 className="text-3xl font-semibold mb-4 text-blue-600">
            Edit Aset
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 pl-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Unit Induk
              </label>
              <input
                type="text"
                name="unit_induk"
                value={formData.unit_induk}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Nama Aset
              </label>
              <input
                type="text"
                name="nama_aset"
                value={formData.nama_aset}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Unit
              </label>
              <input
                type="text"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Nomor SAP
              </label>
              <input
                type="text"
                name="nomor_SAP"
                value={formData.nomor_SAP}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Luas
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  name="luas"
                  value={formData.luas}
                  onChange={handleChange}
                  className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-700">m²</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Harga Perolehan
              </label>
              <div className="flex items-center">
                <span className="mr-2 text-gray-700">Rp</span>
                <input
                  type="number"
                  name="harga_perolehan"
                  value={formData.harga_perolehan}
                  onChange={handleChange}
                  className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Tahun Perolehan
              </label>
              <input
                type="number"
                name="tahun_perolehan"
                value={formData.tahun_perolehan}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Nilai Saat Ini
              </label>
              <div className="flex items-center">
                <span className="mr-2 text-gray-700">Rp</span>
                <input
                  type="number"
                  name="nilai_saat_ini"
                  value={formData.nilai_saat_ini}
                  onChange={handleChange}
                  className="flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Sumber Perolehan
              </label>
              <input
                type="text"
                name="sumber_perolehan"
                value={formData.sumber_perolehan}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Nama Jalan
              </label>
              <input
                type="text"
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Desa / Kelurahan
              </label>
              <input
                type="text"
                name="kelurahan"
                value={formData.kelurahan}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Kecamatan
              </label>
              <input
                type="text"
                name="kecamatan"
                value={formData.kecamatan}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Kota
              </label>
              <input
                type="text"
                name="kota"
                value={formData.kota}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Provinsi
              </label>
              <input
                type="text"
                name="provinsi"
                value={formData.provinsi}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Nomor Sertifikat
              </label>
              <input
                type="text"
                name="nomor_sertipikat"
                value={formData.nomor_sertipikat}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Tanggal Berlaku Sertifikat
              </label>
              <input
                type="date"
                name="tanggal_berlaku_sertipikat"
                value={formData.tanggal_berlaku_sertipikat}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Tanggal Berakhir Sertifikat
              </label>
              <input
                type="date"
                name="tanggal_berakhir_sertipikat"
                value={formData.tanggal_berakhir_sertipikat}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Penguasaan Tanah
              </label>
              <input
                type="text"
                name="penguasaan_tanah"
                value={formData.penguasaan_tanah}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Permasalahan Aset
              </label>
              <input
                type="text"
                name="permasalahan_aset"
                value={formData.permasalahan_aset}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></input>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Kantah BPN Sertifikasi
              </label>
              <input
                type="text"
                name="kantah_BPN_sertifiksai"
                value={formData.kantah_BPN_sertifiksai}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Kronologis (Upload File)
              </label>
              <input
                type="file"
                name="kronologis"
                onChange={handleFileChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Sertifikat (Upload File)
              </label>
              <input
                type="file"
                name="sertipikat"
                onChange={handleFileChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Update Aset
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default EditAset;
