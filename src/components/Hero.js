export default function Hero({ songs, player }) {
  const song = songs[0];

  return (
    <div className="hero">
      <img src={song.cover} alt="" className="hero-img" />
      <div className="hero-content">
        <h1>{song.title}</h1>
        <p>{song.artist}</p>
        <button
          onClick={() => {
            player.setTrack(song);
            player.setIsPlaying(true);
          }}
        >
          ▶ Nghe ngay
        </button>
      </div>
    </div>
  );
}
