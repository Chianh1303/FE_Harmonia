import { FaPlay } from "react-icons/fa";

export default function PlaylistCard({ item, onPlay }) {
  return (
    <div className="playlist-card">
      {/* Cover */}
      <div className="playlist-cover">
        <img src={item.cover} alt={item.name} className="playlist-img" />

        {/* Nút play nổi khi hover */}
        <button onClick={onPlay} className="playlist-btn">
          <FaPlay />
        </button>
      </div>

      {/* Info */}
      <div className="playlist-info">
        <div className="playlist-title">{item.name}</div>
        <div className="playlist-desc">
          {item.songs?.length || 0} bài hát
        </div>
      </div>
    </div>
  );
}
