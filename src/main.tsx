import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import React from "react";

import { AuthProvider } from "@/context.tsx";

import App from "./App.tsx";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
