// src/components/NewReleases.js
import { FaPlay } from "react-icons/fa";
import Section from "../Section/Section";

export default function NewReleases({ songs = [], player }) {
  return (
    <Section
      title="🎵 Mới phát hành"
      right={<a className="see-all">Xem tất cả</a>}
    >
      <div className="grid">
        {songs.slice(0, 5).map((s, index) => (
          <div key={s.id || index} className="release-card">
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
              onClick={() => {
                player.setTrack(s);      // truyền bài hát vào player
                player.setIsPlaying(true); // bật nhạc
                setTimeout(() => player.toggle(), 0);
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
