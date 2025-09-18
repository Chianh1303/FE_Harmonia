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

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">🎵 Harmonia</div>

      <nav className="nav">
        <a href="#" className="nav-link active">
          <FaBookmark className="icon" /> Thư Viện
        </a>
        <a href="#" className="nav-link">
          <FaCompass className="icon" /> Khám Phá
        </a>
        <a href="#" className="nav-link">
          <FaChartLine className="icon" /> #zingchart
        </a>
        <a href="#" className="nav-link live">
          <FaBroadcastTower className="icon" /> 
          <span>Phòng Nhạc</span>
          <span className="live-badge">LIVE</span>
        </a>
        <a href="#" className="nav-link">
          <FaPlayCircle className="icon" /> BXH Nhạc Mới
        </a>
        <a href="#" className="nav-link">
          <FaMusic className="icon" /> Chủ Đề & Thể Loại
        </a>
        <a href="#" className="nav-link">
          <FaListOl className="icon" /> Top 100
        </a>
      </nav>

      <div className="login-section">
        <div className="login-text">
          Đăng nhập để khám phá playlist dành riêng cho bạn
        </div>
        <button className="login-btn">ĐĂNG NHẬP</button>
      </div>

      <div className="create-playlist">
        <a href="#" className="nav-link">
          <FaPlus className="icon" /> Tạo playlist mới
        </a>
      </div>
    </aside>
  );
}
