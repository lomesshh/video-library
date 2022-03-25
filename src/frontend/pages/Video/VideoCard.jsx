import React from "react";
import { Link } from "react-router-dom";
import Tippy from "@tippyjs/react";
import { followCursor } from "tippy.js";
import "tippy.js/themes/light.css";
import "tippy.js/dist/tippy.css";
import { useLike } from "../../context/likecontext";

const VideoCard = ({ item }) => {
  const { addToLikes, likestate } = useLike();
  const findItemInLike = likestate.likes.find((prod) => prod._id === item._id);
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
            content={`${findItemInLike ? `Unlike` : `Like`}`}
            theme="light"
            followCursor={true}
            plugins={[followCursor]}
          >
            <i
              class={`fa-solid fa-thumbs-up ${
                findItemInLike ? `liked__video` : ``
              } `}
              onClick={() => addToLikes(item)}
            ></i>
          </Tippy>
          <Tippy
            content="Watch later"
            theme="light"
            followCursor={true}
            plugins={[followCursor]}
          >
            <i class="fa-solid fa-floppy-disk"></i>
          </Tippy>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
