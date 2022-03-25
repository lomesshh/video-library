import React from "react";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import { followCursor } from "tippy.js";
import "tippy.js/themes/light.css";
import "tippy.js/dist/tippy.css";
import { useHistory } from "../../context/historycontext";

const HistoryCard = ({ item }) => {
  const { removeFromHistory } = useHistory();

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
            content="Remove from history"
            theme="light"
            followCursor={true}
            plugins={[followCursor]}
          >
            <i
              class="fa-solid fa-trash-can"
              onClick={() => removeFromHistory(item)}
            ></i>
          </Tippy>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
