import React, { useMemo, useState } from "react";
import { MOCK_SONGS, MOCK_PLAYLISTS } from "../data/mockData";
import useAudioPlayer from "../hooks/useAudioPlayer";
import Section from "../components/Section";
import SongRow from "../components/SongRow";
import PlaylistCard from "../components/PlaylistCard";
import Icon from "../components/Icon";

export default function Home() {
  const player = useAudioPlayer(MOCK_SONGS[0]);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MOCK_SONGS;
    return MOCK_SONGS.filter((s) => s.title.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q));
  }, [query]);

  return (
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
        ...
      </div>

      {/* New Releases */}
      <Section title="Mới phát hành">
        ...
      </Section>

      {/* Playlists */}
      <Section title="Playlist nổi bật" right={<a className="see-all">Xem tất cả</a>}>
        ...
      </Section>
    </main>
  );
}
