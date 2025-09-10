import { FaSearch, FaArrowLeft, FaArrowRight, FaCog, FaDownload } from "react-icons/fa";

export default function Header({ query, setQuery }) {
  return (
    <header className="header">
      <div className="header-left">
        <button className="nav-btn">
          <FaArrowLeft />
        </button>
        <button className="nav-btn">
          <FaArrowRight />
        </button>
      </div>

      <div className="search-bar">
        <FaSearch className="icon" />
        <input
          className="search"
          placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="header-right">
        <button className="upgrade-btn">
          Nâng cấp tài khoản
        </button>
        <button className="download-btn">
          <FaDownload className="icon" />
          Tải bản macOS
        </button>
        <button className="settings-btn">
          <FaCog />
        </button>
        <div className="user">
          <img
            src="https://i.pravatar.cc/40"
            alt="avatar"
            className="avatar"
          />
        </div>
      </div>
    </header>
  );
}
