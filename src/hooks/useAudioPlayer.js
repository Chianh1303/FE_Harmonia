import { useEffect, useRef, useState } from "react";

export default function useAudioPlayer(initialTrack) {
  const [track, setTrack] = useState(initialTrack ?? null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.9);
  const audioRef = useRef(null);
  const [duration, setDuration] = useState(0);


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
      setDuration(audio.duration);
    };


    const onError = (e) => {
      setIsPlaying(false);
    };

    const onPlay = () => {
      setIsPlaying(true);
    };

    const onPause = () => {
      setIsPlaying(false);
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

    // Support both 'url' and 'file' properties, prioritize 'url'
    const audioUrl = track.url || track.file || `http://localhost:8080/api/homeWorkSpace/stream/${track.id}`;

    // Only update if URL actually changed
    if (audio.src !== audioUrl) {
      // Reset progress when changing tracks
      setProgress(0);
      setIsPlaying(false);

      audio.src = audioUrl;
      audio.currentTime = 0;
    }

    // Add event handlers for better audio management
    const handleError = (e) => {
      setIsPlaying(false);
    };

    const handleCanPlay = () => {
      // Audio can play
    };

    const handleLoadStart = () => {
      // Audio load start
    };

    const handleLoadedData = () => {
      // Audio data loaded
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
      return;
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      // Ensure audio is ready before playing
      if (audio.readyState >= 2) { // HAVE_CURRENT_DATA
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          setIsPlaying(false);
        });
      } else {
        // Wait for audio to be ready
        const handleCanPlay = () => {
          audio.play().then(() => {
            setIsPlaying(true);
          }).catch((err) => {
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
    setTrack(newTrack);
    setIsPlaying(false); // Reset playing state

    // Force play the new track
    setTimeout(() => {
      const audio = audioRef.current;
      if (audio && newTrack) {
        // Directly call play instead of toggle to ensure it plays
        if (audio.readyState >= 2) { // HAVE_CURRENT_DATA
          audio.play().then(() => {
            setIsPlaying(true);
          }).catch((err) => {
            setIsPlaying(false);
          });
        } else {
          // Wait for audio to be ready
          const handleCanPlay = () => {
            audio.play().then(() => {
              setIsPlaying(true);
            }).catch((err) => {
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
    duration,
    setDuration,
    volume,
    setVolume,
    toggle,
    seek,
    playTrack,
    audioRef
  };
}
