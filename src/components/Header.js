export default function Header({ query, setQuery }) {
  return (
    <header className="header">
      <input
        className="search"
        placeholder="Tìm kiếm bài hát, nghệ sĩ, playlist..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className="user">
        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="avatar"
        />
      </div>
    </header>
  );
}
