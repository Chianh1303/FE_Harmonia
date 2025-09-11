import React, { useMemo, useState } from "react";
import "./index.css";

import { MOCK_SONGS } from "./data/mockData";
import useAudioPlayer from "./hooks/useAudioPlayer";

// Components
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import ZingChart from "./components/ZingChart/ZingChart";
import NewReleases from "./components/NewReleases/NewReleases";
import FeaturedPlaylists from "./components/FeaturedPlaylists/FeaturedPlaylists";
import PlayerBar from "./components/PlayerBar/PlayerBar";
import SongRow from "./components/SongRow/SongRow";


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
