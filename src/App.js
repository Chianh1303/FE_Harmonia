// src/App.js
import React, { useMemo, useState } from "react";
import "./index.css";

import useAudioPlayer from "./hooks/useAudioPlayer";
import { useSongs } from "./hooks/useSongs";

// Components
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import ZingChart from "./components/ZingChart/ZingChart";
import NewReleases from "./components/NewReleases/NewReleases";
import FeaturedPlaylists from "./components/FeaturedPlaylists/FeaturedPlaylists";
import PlayerBar from "./components/PlayerBar/PlayerBar";

export default function App() {
  const { songs: apiSongs, loading, error } = useSongs();
  const player = useAudioPlayer(); // hook quản lý player
  const [query, setQuery] = useState("");

  // Only use API songs, no fallback to mock data
  const songs = apiSongs;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return songs;
    return songs.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.artist.toLowerCase().includes(q)
    );
  }, [query, songs]);

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <div>Đang tải...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="loading">
          <div>⚠️ Không thể kết nối tới server</div>
          <div>Lỗi: {error}</div>
          <div>Vui lòng:</div>
          <div>1. Kiểm tra backend có chạy ở localhost:8080</div>
          <div>2. Refresh trang này</div>
        </div>
      </div>
    );
  }

  // If no songs, show empty state
  if (!songs || songs.length === 0) {
    return (
      <div className="app">
        <div className="loading">
          <div>🎵 Chưa có bài hát nào</div>
          <div>Hãy thêm bài hát vào database</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="layout">
        <Sidebar />
        <main className="main">
          <Header query={query} setQuery={setQuery} />
          <Hero songs={songs} player={player} />
          <NewReleases songs={filtered} player={player} />
          <FeaturedPlaylists songs={songs} player={player} />
          <ZingChart songs={songs} player={player} />
        </main>
      </div>
      <PlayerBar player={player} />
    </div>
  );
}
