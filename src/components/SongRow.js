import Icon from "./Icon";

function SongRow({ index, song, active, onClick }) {
  if (!song) return null; // tránh crash khi chưa có dữ liệu

  return (
    <button
      type="button"
      onClick={onClick}
      className={`song-row ${active ? "active" : ""}`}
    >
      <span>{index}</span>
      <img src={song.cover} alt={song.title} className="song-cover" />
      <div className="song-info">
        <div>{song.title}</div>
        <div className="artist">{song.artist}</div>
      </div>
      <div className="song-duration">{Math.round(song.duration)}s</div>
      <div className="song-heart">
        <Icon name="heart" className="icon" />
      </div>
    </button>
  );
}

export default SongRow;
