import React from 'react';
import { FaPlay } from 'react-icons/fa';

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

export default function ZingChart({ songs = [], player }) {
  const topSongs = songs.slice(0, 10); // top 10 bài hát
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
      path += index === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
    });
    return path;
  };

  const playTrack = (track) => {
    if (player && track) {
      player.playTrack(track); // dùng playTrack từ hook
    }
  };

  return (
    <div className="zing-chart">
      <div className="chart-header">
        <h2 className="chart-title">
          <span className="hash">#</span>zingchart
          <button
            className="play-chart-btn"
            onClick={() => topSongs[0] && playTrack(topSongs[0])}
          >
            <FaPlay />
          </button>
        </h2>
      </div>

      <div className="chart-content">
        {/* Left side - Song list */}
        <div className="chart-songs">
          {topSongs.map((song, index) => (
            <div
              key={song.id}
              className={`chart-song-item ${player.track?.id === song.id ? 'active' : ''}`}
              onClick={() => playTrack(song)}
            >
              <div className="song-rank">
                <span className={`rank-number rank-${index + 1}`}>{index + 1}</span>
              </div>
              <div className="song-cover">
                <img src={song.cover || 'https://i.pravatar.cc/60'} alt={song.title} />
                <div className="play-overlay">
                  <FaPlay />
                </div>
              </div>
              <div className="song-info">
                <h4 className="song-title">{song.title}</h4>
                <p className="song-artist">{song.artist}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right side - Chart visualization */}
        <div className="chart-visualization">
          <div className="chart-current-song">
            {player.track && (
              <div className="current-song-info">
                <img src={player.track.cover || 'https://i.pravatar.cc/60'} alt={player.track.title} />
                <div>
                  <span className="current-title">{player.track.title}</span>
                  <span className="current-artist">{player.track.artist}</span>
                </div>
              </div>
            )}
          </div>

          <div className="chart-graph">
            <svg viewBox="0 0 400 120" className="trend-chart">
              <defs>
                <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#9945ff" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
              <path d={generatePath()} stroke="url(#chartGradient)" strokeWidth="2" fill="none" />
              {HOURLY_DATA.map((point, index) => {
                const x = 20 + index * ((400 - 40) / (HOURLY_DATA.length - 1));
                const y = 120 - 20 - (point.value * ((120 - 40) / maxValue));
                return <circle key={index} cx={x} cy={y} r="3" fill="#9945ff" />;
              })}
            </svg>
            <div className="time-labels">
              {HOURLY_DATA.map((point, index) => (
                <span key={index} className="time-label">{point.hour}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
