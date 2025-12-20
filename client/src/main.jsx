import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
// import "./globals.css";
// import "./variables.css";

// Global contexts
import { AuthProvider } from "./context/AuthContext.jsx";
import { UiProvider } from "./context/UiContext.jsx";
import { CoupleProvider } from "./context/CoupleContext.jsx";

// Tailwind stylesheet
// import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <UiProvider>
          <CoupleProvider>
            <App />
          </CoupleProvider>
        </UiProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
