import React, { useEffect, useRef, useState } from "react";
import {
  FaPlay,
  FaPause,
  FaVolumeUp,
  FaStepBackward,
  FaStepForward,
  FaRandom,
  FaRedoAlt,
  FaHeart,
  FaEllipsisH,
  FaClosedCaptioning,
  FaMicrophone,
  FaDesktop,
  FaListUl,
  FaExpandArrowsAlt,
} from "react-icons/fa";

export default function PlayerBar({ player }) {
  const [progress, setProgress] = useState(0);

  // 📝 Log khi track thay đổi
  useEffect(() => {
    if (player.track) {
      console.log("PlayerBar - Track changed:", player.track);
    }
  }, [player.track]);

  // ⏱️ Cập nhật progress từ player
  useEffect(() => {
    setProgress(player.progress || 0);
  }, [player.progress]);

  // 🚨 Nếu chưa có bài hát thì không hiển thị PlayerBar
  if (!player.track) {
    return null;
  }

  return (
    <footer className="player" id="main-player">
      {/* Audio element được quản lý bởi useAudioPlayer hook */}
      <audio ref={player.audioRef} />

      <div className="player-layout">
        <div className="now-playing">
          <img
            src={player.track.cover}
            className="track-img"
            alt={player.track.title}
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop';
            }}
          />
          <div className="track-info">
            <div className="title">{player.track.title}</div>
            <div className="artist">{player.track.artist}</div>
          </div>
          <button className="heart-btn">
            <FaHeart />
          </button>
          <button className="more-btn">
            <FaEllipsisH />
          </button>
        </div>

        {/* Controls */}
        <div className="controls">
          <div className="control-buttons">
            <button className="control-btn">
              <FaRandom />
            </button>
            <button className="control-btn">
              <FaStepBackward />
            </button>
            <button onClick={() => player.toggle()} className="btn-play">
              {player.isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button className="control-btn">
              <FaStepForward />
            </button>
            <button className="control-btn">
              <FaRedoAlt />
            </button>
          </div>

          {/* Progress */}
          <div className="progress-section">
            <span className="current-time">
              {String(Math.floor(progress / 60)).padStart(2, "0")}:
              {String(Math.floor(progress % 60)).padStart(2, "0")}
            </span>
            <div className="progress-bar">
              <input
                type="range"
                min={0}
                max={player.track?.duration || 0}
                value={progress}
                onChange={(e) => {
                  const value = Number(e.target.value);
                  player.seek(value);
                }}
              />
            </div>
            <span className="total-time">
              {String(Math.floor((player.track?.duration || 0) / 60)).padStart(
                2,
                "0"
              )}
              :
              {String(Math.floor((player.track?.duration || 0) % 60)).padStart(
                2,
                "0"
              )}
            </span>
          </div>
        </div>

        {/* Right Actions */}
        <div className="player-right">
          <div className="action-buttons">
            <button className="action-btn">
              <FaClosedCaptioning />
            </button>
            <button className="action-btn">
              <FaMicrophone />
            </button>
            <button className="action-btn">
              <FaDesktop />
            </button>
            <button className="action-btn">
              <FaVolumeUp />
            </button>
            <input
              className="volume-slider"
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={player.volume}
              onChange={(e) => player.setVolume(Number(e.target.value))}
            />
            <button className="action-btn">
              <FaListUl />
            </button>
            <button className="action-btn">
              <FaExpandArrowsAlt />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
