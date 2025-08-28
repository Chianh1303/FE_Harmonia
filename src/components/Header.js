import Icon from "./Icon";

export default function Header({ query, setQuery }) {
  return (
    <div className="header">
      <div className="search-box">
        <Icon name="search" className="icon search-icon" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm bài hát, nghệ sĩ, playlist…"
        />
      </div>
      <img
        src="https://i.pravatar.cc/40?img=13"
        alt="avatar"
        className="avatar"
      />
    </div>
  );
}
