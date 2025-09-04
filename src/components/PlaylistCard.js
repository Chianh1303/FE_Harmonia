import Icon from "./Icon";

export default function PlaylistCard({ item, onPlay }) {
  return (
    <div className="playlist-card">
      <img src={item.cover} alt={item.name} className="playlist-img" />
      <div className="playlist-info">
        <div className="playlist-name">{item.name}</div>
        <button onClick={onPlay} className="playlist-btn">
          <Icon name="play" className="icon" />
        </button>
      </div>
    </div>
  );
}
