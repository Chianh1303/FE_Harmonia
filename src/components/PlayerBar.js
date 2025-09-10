import { FaPlay, FaPause, FaVolumeUp, FaStepBackward, FaStepForward, FaRandom, FaRedoAlt } from "react-icons/fa";

export default function PlayerBar({ player }) {
  // Chỉ hiện player khi có bài hát được chọn
  if (!player.track) {
    return null;
  }

  return (
    <footer className="player">
      <audio ref={player.audioRef} hidden />

      {/* Progress Bar */}
      <div className="progress-bar">
        <input
          type="range"
          min={0}
          max={Math.max(player.track?.duration ?? 100, 1)}
          value={player.progress}
          onChange={(e) => player.seek(Number(e.target.value))}
        />
      </div>

      <div className="player-layout">
        {/* Now Playing */}
        <div className="now-playing">
          <img src={player.track.cover} className="track-img" alt="" />
          <div className="track-info">
            <div className="title">{player.track.title}</div>
            <div className="artist">{player.track.artist}</div>
          </div>
        </div>

        {/* Controls */}
        <div className="controls">
          <button>
            <FaRandom className="icon" />
          </button>
          <button>
            <FaStepBackward className="icon" />
          </button>
          <button onClick={() => player.toggle()} className="btn-play">
            {player.isPlaying ? <FaPause className="icon" /> : <FaPlay className="icon" />}
          </button>
          <button>
            <FaStepForward className="icon" />
          </button>
          <button>
            <FaRedoAlt className="icon" />
          </button>
        </div>

        {/* Volume */}
        <div className="volume">
          <button>
            <FaVolumeUp className="icon" />
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={player.volume}
            onChange={(e) => player.setVolume(Number(e.target.value))}
          />
        </div>
      </div>
    </footer>
  );
}
