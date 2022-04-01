import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

//library imports
import Iframe from "react-iframe-click";
import Tippy from "@tippyjs/react";
import { followCursor } from "tippy.js";
import "tippy.js/themes/light.css";
import "tippy.js/dist/tippy.css";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

import {
  useHistory,
  useLike,
  usePlaylist,
  useWatchLater,
  useData,
} from "frontend/context";

const SingleVideo = () => {
  const { allVideos } = useData();
  const { videoId } = useParams();
  const { likestate, addToLikes } = useLike();
  const { playliststate, addPlaylist, addVideoToPlaylist } = usePlaylist();
  const { watchlaterstate, addToWatchLater } = useWatchLater();
  const { addToHistory } = useHistory();

  const [visibleModal, setVisibleModal] = useState(false);
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);

  const findItem = allVideos.find((item) => item._id === videoId);
  const findItemInLike = likestate.likes.find((prod) => prod._id === videoId);
  const findItemInWatchlater = watchlaterstate.watchLater.find(
    (prod) => prod._id === videoId
  );

  useEffect(() => {
    scrollToTop();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  return (
    <div>
      {findItem && (
        <div className="singlevideo__main">
          <div className="singlevideo__display">
            <div className="singlevideo__iframe">
              <Iframe
                frameBorder="0"
                src={`https://www.youtube.com/embed/${findItem._id}`}
                onInferredClick={() => addToHistory(findItem)}
              ></Iframe>
            </div>
            <div className="singlevideo__info-main">
              <div className="singlevideo__info-first">
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
                      className={`fa-solid fa-thumbs-up ${
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
                        className="fa-solid fa-folder-plus"
                        onClick={() => setVisibleModal(!visibleModal)}
                      ></i>
                    </Tippy>

                    {visibleModal && (
                      <div className="playlist__view">
                        {playliststate.playlist.map((item) => {
                          const findPlaylist = playliststate.playlist.find(
                            (play) => play._id === item._id
                          );
                          const findVideo = findPlaylist.videos?.find(
                            (prod) => prod._id === findItem._id
                          );
                          return (
                            <p
                              onClick={() => addVideoToPlaylist(findItem, item)}
                            >
                              {findVideo ? (
                                <i className="fa-solid fa-check"></i>
                              ) : (
                                <i className="fa-solid fa-plus"></i>
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
                          <i className="fa-solid fa-circle-plus"></i>
                          Add playlist
                        </p>
                      </div>
                    )}
                    {/*<i className="fa-solid fa-check"></i>*/}
                  </div>
                  <Tippy
                    content={`${
                      findItemInWatchlater
                        ? `Remove from watch later`
                        : `Watch later`
                    }`}
                    theme="light"
                    followCursor={true}
                    plugins={[followCursor]}
                  >
                    <i
                      className={`fa-solid fa-floppy-disk ${
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
              <div className="related__video-main">
                <h2>Suggested Videos</h2>
                {allVideos
                  .filter((product) => product.title !== findItem.title)
                  .filter((product) => product.category === findItem.category)
                  .map((item) => (
                    <Link to={`/videos/${item._id}`}>
                      <img
                        onClick={() => {
                          scrollToTop();
                          setAllComment([]);
                        }}
                        src={`https://i.ytimg.com/vi/${item._id}/maxresdefault.jpg`}
                      />
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export { SingleVideo };
