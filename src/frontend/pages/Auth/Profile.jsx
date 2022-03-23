import React from "react";

const Profile = () => {
  return (
    <div className="profile__section">
      <div className="profile__image">
        <button>My profile</button>
      </div>
      <div className="profile__info">
        <div className="profile__name">
          <h1>Lomesh Badhe</h1>
          <p>lomesh88@gmail.com</p>
          <button className="large__screen-button">
            Logout <i className="fa-solid fa-door-open"></i>
          </button>
          <button className="small__screen-button">
            <i className="fa-solid fa-door-open"></i>
          </button>
        </div>
        <div className="profile__about">
          <h4>Name : </h4>
          <p>Lomesh Badhe</p>

          <h4>Email : </h4>
          <p>lomesh88@gmail.com</p>

          <h4>Mobile No : </h4>
          <p>+91 9933227766</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
