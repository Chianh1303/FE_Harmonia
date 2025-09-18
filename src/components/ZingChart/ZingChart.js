import React from 'react';
import { FaPlay } from 'react-icons/fa';

const CHART_DATA = [
  {
    id: 1,
    title: "Anh Đã Không Biết Cách Yêu Em",
    artist: "Quang Đăng Trần",
    percentage: 50,
    cover: "https://i.pravatar.cc/60?img=1",
    trend: "up"
  },
  {
    id: 2,
    title: "Nơi Đau Giữa Hoa Bình",
    artist: "Hòa Minzy ♪, Nguyễn Văn Chung",
    percentage: 20,
    cover: "https://i.pravatar.cc/60?img=2",
    trend: "stable"
  },
  {
    id: 3,
    title: "Có Con Yêu Em (Cover)",
    artist: "Quang Đăng Trần",
    percentage: 30,
    cover: "https://i.pravatar.cc/60?img=3",
    trend: "down"
  }
];

const HOURLY_DATA = [
  { hour: '14:00', value: 65 },
  { hour: '16:00', value: 72 },
  { hour: '18:00', value: 68 },
  { hour: '20:00', value: 85 },
  { hour: '22:00', value: 92 },
  { hour: '00:00', value: 88 },
  { hour: '02:00', value: 45 },
  { hour: '04:00', value: 35 },
  { hour: '06:00', value: 42 },
  { hour: '08:00', value: 58 },
  { hour: '10:00', value: 75 },
  { hour: '12:00', value: 82 }
];

export default function ZingChart({ player }) {
  const maxValue = Math.max(...HOURLY_DATA.map(d => d.value));
  
  const generatePath = () => {
    const width = 400;
    const height = 120;
    const padding = 20;
    
    const xStep = (width - padding * 2) / (HOURLY_DATA.length - 1);
    const yScale = (height - padding * 2) / maxValue;
    
    let path = '';
    
    HOURLY_DATA.forEach((point, index) => {
      const x = padding + index * xStep;
      const y = height - padding - (point.value * yScale);
      
      if (index === 0) {
        path += `M ${x} ${y}`;
      } else {
        path += ` L ${x} ${y}`;
      }
    });
    
    return path;
  };

  const playTrack = (track) => {
    if (player && player.play) {
      // Convert chart item to track format
      const trackData = {
        id: track.id,
        title: track.title,
        artist: track.artist,
        cover: track.cover,
        duration: 180, // 3 minutes default
        url: "#" // placeholder
      };
      player.play(trackData);
    }
  };

  return (
    <div className="zing-chart">
      <div className="chart-header">
        <h2 className="chart-title">
          <span className="hash">#</span>zingchart
          <button className="play-chart-btn">
            <FaPlay />
          </button>
        </h2>
      </div>
      
      <div className="chart-content">
        {/* Left side - Song list */}
        <div className="chart-songs">
          {CHART_DATA.map((song, index) => (
            <div key={song.id} className="chart-song-item" onClick={() => playTrack(song)}>
              <div className="song-rank">
                <span className={`rank-number rank-${index + 1}`}>{index + 1}</span>
              </div>
              <div className="song-cover">
                <img src={song.cover} alt={song.title} />
                <div className="play-overlay">
                  <FaPlay />
                </div>
              </div>
              <div className="song-info">
                <h4 className="song-title">{song.title}</h4>
                <p className="song-artist">{song.artist}</p>
              </div>
              <div className="song-percentage">
                <span>{song.percentage}%</span>
              </div>
            </div>
          ))}
          
          <div className="view-more">
            <button className="view-more-btn">Xem thêm</button>
          </div>
        </div>
        
        {/* Right side - Chart visualization */}
        <div className="chart-visualization">
          <div className="chart-current-song">
            <div className="current-song-info">
              <img src={CHART_DATA[2].cover} alt="Current" />
              <div>
                <span className="current-title">{CHART_DATA[2].title}</span>
                <span className="current-percentage">{CHART_DATA[2].percentage}%</span>
              </div>
            </div>
          </div>
          
          <div className="chart-graph">
            <svg viewBox="0 0 400 120" className="trend-chart">
              {/* Grid lines */}
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#9945ff" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
              
              {/* Chart line */}
              <path
                d={generatePath()}
                stroke="url(#chartGradient)"
                strokeWidth="2"
                fill="none"
                className="chart-line"
              />
              
              {/* Data points */}
              {HOURLY_DATA.map((point, index) => {
                const x = 20 + index * ((400 - 40) / (HOURLY_DATA.length - 1));
                const y = 120 - 20 - (point.value * ((120 - 40) / maxValue));
                
                return (
                  <circle
                    key={index}
                    cx={x}
                    cy={y}
                    r="3"
                    fill="#9945ff"
                    className="chart-point"
                  />
                );
              })}
            </svg>
            
            {/* Time labels */}
            <div className="time-labels">
              {HOURLY_DATA.map((point, index) => (
                <span key={index} className="time-label">
                  {point.hour}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
