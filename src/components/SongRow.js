export default function SongRow({ song, onPlay }) {
  return (
    <div className="song-row">
      <img src={song.cover} alt="" className="song-img" />
      <div className="song-info">
        <div>{song.title}</div>
        <div className="artist">{song.artist}</div>
      </div>
      <button onClick={onPlay}>▶</button>
    </div>
  );
}
