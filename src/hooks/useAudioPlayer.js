import { useEffect, useRef, useState } from "react";

export default function useAudioPlayer(initialTrack) {
  const [track, setTrack] = useState(initialTrack ?? null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.9);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setProgress(audio.currentTime);
    const onEnded = () => setIsPlaying(false);
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track) return;
    
    console.log('🎼 Setting new track:', track);
    
    // Support both 'url' and 'file' properties, prioritize 'url'
    const audioUrl = track.url || track.file || `http://localhost:8080/api/homeWorkSpace/stream/${track.id}`;
    console.log('🔗 Audio URL:', audioUrl);
    
    audio.src = audioUrl;
    audio.currentTime = 0;
    
    // Add error handling
    const handleError = (e) => {
      console.error('❌ Audio error:', e);
      console.error('❌ Audio error details:', audio.error);
    };
    
    const handleCanPlay = () => {
      console.log('✅ Audio can play');
    };
    
    const handleLoadStart = () => {
      console.log('🔄 Audio load start');
    };
    
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadstart', handleLoadStart);
    
    if (isPlaying) {
      audio.play().catch((err) => {
        console.error('❌ Play failed:', err);
      });
    }
    
    return () => {
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadstart', handleLoadStart);
    };
  }, [track]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio || !track) {
      console.warn('⚠️ No audio or track available');
      return;
    }
    
    console.log('🎮 Toggle called. Current state:', { isPlaying, currentTime: audio.currentTime, src: audio.src });
    
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      console.log('⏸️ Audio paused');
    } else {
      audio.play().then(() => {
        setIsPlaying(true);
        console.log('▶️ Audio playing');
      }).catch((err) => {
        console.error('❌ Play failed:', err);
      });
    }
  };

  const seek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  return { track, setTrack, isPlaying, setIsPlaying, progress, setProgress, volume, setVolume, toggle, seek, audioRef };
}
