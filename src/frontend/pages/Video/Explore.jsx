import React, { useState } from "react";
import { useData } from "../../context/datacontext";
import Loader from "./../../components/Loader";
import VideoCard from "./VideoCard";

const Explore = () => {
  const { allVideos, loading } = useData();
  const [searchFilter, setSearchFilter] = useState("");

  return (
    <div className="video__grid">
      {loading && <Loader />}
      <div className="video__search">
        <input
          type="text"
          placeholder="Search video here"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
        />
      </div>
      <div className="video__list">
        {allVideos
          .filter((product) => {
            if (searchFilter === "") {
              return product;
            } else if (
              product.title.toLowerCase().includes(searchFilter.toLowerCase())
            ) {
              return product;
            }
          })
          .map((item) => (
            <VideoCard item={item} key={item._id} />
          ))}
      </div>
    </div>
  );
};

export default Explore;
