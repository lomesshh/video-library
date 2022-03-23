import React from "react";
import { NavLink } from "react-router-dom";

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
        <NavLink className={navLinkStyle} to="/videos">
          <i class="fa-solid fa-video"></i> Explore
        </NavLink>
        <NavLink className={navLinkStyle} to="playlist">
          <i class="fa-solid fa-folder-open"></i> Playlist
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

      <div className="video__list">
        <div>
          <div className="video__card">
            <div className="video__img">
              <img
                src="https://i.ytimg.com/vi/T3WWiUsCMcY/maxresdefault.jpg"
                alt="thumbnail_img"
              />
            </div>
            <div className="video__info">
              <h5>BMW X7- Gt line</h5>
              <p>cat - premium</p>
              <div className="info__one">
                <i class="fa-solid fa-thumbs-up"></i>
                <i class="fa-solid fa-floppy-disk"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="video__card">
          <div className="video__img">
            <img
              src="https://i.ytimg.com/vi/T3WWiUsCMcY/maxresdefault.jpg"
              alt="thumbnail_img"
            />
          </div>
          <div className="video__info">
            <h5>BMW X7- Gt line</h5>
            <p>cat - premium</p>
            <div className="info__one">
              <i class="fa-solid fa-thumbs-up"></i>
              <i class="fa-solid fa-floppy-disk"></i>
            </div>
          </div>
        </div>

        <div className="video__card">
          <div className="video__img">
            <img
              src="https://i.ytimg.com/vi/T3WWiUsCMcY/maxresdefault.jpg"
              alt="thumbnail_img"
            />
          </div>
          <div className="video__info">
            <h5>BMW X7- Gt line</h5>
            <p>cat - premium</p>
            <div className="info__one">
              <i class="fa-solid fa-thumbs-up"></i>
              <i class="fa-solid fa-floppy-disk"></i>
            </div>
          </div>
        </div>

        <div className="video__card">
          <div className="video__img">
            <img
              src="https://i.ytimg.com/vi/T3WWiUsCMcY/maxresdefault.jpg"
              alt="thumbnail_img"
            />
          </div>
          <div className="video__info">
            <h5>BMW X7- Gt line</h5>
            <p>cat - premium</p>
            <div className="info__one">
              <i class="fa-solid fa-thumbs-up"></i>
              <i class="fa-solid fa-floppy-disk"></i>
            </div>
          </div>
        </div>

        <div className="video__card">
          <div className="video__img">
            <img
              src="https://i.ytimg.com/vi/T3WWiUsCMcY/maxresdefault.jpg"
              alt="thumbnail_img"
            />
          </div>
          <div className="video__info">
            <h5>BMW X7- Gt line</h5>
            <p>cat - premium</p>
            <div className="info__one">
              <i class="fa-solid fa-thumbs-up"></i>
              <i class="fa-solid fa-floppy-disk"></i>
            </div>
          </div>
        </div>

        <div className="video__card">
          <div className="video__img">
            <img
              src="https://i.ytimg.com/vi/T3WWiUsCMcY/maxresdefault.jpg"
              alt="thumbnail_img"
            />
          </div>
          <div className="video__info">
            <h5>BMW X7- Gt line</h5>
            <p>cat - premium</p>
            <div className="info__one">
              <i class="fa-solid fa-thumbs-up"></i>
              <i class="fa-solid fa-floppy-disk"></i>
            </div>
          </div>
        </div>

        <div className="video__card">
          <div className="video__img">
            <img
              src="https://i.ytimg.com/vi/T3WWiUsCMcY/maxresdefault.jpg"
              alt="thumbnail_img"
            />
          </div>
          <div className="video__info">
            <h5>BMW X7- Gt line</h5>
            <p>cat - premium</p>
            <div className="info__one">
              <i class="fa-solid fa-thumbs-up"></i>
              <i class="fa-solid fa-floppy-disk"></i>
            </div>
          </div>
        </div>

        <div className="video__card">
          <div className="video__img">
            <img
              src="https://i.ytimg.com/vi/T3WWiUsCMcY/maxresdefault.jpg"
              alt="thumbnail_img"
            />
          </div>
          <div className="video__info">
            <h5>BMW X7- Gt line</h5>
            <p>cat - premium</p>
            <div className="info__one">
              <i class="fa-solid fa-thumbs-up"></i>
              <i class="fa-solid fa-floppy-disk"></i>
            </div>
          </div>
        </div>

        <div className="video__card">
          <div className="video__img">
            <img
              src="https://i.ytimg.com/vi/T3WWiUsCMcY/maxresdefault.jpg"
              alt="thumbnail_img"
            />
          </div>
          <div className="video__info">
            <h5>BMW X7- Gt line</h5>
            <p>cat - premium</p>
            <div className="info__one">
              <i class="fa-solid fa-thumbs-up"></i>
              <i class="fa-solid fa-floppy-disk"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGrid;
