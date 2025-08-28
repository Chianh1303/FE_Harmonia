export default function Icon({ name, className }) {
  switch (name) {
    case "search":
      return <span className={className}>🔍</span>;
    case "play":
      return <span className={className}>▶</span>;
    case "pause":
      return <span className={className}>⏸</span>;
    case "volume":
      return <span className={className}>🔊</span>;
    default:
      return <span className={className}>⬜</span>;
  }
}
