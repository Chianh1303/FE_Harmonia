import { FaPlay } from "react-icons/fa";

export default function PlaylistCard({ item, onPlay }) {
  return (
    <div className="playlist-card">
      <img src={item.cover} alt={item.name} className="playlist-img" />
      <div className="playlist-content">
        <div>{item.name}</div>
        <div className="description">{item.songs?.length || 0} bài hát</div>
      </div>
      <button onClick={onPlay} className="playlist-btn">
        <FaPlay />
      </button>
    </div>
  );
}
