export default function Icon({ name, className = "" }) {
  const paths = {
    play: "M6 4l20 12L6 28V4z",
    pause: "M6 4h8v24H6V4zm12 0h8v24h-8V4z",
    heart: "M16 29s-13-8.35-13-16A7 7 0 0 1 16 6a7 7 0 0 1 13 7c0 7.65-13 16-13 16z",
    next: "M6 6l12 8L6 22V6zm14 0h4v16h-4V6z",
    prev: "M26 6v16h-4V6h4zM6 22l12-8L6 6v16z",
    volume: "M6 12h6l8-6v24l-8-6H6V12zm18 0a6 6 0 0 1 0 12v-3a3 3 0 0 0 0-6v-3z",
    search: "M11 19a8 8 0 1 1 5.29 2.71L24 29l-2 2-7.71-7.71A8 8 0 0 1 11 19z",
  };

  // Nếu icon không tồn tại thì log cảnh báo
  if (!paths[name]) {
    console.warn(`⚠️ Icon "${name}" không tồn tại trong Icon.js`);
    return null;
  }

  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      role="img"
    >
      <path d={paths[name]} fill="currentColor" />
    </svg>
  );
}
