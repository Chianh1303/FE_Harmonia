import { FaHeart } from "react-icons/fa";

function SongRow({ index, song, active, player }) {
  if (!song) return null;

  const handleClick = () => {
    const fullSong = {
      ...song,
      file: `http://localhost:8080${song.file}`,   // ghép base URL backend
      cover: `http://localhost:8080${song.cover}`, // đảm bảo cover cũng đầy đủ URL
    };
    player.playTrack(fullSong);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`song-row ${active ? "active" : ""}`}
    >
      <img
        src={`http://localhost:8080${song.cover}`}
        alt={song.title}
        className="song-cover"
      />

      <div className="song-info">
        <div className="title">{song.title}</div>
        <div className="artist">{song.artist || "Unknown Artist"}</div>
      </div>

      <div className="song-duration">
        {String(Math.floor(song.duration / 60)).padStart(2, "0")}:
        {String(Math.floor(song.duration % 60)).padStart(2, "0")}
      </div>


      <div className="song-heart">
        <FaHeart />
      </div>
    </button>
  );
}

export default SongRow;
