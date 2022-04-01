import axios from "axios";
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Notify } from "frontend/components";
import { useAuth } from "frontend/context";

const WatchLaterContext = createContext();

const initialValue = {
  watchLater: [],
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WATCHLATER":
      return { ...state, watchLater: [...action.payload], loading: false };
    case "CLEAR_ALL_WATCHLATER":
      return { ...state, watchLater: [...action.payload], loading: false };
    case "API_REQUEST":
      return { ...state, loading: true };
    case "HANDLE_ERROR":
      return { ...state, loading: false };
    default:
      return state;
  }
};

const WatchLaterProvider = ({ children }) => {
  const { token } = useAuth();

  const [watchlaterstate, watchlaterdispatch] = useReducer(
    reducer,
    initialValue
  );

  const getWatchLaterData = async () => {
    watchlaterdispatch({ type: "API_REQUEST" });
    try {
      const response = await axios.get("/api/user/watchLater", {
        headers: { authorization: token },
      });
      watchlaterdispatch({
        type: "ADD_TO_WATCHLATER",
        payload: response.data.watchLater,
      });
    } catch (error) {
      watchlaterdispatch({ type: "HANDLE_ERROR" });
    }
  };

  const addToWatchLater = async (video) => {
    watchlaterdispatch({ type: "API_REQUEST" });
    const findIndex = watchlaterstate.watchLater.findIndex(
      (prod) => prod._id === video._id
    );
    if (findIndex === -1) {
      try {
        const response = await axios.post(
          "/api/user/watchLater",
          { video },
          {
            headers: { authorization: token },
          }
        );
        if (response.status === 200 || response.status === 201) {
          watchlaterdispatch({
            type: "ADD_TO_WATCHLATER",
            payload: response.data.watchLater,
          });
          Notify("Added to watch later", "info");
        }
      } catch (error) {
        console.log(error);
        watchlaterdispatch({ type: "HANDLE_ERROR" });
        Notify("Server error, please try again later", "info");
      }
    } else {
      try {
        const res = await axios.delete(`/api/user/watchLater/${video._id}`, {
          headers: { authorization: token },
        });
        if (res.status === 200 || res.status === 201) {
          watchlaterdispatch({
            type: "ADD_TO_WATCHLATER",
            payload: res.data.watchLater,
          });
          Notify("Removed from watch later", "info");
        }
      } catch (error) {
        console.log(error);
        watchlaterdispatch({ type: "HANDLE_ERROR" });
        Notify("Server error, please try again later", "info");
      }
    }
  };

  const clearAllWatchLater = async () => {
    watchlaterdispatch({ type: "API_REQUEST" });
    try {
      const response = await axios.delete("/api/user/watchLater/all", {
        headers: { authorization: token },
      });
      if (response.status === 200 || response.status === 201) {
        watchlaterdispatch({
          type: "CLEAR_ALL_WATCHLATER",
          payload: response.data.watchLater,
        });
        Notify("Watch later list cleared", "info");
      }
    } catch (error) {
      console.log(error);
      watchlaterdispatch({ type: "HANDLE_ERROR" });
      Notify("Server Error, Please try again later", "error");
    }
  };

  useEffect(() => {
    getWatchLaterData();
  }, []);

  return (
    <div>
      <WatchLaterContext.Provider
        value={{
          watchlaterstate,
          watchlaterdispatch,
          addToWatchLater,
          clearAllWatchLater,
        }}
      >
        {children}
      </WatchLaterContext.Provider>
    </div>
  );
};

const useWatchLater = () => useContext(WatchLaterContext);

export { WatchLaterProvider, useWatchLater };
