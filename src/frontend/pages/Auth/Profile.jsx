import React from "react";
import { useAuth } from "frontend/context";

const Profile = () => {
  const { user, handleLogout } = useAuth();

  return (
    <div className="profile__section">
      <div className="profile__image">
        <button>My profile</button>
      </div>
      <div className="profile__info">
        <div className="profile__name">
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          <button className="large__screen-button" onClick={handleLogout}>
            Logout <i className="fa-solid fa-door-open"></i>
          </button>
          <button className="small__screen-button">
            <i className="fa-solid fa-door-open" onClick={handleLogout}></i>
          </button>
        </div>
        <div className="profile__about">
          <h4>Name : </h4>
          <p>{user.name}</p>

          <h4>Email : </h4>
          <p>{user.email}</p>

          <h4>Mobile No : </h4>
          <p>+91 9933227766</p>
        </div>
      </div>
    </div>
  );
};

export { Profile };
