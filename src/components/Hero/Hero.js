// src/components/Hero.js
import React from "react";
import SongRow from "../SongRow/SongRow";
import "./Hero.css";

export default function Hero({ player, songs = [] }) {
  const heroSongs = songs.slice(0, 4);

  return (
    <div className="hero">
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

      <div className="hero-songs">
        {heroSongs.map((s, i) => (
          <SongRow
            key={`${s.id || "song"}-${i}`}
            index={i + 1}
            song={s}
            active={player.track?.id === s.id}
            onClick={() => player.playTrack(s)}
          />
        ))}
      </div>
    </div>
  );
}
