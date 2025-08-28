import Icon from "./Icon";

export default function Player({ player }) {
  return (
    <footer className="player">
      <audio ref={player.audioRef} hidden />

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
        <div className="now-playing">
          {player.track ? (
            <img src={player.track.cover} className="track-img" />
          ) : (
            <div className="track-placeholder" />
          )}
          <div>
            <div className="title">
              {player.track?.title ?? "Chưa chọn bài"}
            </div>
            <div className="artist">{player.track?.artist ?? "—"}</div>
          </div>
        </div>

        <div className="controls">
          <button onClick={player.toggle} className="btn-play">
            <Icon name={player.isPlaying ? "pause" : "play"} className="icon" />
          </button>
        </div>

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
