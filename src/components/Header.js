import { FaSearch } from "react-icons/fa";

export default function Header({ query, setQuery }) {
  return (
    <header className="header">
      <div className="search-bar">
        <FaSearch className="icon" />
        <input
          className="search"
          placeholder="Tìm kiếm bài hát, nghệ sĩ, playlist..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
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
