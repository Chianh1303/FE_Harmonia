// src/components/Hero.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import SongRow from "../SongRow/SongRow";

export default function Hero({ player }) {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/homeWorkSpace")
      .then((res) => {
        // Lấy 5 bài đầu tiên để hiển thị chart
        setSongs(res.data.slice(0, 5));
      })
      .catch((err) => {
        console.error("Lỗi khi fetch chart:", err);
      });
  }, []);

  return (
    <div className="hero">
      {/* Banner */}
      <div className="hero-banner">
        <div className="hero-banner-inner">
          <img
            src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop"
            alt="Top Trending Music"
            className="hero-img"
          />
          <div className="hero-overlay"></div>
          <div className="hero-text">
            <h2 className="hero-title">Top Trending Music</h2>
            <p>Khám phá những bản hit hot nhất hôm nay</p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="hero-chart">
        <h3>🔥 BXH hôm nay</h3>
        <div className="chart-box">
          {songs.map((s, i) => (
            <SongRow
              key={s.id}
              index={i + 1}
              song={s}
              active={player.track?.id === s.id}
              onClick={() => {
                player.setTrack(s);
                player.setIsPlaying(true);
                setTimeout(() => player.toggle(), 0);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
