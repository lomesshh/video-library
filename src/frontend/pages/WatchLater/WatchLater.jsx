import React from "react";
import { useWatchLater } from "../../context/watchlatercontext";
import Loader from "./../../components/Loader";
import WatchLaterCard from "./WatchLaterCard";
const WatchLater = () => {
  const { watchlaterstate, clearAllWatchLater } = useWatchLater();

  return (
    <div className="video__grid">
      <div className="video__search watched__video">
        <h3>Saved Videos ( {watchlaterstate.watchLater.length} Videos )</h3>
        <button onClick={clearAllWatchLater}>Clear All</button>
      </div>
      {watchlaterstate.loading && <Loader />}
      {watchlaterstate.watchLater < 1 && !watchlaterstate.loading && (
        <h3 className="empty__list">You haven't saved any video yet !</h3>
      )}
      <div className="video__list">
        {watchlaterstate.watchLater.map((item) => (
          <WatchLaterCard item={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default WatchLater;
