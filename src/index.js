import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "font-awesome/css/font-awesome.min.css";
import { AssetProvider } from "./components/AssetContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AssetProvider>
    <App />
  </AssetProvider>,
  document.getElementById("root")
);

reportWebVitals();
