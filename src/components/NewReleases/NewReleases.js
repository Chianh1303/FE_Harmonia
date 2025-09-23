// src/components/NewReleases.js
import { FaPlay } from "react-icons/fa";
import Section from "../Section/Section";

export default function NewReleases({ songs = [], player }) {
  const handlePlay = (s) => {
    if (player.playTrack) {
      player.playTrack(s);
    } else {
      player.setTrack(s);      // truyền bài hát vào player
      player.setIsPlaying(true); // bật nhạc
      setTimeout(() => player.toggle(), 0);
    }
  };

  return (
    <Section
      title="🎵 Mới phát hành"
      right={<a className="see-all">Xem tất cả</a>}
    >
      <div className="grid">
        {songs.slice(0, 5).map((s, index) => (
          <div
            key={s.id || index}
            className="release-card"
            onClick={() => handlePlay(s)} // gắn onClick cho cả card
            style={{ cursor: "pointer" }} // để hiện con trỏ bàn tay
          >
            <img 
              src={s.cover} 
              alt={s.title} 
              className="release-img"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop';
              }}
            />
            <div className="release-content">
              <div>{s.title}</div>
              <div className="artist">{s.artist}</div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation(); // ngăn click vào button bị lặp lại onClick của card
                handlePlay(s);
              }}
              className="release-btn"
            >
              <FaPlay />
            </button>
          </div>
        ))}
      </div>
    </Section>
  );
}
