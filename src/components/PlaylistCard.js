export default function PlaylistCard({ item, onPlay }) {
  return (
    <div className="playlist-card">
      <img src={item.cover} alt="" className="playlist-img" />
      <div className="playlist-info">
        <h3>{item.name}</h3>
        <button onClick={onPlay}>▶</button>
      </div>
    </div>
  );
}
