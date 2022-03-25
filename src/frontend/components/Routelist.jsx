import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Profile from "../pages/Auth/Profile";
import Signup from "../pages/Auth/Signup";
import Homepage from "../pages/Home/Homepage";
import VideoGrid from "../pages/Video/VideoGrid";
import Playlist from "./../pages/Playlist/Playlist";
import LikedVideo from "./../pages/LikedVideo/LikedVideo";
import WatchLater from "./../pages/WatchLater/WatchLater";
import History from "./../pages/History/History";
import Explore from "./../pages/Video/Explore";
import SingleVideo from "./../pages/Video/SingleVideo";

const Routelist = () => {
  return (
    <div>
      <Routes>
        <Route path="/" exact element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" exact element={<Signup />} />
        <Route path="/profile" exact element={<Profile />} />
        <Route path="/videos/:videoId" exact element={<SingleVideo />} />
        <Route path="/videos" exact element={<VideoGrid />}>
          <Route path="explore" exact element={<Explore />} />
          <Route path="playlist" exact element={<Playlist />} />
          <Route path="liked" exact element={<LikedVideo />} />
          <Route path="watchlater" exact element={<WatchLater />} />
          <Route path="history" exact element={<History />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Routelist;
