import React from "react";
import { useHistory } from "../../context/historycontext";
import Loader from "./../../components/Loader";
import HistoryCard from "./HistoryCard";

const LikedVideo = () => {
  const { historystate, clearAllHistory } = useHistory();

  return (
    <div className="video__grid">
      <div className="video__search watched__video">
        <h3>Watched Videos ( {historystate.history.length} Videos )</h3>
        <button onClick={clearAllHistory}>Clear All</button>
      </div>
      {historystate.loading && <Loader />}
      {historystate.history.length < 1 && !historystate.loading && (
        <h3 className="empty__list">You havn't watched any video yet !</h3>
      )}
      <div className="video__list">
        {historystate.history.map((item) => (
          <HistoryCard item={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export default LikedVideo;
