import { FaCompass, FaChartLine, FaMusic, FaListOl, FaPlayCircle, FaCrown } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">🎵 Harmonia</div>

      <nav className="nav">
        <a href="#" className="nav-link active">
          <FaCompass className="icon" /> Khám phá
        </a>
        <a href="#" className="nav-link">
          <FaChartLine className="icon" /> BXH nhạc mới
        </a>
        <a href="#" className="nav-link">
          <FaMusic className="icon" /> Chủ đề & Thể loại
        </a>
        <a href="#" className="nav-link">
          <FaListOl className="icon" /> Top 100
        </a>
        <a href="#" className="nav-link">
          <FaPlayCircle className="icon" /> MV
        </a>
      </nav>

      <div className="premium-box">
        <FaCrown style={{ fontSize: '24px', marginBottom: '8px' }} />
        <div className="premium-title">Nghe nhạc chất lượng cao</div>
        <p>Trải nghiệm âm thanh lossless</p>
        <button className="btn">Nâng cấp VIP</button>
      </div>
    </aside>
  );
}
