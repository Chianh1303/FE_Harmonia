// src/components/NewReleases.js
import { useEffect, useState } from "react";
import axios from "axios";
import Icon from "./Icon";

export default function NewReleases({ player }) {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/homeWorkSpace") // 👈 gọi API backend
      .then((res) => {
        setSongs(res.data); // backend trả về List<SongDTO>
      })
      .catch((err) => {
        console.error("Lỗi khi fetch songs:", err);
      });
  }, []);

  return (
    <div className="new-releases">
      <h2 className="section-title">Mới phát hành</h2>
      <div className="grid">
        {songs.map((s) => (
          <div key={s.id} className="release-card">
            <img src={s.cover} alt={s.title} className="release-img" />
            <div className="release-content">
              <div>{s.title}</div>
              <div className="artist">{s.artist}</div>
            </div>
            <button
              onClick={() => {
                player.setTrack(s);
                player.setIsPlaying(true);
                setTimeout(() => player.toggle(), 0);
              }}
              className="release-btn"
            >
              <Icon name="play" className="icon" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
