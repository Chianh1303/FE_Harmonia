// src/components/NewReleases.js
import { useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { MOCK_SONGS } from "../data/mockData";
import Section from "./Section";

export default function NewReleases({ player }) {
  const [songs, setSongs] = useState(MOCK_SONGS);

  // Uncomment khi có API thật
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/api/homeWorkSpace")
  //     .then((res) => {
  //       setSongs(res.data);
  //     })
  //     .catch((err) => {
  //       console.error("Lỗi khi fetch songs:", err);
  //     });
  // }, []);

  return (
    <Section
      title="🎵 Mới phát hành"
      right={<a className="see-all">Xem tất cả</a>}
    >
      <div className="grid">
        {songs.slice(0, 5).map((s) => (
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
              <FaPlay />
            </button>
          </div>
        ))}
      </div>
    </Section>
  );
}
