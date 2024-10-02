import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./SidebarNew";
import "font-awesome/css/font-awesome.min.css";
import Swal from "sweetalert2";
import { AssetContext } from "./AssetContext";

function DaftarAset() {
  const { setAssetCount } = useContext(AssetContext);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [asetList, setAsetList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 25;

  useEffect(() => {
    fetch("https://backend-production-a671.up.railway.app/api/v1/assets/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Data fetched from API:", data);
        const assets = data.data.findAssets;
        setAsetList(assets);
        const yellowCount = assets.filter(
          (asset) =>
            !asset.nomor_sertipikat || asset.nomor_sertipikat.trim() === ""
        ).length;
        console.log("Yellow Count:", yellowCount);
        setAssetCount(yellowCount);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [setAssetCount]);

  const filteredAsetList = Array.isArray(asetList)
    ? asetList.filter((aset) => {
        const namaAset = aset.nama_aset?.toLowerCase() || "";
        const nomorSap = aset.nomor_SAP || "";

        return (
          namaAset.includes(searchTerm.toLowerCase()) ||
          nomorSap.includes(searchTerm)
        );
      })
    : [];

  const totalPages = Math.ceil(filteredAsetList.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAsetList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const formatAddress = (aset) => {
    const { alamat, kelurahan, kecamatan, kota, provinsi } = aset;
    return `${alamat}, ${kelurahan}, ${kecamatan}, ${kota}, ${provinsi}`;
  };

  const handleEdit = (id) => {
    navigate(`/edit-aset/${id}`);
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda tidak dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Deleting asset with ID:", id);
        fetch(
          `https://backend-production-a671.up.railway.app/api/v1/assets/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error(
                `Error: ${response.status} - ${response.statusText}`
              );
            }
          })
          .then((data) => {
            console.log(data.message);
            const updatedAsetList = asetList.filter((aset) => aset.id !== id);
            setAsetList(updatedAsetList);
            Swal.fire("Dihapus!", "Aset telah dihapus.", "success");
          })
          .catch((error) => {
            console.error("Error deleting asset:", error);
            Swal.fire(
              "Error",
              `Gagal menghapus aset. ${error.message}`,
              "error"
            );
          });
      }
    });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
              placeholder="Cari Aset (nama atau nomor SAP)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 pl-10 border border-gray-300 rounded"
            />
          </div>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="border p-2 bg-blue-500 text-white">
                  Unit Induk
                </th>
                <th className="border p-2 bg-blue-500 text-white">Nama Aset</th>
                <th className="border p-2 bg-blue-500 text-white">Unit</th>
                <th className="border p-2 bg-blue-500 text-white">Nomor SAP</th>
                <th className="border p-2 bg-blue-500 text-white">Luas</th>
                <th className="border p-2 bg-blue-500 text-white">
                  Harga Perolehan
                </th>
                <th className="border p-2 bg-blue-500 text-white">
                  Tahun Perolehan
                </th>
                <th className="border p-2 bg-blue-500 text-white">
                  Nilai Saat Ini
                </th>
                <th className="border p-2 bg-blue-500 text-white">
                  Sumber Perolehan
                </th>
                <th className="border p-2 min-w-64 max-w-full bg-blue-500 text-white">
                  Alamat
                </th>
                <th className="border p-2 bg-blue-500 text-white">
                  Nomor Sertipikat
                </th>
                <th className="border p-2 bg-blue-500 text-white">
                  Tanggal Berlaku Sertipikat
                </th>
                <th className="border p-2 bg-blue-500 text-white">
                  Tanggal Berakhir Sertipikat
                </th>
                <th className="border p-2 bg-blue-500 text-white">
                  Penguasaan Tanah
                </th>
                <th className="border p-2 bg-blue-500 text-white">
                  Permasalahan Aset
                </th>
                <th className="border p-2 bg-blue-500 text-white">
                  Kantah BPN Sertifikasi
                </th>
                <th className="border p-2 bg-blue-500 text-white">
                  koordinat x
                </th>
                <th className="border p-2 bg-blue-500 text-white">
                  koordinat y
                </th>
                <th className="border p-2 bg-blue-500 text-white">
                  Kronologis
                </th>
                <th className="border p-2 bg-blue-500 text-white">
                  Sertipikat
                </th>
                <th className="border p-2 bg-blue-500 text-white">Edit</th>
                <th className="border p-2 bg-blue-500 text-white">Hapus</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((aset) => (
                  <tr
                    key={aset.id}
                    className={!aset.nomor_sertipikat ? "bg-yellow-300" : ""}
                  >
                    <td className="border p-2">{aset.unit_induk}</td>
                    <td className="border p-2">{aset.nama_aset}</td>
                    <td className="border p-2">{aset.unit}</td>
                    <td className="border p-2">{aset.nomor_SAP}</td>
                    <td className="border p-2">{aset.luas}</td>
                    <td className="border p-2">{aset.harga_perolehan}</td>
                    <td className="border p-2">{aset.tahun_perolehan}</td>
                    <td className="border p-2">{aset.nilai_saat_ini}</td>
                    <td className="border p-2">{aset.sumber_perolehan}</td>
                    <td className="border p-2 w-64">{formatAddress(aset)}</td>
                    <td className="border p-2">{aset.nomor_sertipikat}</td>
                    <td className="border p-2">
                      {formatDate(aset.tanggal_berlaku_sertipikat)}
                    </td>
                    <td className="border p-2">
                      {formatDate(aset.tanggal_berakhir_sertipikat)}
                    </td>
                    <td className="border p-2">{aset.penguasaan_tanah}</td>
                    <td className="border p-2">{aset.permasalahan_aset}</td>
                    <td className="border p-2">
                      {aset.kantah_BPN_sertifikasi}
                    </td>
                    <td className="border p-2">{aset.kordinat_x}</td>
                    <td className="border p-2">{aset.kordinat_y}</td>
                    <td className="border p-2 text-center">
                      {aset.kronologis ? (
                        <a
                          href={`https://backend-production-a671.up.railway.app/api/v1/assets/download/${aset.kronologis}`}
                          className="text-blue-500"
                        >
                          <i className="fa fa-file"></i>
                        </a>
                      ) : (
                        <span>No File</span>
                      )}
                    </td>
                    <td className="border p-2 text-center">
                      {aset.sertipikat ? (
                        <a
                          href={`https://backend-production-a671.up.railway.app/api/v1/assets/download/${aset.sertipikat}`}
                          className="text-blue-500"
                        >
                          <i className="fa fa-file"></i>
                        </a>
                      ) : (
                        <span>No File</span>
                      )}
                    </td>
                    <td className="border p-2 text-center">
                      <button
                        onClick={() => handleEdit(aset.id)}
                        className="text-green-500"
                      >
                        <i className="fa fa-pencil"></i>
                      </button>
                    </td>
                    <td className="border p-2 text-center">
                      <button
                        onClick={() => handleDelete(aset.id)}
                        className="text-red-500"
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="20" className="text-center border p-2">
                    Tidak ada data yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {/* Pagination Control */}
          <div className="mt-4 flex justify-center items-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 ease-in-out ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <i className="fa fa-chevron-left mr-2"></i> Prev
            </button>
            <span className="text-lg">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200 ease-in-out ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Next <i className="fa fa-chevron-right ml-2"></i>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DaftarAset;
