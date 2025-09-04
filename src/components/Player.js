import { useEffect, useRef } from "react";
import Icon from "./Icon";

export default function Player({ player }) {
  const audioRef = useRef(null);

  // Cập nhật audio element khi track thay đổi
  useEffect(() => {
    if (audioRef.current && player.track) {
      audioRef.current.src = player.track.url;
      if (player.isPlaying) {
        audioRef.current.play();
      }
    }
  }, [player.track]);

  // Play/Pause khi state thay đổi
  useEffect(() => {
    if (!audioRef.current) return;
    if (player.isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [player.isPlaying]);

  return (
    <footer className="player">
      <audio ref={audioRef} />
      {player.track && (
        <div className="player-info">
          <img src={player.track.cover} alt={player.track.title} />
          <div>
            <div className="player-title">{player.track.title}</div>
            <div className="player-artist">{player.track.artist}</div>
          </div>
        </div>
      )}
      <div className="player-controls">
        <button onClick={player.toggle}>
          <Icon
            name={player.isPlaying ? "pause" : "play"}
            size={20}
          />
        </button>
      </div>
    </footer>
  );
}
