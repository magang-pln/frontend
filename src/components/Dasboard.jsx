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
  const mapRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalAssets, setTotalAssets] = useState(0);
  const [staticAssets, setAssets] = useState([]);

  const assets = [
    {
      lat: -1.47483,
      lng: 124.842079,
      name: "Aset 1",
      location: "Lokasi 1",
      area: "100 m²",
      acquisitionCost: "Rp 500.000.000",
    },
    {
      lat: -1.5,
      lng: 124.85,
      name: "Aset 2",
      location: "Lokasi 2",
      area: "200 m²",
      acquisitionCost: "Rp 750.000.000",
    },
    {
      lat: -1.52,
      lng: 124.86,
      name: "Aset 3",
      location: "Lokasi 3",
      area: "150 m²",
      acquisitionCost: "Rp 600.000.000",
    },
  ];

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch(
          "https://backend-production-a671.up.railway.app/api/v1/assets/"
        );
        const data = await response.json();

        // Log the response to inspect the structure
        console.log("API Response:", data);

        // Check if the response contains the assets and set the total assets
        if (data && data.data && data.data.findAssets) {
          setAssets(data.data.findAssets); // Update here to access findAssets correctly
          setTotalAssets(data.data.findAssets.length); // Count the assets correctly
        } else {
          console.error("Invalid response structure:", data);
        }
      } catch (error) {
        console.error("Error fetching assets:", error);
      }
    };

    fetchAssets();
  }, []);

  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = L.map("map").setView([-1.47483, 124.842079], 10);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mapRef.current);

    const customIcon = L.icon({
      iconUrl: markerIcon,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
    });

    staticAssets.forEach((asset) => {
      L.marker([asset.lat, asset.lng], { icon: customIcon }).addTo(
        mapRef.current
      ).bindPopup(`
        <div>
          <b>${asset.name}</b><br>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <th style="border: 1px solid #ccc; padding: 4px;">Detail</th>
              <th style="border: 1px solid #ccc; padding: 4px;">Nilai</th>
            </tr>
            <tr>
              <td style="border: 1px solid #ccc; padding: 4px;">Lokasi</td>
              <td style="border: 1px solid #ccc; padding: 4px;">${asset.location}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ccc; padding: 4px;">Luas</td>
              <td style="border: 1px solid #ccc; padding: 4px;">${asset.area}</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ccc; padding: 4px;">Harga Perolehan</td>
              <td style="border: 1px solid #ccc; padding: 4px;">${asset.acquisitionCost}</td>
            </tr>
          </table>
        </div>
      `);
    });
  }, [staticAssets]);

  const handleSearch = () => {
    const foundAsset = assets.find(
      (asset) => asset.name.toLowerCase() === searchTerm.toLowerCase()
    );
    if (foundAsset && mapRef.current) {
      mapRef.current.setView([foundAsset.lat, foundAsset.lng], 15);
    } else {
      alert("Aset tidak ditemukan!");
    }
  };

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

        {/* Input Pencarian Aset */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Cari Aset..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
          >
            Cari
          </button>
        </div>

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
