import axios from "axios";
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Notify } from "frontend/components";
import { useAuth } from "frontend/context";

const HistoryContext = createContext();

const initialValue = {
  history: [],
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_HISTORY":
      return { ...state, history: [...action.payload], loading: false };
    case "REMOVE_FROM_HISTORY":
      return { ...state, history: [...action.payload], loading: false };
    case "CLEAR_ALL_HISTORY":
      return { ...state, history: [...action.payload], loading: false };
    case "API_REQUEST":
      return { ...state, loading: true };
    case "HANDLE_ERROR":
      return { ...state, loading: false };
    default:
      return state;
  }
};

const HistoryProvider = ({ children }) => {
  const { token } = useAuth();

  const [historystate, historydispatch] = useReducer(reducer, initialValue);

  const getHistoryData = async () => {
    historydispatch({ type: "API_REQUEST" });
    try {
      const response = await axios.get("/api/user/history", {
        headers: { authorization: token },
      });
      historydispatch({
        type: "ADD_TO_HISTORY",
        payload: response.data.history,
      });
    } catch (error) {
      historydispatch({ type: "HANDLE_ERROR" });
    }
  };

  const addToHistory = async (video) => {
    historydispatch({ type: "API_REQUEST" });
    try {
      const response = await axios.post(
        "/api/user/history",
        { video },
        {
          headers: { authorization: token },
        }
      );
      if (response.status === 200 || response.status === 201) {
        historydispatch({
          type: "ADD_TO_HISTORY",
          payload: response.data.history,
        });
      }
    } catch (error) {
      console.log(error);
      historydispatch({ type: "HANDLE_ERROR" });
    }
  };

  const removeFromHistory = async (video) => {
    historydispatch({ type: "API_REQUEST" });
    try {
      const response = await axios.delete(`/api/user/history/${video._id}`, {
        headers: { authorization: token },
      });
      if (response.status === 200 || response.status === 201) {
        historydispatch({
          type: "REMOVE_FROM_HISTORY",
          payload: response.data.history,
        });
        Notify("Removed from history", "info");
      }
    } catch (error) {
      console.log(error);
      Notify("Server Error, Please try again later", "error");
      historydispatch({ type: "HANDLE_ERROR" });
    }
  };

  const clearAllHistory = async () => {
    historydispatch({ type: "API_REQUEST" });
    try {
      const response = await axios.delete("/api/user/history/all", {
        headers: { authorization: token },
      });
      if (response.status === 200 || response.status === 201) {
        historydispatch({
          type: "CLEAR_ALL_HISTORY",
          payload: response.data.history,
        });
        Notify("All history cleared", "info");
      }
    } catch (error) {
      console.log(error);
      Notify("Server Error, Please try again later", "error");
      historydispatch({ type: "HANDLE_ERROR" });
    }
  };

  useEffect(() => {
    getHistoryData();
  }, []);

  return (
    <div>
      <HistoryContext.Provider
        value={{
          historystate,
          historydispatch,
          addToHistory,
          removeFromHistory,
          clearAllHistory,
        }}
      >
        {children}
      </HistoryContext.Provider>
    </div>
  );
};

const useHistory = () => useContext(HistoryContext);

export { HistoryProvider, useHistory };
