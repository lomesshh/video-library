import React from "react";
import { useLike } from "../../context/likecontext";
import LikeCard from "./LikeCard";
import Loader from "./../../components/Loader";

const LikedVideo = () => {
  const { likestate } = useLike();
  return (
    <div className="video__grid">
      <div className="video__search">
        <h3>Likes Videos ( {likestate.likes.length} Videos )</h3>
      </div>
      {likestate.loading && <Loader />}
      {likestate.likes.length < 1 && !likestate.loading && (
        <h3 className="empty__list">You haven't liked any video yet !</h3>
      )}
      <div className="video__list">
        {likestate.likes.map((item) => (
          <LikeCard item={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default LikedVideo;
