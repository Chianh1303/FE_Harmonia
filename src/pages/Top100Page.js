import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid, // Thêm grid để biểu đồ rõ ràng hơn
} from "recharts";
import { FaPlay, FaMusic, FaChartLine } from "react-icons/fa"; // Thêm icons
import "./Top100Page.css"; // Giữ nguyên file CSS

export default function Top100Page({ songs = [], player }) {
  // Lấy top 5 bài để demo biểu đồ
  const top5 = songs.slice(0, 5);

  // Dữ liệu biểu đồ (ví dụ giả lập thứ hạng theo tuần)
  const chartData = top5.map((song, i) => ({
    week: `Tuần ${i + 1}`,
    // Giả lập xếp hạng ngược (1 là tốt nhất, 5 là tệ nhất)
    rank: Math.floor(Math.random() * 5) + 1, 
    title: song.title,
    artist: song.artist,
    cover: song.cover,
    id: song.id || i, // Thêm id để dễ dàng xử lý
  }));

  // Component hiển thị tooltip tuỳ chỉnh (đã cập nhật class)
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="chart-tooltip-wrapper">
          <img src={data.cover} alt={data.title} className="tooltip-cover-img" />
          <div className="tooltip-info-box">
            <div className="tooltip-song-title">{data.title}</div>
            <div className="tooltip-song-artist">{data.artist}</div>
            <div className="tooltip-song-rank">Hạng: {data.rank}</div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Top 100 danh sách
  const topSongs = songs.slice(0, 100);

  return (
    <div className="top100-page-container">
      {/* --- Header & Banner --- */}
      <header className="page-header-banner">
        <div className="header-content">
          <FaChartLine className="header-icon" />
          <h1 className="header-title">BXH Việt Nam & Quốc Tế</h1>
          <p className="header-subtitle">
            Cập nhật hàng tuần — Top 100 ca khúc được yêu thích nhất.
          </p>
          <button className="play-all-action-btn" onClick={() => player.playTrack(topSongs)}>
            <FaPlay /> Phát tất cả
          </button>
        </div>
      </header>

      {/* --- Biểu đồ Xu hướng --- */}
      <section className="chart-analysis-section">
        <h2 className="section-title">📊 Xu hướng Xếp hạng 5 tuần gần nhất</h2>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis dataKey="week" stroke="#888" />
              <YAxis reversed domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} stroke="#888" />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="rank"
                stroke="#4f46e5" // Màu Indigo/Primary
                strokeWidth={4}
                dot={{ r: 5, fill: '#4f46e5', stroke: '#fff', strokeWidth: 2 }}
                activeDot={{ r: 9, fill: '#ff4b2b', stroke: '#fff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* --- Danh sách top 100 --- */}
      <section className="top-100-list-section">
        <h2 className="section-title">
            <FaMusic className="title-icon" /> Danh sách Top 100
        </h2>
        <ul className="song-list-grid">
          {topSongs.map((song, index) => (
            <li key={song.id || index} className="top-song-card group">
              <span className="card-rank">{index + 1}</span>
              <img src={song.cover} alt={song.title} className="card-cover-img" />
              <div className="card-info">
                <div className="card-song-title">{song.title}</div>
                <div className="card-song-artist">{song.artist}</div>
              </div>
              <button
                className="card-play-btn"
                onClick={() => player.playTrack(song)}
              >
                <FaPlay className="play-icon" />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}