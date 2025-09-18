import { useState, useEffect } from 'react';
import { songAPI } from '../services/api';

export const useSongs = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSongs = async () => {
    try {
      setLoading(true);
      console.log('🎵 Fetching songs from API...');
      const songsData = await songAPI.getAllSongs();
      console.log('📦 Raw API response:', songsData);
      
      // Transform API data to match frontend format
      const transformedSongs = songsData.map(song => {
        const transformed = {
          id: song.songId,
          title: song.title,
          artist: song.artistName, // Changed from song.artist to song.artistName
          cover: song.cover ? songAPI.getCoverUrl(song.cover) : 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop',
          url: songAPI.getStreamUrl(song.songId),
          duration: 180, // Default duration since backend doesn't provide this
          playCount: song.playCount || 0,
          createdAt: song.createdAt,
        };
        console.log('🎧 Transformed song:', transformed);
        return transformed;
      });
      
      console.log('✅ All transformed songs:', transformedSongs);
      setSongs(transformedSongs);
      setError(null);
    } catch (err) {
      console.error('❌ Failed to fetch songs:', err);
      setError(err.message);
      // Fallback to empty array if API fails
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
