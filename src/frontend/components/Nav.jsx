import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav-bar">
      <Link to="/">
        <img
          className="nav-logo"
          src="https://res.cloudinary.com/dgwzpbj4k/image/upload/v1648029766/gripping%20gears/gripping_d4dmiq.png"
          alt="nav-logo"
        />
      </Link>
      <div className="nav-option">
        <div className="nav-short">
          <i className="fas fa-bars"></i>
        </div>
        <ul>
          <li>
            <Link to="/login">
              <button>
                <i className="fa-solid fa-arrow-right-to-bracket"> </i> Login
              </button>
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <p>
                <i className="far fa-user"></i>Profile
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
