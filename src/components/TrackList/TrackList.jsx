import React from "react";

const TrackList = ({ tracks, isFormOpen, handleSelect, handleFormView, handleDeleteTrack, handlePlay }) => {
  return (
    <div>
      <h1>Track List</h1>
      <button onClick={() => handleFormView(null)}>
        {isFormOpen ? "Close Form" : "New Track"}
      </button>
      <div>
        {!tracks.length ? (
          <p>No tracks available</p>
        ) : (
          tracks.map((track) => (
            <div key={track.id}>
              <p>
                {track.title} by{" "}
                <span style={{ color: "red" }}>{track.artist}</span>
              </p>
              <div>
                <button onClick={() => handlePlay(track)}>Play</button>
                <button onClick={() => handleFormView(track)}>Edit</button>
                <button onClick={() => handleDeleteTrack(track._id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TrackList;
