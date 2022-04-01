import { Loader } from "frontend/components";
import { useData } from "frontend/context";
import React, { useState } from "react";
import { VideoCard } from "frontend/pages";

const Explore = () => {
  const { allVideos, loading, allCategories } = useData();
  const [searchFilter, setSearchFilter] = useState("");
  const [localCategory, setlocalCategory] = useState("All");

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
      {!loading && (
        <div className="category__div">
          <span
            className={`${localCategory === "All" ? "active-cat" : ``}`}
            onClick={() => setlocalCategory("All")}
          >
            All
          </span>
          {allCategories.map((category) => {
            if (category.categoryName === "Rolls Royce") {
              return (
                <span
                  onClick={() => setlocalCategory(category.categoryName)}
                  className={`${
                    localCategory === category.categoryName ? "active-cat" : ``
                  }`}
                >
                  RollsRoyce
                </span>
              );
            } else
              return (
                <span
                  onClick={() => setlocalCategory(category.categoryName)}
                  className={`${
                    localCategory === category.categoryName ? "active-cat" : ``
                  }`}
                >
                  {category.categoryName}
                </span>
              );
          })}
        </div>
      )}

      <div className="video__list">
        {allVideos
          .filter((product) => {
            if (localCategory === "All") {
              return product;
            } else if (
              product.category
                .toLowerCase()
                .includes(localCategory.toLowerCase())
            ) {
              return product;
            }
          })
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

export { Explore };
