import Icon from "./Icon";

export default function PlayerBar({ player }) {
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
          {player.track ? (
            <img src={player.track.cover} className="track-img" alt="" />
          ) : (
            <div className="track-placeholder" />
          )}
          <div>
            <div className="title">
              {player.track?.title ?? "Chưa chọn bài"}
            </div>
            <div className="artist">
              {player.track?.artist ?? "—"}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="controls">
          <button onClick={() => player.toggle()} className="btn-play">
            <Icon
              name={player.isPlaying ? "pause" : "play"}
              className="icon"
            />
          </button>
        </div>

        {/* Volume */}
        <div className="volume">
          <Icon name="volume" className="icon" />
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
