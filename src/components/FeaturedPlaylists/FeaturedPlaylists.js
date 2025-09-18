import Section from "../Section/Section";
import PlaylistCard from "../PlaylistCard/PlaylistCard";
import { MOCK_PLAYLISTS } from "../../data/mockData";

export default function FeaturedPlaylists({ songs = [], player }) {
  return (
    <Section
      title="🎧 Playlist nổi bật"
      right={<a className="see-all">Xem tất cả</a>}
    >
      <div className="grid">
        {MOCK_PLAYLISTS.slice(0, 5).map((pl) => (
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
