import React from "react";
import { FaPlay, FaFire, FaCompactDisc } from "react-icons/fa"; // Import thêm icons
import "./ExplorePage.css"; // Giữ nguyên file CSS

export default function ExplorePage({ songs = [], player }) {
  // Đảm bảo songs có đủ phần tử trước khi slice
  const trendingSongs = songs.slice(0, 6); // Top 6 bài thịnh hành
  const newSongs = songs.slice(6, 12); // 6 bài mới phát hành

  return (
    <div className="explore-page-container">
      {/* --- Hero Banner --- */}
      <section className="explore-hero-banner">
        <div className="hero-content">
          <h1 className="hero-title">Khám Phá Vũ Trụ Âm Nhạc</h1>
          <p className="hero-subtitle">
            Đắm chìm vào những giai điệu thịnh hành, album mới và playlist độc quyền.
          </p>
          <button className="hero-action-btn">
            <FaPlay className="btn-icon" /> Bắt đầu Nghe Ngay
          </button>
        </div>
      </section>

      {/* --- Section: Xu Hướng Hiện Nay --- */}
      <section className="explore-section">
        <h2 className="section-header">
          <FaFire className="header-icon" /> Xu Hướng Hiện Nay
        </h2>
        <div className="song-cards-grid">
          {trendingSongs.map((song) => (
            <div
              key={song.id || song.title} // Dùng title nếu id không có
              className="song-card-item group" // Thêm group cho hiệu ứng hover
              onClick={() => player.playTrack(song)}
            >
              <div className="card-image-wrapper">
                <img src={song.cover} alt={song.title} className="card-cover-image" />
                <button className="card-play-button group-hover:opacity-100">
                  <FaPlay className="play-icon" />
                </button>
              </div>
              <div className="card-details">
                <h3 className="card-title">{song.title}</h3>
                <p className="card-artist">{song.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Section: Mới Phát Hành --- */}
      <section className="explore-section">
        <h2 className="section-header">
          <FaCompactDisc className="header-icon" /> Mới Phát Hành
        </h2>
        <div className="song-cards-grid">
          {newSongs.map((song) => (
            <div
              key={song.id || song.title} // Dùng title nếu id không có
              className="song-card-item group"
              onClick={() => player.playTrack(song)}
            >
              <div className="card-image-wrapper">
                <img src={song.cover} alt={song.title} className="card-cover-image" />
                <button className="card-play-button group-hover:opacity-100">
                  <FaPlay className="play-icon" />
                </button>
              </div>
              <div className="card-details">
                <h3 className="card-title">{song.title}</h3>
                <p className="card-artist">{song.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}