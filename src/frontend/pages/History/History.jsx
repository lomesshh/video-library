import { Loader } from "frontend/components";
import { useHistory } from "frontend/context";
import React from "react";
import { HistoryCard } from "frontend/pages";

const History = () => {
  const { historystate, clearAllHistory } = useHistory();

  return (
    <div className="video__grid">
      <div className="video__search watched__video">
        <h3>Watched Videos ( {historystate.history.length} Videos )</h3>
        <button onClick={clearAllHistory}>Clear All</button>
      </div>
      {historystate.loading && <Loader />}
      {historystate.history.length < 1 && !historystate.loading && (
        <h3 className="empty__list">You haven't watched any video yet !</h3>
      )}
      <div className="video__list">
        {historystate.history.map((item) => (
          <HistoryCard item={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export { History };
