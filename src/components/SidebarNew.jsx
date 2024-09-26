import React from "react";
import { Link, useLocation } from "react-router-dom";
import logoPLN from "../images/Logo-PLN-Baru.png";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 h-screen bg-blue-600 shadow-md p-5 fixed top-0 left-0 z-50">
      <div className="mb-6">
        <img src={logoPLN} alt="Logo PLN" className="h-14" />
      </div>

      <ul className="space-y-4">
        <li>
          <Link
            to="/dashboard"
            className={`text-white hover:text-black ${
              location.pathname === "/dashboard" ? "text-silver" : ""
            }`}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            to="/daftar-aset"
            className={`text-white hover:text-black ${
              location.pathname === "/daftar-aset" ? "text-silver" : ""
            }`}
          >
            Daftar Aset
          </Link>
        </li>
        <li>
          <Link
            to="/tambah-aset"
            className={`text-white hover:text-black ${
              location.pathname === "/tambah-aset" ? "text-silver" : ""
            }`}
          >
            Tambah Aset
          </Link>
        </li>
        <li>
          <Link
            to="/edit-aset"
            className={`text-white hover:text-black ${
              location.pathname === "/edit-aset" ? "text-silver" : ""
            }`}
          >
            Edit Aset
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
