import React, { useEffect, useMemo, useRef, useState } from "react";

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

// --- Helpers ---------------------------------------------------------------
function classNames(...s) {
  return s.filter(Boolean).join(" ");
}

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

// --- UI Primitives ---------------------------------------------------------
function Icon({ name, className }) {
  // Minimal inline icons to avoid external deps
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
    <svg viewBox="0 0 32 32" className={classNames("inline-block", className)} aria-hidden>
      <path d={paths[name]} fill="currentColor" />
    </svg>
  );
}

function Section({ title, children, right }) {
  return (
    <section className="mt-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        {right}
      </div>
      {children}
    </section>
  );
}

function PlaylistCard({ item, onPlay }) {
  return (
    <div className="group relative rounded-2xl overflow-hidden bg-white/5 hover:bg-white/10 transition shadow-sm">
      <img src={item.cover} alt={item.name} className="h-40 w-full object-cover" />
      <div className="p-3">
        <h3 className="font-medium line-clamp-1">{item.name}</h3>
        <p className="text-xs text-white/60">{item.songs.length} bài</p>
      </div>
      <button
        onClick={onPlay}
        className="absolute right-3 bottom-16 opacity-0 group-hover:opacity-100 transition rounded-full h-12 w-12 grid place-items-center bg-fuchsia-500 hover:bg-fuchsia-600 shadow-lg"
        aria-label="Play playlist"
      >
        <Icon name="play" className="h-6 w-6 text-white" />
      </button>
    </div>
  );
}

function SongRow({ index, song, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "w-full grid grid-cols-[24px,56px,1fr,1fr,60px] gap-3 items-center py-2 px-3 rounded-xl",
        active ? "bg-white/15" : "hover:bg-white/10"
      )}
    >
      <span className="text-sm text-white/60">{index}</span>
      <img src={song.cover} alt="" className="h-10 w-10 rounded-lg object-cover" />
      <div className="text-left">
        <div className="font-medium line-clamp-1">{song.title}</div>
        <div className="text-xs text-white/60 line-clamp-1">{song.artist}</div>
      </div>
      <div className="text-left text-white/70 text-sm">{Math.round(song.duration)}s</div>
      <div className="justify-self-end">
        <Icon name="heart" className="h-5 w-5 text-white/60 hover:text-fuchsia-400" />
      </div>
    </button>
  );
}

// --- Main App --------------------------------------------------------------
export default function App() {
  const player = useAudioPlayer(MOCK_SONGS[0]);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MOCK_SONGS;
    return MOCK_SONGS.filter((s) => s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#0f0a1f] via-[#1c1233] to-[#0b0b14] text-white grid grid-rows-[1fr_auto]">
      <div className="grid grid-cols-[240px_1fr] overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col border-r border-white/10 p-4 gap-2 bg-white/5">
          <div className="text-2xl font-extrabold tracking-tight">Harmonia</div>
          <nav className="mt-4 flex flex-col gap-1 text-sm">
            {[
              "Khám phá",
              "BXH nhạc mới",
              "Chủ đề & Thể loại",
              "Top 100",
              "MV",
            ].map((label) => (
              <a key={label} className="px-3 py-2 rounded-xl hover:bg-white/10 cursor-pointer">
                {label}
              </a>
            ))}
          </nav>
          <div className="mt-auto p-3 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/30">
            <div className="font-semibold mb-1">Nâng cấp Premium</div>
            <p className="text-xs text-white/70">Âm nhạc chất lượng cao, không quảng cáo.</p>
            <button className="mt-3 px-3 py-2 rounded-xl bg-fuchsia-500 hover:bg-fuchsia-600 text-sm font-medium">Nâng cấp</button>
          </div>
        </aside>

        {/* Main */}
        <main className="overflow-y-auto p-4 md:p-6">
          {/* Header */}
          <div className="sticky top-0 z-10 -mx-4 md:-mx-6 px-4 md:px-6 py-3 backdrop-blur supports-[backdrop-filter]:bg-black/20">
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-xl">
                <Icon name="search" className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-white/60" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Tìm bài hát, nghệ sĩ, playlist…"
                  className="w-full pl-10 pr-3 py-2 rounded-xl bg-white/10 focus:bg-white/15 outline-none text-sm placeholder:text-white/50"
                />
              </div>
              <img
                src="https://i.pravatar.cc/40?img=13"
                alt="avatar"
                className="h-9 w-9 rounded-full border border-white/20"
              />
            </div>
          </div>

          {/* Hero */}
          <div className="mt-2 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 relative rounded-2xl overflow-hidden bg-white/5">
              <img
                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1600&auto=format&fit=crop"
                className="h-52 w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <div className="text-sm text-white/70">Playlist Editor</div>
                <div className="text-2xl font-bold">Chill Night • Lofi • R&B</div>
              </div>
            </div>
            <div className="rounded-2xl p-4 bg-white/5">
              <div className="font-semibold mb-3">BXH hôm nay</div>
              <div className="flex flex-col gap-2">
                {MOCK_SONGS.map((s, i) => (
                  <SongRow
                    key={s.id}
                    index={i + 1}
                    song={s}
                    active={player.track?.id === s.id}
                    onClick={() => {
                      player.setTrack(s);
                      player.setIsPlaying(true);
                      setTimeout(() => player.toggle(), 0); // start
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* New Releases */}
          <Section title="Mới phát hành">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {filtered.map((s) => (
                <div key={s.id} className="group relative rounded-2xl overflow-hidden bg-white/5 hover:bg-white/10 transition">
                  <img src={s.cover} alt="" className="h-36 w-full object-cover" />
                  <div className="p-3">
                    <div className="font-medium line-clamp-1">{s.title}</div>
                    <div className="text-xs text-white/60 line-clamp-1">{s.artist}</div>
                  </div>
                  <button
                    onClick={() => {
                      player.setTrack(s);
                      player.setIsPlaying(true);
                      setTimeout(() => player.toggle(), 0);
                    }}
                    className="absolute right-3 bottom-16 opacity-0 group-hover:opacity-100 transition rounded-full h-10 w-10 grid place-items-center bg-fuchsia-500 hover:bg-fuchsia-600 shadow-lg"
                    aria-label="Play"
                  >
                    <Icon name="play" className="h-5 w-5 text-white" />
                  </button>
                </div>
              ))}
            </div>
          </Section>

          {/* Playlists */}
          <Section title="Playlist nổi bật" right={<a className="text-sm text-white/70 hover:text-white">Xem tất cả</a>}>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
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
                />)
              )}
            </div>
          </Section>
        </main>
      </div>

      {/* Player Bar */}
      <footer className="border-t border-white/10 bg-black/30 backdrop-blur p-3 md:p-4">
        <audio ref={player.audioRef} hidden />
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 md:gap-6">
          {/* Now Playing */}
          <div className="flex items-center gap-3 min-w-0">
            {player.track ? (
              <img src={player.track.cover} className="h-12 w-12 rounded-lg object-cover" />
            ) : (
              <div className="h-12 w-12 rounded-lg bg-white/10" />
            )}
            <div className="min-w-0">
              <div className="font-medium line-clamp-1">{player.track?.title ?? "Chưa chọn bài"}</div>
              <div className="text-xs text-white/60 line-clamp-1">{player.track?.artist ?? "—"}</div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => player.toggle()}
              className="rounded-full h-12 w-12 grid place-items-center bg-fuchsia-500 hover:bg-fuchsia-600 shadow-lg"
              aria-label="Play/Pause"
            >
              <Icon name={player.isPlaying ? "pause" : "play"} className="h-6 w-6 text-white" />
            </button>
            <input
              type="range"
              min={0}
              max={Math.max(player.track?.duration ?? 100, 1)}
              value={player.progress}
              onChange={(e) => player.seek(Number(e.target.value))}
              className="w-64 max-w-[50vw]"
            />
          </div>

          {/* Volume */}
          <div className="hidden md:flex items-center justify-end gap-2">
            <Icon name="volume" className="h-5 w-5 text-white/70" />
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
