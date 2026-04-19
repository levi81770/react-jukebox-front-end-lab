import React, { useState } from "react";

const TrackForm = ({ 
  selected, 
  handleAddTrack, 
  handleUpdateTrack 
}) => {
  const initialState = {
    title: "",
    artist: "",
  };
  const [formData, setFormData] = useState(
    selected ? selected : initialState
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selected) {
      handleUpdateTrack(formData, selected._id);
    } else {
      handleAddTrack(formData);
    }
  }

  return (
    <div>
      <h2>
        {selected ? "Edit Track" : "Add a New Track"}
      </h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <label htmlFor="artist">Artist</label>
        <input
          type="text"
          id="artist"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
          required
        />
        <button type="submit">
          {selected ? "Update Track" : "Add Track"}
        </button>
      </form>
    </div>
  );
};

export default TrackForm;
