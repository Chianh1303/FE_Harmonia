// src/components/Section.js
export default function Section({ title, right, children }) {
  return (
    <section className="section">
      {/* Header */}
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        {right && <div className="section-right">{right}</div>}
      </div>

      {/* Body */}
      <div className="section-body">{children}</div>
    </section>
  );
}
