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
    
    const onTime = () => {
      if (!audio.paused) {
        setProgress(audio.currentTime);
      }
    };
    
    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };
    
    const onLoadedMetadata = () => {
      console.log('📊 Audio metadata loaded, duration:', audio.duration);
    };
    
    const onError = (e) => {
      console.error('❌ Audio playback error:', e);
      setIsPlaying(false);
    };
    
    const onPlay = () => {
      setIsPlaying(true);
      console.log('▶️ Audio started playing');
    };
    
    const onPause = () => {
      setIsPlaying(false);
      console.log('⏸️ Audio paused');
    };
    
    // Add multiple event listeners for better timeline tracking
    audio.addEventListener("timeupdate", onTime);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("error", onError);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    
    return () => {
      audio.removeEventListener("timeupdate", onTime);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("error", onError);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track) return;
    
    console.log('🎼 Setting new track:', track);
    
    // Support both 'url' and 'file' properties, prioritize 'url'
    const audioUrl = track.url || track.file || `http://localhost:8080/api/homeWorkSpace/stream/${track.id}`;
    console.log('🔗 Audio URL:', audioUrl);
    
    // Reset progress when changing tracks
    setProgress(0);
    setIsPlaying(false);
    
    audio.src = audioUrl;
    audio.currentTime = 0;
    
    // Add event handlers for better audio management
    const handleError = (e) => {
      console.error('❌ Audio error:', e);
      console.error('❌ Audio error details:', audio.error);
      setIsPlaying(false);
    };
    
    const handleCanPlay = () => {
      console.log('✅ Audio can play');
    };
    
    const handleLoadStart = () => {
      console.log('🔄 Audio load start');
    };
    
    const handleLoadedData = () => {
      console.log('📊 Audio data loaded');
    };
    
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('loadeddata', handleLoadedData);
    
    // Auto-play logic moved to separate function call
    
    return () => {
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('loadeddata', handleLoadedData);
    };
  }, [track]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio || !track) {
      console.warn('⚠️ No audio or track available');
      return;
    }
    
    console.log('🎮 Toggle called. Current state:', { 
      isPlaying, 
      currentTime: audio.currentTime, 
      src: audio.src,
      readyState: audio.readyState 
    });
    
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      console.log('⏸️ Audio paused');
    } else {
      // Ensure audio is ready before playing
      if (audio.readyState >= 2) { // HAVE_CURRENT_DATA
        audio.play().then(() => {
          setIsPlaying(true);
          console.log('▶️ Audio playing');
        }).catch((err) => {
          console.error('❌ Play failed:', err);
          setIsPlaying(false);
        });
      } else {
        // Wait for audio to be ready
        console.log('⏳ Waiting for audio to be ready...');
        const handleCanPlay = () => {
          audio.play().then(() => {
            setIsPlaying(true);
            console.log('▶️ Audio playing (after wait)');
          }).catch((err) => {
            console.error('❌ Play failed after wait:', err);
            setIsPlaying(false);
          });
          audio.removeEventListener('canplay', handleCanPlay);
        };
        audio.addEventListener('canplay', handleCanPlay);
      }
    }
  };

  const seek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  // Auto-play method for when tracks are selected
  const playTrack = (newTrack) => {
    console.log('🎯 playTrack called with:', newTrack);
    
    setTrack(newTrack);
    setIsPlaying(false); // Reset playing state
    
    // Force play the new track
    setTimeout(() => {
      const audio = audioRef.current;
      if (audio && newTrack) {
        console.log('🎵 Force starting playback for track:', newTrack.title);
        // Directly call play instead of toggle to ensure it plays
        if (audio.readyState >= 2) { // HAVE_CURRENT_DATA
          audio.play().then(() => {
            setIsPlaying(true);
            console.log('▶️ Audio playing successfully');
          }).catch((err) => {
            console.error('❌ Play failed:', err);
            setIsPlaying(false);
          });
        } else {
          // Wait for audio to be ready
          const handleCanPlay = () => {
            audio.play().then(() => {
              setIsPlaying(true);
              console.log('▶️ Audio playing after ready');
            }).catch((err) => {
              console.error('❌ Play failed after ready:', err);
              setIsPlaying(false);
            });
            audio.removeEventListener('canplay', handleCanPlay);
          };
          audio.addEventListener('canplay', handleCanPlay);
        }
      }
    }, 150);
  };

  return { 
    track, 
    setTrack, 
    isPlaying, 
    setIsPlaying, 
    progress, 
    setProgress, 
    volume, 
    setVolume, 
    toggle, 
    seek, 
    playTrack,
    audioRef 
  };
}
