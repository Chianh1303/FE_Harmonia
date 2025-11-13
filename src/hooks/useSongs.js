import { useState, useEffect } from 'react';
import { songAPI } from '../services/api';

export const useSongs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSongs = async () => {
    try {
      setLoading(true);
      const songsData = await songAPI.getAllSongs();

      // Bước 1: map sơ bộ để lấy thông tin cơ bản
      const baseSongs = songsData.map(song => ({
        id: song.songId,
        title: song.title,
        artist: song.artistName,
        cover: song.cover
          ? songAPI.getCoverUrl(song.cover)
          : 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop',
        url: songAPI.getStreamUrl(song.songId),
        duration: (song.duration ?? 0) / 1000, 
        playCount: song.playCount || 0,
        createdAt: song.createdAt,
      }));

      // Bước 2: lấy đúng duration từ file âm thanh thật
      const updatedSongs = await Promise.all(
        baseSongs.map(async (s) => {
          try {
            const audio = new Audio(s.url);
            // Đợi cho metadata load xong
            await new Promise((resolve, reject) => {
              audio.addEventListener("loadedmetadata", () => resolve(), { once: true });
              audio.addEventListener("error", () => reject(), { once: true });
            });
            return { ...s, duration: audio.duration }; // duration chuẩn (giây)
          } catch {
            return s; // nếu lỗi, giữ nguyên duration tạm
          }
        })
      );

      setSongs(updatedSongs);
      setError(null);
    } catch (err) {
      setError(err.message);
      setSongs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return { songs, loading, error, refetch: fetchSongs };
};
