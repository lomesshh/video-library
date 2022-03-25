import React from "react";
import { useData } from "../../context/datacontext";
import Loader from "./../../components/Loader";
import VideoCard from "./VideoCard";

const Explore = () => {
  const { allVideos, loading } = useData();
  return (
    <div className="video__grid">
      {loading && <Loader />}
      <div className="video__search">
        <input type="text" placeholder="Search video here" />
      </div>
      <div className="video__list">
        {allVideos.map((item) => (
          <VideoCard item={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default Explore;
