import React, { useState } from "react";
import { Notify } from "../../components/Toast";
import "../../stylesheets/SingleVideo.css";
import { useData } from "frontend/context";

const CommentList = ({ item, allComment, videoId }) => {
  const [reply, setReply] = useState("");
  const [replyFlag, setReplyFlag] = useState(false);
  const [viewReply, setViewReply] = useState(false);
  const { datadispatch } = useData();

  const postReply = () => {
    const findItem = allComment.find((prod) => prod.id === item.id);
    datadispatch({
      type: "ADD_REPLY",
      payload: { videoID: videoId, commentId: findItem.id, reply: reply },
    });
    setReply("");
    setReplyFlag(false);
  };

  return (
    <div className="mainComment">
      <h4>
        <p className="comment__title">{item.comment}</p>
        <i
          onClick={() => {
            setViewReply(true);
            setReplyFlag(!replyFlag);
          }}
          className="fa-solid fa-reply"
        ></i>
      </h4>
      {item.replies?.length > 0 && !viewReply && (
        <span onClick={() => setViewReply(true)}>View replies</span>
      )}
      {item.replies?.length > 0 && viewReply && (
        <span onClick={() => setViewReply(false)}>Hide replies</span>
      )}
      {replyFlag && (
        <div className="inputComment">
          <input
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            type="text"
            placeholder="Write your reply here..."
            required
          />
          <button
            onClick={() => {
              if (reply === "") {
                Notify("Please enter reply first", "warning");
              } else {
                postReply(item, allComment, videoId);
                Notify("Reply added", "success");
              }
            }}
          >
            Post
          </button>
        </div>
      )}
      {viewReply && (
        <div className="reply__secrion">
          {item.replies.map((reply, index) => (
            <p className="childComment" key={index + 1}>
              {reply}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export { CommentList };
