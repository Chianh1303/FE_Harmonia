import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/homeWorkSpace';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const songAPI = {
  // Lấy tất cả bài hát
  getAllSongs: async () => {
    try {
      const response = await api.get('');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getStreamUrl: (songId) => {
    return `${API_BASE_URL}/stream/${songId}`;
  },

  getCoverUrl: (coverFilename) => {
    return `${API_BASE_URL}/cover/${coverFilename}`;
  },

  uploadSong: async (formData) => {
    try {
      const response = await api.post('/save', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default api;
