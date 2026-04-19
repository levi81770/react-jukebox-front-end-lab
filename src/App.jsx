import { useState, useEffect } from "react";
import "./App.css";

import * as trackService from "./services/trackService";

import TrackList from "./components/TrackList/TrackList";
import TrackForm from "./components/TrackForm/TrackForm";
import NowPlaying from "./components/NowPlaying/NowPlaying";

const App = () => {
  const [tracks, setTracks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [playing, setPlaying] = useState(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const fetchedTracks = await trackService.index();

        if (fetchedTracks.err) {
          throw new Error(fetchedTracks.err);
        }
        setSelected(null);
        setTracks(fetchedTracks);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTracks();
  }, []);

  const handleSelect = (track) => {
    setSelected(track);
  };

  const handleFormView = (track) => {
    setSelected(track || null);
    setIsFormOpen(!isFormOpen);
  };

  const handlePlay = (track) => {
    setPlaying(track);
  };

  const handleAddTrack = async (formData) => {
    try {
      const newTrack = await trackService.create(formData);

      if (newTrack.err) {
        throw new Error(newTrack.err);
      }

      setTracks([...tracks, newTrack]);
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateTrack = async (formData, trackId) => {
    try {
      const updatedTrack = await trackService.update(formData, trackId);

      if (updatedTrack.err) {
        throw new Error(updatedTrack.err);
      }

      const updatedTracks = tracks.map((track) =>
        track._id !== updatedTrack._id ? track : updatedTrack,
      );
      setTracks(updatedTracks);
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteTrack = async (trackId) => {
    try {
      const deletedTrack = await trackService.deleteTrack(trackId);

      if (deletedTrack.err) {
        throw new Error(deletedTrack.err);
      }

      const updatedTracks = tracks.filter((track) => track._id !== trackId);
      
      if (playing && playing._id === trackId) {
        setPlaying(null);
      }

      setTracks(updatedTracks);
      setSelected(null);
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <TrackList
        tracks={tracks}
        handleSelect={handleSelect}
        handlePlay={handlePlay}
        handleFormView={handleFormView}
        handleDeleteTrack={handleDeleteTrack}
        isFormOpen={isFormOpen}
      />
      {isFormOpen && (
        <TrackForm
          key={selected?._id || "new"}
          selected={selected}
          handleAddTrack={handleAddTrack}
          handleUpdateTrack={handleUpdateTrack}
        />
      )}
      {playing && <NowPlaying track={playing} setPlaying={setPlaying} />}
    </>
  );
};

export default App;
