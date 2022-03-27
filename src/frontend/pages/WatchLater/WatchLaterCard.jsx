import React from "react";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import { followCursor } from "tippy.js";
import "tippy.js/themes/light.css";
import "tippy.js/dist/tippy.css";
import { useWatchLater } from "../../context/watchlatercontext";

const WatchLaterCard = ({ item }) => {
  const { addToWatchLater } = useWatchLater();

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
            content="Remove from watch later"
            theme="light"
            followCursor={true}
            plugins={[followCursor]}
          >
            <i
              className="fa-solid fa-trash-can"
              onClick={() => addToWatchLater(item)}
            ></i>
          </Tippy>
        </div>
      </div>
    </div>
  );
};

export default WatchLaterCard;
