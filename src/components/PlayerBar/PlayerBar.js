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
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // ⏯️ Đồng bộ play/pause
  useEffect(() => {
    if (!audioRef.current) return;
    if (player.isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [player.isPlaying, player.track]);

  // 🎶 Đồng bộ volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = player.volume;
    }
  }, [player.volume]);

  // 📝 Log khi track thay đổi
  useEffect(() => {
    if (player.track) {
      console.log("Track ID:", player.track.id);
    }
  }, [player.track]);

  // ⏱️ Cập nhật progress khi chạy nhạc
  const onTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      player.setProgress(audioRef.current.currentTime);
    }
  };

  // 🚨 Nếu chưa có bài hát thì không hiển thị PlayerBar
  if (!player.track) {
    return null;
  }

  return (
    <footer className="player" id="main-player">
      <audio ref={audioRef} onTimeUpdate={onTimeUpdate}>
        <source
          src={`http://localhost:8080/api/songs/stream/${player.track.id}`}
          type={player.track.contentType || "audio/mpeg"}
        />
        Trình duyệt không hỗ trợ audio.
      </audio>

      <div className="player-layout">
        <div className="now-playing">
          <img
            src={`http://localhost:8080/api/stream/${player.track.id}`}
            className="track-img"
            alt={player.track.title}
          />
          <div className="track-info">
            <div className="title">{player.track.title}</div>
            <div className="artist">{player.track.artistName}</div>
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
                  if (audioRef.current) {
                    audioRef.current.currentTime = value;
                  }
                  setProgress(value);
                  player.setProgress(value);
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
