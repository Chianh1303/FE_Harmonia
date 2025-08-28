import { useEffect, useRef, useState } from "react";

export default function useAudioPlayer(initialTrack) {
  const audioRef = useRef(null);
  const [track, setTrack] = useState(initialTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.src = track?.url ?? "";
    audioRef.current.load();
    if (isPlaying) audioRef.current.play();
  }, [track]);

  useEffect(() => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlaying]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  const toggle = () => setIsPlaying((p) => !p);
  const seek = (val) => {
    if (audioRef.current) {
      audioRef.current.currentTime = val;
      setProgress(val);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateProgress = () => setProgress(audio.currentTime);
    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, []);

  return { audioRef, track, setTrack, isPlaying, setIsPlaying, progress, seek, toggle, volume, setVolume };
}
