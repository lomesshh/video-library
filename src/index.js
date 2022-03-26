import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./frontend/context/authcontext";
import { DataProvider } from "./frontend/context/datacontext";
import { LikeProvider } from "./frontend/context/likecontext";
import { PlaylistProvider } from "./frontend/context/playlistcontext";
import { HistoryProvider } from "./frontend/context/historycontext";
import { WatchLaterProvider } from "./frontend/context/watchlatercontext";

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
