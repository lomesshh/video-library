import axios from "axios";
import { useNavigate } from "react-router-dom";
import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { Notify } from "frontend/components";

const DataContext = createContext();

const initialValue = {
  allVideos: [],
  allCategories: [],
  uploadedVideo: [],
  loading: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ALL_VIDEOS":
      return {
        ...state,
        allVideos: [...state.uploadedVideo, ...action.payload],
        loading: false,
      };

    case "SET_ALL_CATEGORIES":
      return { ...state, allCategories: [...action.payload], loading: false };
    case "ADD_COMMENT":
      const { videoId, commentObj } = action.payload;
      return {
        ...state,
        allVideos: [
          ...state.allVideos.map((video) =>
            video._id === videoId
              ? { ...video, comments: [...video.comments, commentObj] }
              : { ...video }
          ),
        ],
      };
    case "ADD_REPLY":
      const { videoID, commentId, reply } = action.payload;
      return {
        ...state,
        allVideos: [
          ...state.allVideos.map((video) =>
            video._id === videoID
              ? {
                  ...video,
                  comments: [
                    ...video.comments.map((comment) =>
                      comment.id === commentId
                        ? { ...comment, replies: [...comment.replies, reply] }
                        : { ...comment }
                    ),
                  ],
                }
              : { ...video }
          ),
        ],
      };
    case "UPLOAD_VIDEO":
      const { videoObj, videoUrl } = action.payload;
      if (state.uploadedVideo.length < 1) {
        return {
          ...state,
          uploadedVideo: [{ ...videoObj, _id: videoUrl }].reverse(),
          loading: false,
        };
      } else {
        return {
          ...state,
          uploadedVideo: [
            ...state.uploadedVideo,
            { ...videoObj, _id: videoUrl },
          ].reverse(),
          loading: false,
        };
      }
    case "REMOVE_VIDEO":
      const { removeVideoId } = action.payload;
      return {
        ...state,
        uploadedVideo: [
          ...state.uploadedVideo.filter((video) => video._id !== removeVideoId),
        ],
      };
    case "API_REQUEST":
      return { ...state, loading: true };
    case "ERROR_HANDLE":
      return { ...state, loading: false };
    default:
      return state;
  }
};

const DataProvider = ({ children }) => {
  const [datastate, datadispatch] = useReducer(reducer, initialValue);
  const [uploadObj, setUploadObj] = useState({
    title: "",
    category: "",
    comments: [],
    description: "",
  });

  const navigate = useNavigate();

  const uploadVideo = (finalUrl, obj) => {
    if (finalUrl === false) {
      Notify("Please provide proper youtube link", "warning");
    } else {
      datadispatch({
        type: "UPLOAD_VIDEO",
        payload: { videoObj: obj, videoUrl: finalUrl },
      });
      navigate("/videos/explore");
      Notify("Video uploaded successfully", "info");
    }
  };

  useEffect(() => {
    (async () => {
      datadispatch({ type: "API_REQUEST" });
      try {
        const response = await axios.get("/api/videos");
        datadispatch({ type: "SET_ALL_VIDEOS", payload: response.data.videos });
      } catch (error) {
        console.log(error);
        datadispatch({ type: "ERROR_HANDLE" });
      }
    })();

    (async () => {
      datadispatch({ type: "API_REQUEST" });
      try {
        const response = await axios.get("/api/categories");
        datadispatch({
          type: "SET_ALL_CATEGORIES",
          payload: response.data.categories,
        });
      } catch (error) {
        console.log(error);
        datadispatch({ type: "ERROR_HANDLE" });
      }
    })();
  }, [datastate.uploadedVideo]);

  return (
    <div>
      <DataContext.Provider
        value={{
          datastate,
          datadispatch,
          uploadObj,
          setUploadObj,
          uploadVideo,
        }}
      >
        {children}
      </DataContext.Provider>
    </div>
  );
};

const useData = () => useContext(DataContext);

export { useData, DataProvider };
