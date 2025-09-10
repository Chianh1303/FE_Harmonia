import { FaHeart } from "react-icons/fa";

function SongRow({ index, song, active, onClick }) {
  if (!song) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`song-row ${active ? "active" : ""}`}
    >
      {/* Rank */}
      <div className="song-rank">{index}</div>

      {/* Cover */}
      <img src={song.cover} alt={song.title} className="song-cover" />

      {/* Info */}
      <div className="song-info">
        <div className="title">{song.title}</div>
        <div className="artist">{song.artist || "Unknown Artist"}</div>
      </div>

      {/* Duration */}
      <div className="song-duration">
        {Math.floor(song.duration / 60)}:
        {String(Math.floor(song.duration % 60)).padStart(2, "0")}
      </div>

      {/* Heart */}
      <div className="song-heart">
        <FaHeart />
      </div>
    </button>
  );
}

export default SongRow;
