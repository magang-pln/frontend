import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dasboard";
import DaftarAset from "./components/DaftarAset";
import TambahAset from "./components/TambahAset";
import EditAset from "./components/EditAset";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/daftar-aset" element={<DaftarAset />} />
          <Route path="/tambah-aset" element={<TambahAset />} />
          <Route path="/edit-aset" element={<EditAset />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
