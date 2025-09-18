import React from 'react';
import { FaPlay } from 'react-icons/fa';

export default function ZingChart({ songs = [], player }) {
  // Create chart data from real songs
  const chartData = songs.slice(0, 5).map((song, index) => ({
    id: song.id,
    title: song.title,
    artist: song.artist,
    percentage: [50, 30, 20, 15, 10][index] || 5, // Mock percentages for display
    cover: song.cover,
    trend: ["up", "stable", "down", "up", "stable"][index] || "stable"
  }));

  if (songs.length === 0) {
    return null; // Don't show if no songs
  }

  const playTrack = (track) => {
    if (player && songs.length > 0) {
      // Find actual song from API data
      const actualSong = songs.find(s => s.id === track.id) || songs[0];
      if (actualSong) {
        if (player.playTrack) {
          player.playTrack(actualSong);
        } else {
          player.setTrack(actualSong);
          setTimeout(() => {
            if (!player.isPlaying) {
              player.toggle();
            }
          }, 100);
        }
      }
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
        {/* Song list */}
        <div className="chart-songs">
          {chartData.map((song, index) => (
            <div 
              key={song.id} 
              className={`chart-song-item ${player.track?.id === song.id ? 'active' : ''}`} 
              onClick={() => playTrack(song)}
            >
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
        </div>
      </div>
    </div>
  );
}
