// src/App.js
import React, { useMemo, useState } from "react";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import useAudioPlayer from "./hooks/useAudioPlayer";
import { useSongs } from "./hooks/useSongs";

// Components
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import PlayerBar from "./components/PlayerBar/PlayerBar";
import Hero from "./components/Hero/Hero";
import ZingChart from "./components/ZingChart/ZingChart";
import NewReleases from "./components/NewReleases/NewReleases";
import FeaturedPlaylists from "./components/FeaturedPlaylists/FeaturedPlaylists";

// Pages
import Top100Page from "./pages/Top100Page";
import ExplorePage from "./pages/ExplorePage";
import GenresPage from './pages/GenresPage';

// ==============================
// Layout component chung
// ==============================
function Layout({ children, query, setQuery }) {
  return (
    <div className="layout">
      <Sidebar />
      <main className="main">
        <Header query={query} setQuery={setQuery} />
        <div className="page-content">{children}</div>
      </main>
    </div>
  );
}

export default function App() {
  const { songs: apiSongs, loading, error } = useSongs();
  const player = useAudioPlayer(); // hook quản lý player
  const [query, setQuery] = useState("");

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
        <div className="loading">Đang tải...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="loading">
          Lỗi kết nối API: {error}
          <br />
          Vui lòng kiểm tra kết nối backend
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Trang chính */}
          <Route
            path="/"
            element={
              <Layout query={query} setQuery={setQuery}>
                <Hero songs={songs} player={player} />
                <NewReleases songs={filtered} player={player} />
                <FeaturedPlaylists songs={songs} player={player} />
                <ZingChart songs={songs} player={player} />
              </Layout>
            }
          />

          {/* Trang Top 100 */}
          <Route
            path="/top100"
            element={
              <Layout query={query} setQuery={setQuery}>
                <Top100Page songs={songs} player={player} />
              </Layout>
            }
          />

          {/* Trang Explore */}
          <Route
            path="/explore"
            element={
              <Layout query={query} setQuery={setQuery}>
                <ExplorePage songs={songs} player={player} />
              </Layout>
            }
          />

          {/* Trang Chủ đề & Thể loại */}
          <Route
            path="/genres"
            element={
              <Layout query={query} setQuery={setQuery}>
                <GenresPage songs={songs} player={player} />
              </Layout>
            }
          />
        </Routes>

        {/* PlayerBar luôn hiển thị */}
        <PlayerBar player={player} />
      </div>
    </Router>
  );
}
