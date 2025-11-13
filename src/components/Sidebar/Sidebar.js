import { NavLink } from "react-router-dom";
import { 
  FaBookmark, 
  FaCompass, 
  FaChartLine, 
  FaMusic, 
  FaListOl, 
  FaBroadcastTower, 
  FaPlayCircle,
  FaPlus 
} from "react-icons/fa";

import "./Sidebar.css";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">🎵 Harmonia</div>

      <nav className="nav">
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
          end
        >
          <FaBookmark className="icon" /> Thư Viện
        </NavLink>

        <NavLink 
          to="/explore" 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          <FaCompass className="icon" /> Khám Phá
        </NavLink>

        <NavLink 
          to="/chart" 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          <FaChartLine className="icon" /> #zingchart
        </NavLink>

        <NavLink 
          to="/live" 
          className={({ isActive }) => isActive ? "nav-link active live" : "nav-link live"}
        >
          <FaBroadcastTower className="icon" /> 
          <span>Phòng Nhạc</span>
          <span className="live-badge">LIVE</span>
        </NavLink>

        <NavLink 
          to="/new" 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          <FaPlayCircle className="icon" /> BXH Nhạc Mới
        </NavLink>

        <NavLink 
          to="/genres" 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          <FaMusic className="icon" /> Chủ Đề & Thể Loại
        </NavLink>

        <NavLink 
          to="/top100" 
          className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
        >
          <FaListOl className="icon" /> Top 100
        </NavLink>
      </nav>

      <div className="login-section">
        <div className="login-text">
          Đăng nhập để khám phá playlist dành riêng cho bạn
        </div>
        <button className="login-btn">ĐĂNG NHẬP</button>
      </div>

      <div className="create-playlist">
        <NavLink to="/create-playlist" className="nav-link">
          <FaPlus className="icon" /> Tạo playlist mới
        </NavLink>
      </div>
    </aside>
  );
}
