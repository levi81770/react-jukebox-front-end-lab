import React from 'react'

const NowPlaying = ({ track, setPlaying, tracks }) => {
  return (
    <div>
      {}
      <button onClick={() => setPlaying(null)}>✕</button>
      <h2>Now Playing</h2>
      <p>Title: {track.title}</p>
      <p>Artist: {track.artist}</p>
    </div>
  )
}

export default NowPlaying