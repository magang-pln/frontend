import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "font-awesome/css/font-awesome.min.css";
import { AssetProvider } from "./components/AssetContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <AssetProvider>
    <App />
  </AssetProvider>
);
