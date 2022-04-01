import React from "react";
import { useParams } from "react-router-dom";
import { usePlaylist } from "frontend/context";
import { PlaylistCard } from "frontend/pages";

const SinglePlaylist = () => {
  const { playliststate } = usePlaylist();
  const { playlistId } = useParams();

  const findPlaylist = playliststate.playlist.find(
    (item) => item._id === playlistId
  );

  return (
    <div className="video__grid">
      <div className="video__search">
        <h3>Videos in playlist ( {findPlaylist.videos.length} Videos )</h3>
      </div>
      {findPlaylist.videos?.length < 1 && (
        <h3 className="empty__list">No videos found in this playlist !</h3>
      )}
      <div className="video__list">
        {findPlaylist.videos?.map((item) => (
          <PlaylistCard playlist={findPlaylist} item={item} key={item._id} />
        ))}
      </div>
    </div>
  );
};

export { SinglePlaylist };
