import axios from "axios";
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Notify } from "../components/Toast";
import { useAuth } from "./authcontext";

const PlaylistContext = createContext();

const initialValue = {
  playlist: [],
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "API_REQUEST":
      return { ...state, loading: true };
    case "ADD_TO_PLAYLIST":
      return { ...state, playlist: [...action.payload], loading: false };
    case "HANDLE_ERROR":
      return { ...state, loading: false };
    default:
      return state;
  }
};

const PlaylistProvider = ({ children }) => {
  const { token } = useAuth();

  const [playliststate, playlistdispatch] = useReducer(reducer, initialValue);

  const getAllPlaylist = async () => {
    playlistdispatch({ type: "API_REQUEST" });
    try {
      const response = await axios.get("/api/user/playlists", {
        headers: { authorization: token },
      });
      if (response.status === 200 || response.status === 201) {
        playlistdispatch({
          type: "ADD_TO_PLAYLIST",
          payload: response.data.playlists,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addPlaylist = async (title) => {
    try {
      const response = await axios.post(
        "/api/user/playlists",
        {
          playlist: { title: title, description: "dummy description" },
        },
        {
          headers: { authorization: token },
        }
      );
      if (response.status === 200 || response.status === 201) {
        playlistdispatch({
          type: "ADD_TO_PLAYLIST",
          payload: response.data.playlists,
        });
        Notify("Playlist added successfully !", "info");
      }
    } catch (error) {
      console.log(error);
      Notify("Server error, Please try again later !", "error");
    }
  };

  const deletePlaylist = async (item) => {
    try {
      const response = await axios.delete(`/api/user/playlists/${item._id}`, {
        headers: { authorization: token },
      });
      if (response.status === 200 || response.status === 201) {
        playlistdispatch({
          type: "ADD_TO_PLAYLIST",
          payload: response.data.playlists,
        });
        Notify("Playlist deleted !", "info");
      }
    } catch (error) {
      console.log(error);
      Notify("Server error, Please try again later !", "error");
    }
  };

  const addVideoToPlaylist = async (video, playlist) => {
    playlistdispatch({ type: "API_REQUEST" });
    const currIndex = playlist.videos.findIndex(
      (prod) => prod._id === video._id
    );
    if (currIndex === -1) {
      try {
        const response = await axios.post(
          `/api/user/playlists/${playlist._id}`,
          { video },
          {
            headers: { authorization: token },
          }
        );
        if (response.status === 200 || response.status === 201) {
          let newPlaylist = [...playliststate.playlist];
          let currIndex = newPlaylist.findIndex(
            (item) => item._id === playlist._id
          );
          newPlaylist[currIndex] = {
            ...newPlaylist[currIndex],
            videos: [...response.data.playlist.videos],
          };
          playlistdispatch({
            type: "ADD_TO_PLAYLIST",
            payload: newPlaylist,
          });

          Notify("Video added to playlist", "info");
        }
      } catch (error) {
        console.log(error);
        Notify("Server error, please try again later", "info");
      }
    } else {
      try {
        const res = await axios.delete(
          `/api/user/playlists/${playlist._id}/${video._id}`,
          {
            headers: { authorization: token },
          }
        );
        if (res.status === 200 || res.status === 201) {
          let newPlaylist = [...playliststate.playlist];
          let currIndex = newPlaylist.findIndex(
            (item) => item._id === playlist._id
          );
          newPlaylist[currIndex] = {
            ...newPlaylist[currIndex],
            videos: [...res.data.playlist.videos],
          };
          playlistdispatch({
            type: "ADD_TO_PLAYLIST",
            payload: newPlaylist,
          });

          Notify("Video removed from playlist", "info");
        }
      } catch (error) {
        console.log(error);
        Notify("Server error, please try again later", "info");
      }
    }
  };

  useEffect(() => {
    getAllPlaylist();
  }, []);

  return (
    <div>
      <PlaylistContext.Provider
        value={{
          playliststate,
          playlistdispatch,
          addPlaylist,
          deletePlaylist,
          addVideoToPlaylist,
        }}
      >
        {children}
      </PlaylistContext.Provider>
    </div>
  );
};

const usePlaylist = () => useContext(PlaylistContext);

export { usePlaylist, PlaylistProvider };
