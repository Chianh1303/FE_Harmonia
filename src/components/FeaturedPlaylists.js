import Section from "./Section";
import PlaylistCard from "./PlaylistCard";
import { MOCK_SONGS, MOCK_PLAYLISTS } from "../data/mockData";

export default function FeaturedPlaylists({ player }) {
  return (
    <Section
      title="Playlist nổi bật"
      right={<a className="see-all">Xem tất cả</a>}
    >
      <div className="grid">
        {MOCK_PLAYLISTS.map((pl) => (
          <PlaylistCard
            key={pl.id}
            item={pl}
            onPlay={() => {
              const first = MOCK_SONGS.find((s) => s.id === pl.songs[0]);
              if (first) {
                player.setTrack(first);
                player.setIsPlaying(true);
                setTimeout(() => player.toggle(), 0);
              }
            }}
          />
        ))}
      </div>
    </Section>
  );
}
