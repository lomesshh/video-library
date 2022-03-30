import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [allVideos, setAllVideos] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/videos");
        setAllVideos(response.data.videos);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();

    (async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/categories");
        setAllCategories(response.data.categories);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <div>
      <DataContext.Provider value={{ allVideos, loading, allCategories }}>
        {children}
      </DataContext.Provider>
    </div>
  );
};

const useData = () => useContext(DataContext);

export { useData, DataProvider };
