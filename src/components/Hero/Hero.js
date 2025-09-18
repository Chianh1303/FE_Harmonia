// src/components/Hero.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import SongRow from "../SongRow/SongRow";

export default function Hero({ player }) {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    // Transform API data to match frontend format  
    const fetchSongs = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/homeWorkSpace");
        const transformedSongs = res.data.slice(0, 5).map(song => ({
          id: song.songId,
          title: song.title,
          artist: song.artistName,
          cover: song.cover ? `http://localhost:8080/api/homeWorkSpace/cover/${song.cover}` : 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop',
          url: `http://localhost:8080/api/homeWorkSpace/stream/${song.songId}`,
          duration: 180,
          playCount: song.playCount || 0,
          createdAt: song.createdAt,
        }));
        setSongs(transformedSongs);
      } catch (err) {
        console.error("Lỗi khi fetch chart:", err);
      }
    };
    
    fetchSongs();
  }, []);

  return (
    <div className="hero">
      <div className="hero-banner">
        <div className="hero-banner-inner">
          <img
            src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=1200&auto=format&fit=crop"
            alt="Top Trending Music"
            className="hero-img"
          />
          <div className="hero-overlay"></div>
          <div className="hero-text">
            <h2 className="hero-title">Top Trending Music</h2>
            <p>Khám phá những bản hit hot nhất hôm nay</p>
          </div>
        </div>
      </div>

      {songs.map((s, i) => (
        <SongRow
          key={`${s.id || "song"}-${i}`}  
          index={i + 1}
          song={s}
          active={player.track?.id === s.id}
          onClick={() => {
            console.log('🎯 Hero: Playing track:', s);
            // Sử dụng playTrack để phát nhạc trực tiếp
            player.playTrack(s);
          }}
        />
      ))}

    </div>
  );
}
