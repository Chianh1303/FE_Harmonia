import React from "react";
import "./ExplorePage.css";

export default function ExplorePage({ songs, player }) {
  const trendingSongs = songs.slice(0, 6);
  const newSongs = songs.slice(6, 12);

  return (
    <div className="explore-page">
      {/* Banner */}
      <section className="explore-hero">
        <div className="explore-overlay">
          <h1>Khám Phá Âm Nhạc</h1>
          <p>Thưởng thức những giai điệu thịnh hành và playlist mới nhất</p>
          <button className="explore-btn">🎧 Nghe Ngay</button>
        </div>
      </section>

      {/* Xu hướng */}
      <section className="explore-section">
        <h2>🔥 Xu Hướng Hiện Nay</h2>
        <div className="song-grid">
          {trendingSongs.map((song) => (
            <div
              key={song.id}
              className="song-card"
              onClick={() => player.play(song)}
            >
              <img src={song.cover} alt={song.title} />
              <div className="song-info">
                <h3>{song.title}</h3>
                <p>{song.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mới phát hành */}
      <section className="explore-section">
        <h2>🎵 Mới Phát Hành</h2>
        <div className="song-grid">
          {newSongs.map((song) => (
            <div
              key={song.id}
              className="song-card"
              onClick={() => player.play(song)}
            >
              <img src={song.cover} alt={song.title} />
              <div className="song-info">
                <h3>{song.title}</h3>
                <p>{song.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
