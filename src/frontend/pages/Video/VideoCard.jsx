import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth, useLike, useWatchLater } from "frontend/context";

// library imports
import Tippy from "@tippyjs/react";
import { followCursor } from "tippy.js";
import "tippy.js/themes/light.css";
import "tippy.js/dist/tippy.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const VideoCard = ({ item }) => {
  const { addToLikes, likestate } = useLike();
  const { addToWatchLater, watchlaterstate } = useWatchLater();
  const navigate = useNavigate();
  const { token } = useAuth();

  const findItemInLike = likestate.likes.find((prod) => prod._id === item._id);
  const findItemInWatchLater = watchlaterstate.watchLater.find(
    (prod) => prod._id === item._id
  );

  return (
    <div className="video__card">
      <Link to={`${token ? `/videos/${item._id}` : `/login`}`}>
        <div className="video__img">
          <LazyLoadImage
            src={`https://i.ytimg.com/vi/${item._id}/maxresdefault.jpg`}
            alt="thumbnail_img"
            effect="blur"
          />
        </div>
      </Link>
      <div className="video__info">
        <Link to={`${token ? `/videos/${item._id}` : `/login`}`}>
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
              className={`fa-solid fa-thumbs-up ${
                findItemInLike ? `liked__video` : ``
              } `}
              onClick={() => (token ? addToLikes(item) : navigate("/login"))}
            ></i>
          </Tippy>
          <Tippy
            content={`${
              findItemInWatchLater ? `Remove from watch later` : `Watch later`
            }`}
            theme="light"
            followCursor={true}
            plugins={[followCursor]}
          >
            <i
              className={`fa-solid fa-floppy-disk ${
                findItemInWatchLater ? `liked__video` : ``
              }`}
              onClick={() =>
                token ? addToWatchLater(item) : navigate("/login")
              }
            ></i>
          </Tippy>
        </div>
      </div>
    </div>
  );
};

export { VideoCard };
