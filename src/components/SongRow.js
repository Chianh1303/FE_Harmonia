import Icon from "./Icon";

function SongRow({ index, song, active, onClick }) {
  if (!song) return null; // tránh crash khi chưa có dữ liệu

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
        <div className="artist">{song.artist}</div>
      </div>

      {/* Duration */}
      <div className="song-duration">
        {Math.floor(song.duration / 60)}:
        {String(Math.floor(song.duration % 60)).padStart(2, "0")}
      </div>

      {/* Heart */}
      <div className="song-heart">
        <Icon name="heart" className="icon" />
      </div>
    </button>
  );
}

export default SongRow;
