import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "frontend/context";

const navLinkStyle = ({ isActive }) => {
  return isActive ? `activetab` : `notactive`;
};

const VideoGrid = () => {
  const { token } = useAuth();

  return (
    <div className="video__main">
      <div className="video__sidebar">
        <NavLink className={navLinkStyle} to="/">
          <p className="sidebar__option">
            <i className="fa-solid fa-house"></i>
            <p>Home</p>
          </p>
        </NavLink>
        <NavLink className={navLinkStyle} to="explore">
          <p className="sidebar__option">
            <i className="fa-solid fa-video"></i> <p> Explore</p>
          </p>
        </NavLink>
        <NavLink
          className={navLinkStyle}
          to={`${token ? `playlist` : `/login`}`}
        >
          <p className="sidebar__option">
            <i className="fa-solid fa-folder-plus"></i> <p>Playlist</p>
          </p>
        </NavLink>
        <NavLink className={navLinkStyle} to={`${token ? `liked` : `/login`}`}>
          <p className="sidebar__option">
            <i className="fa-solid fa-thumbs-up"></i> <p>Liked videos</p>
          </p>
        </NavLink>
        <NavLink
          className={navLinkStyle}
          to={`${token ? `watchlater` : `/login`}`}
        >
          <p className="sidebar__option">
            <i className="fa-solid fa-floppy-disk"></i> <p>Watch later</p>
          </p>
        </NavLink>
        <NavLink
          className={navLinkStyle}
          to={`${token ? `history` : `/login`}`}
        >
          <p className="sidebar__option">
            <i className="fa-solid fa-clock"></i> <p>History</p>
          </p>
        </NavLink>
        <NavLink
          className={navLinkStyle}
          to={`${token ? `uploadvideo` : `/login`}`}
        >
          <p className="sidebar__option">
            <i className="fa-solid fa-upload"></i> <p>Upload Video</p>
          </p>
        </NavLink>
      </div>

      <Outlet />
    </div>
  );
};

export { VideoGrid };
