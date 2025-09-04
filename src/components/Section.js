export default function Section({ title, right, children }) {
  return (
    <section className="section">
      <div className="section-header">
        <h2>{title}</h2>
        {right}
      </div>
      <div className="section-body">{children}</div>
    </section>
  );
}
