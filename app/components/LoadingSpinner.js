"use client";

export default function LoadingSpinner() {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          animation: "pokeballSpin 1s linear infinite",
        }}
      >
        <circle cx="16" cy="16" r="14" stroke="#333" strokeWidth="2" fill="none" />
        <path d="M2 16 A14 14 0 0 1 30 16" fill="#e53935" />
        <path d="M2 16 A14 14 0 0 0 30 16" fill="#f5f5f5" />
        <line x1="2" y1="16" x2="30" y2="16" stroke="#333" strokeWidth="2" />
        <circle cx="16" cy="16" r="4" fill="#333" />
      </svg>
      Loading…
    </span>
  );
}
