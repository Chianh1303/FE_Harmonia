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
  FaExpandArrowsAlt
} from "react-icons/fa";

export default function PlayerBar({ player }) {
  if (!player.track) {
    return null;
  }

  return (
    <footer className="player" id="main-player">
      <audio ref={player.audioRef} hidden />

      <div className="player-layout">
        <div className="now-playing">
          <img src={player.track.cover} className="track-img" alt="" />
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

        {/* Controls - Center */}
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
          
          {/* Progress Bar - alongside controls */}
          <div className="progress-section">
            <span className="current-time">
              {Math.floor(player.progress / 60).toString().padStart(2, '0')}:
              {(player.progress % 60).toString().padStart(2, '0')}
            </span>
            <div className="progress-bar">
              <input
                type="range"
                min={0}
                max={Math.max(player.track?.duration ?? 100, 1)}
                value={player.progress}
                onChange={(e) => player.seek(Number(e.target.value))}
                style={{'--progress': `${(player.progress / (player.track?.duration || 1)) * 100}%`}}
              />
            </div>
            <span className="total-time">
              {Math.floor((player.track?.duration || 0) / 60).toString().padStart(2, '0')}:
              {((player.track?.duration || 0) % 60).toString().padStart(2, '0')}
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
