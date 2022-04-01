import React from "react";
import ReactDOM from "react-dom";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import {
  DataProvider,
  AuthProvider,
  LikeProvider,
  PlaylistProvider,
  HistoryProvider,
  WatchLaterProvider,
} from "frontend/context";

makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PlaylistProvider>
          <WatchLaterProvider>
            <HistoryProvider>
              <LikeProvider>
                <DataProvider>
                  <App />
                </DataProvider>
              </LikeProvider>
            </HistoryProvider>
          </WatchLaterProvider>
        </PlaylistProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
