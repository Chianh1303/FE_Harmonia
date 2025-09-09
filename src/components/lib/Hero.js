// src/components/Hero.js
import React from "react";
import SongRow from "./SongRow";

export default function Hero({ songs, player }) {
  return (
   <div className="hero">
      {/* Banner */}
      <div className="hero-banner">
        <img
          src="https://picsum.photos/800/400?random=1"
          alt="Banner"
          className="hero-img"
        />
        <div className="hero-overlay"></div>
        <div className="hero-text">
          <h2 className="hero-title">Top Trending Music</h2>
          <p>Khám phá những bản hit hot nhất hôm nay</p>
        </div>
      </div>

      {/* Chart */}
      <div className="hero-chart">
        <h3 className="chart-heading">BXH hôm nay</h3>
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
