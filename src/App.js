import React, { useMemo, useState } from "react";
import "./index.css";
import { MOCK_SONGS } from "./data/mockData";
import useAudioPlayer from "./hooks/useAudioPlayer";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ZingChart from "./components/ZingChart";
import NewReleases from "./components/NewReleases";
import FeaturedPlaylists from "./components/FeaturedPlaylists";
import PlayerBar from "./components/PlayerBar";

export default function App() {
  const player = useAudioPlayer(); // Bỏ track mặc định
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MOCK_SONGS;
    return MOCK_SONGS.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.artist.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="app">
      <div className="layout">
        <Sidebar />
        <main className="main">
          <Header query={query} setQuery={setQuery} />
          <Hero songs={MOCK_SONGS} player={player} />
          <NewReleases songs={filtered} player={player} />
          <FeaturedPlaylists player={player} />
          <ZingChart player={player} />
        </main>
      </div>
      <PlayerBar player={player} />
    </div>
  );
}
