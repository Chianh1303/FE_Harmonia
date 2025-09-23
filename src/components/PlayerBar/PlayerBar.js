import React, { useEffect, useRef, useState } from "react";
import "./PlayerBar.css";
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
  const [isDragging, setIsDragging] = useState(false);

  // Track change handler
  useEffect(() => {
    if (player.track) {
      // Track changed
    }
  }, [player.track]);

  // Update progress from player, but not when dragging
  useEffect(() => {
    if (!isDragging) {
      setProgress(player.progress || 0);
    }
  }, [player.progress, isDragging]);

  // Don't show PlayerBar if no track
  if (!player.track) {
    return null;
  }

  return (
    <footer className="player" id="main-player">
      {/* Audio element được quản lý bởi useAudioPlayer hook */}
      <audio
        ref={player.audioRef}
        src={`http://localhost:8080/stream/${player.track.id}`}
        onLoadedMetadata={(e) => {
          player.setDuration(e.target.duration);
        }}
        onTimeUpdate={(e) => {
          player.setProgress(e.target.currentTime);
        }}
      />


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
            <input
              type="range"
              min={0}
              max={player.duration}
              value={progress}
              onMouseDown={() => setIsDragging(true)}
              onChange={(e) => setProgress(Number(e.target.value))}
              onMouseUp={(e) => {
                player.seek(Number(e.target.value));
                setIsDragging(false);
              }}
              style={{
                width: "100%",
                height: "4px", // giảm độ cao
                borderRadius: "2px",
                appearance: "none", // bỏ style mặc định
                background: `linear-gradient(to right, white ${(progress / player.duration) * 100}%, #444 ${(progress / player.duration) * 100}%)`,
                cursor: "pointer"
              }}
            />

            <span className="total-time">
              {String(Math.floor(player.duration / 60)).padStart(2, "0")}:
              {String(Math.floor(player.duration % 60)).padStart(2, "0")}
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