import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Notify } from "../components/Toast";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("videoUser"));
  const token = localStorage.getItem("videoToken");

  const [localToken, setLocalToken] = useState(token ?? "");
  const [localUser, setLocalUser] = useState(user ?? {});

  const handleSingup = async (values) => {
    try {
      const response = await axios.post("/api/auth/signup", values);
      if (response.status === 200 || response.status === 201) {
        navigate("/login");
        Notify("User registered succeesfully", "info");
      } else {
        Notify("Unable to register, please try again later", "error");
      }
    } catch (error) {
      console.log(error);
      Notify("Unable to register, please try again later", "error");
    }
  };

  const handleLogin = async (values) => {
    try {
      const res = await axios.post("/api/auth/login", values);
      if (res.status === 200 || res.status === 201) {
        localStorage.setItem("videoUser", JSON.stringify(res.data.foundUser));
        localStorage.setItem("videoToken", res.data.encodedToken);
        setLocalToken(res.data.encodedToken);
        setLocalUser(res.data.foundUser);
        navigate("/profile");
        Notify("Login succeesful", "info");
      } else {
        Notify("Unable to login, please try again later", "error");
      }
    } catch (error) {
      console.log(error);
      Notify("Unable to login, please try again later", "error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("videoUser");
    localStorage.removeItem("videoToken");
    setLocalToken("");
    setLocalUser({});
    Notify("Logout succeesful", "info");
    navigate("/");
  };

  return (
    <div>
      <AuthContext.Provider
        value={{
          user,
          localUser,
          token,
          localToken,
          handleSingup,
          handleLogin,
          handleLogout,
        }}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
