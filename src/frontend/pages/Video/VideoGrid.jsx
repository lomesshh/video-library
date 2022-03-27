import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authcontext";

const navLinkStyle = ({ isActive }) => {
  return isActive ? `activetab` : `notactive`;
};

const VideoGrid = () => {
  const { token } = useAuth();

  return (
    <div className="video__main">
      <div className="video__sidebar">
        <NavLink className={navLinkStyle} to="/">
          <i class="fa-solid fa-house"></i> Home
        </NavLink>
        <NavLink className={navLinkStyle} to="explore">
          <i class="fa-solid fa-video"></i> Explore
        </NavLink>
        <NavLink
          className={navLinkStyle}
          to={`${token ? `playlist` : `/login`}`}
        >
          <i class="fa-solid fa-folder-plus"></i> Playlist
        </NavLink>
        <NavLink className={navLinkStyle} to={`${token ? `liked` : `/login`}`}>
          <i class="fa-solid fa-thumbs-up"></i> Liked videos
        </NavLink>
        <NavLink
          className={navLinkStyle}
          to={`${token ? `watchlater` : `/login`}`}
        >
          <i class="fa-solid fa-floppy-disk"></i> Watch later
        </NavLink>
        <NavLink
          className={navLinkStyle}
          to={`${token ? `history` : `/login`}`}
        >
          <i class="fa-solid fa-clock"></i> History
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
};

export default VideoGrid;
