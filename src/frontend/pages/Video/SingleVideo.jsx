import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useHistory,
  useLike,
  usePlaylist,
  useWatchLater,
  useData,
} from "frontend/context";
import { CommentList } from "./CommentList";
import { Notify } from "frontend/components";

//library imports
import Iframe from "react-iframe-click";
import Tippy from "@tippyjs/react";
import { followCursor } from "tippy.js";
import "tippy.js/themes/light.css";
import "tippy.js/dist/tippy.css";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { v4 as uuid } from "uuid";

const SingleVideo = () => {
  const { datastate, datadispatch } = useData();
  const { videoId } = useParams();
  const { likestate, addToLikes } = useLike();
  const { playliststate, addPlaylist, addVideoToPlaylist } = usePlaylist();
  const { watchlaterstate, addToWatchLater } = useWatchLater();
  const { addToHistory } = useHistory();

  const [visibleModal, setVisibleModal] = useState(false);
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [viewComment, setViewComment] = useState(false);

  const findItem = datastate.allVideos.find((item) => item._id === videoId);
  const findItemInLike = likestate.likes.find((prod) => prod._id === videoId);
  const findItemInWatchlater = watchlaterstate.watchLater.find(
    (prod) => prod._id === videoId
  );

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const postComment = () => {
    setViewComment(true);
    setComment("");
    let commentObj = {
      id: uuid(),
      comment: comment,
      replies: [],
    };
    datadispatch({
      type: "ADD_COMMENT",
      payload: {
        videoId: findItem._id,
        commentObj: commentObj,
      },
    });
  };

  return (
    <div>
      {findItem && (
        <div className="singlevideo__main">
          <div className="singlevideo__display">
            {/* Iframe display */}

            <div className="singlevideo__iframe">
              <Iframe
                frameBorder="0"
                src={`https://www.youtube.com/embed/${findItem._id}`}
                onInferredClick={() => addToHistory(findItem)}
              ></Iframe>
            </div>

            <div className="singlevideo__info-main">
              <div className="singlevideo__info-first">
                {/* Video Info display */}

                <div className="singlevideo__info">
                  <h3>{findItem.title}</h3>
                  <h5>Category : {findItem.category}</h5>
                  <h5>Description : </h5>
                  <h5>{findItem.description}</h5>
                </div>

                {/* Video action like, watchlater, playlist.. */}

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
                        {playliststate.playlist.map((item, index) => {
                          const findPlaylist = playliststate.playlist.find(
                            (play) => play._id === item._id
                          );
                          const findVideo = findPlaylist.videos?.find(
                            (prod) => prod._id === findItem._id
                          );
                          return (
                            <p
                              onClick={() => addVideoToPlaylist(findItem, item)}
                              key={index + 1}
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

                {/* Add playlist modal */}

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

                {/* Comment section */}

                <div className="inputComment">
                  <h3>
                    Comment section ( {findItem.comments.length} Comments )
                    {viewComment && (
                      <i
                        className="fa-solid fa-circle-chevron-up"
                        onClick={() => setViewComment(false)}
                      ></i>
                    )}
                    {!viewComment && (
                      <i
                        className="fa-solid fa-circle-chevron-down"
                        onClick={() => setViewComment(true)}
                      ></i>
                    )}
                  </h3>
                  <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    type="text"
                    placeholder="Write your comment here..."
                  />
                  <button
                    onClick={() => {
                      if (comment === "") {
                        Notify("Please write comment first", "warning");
                      } else {
                        postComment();
                        Notify("Comment added", "success");
                      }
                    }}
                  >
                    Post
                  </button>
                </div>

                {/* Display all comments */}

                {viewComment && findItem.comments.length < 1 && (
                  <h5>No comments yet !</h5>
                )}
                {viewComment && (
                  <div className="commentSection">
                    {findItem.comments.map((item) => (
                      <CommentList
                        item={item}
                        key={item.id}
                        allComment={findItem.comments}
                        videoId={findItem._id}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Suggested video section */}

              <div className="related__video-main">
                <h2>Suggested Videos</h2>
                {datastate.allVideos
                  .filter((product) => product.title !== findItem.title)
                  .filter((product) => product.category === findItem.category)
                  .map((item) => (
                    <Link to={`/videos/${item._id}`}>
                      <img
                        key={item._id}
                        onClick={() => {
                          scrollToTop();
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
