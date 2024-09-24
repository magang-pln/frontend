import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Dashboard from "./components/Dasboard";
import DaftarAset from "./components/DaftarAset";
import TambahAset from "./components/TambahAset";
import EditAset from "./components/EditAset";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
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
