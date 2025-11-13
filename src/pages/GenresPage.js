import React, { useState } from "react";
import { FaPlay } from "react-icons/fa";
import "./GenresPage.css"; // nhớ tạo file CSS đi kèm

export default function GenresPage({ songs = [], player }) {
  // Lấy danh sách thể loại từ songs (unique)
  const allGenres = Array.from(new Set(songs.map((s) => s.genre))).filter(Boolean);

  const [selectedGenre, setSelectedGenre] = useState(null);

  // Bài hát theo thể loại
  const genreSongs = selectedGenre
    ? songs.filter((s) => s.genre === selectedGenre)
    : [];

  const handlePlaySong = (song) => {
    if (player && player.playTrack) {
      player.playTrack(song);
    }
  };

  return (
    <div className="genres-page">
      <h2 className="page-title">Thể loại</h2>

      {/* Grid thể loại */}
      {!selectedGenre && (
        <div className="genres-grid">
          {allGenres.map((genre, idx) => (
            <div
              key={idx}
              className="genre-card"
              onClick={() => setSelectedGenre(genre)}
            >
              <div className="genre-cover">
                <img
                  src={`https://picsum.photos/200?random=${idx + 10}`}
                  alt={genre}
                />
              </div>
              <h3>{genre}</h3>
              <p>{songs.filter((s) => s.genre === genre).length} bài hát</p>
            </div>
          ))}
        </div>
      )}

      {/* List bài hát khi chọn thể loại */}
      {selectedGenre && (
        <div className="genre-songs">
          <button className="back-btn" onClick={() => setSelectedGenre(null)}>
            ← Quay lại
          </button>
          <h3>Bài hát: {selectedGenre}</h3>
          <div className="songs-list">
            {genreSongs.length === 0 && <p>Không có bài hát nào.</p>}
            {genreSongs.map((song, idx) => (
              <div
                key={song.id}
                className={`song-item ${
                  player.track?.id === song.id ? "active" : ""
                }`}
                onClick={() => handlePlaySong(song)}
              >
                <div className="song-rank">{idx + 1}</div>
                <img
                  src={song.cover || "https://i.pravatar.cc/60"}
                  alt={song.title}
                  className="song-cover"
                />
                <div className="song-info">
                  <h4 className="song-title">{song.title}</h4>
                  <p className="song-artist">{song.artist}</p>
                </div>
                <button className="play-btn">
                  <FaPlay />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
