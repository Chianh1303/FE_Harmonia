export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">Harmonia</div>
      <nav className="nav">
        {["Khám phá","BXH nhạc mới","Chủ đề & Thể loại","Top 100","MV"].map((label) => (
          <a key={label} className="nav-link">{label}</a>
        ))}
      </nav>
    </aside>
  );
}
