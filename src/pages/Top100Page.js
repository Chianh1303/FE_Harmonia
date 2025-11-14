import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { FaPlay } from "react-icons/fa";
import "./Top100Page.css";

export default function Top100Page({ songs = [], player }) {
  // Lấy top 5 bài để demo biểu đồ (bạn có thể đổi theo nhu cầu)
  const top5 = songs.slice(0, 5);

  // Dữ liệu biểu đồ (ví dụ giả lập thứ hạng theo tuần)
  const chartData = top5.map((song, i) => ({
    week: `Tuần ${i + 1}`,
    rank: Math.floor(Math.random() * 5) + 1, // giả lập xếp hạng
    title: song.title,
    artist: song.artist,
    cover: song.cover,
  }));

  // Component hiển thị tooltip tuỳ chỉnh
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="custom-tooltip">
          <img src={data.cover} alt={data.title} className="tooltip-cover" />
          <div className="tooltip-info">
            <div className="tooltip-title">{data.title}</div>
            <div className="tooltip-artist">{data.artist}</div>
            <div className="tooltip-rank">Hạng: {data.rank}</div>
          </div>
        </div>
      );
    }
    return null;
  };

  // Top 100 danh sách
  const topSongs = songs.slice(0, 100);

  return (
    <div className="top100-page">
      {/* --- Banner --- */}
      <div className="top100-banner">
        <div className="banner-overlay">
          <h1 className="banner-title">🔥 Top 100 Bài Hát Hay Nhất</h1>
          <p className="banner-subtitle">
            Cập nhật hàng tuần — thưởng thức những bản nhạc hot nhất hiện nay!
          </p>
          <button className="play-all-btn">
            <FaPlay /> Phát tất cả
          </button>
        </div>
      </div>

      {/* --- Biểu đồ --- */}
      <section className="chart-section">
        <h2>📊 Xu hướng BXH</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="week" />
            <YAxis reversed />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="rank"
              stroke="#ff4b2b"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </section>

      {/* --- Danh sách top 100 --- */}
      <section className="top100-list">
        <h2>🎵 Danh sách Top 100</h2>
        <ul className="song-list">
          {topSongs.map((song, index) => (
            <li key={song.id || index} className="song-item">
              <span className="rank">{index + 1}</span>
              <img src={song.cover} alt={song.title} className="song-cover" />
              <div className="song-info">
                <div className="song-title">{song.title}</div>
                <div className="song-artist">{song.artist}</div>
              </div>
              <button
                className="play-btn"
                onClick={() => player.playTrack(song)}
              >
                <FaPlay />
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
