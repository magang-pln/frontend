import React, { useState } from "react";
import LogoPLN from "../images/pln-logo.png";
import { UserIcon, LockClosedIcon } from "@heroicons/react/outline";

const Home = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSignUp, setShowSignUp] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <div className="relative flex h-screen overflow-hidden">
      {/* Bagian Kiri */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center p-8 relative">
        {/* Logo PLN */}
        <div className="absolute top-4 left-4">
          <img src={LogoPLN} alt="Logo PLN" className="h-16" />
        </div>
        <div className="diff-font">
          <h1 className="text-7xl font-bold mb-4 text-gray-800 pb-10">
            Selamat Datang
          </h1>
          <p className="text-xl text-gray-600">
            Kelola dan pantau aset dengan efisien menggunakan sistem kami yang terintegrasi. 
            Nikmati kemudahan akses dan manajemen data aset yang lengkap dan terpercaya.
            Untuk tetap terhubung silahkan masuk dengan akun anda.
          </p>
        </div>
      </div>

      {/* Bagian Kanan */}
      <div className="w-1/2 bg-blue-500 flex items-center justify-center p-8 relative">
        <div className="w-full max-w-md p-8">
          {!showSignUp && !showChangePassword && (
            <>
              <h2 className="text-2xl font-bold text-white mb-6 text-center">
                Sign in to access system
              </h2>
              <div className="flex items-center bg-white rounded-full shadow-lg mb-4">
                <UserIcon className="h-6 w-6 text-gray-400 ml-2" />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 rounded-r-full border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex items-center bg-white rounded-full shadow-lg mb-4">
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
                onClick={() => alert('Login')}
              >
                Login
              </button>
              <div className="mt-4 text-center text-white">
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
                    onClick={() => {
                      setShowChangePassword(false);
                    }}
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
    </div>
  );
};

export default Home;