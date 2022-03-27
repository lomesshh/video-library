import React, { useState } from "react";
import Iframe from "react-iframe-click";
import { useParams } from "react-router-dom";
import { useData } from "../../context/datacontext";
import Tippy from "@tippyjs/react";
import { followCursor } from "tippy.js";
import "tippy.js/themes/light.css";
import "tippy.js/dist/tippy.css";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { useLike } from "../../context/likecontext";
import { usePlaylist } from "../../context/playlistcontext";
import { useHistory } from "../../context/historycontext";
import { useWatchLater } from "../../context/watchlatercontext";

const SingleVideo = () => {
  const { allVideos } = useData();
  const { videoId } = useParams();
  const { likestate, addToLikes } = useLike();
  const { playliststate, addPlaylist, addVideoToPlaylist } = usePlaylist();
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const { watchlaterstate, addToWatchLater } = useWatchLater();
  const { addToHistory } = useHistory();

  const findItem = allVideos.find((item) => item._id === videoId);
  const findItemInLike = likestate.likes.find((prod) => prod._id === videoId);
  const findItemInWatchlater = watchlaterstate.watchLater.find(
    (prod) => prod._id === videoId
  );

  return (
    <div className="singlevideo__main">
      <div className="singlevideo__display">
        <div className="singlevideo__iframe">
          <Iframe
            frameBorder="0"
            src={`https://www.youtube.com/embed/${findItem._id}`}
            onInferredClick={() => addToHistory(findItem)}
          ></Iframe>
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
          <div className="playlist__main">
            <Tippy
              content="Playlist"
              theme="light"
              followCursor={true}
              plugins={[followCursor]}
            >
              <i
                class="fa-solid fa-folder-plus"
                onClick={() => setVisible(!visible)}
              ></i>
            </Tippy>

            {visible && (
              <div className="playlist__view">
                {playliststate.playlist.map((item) => {
                  const findPlaylist = playliststate.playlist.find(
                    (play) => play._id === item._id
                  );
                  const findVideo = findPlaylist.videos?.find(
                    (prod) => prod._id === findItem._id
                  );
                  return (
                    <p onClick={() => addVideoToPlaylist(findItem, item)}>
                      {findVideo ? (
                        <i class="fa-solid fa-check"></i>
                      ) : (
                        <i class="fa-solid fa-plus"></i>
                      )}
                      {item.title}
                    </p>
                  );
                })}

                <p
                  className="empty__playlist"
                  onClick={() => {
                    setTitle("");
                    setOpen(!open);
                  }}
                >
                  <i class="fa-solid fa-circle-plus"></i>
                  Add playlist
                </p>
              </div>
            )}
            {/*<i class="fa-solid fa-check"></i>*/}
          </div>
          <Tippy
            content={`${
              findItemInWatchlater ? `Remove from watch later` : `Watch later`
            }`}
            theme="light"
            followCursor={true}
            plugins={[followCursor]}
          >
            <i
              class={`fa-solid fa-floppy-disk ${
                findItemInWatchlater ? `liked__video` : ``
              }`}
              onClick={() => addToWatchLater(findItem)}
            ></i>
          </Tippy>
        </div>
        <Modal open={open} onClose={() => setOpen(!open)} center>
          <p>Add Playlist</p>
          <input
            className="modal__input"
            type="text"
            placeholder=" enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="modal__button"
            onClick={() => {
              addPlaylist(title);
              setOpen(!open);
            }}
          >
            Add
          </button>
        </Modal>
      </div>
    </div>
  );
};

export default SingleVideo;
