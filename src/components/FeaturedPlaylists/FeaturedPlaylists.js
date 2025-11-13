import Section from "../Section/Section";
import PlaylistCard from "../PlaylistCard/PlaylistCard";

export default function FeaturedPlaylists({ songs = [], player }) {
  // Create playlists from actual songs
  const playlists = songs.length > 0 ? [
    {
      id: 1,
      name: "Top Hits",
      cover: songs[0]?.cover,
      songs: songs.slice(0, 3).map(s => s.id)
    },
    {
      id: 2,
      name: "Latest Songs", 
      cover: songs[1]?.cover,
      songs: songs.slice(-3).map(s => s.id)
    }
  ] : [];

  if (songs.length === 0) {
    return null; 
  }
  return (
    <Section
      title="🎧 Playlist nổi bật"
      right={<a className="see-all">Xem tất cả</a>}
    >
      <div className="grid">
        {playlists.map((pl) => (
          <PlaylistCard
            key={pl.id}
            
            item={pl}
            onPlay={() => {
              const first = songs.find((s) => s.id === pl.songs[0]);
              if (first) {
                if (player.playTrack) {
                  player.playTrack(first);
                } else {
                  player.setTrack(first);
                  player.setIsPlaying(true);
                  setTimeout(() => player.toggle(), 0);
                }
              }
            }}
          />
        ))}
      </div>
    </Section>
  );
}
