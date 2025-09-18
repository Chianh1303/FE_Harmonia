// src/components/NewReleases.js
import { useEffect, useState } from "react";
import axios from "axios";
import { FaPlay } from "react-icons/fa";
import Section from "../Section/Section";

export default function NewReleases({ player }) {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/homeWorkSpace") // gọi API backend
      .then((res) => {
        setSongs(res.data); // backend trả về List<SongDTO>
      })
      .catch((err) => {
        console.error("Lỗi khi fetch songs:", err);
      });
  }, []);

  return (
    <Section
      title="🎵 Mới phát hành"
      right={<a className="see-all">Xem tất cả</a>}
    >
      <div className="grid">
        {songs.slice(0, 5).map((s, index) => (
          <div key={s.songId || index} className="release-card">
            <img src={s.cover} alt={s.title} className="release-img" />
            <div className="release-content">
              <div>{s.title}</div>
              <div className="artist">{s.artistName}</div>
            </div>
            <button
              onClick={() => {
                player.setTrack(s);      // truyền bài hát vào player
                player.setIsPlaying(true); // bật nhạc
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
