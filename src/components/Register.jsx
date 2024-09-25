import React, { useState } from "react";
import LogoPLN from "../images/pln-logo.png";
import { UserIcon, LockClosedIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../images/background.jpg";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    // Validasi jika password dan konfirmasi password tidak sama
    if (password !== confirmPassword) {
      setErrorMessage("Password dan Konfirmasi Password tidak cocok");
      return;
    }

    try {
      const response = await fetch(
        "https://backend-production-a671.up.railway.app/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Akun berhasil dibuat!");
        navigate("/login");
      } else {
        setErrorMessage(data.message || "Registrasi gagal");
      }
    } catch (error) {
      setErrorMessage("Terjadi kesalahan dalam registrasi");
    }
  };

  return (
    <div
      className="relative flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <img src={LogoPLN} alt="Logo PLN" className="h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Daftar Akun</h2>
        </div>

        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-center mb-4">{successMessage}</p>
        )}

        <div className="flex items-center bg-gray-100 rounded-full shadow-lg mb-4">
          <UserIcon className="h-6 w-6 text-gray-400 ml-2" />
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-r-full border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center bg-gray-100 rounded-full shadow-lg mb-4">
          <LockClosedIcon className="h-6 w-6 text-gray-400 ml-2" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-r-full border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center bg-gray-100 rounded-full shadow-lg mb-4">
          <LockClosedIcon className="h-6 w-6 text-gray-400 ml-2" />
          <input
            type="password"
            placeholder="Konfirmasi Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-r-full border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="button"
          className="w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600 transition duration-200"
          onClick={handleRegister}
        >
          Daftar
        </button>

        <div className="mt-4 text-center text-gray-800">
          <p className="cursor-pointer" onClick={() => navigate("/login")}>
            Kembali ke halaman <span className="text-blue-300">login</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
