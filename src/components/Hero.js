// src/components/Hero.js
import React from "react";
import SongRow from "./SongRow";

export default function Hero({ songs, player }) {
  return (
    <div className="hero">
      {/* Banner */}
      <div className="hero-banner">
        <img
          src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop"
          className="hero-img"
          alt=""
        />
        <div className="hero-overlay" />
        <div className="hero-text">
          <div>Playlist Editor</div>
          <div className="hero-title">Chill Night • Lofi • R&B</div>
        </div>
      </div>

      {/* Chart */}
      <div className="hero-chart">
        <div className="chart-title">BXH hôm nay</div>
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
  );
}
