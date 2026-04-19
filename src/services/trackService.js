const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tracks`;

export const index = async () => {
  try {
    const res = await fetch(BASE_URL);
    return res.json();
  } catch (err) {
    return { err: "Failed to fetch tracks" };
  }
};

export const create = async (formData) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return res.json();
  } catch (err) {
    console.log(err);
    return { err: "Failed to create track" };
  }
};

export const update = async (formData, trackId) => {
  try {
    const res = await fetch(`${BASE_URL}/${trackId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return res.json();
  } catch (err) {
    console.log(err);
    return { err: "Failed to update track" };
  }
};

export const deleteTrack = async (trackId) => {
  try {
    const res = await fetch(`${BASE_URL}/${trackId}`, {
      method: "DELETE",
    });
    return res.json();
  } catch (err) {
    console.log(err);
    return { err: "Failed to delete track" };
  }
};

export default { index, create, update, deleteTrack };
