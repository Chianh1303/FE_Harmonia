import { FaCompass, FaChartLine, FaMusic, FaListOl, FaPlayCircle } from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">Harmonia</div>

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

      {/* <div className="upgrade-box">
        <p>Nghe nhạc không quảng cáo</p>
        <button>Nâng cấp</button>
      </div> */}
    </aside>
  );
}
