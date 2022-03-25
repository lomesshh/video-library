import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const navLinkStyle = ({ isActive }) => {
  return isActive ? `activetab` : `notactive`;
};

const VideoGrid = () => {
  return (
    <div className="video__main">
      <div className="video__sidebar">
        <NavLink className={navLinkStyle} to="/">
          <i class="fa-solid fa-house"></i> Home
        </NavLink>
        <NavLink className={navLinkStyle} to="explore">
          <i class="fa-solid fa-video"></i> Explore
        </NavLink>
        <NavLink className={navLinkStyle} to="playlist">
          <i class="fa-solid fa-folder-plus"></i> Playlist
        </NavLink>
        <NavLink className={navLinkStyle} to="liked">
          <i class="fa-solid fa-thumbs-up"></i> Liked videos
        </NavLink>
        <NavLink className={navLinkStyle} to="watchlater">
          <i class="fa-solid fa-floppy-disk"></i> Watch later
        </NavLink>
        <NavLink className={navLinkStyle} to="history">
          <i class="fa-solid fa-clock"></i> History
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
};

export default VideoGrid;
