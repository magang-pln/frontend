import React, { useEffect, useRef, useState, useContext } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "./SidebarNew";
import markerIcon from "../images/MAP-ICON.png";
import { AssetContext } from "./AssetContext";

function Dashboard() {
  const navigate = useNavigate();
  const { assetCount } = useContext(AssetContext);
  const mapRef = useRef(null); // Reference for Leaflet map
  const [totalAssets, setTotalAssets] = useState(0);
  const [staticAssets, setAssets] = useState([]);
  const markerRefs = useRef([]); // Keep track of markers to remove them later

  const fetchAssets = async () => {
    try {
      const response = await fetch(
        `https://backend-production-a671.up.railway.app/api/v1/assets/`
      );
      const data = await response.json();

      console.log("API Response:", data);

      if (data && data.data && data.data.findAssets) {
        const assets = data.data.findAssets.map((asset) => ({
          lat: asset.kordinat_x,
          lng: asset.kordinat_y,
          name: asset.nama_aset,
          luas: asset.luas,
          harga_perolehan: asset.harga_perolehan,
          nilai_saat_ini: asset.nilai_saat_ini,
          alamat: asset.alamat,
          kecamatan: asset.kecamatan,
          kelurahan: asset.kelurahan,
          kota: asset.kota,
          provinsi: asset.provinsi,
          tahun_perolehan: asset.tahun_perolehan,
        }));

        setAssets(assets);
        setTotalAssets(assets.length);
      } else {
        console.error("Invalid response structure:", data);
      }
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  useEffect(() => {
    // Initialize map only once
    if (!mapRef.current) {
      mapRef.current = L.map("map").setView([1.4748, 124.845], 12);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }

    // Clear existing markers
    markerRefs.current.forEach((marker) => {
      mapRef.current.removeLayer(marker);
    });
    markerRefs.current = [];

    const customIcon = L.icon({
      iconUrl: markerIcon,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });

    // Add new markers for each asset
    staticAssets.forEach((asset) => {
      if (asset.lat && asset.lng) {
        const latitude = parseFloat(asset.lat.toString().replace(",", "."));
        const longitude = parseFloat(asset.lng.toString().replace(",", "."));

        const fullAddress = `
        ${asset.alamat}, 
        ${asset.kelurahan}, 
        ${asset.kecamatan}, 
        ${asset.kota}, 
        ${asset.provinsi}`;

        const formattedHargaPerolehan = asset.harga_perolehan
          ? Number(asset.harga_perolehan).toLocaleString("id-ID")
          : "-";

        const formattedNilaiSaatIni = asset.nilai_saat_ini
          ? Number(asset.nilai_saat_ini).toLocaleString("id-ID")
          : "-";

        if (!isNaN(latitude) && !isNaN(longitude)) {
          const marker = L.marker([latitude, longitude], {
            icon: customIcon,
          }).addTo(mapRef.current).bindPopup(`
              <div>
                <b>${asset.name}</b><br>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <th style="border: 1px solid #ccc; padding: 4px;">Detail</th>
                    <th style="border: 1px solid #ccc; padding: 4px;">Nilai</th>
                  </tr>
                  <tr>
                  <tr>
                    <td style="border: 1px solid #ccc; padding: 4px;">Tahun Perolehan</td>
                    <td style="border: 1px solid #ccc; padding: 4px;">${asset.tahun_perolehan}</td>
                  </tr>
                    <td style="border: 1px solid #ccc; padding: 4px;">Luas</td>
                    <td style="border: 1px solid #ccc; padding: 4px;">${asset.luas} m2</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #ccc; padding: 4px;">Harga Perolehan</td>
                    <td style="border: 1px solid #ccc; padding: 4px;">Rp.${formattedHargaPerolehan}</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #ccc; padding: 4px;">Nilai Saat Ini</td>
                    <td style="border: 1px solid #ccc; padding: 4px;">Rp.${formattedNilaiSaatIni}</td>
                  </tr>
                  <tr>
                    <td style="border: 1px solid #ccc; padding: 4px;">Alamat</td>
                    <td style="border: 1px solid #ccc; padding: 4px;">${fullAddress}</td>
                  </tr>
                </table>
              </div>
            `);

          // Store reference to marker for future removal
          markerRefs.current.push(marker);
        } else {
          console.warn(
            `Invalid coordinates for asset ${asset.name}: ${latitude}, ${longitude}`
          );
        }
      } else {
        console.warn(`Asset ${asset.name} does not have valid coordinates`);
      }
    });
  }, [staticAssets]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex h-screen">
      <Sidebar />

      <main
        className="flex-1 p-6 bg-gray-100 overflow-y-auto"
        style={{ marginLeft: "250px" }}
      >
        <header className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center">
            <button
              className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600 transition duration-200 mr-4"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </header>

        {/* Statistics */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl">Jumlah Aset</h2>
            <p className="text-3xl">{totalAssets}</p>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <h2 className="text-xl">Aset Dalam Pemeliharaan</h2>
            <p className="text-3xl">{assetCount}</p>
          </div>
        </section>

        {/* Map Section */}
        <section className="relative mb-8">
          <div
            id="map"
            style={{
              height: "650px",
              width: "100%",
              border: "1px solid #ccc",
              backgroundColor: "lightgray",
            }}
          ></div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
