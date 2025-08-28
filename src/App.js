  import React, { useEffect, useMemo, useRef, useState } from "react";
  import "./index.css"; 

  // --- Mock Data -------------------------------------------------------------
  const MOCK_SONGS = [
    {
      id: 1,
      title: "Harmonia Sky",
      artist: "artist1",
      cover: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop",
      url: "https://www2.cs.uic.edu/~i101/SoundFiles/StarWars60.wav",
      duration: 60,
    },
    {
      id: 2,
      title: "Veloura Dreams",
      artist: "artist1",
      cover: "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?q=80&w=1200&auto=format&fit=crop",
      url: "https://www2.cs.uic.edu/~i101/SoundFiles/ImperialMarch60.wav",
      duration: 60,
    },
    {
      id: 3,
      title: "EchoLux Nights",
      artist: "artist2",
      cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop",
      url: "https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand60.wav",
      duration: 60,
    },
    {
      id: 4,
      title: "Symphoria Flow",
      artist: "artist2",
      cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop",
      url: "https://www2.cs.uic.edu/~i101/SoundFiles/Front_Center.wav",
      duration: 60,
    },
  ];

  const MOCK_PLAYLISTS = [
    { id: "p1", name: "Top Hits Việt", cover: MOCK_SONGS[0].cover, songs: [1, 2, 3] },
    { id: "p2", name: "Chill & Focus", cover: MOCK_SONGS[1].cover, songs: [2, 4] },
    { id: "p3", name: "EDM Boost", cover: MOCK_SONGS[2].cover, songs: [1, 3, 4] },
    { id: "p4", name: "Acoustic Night", cover: MOCK_SONGS[3].cover, songs: [1, 2] },
  ];

  // --- Hooks -----------------------------------------------------------------
  function useAudioPlayer(initialTrack) {
    const [track, setTrack] = useState(initialTrack ?? null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(0.9);
    const audioRef = useRef(null);

    useEffect(() => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.volume = volume;
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
      audio.src = track.url;
      audio.currentTime = 0;
      if (isPlaying) audio.play().catch(() => {});
    }, [track]);

    const toggle = () => {
      const audio = audioRef.current;
      if (!audio) return;
      if (!track) return;
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    };

    const seek = (time) => {
      const audio = audioRef.current;
      if (!audio) return;
      audio.currentTime = time;
      setProgress(time);
    };

    return { track, setTrack, isPlaying, setIsPlaying, progress, setProgress, volume, setVolume, toggle, seek, audioRef };
  }

  // --- UI Components ---------------------------------------------------------
  function Icon({ name, className }) {
    const paths = {
      play: "M6 4l20 12L6 28V4z",
      pause: "M6 4h8v24H6V4zm12 0h8v24h-8V4z",
      heart: "M16 29s-13-8.35-13-16A7 7 0 0 1 16 6a7 7 0 0 1 13 7c0 7.65-13 16-13 16z",
      next: "M6 6l12 8L6 22V6zm14 0h4v16h-4V6z",
      prev: "M26 6v16h-4V6h4zM6 22l12-8L6 6v16z",
      volume: "M6 12h6l8-6v24l-8-6H6V12zm18 0a6 6 0 0 1 0 12v-3a3 3 0 0 0 0-6v-3z",
      search: "M11 19a8 8 0 1 1 5.29 2.71L24 29l-2 2-7.71-7.71A8 8 0 0 1 11 19z",
    };
    return (
      <svg viewBox="0 0 32 32" className={className} aria-hidden>
        <path d={paths[name]} fill="currentColor" />
      </svg>
    );
  }

  function Section({ title, children, right }) {
    return (
      <section className="section">
        <div className="section-header">
          <h2>{title}</h2>
          {right}
        </div>
        {children}
      </section>
    );
  }

  function PlaylistCard({ item, onPlay }) {
    return (
      <div className="playlist-card">
        <img src={item.cover} alt={item.name} className="playlist-img" />
        <div className="playlist-content">
          <h3>{item.name}</h3>
          <p>{item.songs.length} bài</p>
        </div>
        <button onClick={onPlay} className="playlist-btn">
          <Icon name="play" className="icon" />
        </button>
      </div>
    );
  }

  function SongRow({ index, song, active, onClick }) {
    return (
      <button onClick={onClick} className={`song-row ${active ? "active" : ""}`}>
        <span>{index}</span>
        <img src={song.cover} alt="" className="song-cover" />
        <div className="song-info">
          <div>{song.title}</div>
          <div className="artist">{song.artist}</div>
        </div>
        <div className="song-duration">{Math.round(song.duration)}s</div>
        <div className="song-heart">
          <Icon name="heart" className="icon" />
        </div>
      </button>
    );
  }

  // --- Main App --------------------------------------------------------------
  export default function App() {
    const player = useAudioPlayer(MOCK_SONGS[0]);
    const [query, setQuery] = useState("");
// search theo tên bài hát hoặc nghệ sĩ
    const filtered = useMemo(() => {
      const q = query.trim().toLowerCase();
      if (!q) return MOCK_SONGS;
      return MOCK_SONGS.filter((s) => s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q));
    }, [query]);

    return (
      <div className="app">
        <div className="layout">
          {/* Sidebar */}
          <aside className="sidebar">
            <div className="logo">Harmonia</div>
            <nav className="nav">
              {["Khám phá","BXH nhạc mới","Chủ đề & Thể loại","Top 100","MV"].map((label) => (
                <a key={label} className="nav-link">{label}</a>
              ))}
            </nav>
            {/* <div className="premium-box">
              <div className="premium-title">Nâng cấp Premium</div>
              <p>Âm nhạc chất lượng cao, không quảng cáo.</p>
              <button className="btn">Nâng cấp</button>
            </div> */}
          </aside>

          {/* Main */}
          <main className="main">
            {/* Header */}
            <div className="header">
              <div className="search-box">
                <Icon name="search" className="icon search-icon" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Tìm bài hát, nghệ sĩ, playlist…"
                />
              </div>
              <img src="https://i.pravatar.cc/40?img=13" alt="avatar" className="avatar" />
            </div>

            {/* Hero */}
            <div className="hero">
              <div className="hero-banner">
                <img
                  src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop"
                  className="hero-img"
                />
                <div className="hero-overlay" />
                <div className="hero-text">
                  <div>Playlist Editor</div>
                  <div className="hero-title">Chill Night • Lofi • R&B</div>
                </div>
              </div>
              <div className="hero-chart">
                <div className="chart-title">BXH hôm nay</div>
                {MOCK_SONGS.map((s, i) => (
                  <SongRow
                    key={s.id}
                    index={i + 1}
                    song={s}
                    active={player.track?.id === s.id}
                    onClick={() => {
                      player.setTrack(s);
                      player.setIsPlaying(true);
                      setTimeout(() => player.toggle(), 0);
                    }}
                  />
                ))}
              </div>
            </div>

            {/* New Releases */}
            <Section title="Mới phát hành">
              <div className="grid">
                {filtered.map((s) => (
                  <div key={s.id} className="release-card">
                    <img src={s.cover} alt="" className="release-img" />
                    <div className="release-content">
                      <div>{s.title}</div>
                      <div className="artist">{s.artist}</div>
                    </div>
                    <button
                      onClick={() => {
                        player.setTrack(s);
                        player.setIsPlaying(true);
                        setTimeout(() => player.toggle(), 0);
                      }}
                      className="release-btn"
                    >
                      <Icon name="play" className="icon" />
                    </button>
                  </div>
                ))}
              </div>
            </Section>

            {/* Playlists */}
            <Section title="Playlist nổi bật" right={<a className="see-all">Xem tất cả</a>}>
              <div className="grid">
                {MOCK_PLAYLISTS.map((pl) => (
                  <PlaylistCard
                    key={pl.id}
                    item={pl}
                    onPlay={() => {
                      const first = MOCK_SONGS.find((s) => s.id === pl.songs[0]);
                      if (first) {
                        player.setTrack(first);
                        player.setIsPlaying(true);
                        setTimeout(() => player.toggle(), 0);
                      }
                    }}
                  />
                ))}
              </div>
            </Section>
          </main>
        </div>

      {/* Player Bar */}
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
          <img src={player.track.cover} className="track-img" />
        ) : (
          <div className="track-placeholder" />
        )}
        <div>
          <div className="title">{player.track?.title ?? "Chưa chọn bài"}</div>
          <div className="artist">{player.track?.artist ?? "—"}</div>
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
      </div>
    );
  }
