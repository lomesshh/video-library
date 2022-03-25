import axios from "axios";
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Notify } from "../components/Toast";
import { useAuth } from "./authcontext";

const LikeContext = createContext();

const initialValue = {
  likes: [],
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_LIKES":
      return {
        ...state,
        likes: [...action.payload],
        loading: false,
      };
    case "API_REQUEST":
      return { ...state, loading: true };
    case "ERROR_HANDLE":
      return { ...state, loading: false };
    default:
      return state;
  }
};

const LikeProvider = ({ children }) => {
  const { token } = useAuth();

  const [likestate, likedispatch] = useReducer(reducer, initialValue);

  const getLikeData = async () => {
    likedispatch({ type: "API_REQUEST" });
    try {
      const response = await axios.get("/api/user/likes", {
        headers: { authorization: token },
      });
      likedispatch({ type: "ADD_TO_LIKES", payload: response.data.likes });
    } catch (error) {
      console.log(error);
      likedispatch({ type: "ERROR_HANDLE" });
    }
  };

  const addToLikes = async (video) => {
    likedispatch({ type: "API_REQUEST" });
    const findIndex = likestate.likes.findIndex(
      (prod) => prod._id === video._id
    );
    if (findIndex === -1) {
      try {
        const response = await axios.post(
          "/api/user/likes",
          { video },
          {
            headers: { authorization: token },
          }
        );
        if (response.status === 200 || response.status === 201) {
          likedispatch({ type: "ADD_TO_LIKES", payload: response.data.likes });
          Notify("Video liked", "info");
        } else {
          Notify("Server error, please try again later", "info");
        }
      } catch (error) {
        console.log(error);
        Notify("Server error, please try again later", "info");
      }
    } else {
      try {
        const res = await axios.delete(`/api/user/likes/${video._id}`, {
          headers: { authorization: token },
        });
        if (res.status === 200 || res.status === 201) {
          likedispatch({ type: "ADD_TO_LIKES", payload: res.data.likes });
          Notify("Video Unliked", "info");
        } else {
          Notify("Server error, please try again later", "info");
        }
      } catch (error) {
        console.log(error);
        Notify("Server error, please try again later", "info");
      }
    }
  };

  useEffect(() => {
    getLikeData();
  }, []);

  return (
    <div>
      <LikeContext.Provider value={{ likestate, likedispatch, addToLikes }}>
        {children}
      </LikeContext.Provider>
    </div>
  );
};

const useLike = () => useContext(LikeContext);

export { LikeProvider, useLike };
