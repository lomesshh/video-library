import React from "react";
import { useParams } from "react-router-dom";
import { useData } from "../../context/datacontext";
import Tippy from "@tippyjs/react";
import { followCursor } from "tippy.js";
import "tippy.js/themes/light.css";
import "tippy.js/dist/tippy.css";
import { useLike } from "../../context/likecontext";

const SingleVideo = () => {
  const { allVideos } = useData();
  const { videoId } = useParams();
  const { likestate, addToLikes } = useLike();

  const findItem = allVideos.find((item) => item._id === videoId);
  const findItemInLike = likestate.likes.find((prod) => prod._id === videoId);

  return (
    <div className="singlevideo__main">
      <div className="singlevideo__display">
        <div className="singlevideo__iframe">
          <iframe
            frameborder="0"
            src={`https://www.youtube.com/embed/${findItem._id}`}
          ></iframe>
        </div>
        <div className="singlevideo__info">
          <h3>{findItem.title}</h3>
          <h5>Category : {findItem.category}</h5>
          <h5>Description : </h5>
          <h5>{findItem.description}</h5>
        </div>
        <div className="singlevideo__action">
          <Tippy
            content={`${findItemInLike ? `Unlike` : `Like`}`}
            theme="light"
            followCursor={true}
            plugins={[followCursor]}
          >
            <i
              class={`fa-solid fa-thumbs-up ${
                findItemInLike ? `liked__video` : ``
              }`}
              onClick={() => addToLikes(findItem)}
            ></i>
          </Tippy>
          <Tippy
            content="Playlist"
            theme="light"
            followCursor={true}
            plugins={[followCursor]}
          >
            <i class="fa-solid fa-folder-plus"></i>
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

export default SingleVideo;
