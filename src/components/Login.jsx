import React, { useState } from "react";
import LogoPLN from "../images/pln-logo.png";
import { UserIcon, LockClosedIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../images/background.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://backend-production-a671.up.railway.app/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        // Ambil token dari data
        const token = result.data.token;

        // Simpan token ke localStorage
        localStorage.setItem("token", token);

        navigate("/dashboard");
      } else {
        setErrorMessage(result.message || "Login gagal. Silakan coba lagi.");
      }
    } catch (error) {
      setErrorMessage("Terjadi kesalahan dalam login");
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
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Sign in to access system
          </h2>
        </div>

        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
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

        <button
          type="button"
          className="w-full bg-green-500 text-white py-2 rounded-full hover:bg-green-600 transition duration-200"
          onClick={handleLogin}
        >
          Login
        </button>

        <div className="mt-4 text-center text-gray-800">
          <p>
            Belum punya akun?{" "}
            <span
              className="text-blue-300 cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Daftar sekarang
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
