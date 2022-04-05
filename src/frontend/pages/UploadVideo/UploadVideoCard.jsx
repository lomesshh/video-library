import React from "react";
import { Link } from "react-router-dom";
import { useData } from "frontend/context";

//library imports
import Tippy from "@tippyjs/react";
import { followCursor } from "tippy.js";
import "tippy.js/themes/light.css";
import "tippy.js/dist/tippy.css";
import { Notify } from "frontend/components";

const UploadVideoCard = ({ item }) => {
  const { datadispatch } = useData();

  return (
    <div className="video__card">
      <Link to={`/videos/${item._id}`}>
        <div className="video__img">
          <img
            src={`https://i.ytimg.com/vi/${item._id}/maxresdefault.jpg`}
            alt="thumbnail_img"
          />
        </div>
      </Link>
      <div className="video__info">
        <Link to={`/videos/${item._id}`}>
          <h5>
            {item.title.length < 25
              ? item.title
              : item.title.substring(0, 25) + "..."}
          </h5>
          <p>category - {item.category}</p>
        </Link>
        <div className="info__one">
          <Tippy
            content="Remove video"
            theme="light"
            followCursor={true}
            plugins={[followCursor]}
          >
            <i
              className="fa-solid fa-trash-can"
              onClick={() => {
                datadispatch({
                  type: "REMOVE_VIDEO",
                  payload: { removeVideoId: item._id },
                });
                Notify("Video removed", "info");
              }}
            ></i>
          </Tippy>
        </div>
      </div>
    </div>
  );
};

export default UploadVideoCard;
