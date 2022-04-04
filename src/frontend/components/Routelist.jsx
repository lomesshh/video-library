import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  Login,
  Profile,
  Signup,
  History,
  Homepage,
  LikedVideo,
  Playlist,
  SinglePlaylist,
  WatchLater,
  VideoGrid,
  Explore,
  SingleVideo,
  UploadVideo,
} from "frontend/pages";
import { Pathnotfound } from "frontend/components";

const Routelist = () => {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/videos/:videoId" element={<SingleVideo />} />
        <Route path="*" element={<Pathnotfound />} />
        <Route path="/videos" element={<VideoGrid />}>
          <Route path="explore" element={<Explore />} />
          <Route path="playlist" element={<Playlist />} />
          <Route
            path="playlist/:playlistId"
            exact
            element={<SinglePlaylist />}
          />
          <Route path="liked" exact element={<LikedVideo />} />
          <Route path="watchlater" exact element={<WatchLater />} />
          <Route path="history" exact element={<History />} />
          <Route path="uploadvideo" exact element={<UploadVideo />} />
        </Route>
      </Routes>
    </div>
  );
};

export { Routelist };
