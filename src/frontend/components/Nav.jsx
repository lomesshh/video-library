import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authcontext";

const Nav = () => {
  const { token, handleLogout } = useAuth();

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
          {!token && (
            <li>
              <Link to="/login">
                <p>
                  <i className="fa-solid fa-arrow-right-to-bracket"> </i> Login
                </p>
              </Link>
            </li>
          )}
          {token && (
            <li>
              <p className="auth__button" onClick={handleLogout}>
                <i className="fa-solid fa-door-open"></i> Logout
              </p>
            </li>
          )}
          <li>
            <Link to={`${token ? `/profile` : `/login`}`}>
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
