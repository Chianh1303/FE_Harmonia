import Section from "./Section";
import Icon from "./Icon";

export default function NewReleases({ songs, player }) {
  return (
    <Section title="Mới phát hành">
      <div className="grid">
        {songs.map((s) => (
          <div key={s.id} className="release-card">
            <img src={s.cover} alt={s.title} className="release-img" />
            <div className="release-content">
              <div>{s.title}</div>
              <div className="artist">{s.artist}</div>
            </div>
            <button
              onClick={() => {
                player.setTrack(s);
                player.setIsPlaying(true);
                setTimeout(() => player.toggle(), 0);
              }}
              className="release-btn"
            >
              <Icon name="play" className="icon" />
            </button>
          </div>
        ))}
      </div>
    </Section>
  );
}
