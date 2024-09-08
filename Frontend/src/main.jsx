import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { LoadProvider } from "./Contexts/LoaderContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoadProvider>
      <App />
    </LoadProvider>
  </React.StrictMode>
);
