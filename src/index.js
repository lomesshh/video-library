import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./frontend/context/authcontext";
import { DataProvider } from "./frontend/context/datacontext";
import { LikeProvider } from "./frontend/context/likecontext";

makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <LikeProvider>
          <DataProvider>
            <App />
          </DataProvider>
        </LikeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
