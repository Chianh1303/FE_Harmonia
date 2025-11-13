import { useState, useEffect } from "react";
import { FaSearch, FaArrowLeft, FaArrowRight, FaCog, FaDownload } from "react-icons/fa";

export default function Header({ query, setQuery }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("user");
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    // 🔹 Khi dự án vừa chạy, luôn xóa dữ liệu mẫu (nếu có)
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <button className="nav-btn"><FaArrowLeft /></button>
        <button className="nav-btn"><FaArrowRight /></button>
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
        <button className="upgrade-btn">Nâng cấp tài khoản</button>
        <button className="download-btn">
          <FaDownload className="icon" /> Tải bản macOS
        </button>
        <button className="settings-btn"><FaCog /></button>

        {/* AVATAR + DROPDOWN */}
        <div className="user" style={{ position: "relative" }}>
          <img
            src="https://i.pravatar.cc/40"
            alt="avatar"
            className="avatar"
            onClick={toggleDropdown}
          />

          {isDropdownOpen && (
            <div className="dropdown-menu">
              {isLoggedIn ? (
                <>
                  <div className="dropdown-item">Hồ sơ cá nhân</div>
                  <div className="dropdown-item">Cài đặt</div>
                  <div className="dropdown-item" onClick={handleLogout}>
                    Đăng xuất
                  </div>
                </>
              ) : (
                <>
                  <div className="dropdown-item">Đăng nhập</div>
                  <div className="dropdown-item">Đăng ký</div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
