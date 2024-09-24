import React, { useState } from "react";
import LogoPLN from "../images/pln-logo.png";
import { UserIcon, LockClosedIcon } from "@heroicons/react/outline";
import { useNavigate } from 'react-router-dom';
import BackgroundImage from "../images/background.jpg"; // Import the background image

const Home = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const navigate = useNavigate();  // useNavigate di sini, bukan di dalam Login

  const handleLogin = () => {
    // Logika login Anda bisa ditambahkan di sini (misalnya validasi username/password)
    // Setelah login sukses, arahkan ke halaman dashboard
    navigate('/dashboard');
  };

  return (
    <div className="relative flex items-center justify-center h-screen overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${BackgroundImage})` }}>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <img src={LogoPLN} alt="Logo PLN" className="h-16 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Sign in to access system
          </h2>
        </div>
        {!showSignUp && !showChangePassword && (
          <>
            <div className="flex items-center bg-gray-100 rounded-full shadow-lg mb-4">
              <UserIcon className="h-6 w-6 text-gray-400 ml-2" />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            <button
              type="button"
              className="w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600 transition duration-200"
              onClick={handleLogin}
            >
              Login
            </button>
            <div className="mt-4 text-center text-gray-800">
              <p className="cursor-pointer" onClick={() => setShowChangePassword(true)}>
                Lupa password?
              </p>
              <p>
                Belum punya akun?{" "}
                <span
                  className="text-blue-300 cursor-pointer"
                  onClick={() => setShowSignUp(true)}
                >
                  Daftar sekarang
                </span>
              </p>
            </div>
          </>
        )}

        {/* Modal untuk Ubah Password */}
        {showChangePassword && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 transition-transform transform scale-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Ubah Password</h2>
              <div className="flex items-center bg-gray-100 rounded-full shadow-lg mb-4">
                <LockClosedIcon className="h-6 w-6 text-gray-400 ml-2" />
                <input
                  type="password"
                  placeholder="Password Lama"
                  className="w-full px-4 py-2 rounded-r-full border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center bg-gray-100 rounded-full shadow-lg mb-4">
                <LockClosedIcon className="h-6 w-6 text-gray-400 ml-2" />
                <input
                  type="password"
                  placeholder="Password Baru"
                  className="w-full px-4 py-2 rounded-r-full border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="button"
                className="w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600 transition duration-200"
                onClick={() => {
                  setShowChangePassword(false);
                  alert("Password berhasil diubah!");
                }}
              >
                Ubah Password
              </button>
              <div className="mt-4 text-center text-gray-800">
                <p
                  className="cursor-pointer"
                  onClick={() => setShowChangePassword(false)}
                >
                  Kembali ke halaman login
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Modal untuk Daftar Akun */}
        {showSignUp && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80 transition-transform transform scale-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Daftar Akun</h2>
              <div className="flex items-center bg-gray-100 rounded-full shadow-lg mb-4">
                <UserIcon className="h-6 w-6 text-gray-400 ml-2" />
                <input
                  type="text"
                  placeholder="Username"
                  className="w-full px-4 py-2 rounded-r-full border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center bg-gray-100 rounded-full shadow-lg mb-4">
                <LockClosedIcon className="h-6 w-6 text-gray-400 ml-2" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 rounded-r-full border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center bg-gray-100 rounded-full shadow-lg mb-4">
                <LockClosedIcon className="h-6 w-6 text-gray-400 ml-2" />
                <input
                  type="password"
                  placeholder="Konfirmasi Password"
                  className="w-full px-4 py-2 rounded-r-full border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="button"
                className="w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600 transition duration-200"
                onClick={() => {
                  setShowSignUp(false);
                  alert('Akun berhasil dibuat!');
                }}
              >
                Daftar
              </button>
              <div className="mt-4 text-center text-gray-800">
                <p
                  className="cursor-pointer"
                  onClick={() => setShowSignUp(false)}
                >
                  Kembali ke halaman login
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
