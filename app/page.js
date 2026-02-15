"use client";

import { useState } from "react";

function capitalize(str) {
  if (!str) return "";
  return str
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(" ");
}

function ChoiceCard({ choice, revealed, onReveal }) {
  const { category, name } = choice;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={revealed ? undefined : onReveal}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(255, 255, 255, 0.08)",
        border: "2px solid rgba(255, 255, 255, 0.15)",
        borderRadius: "16px",
        padding: "2rem 2.5rem",
        minWidth: "220px",
        textAlign: "center",
        fontWeight: 600,
        boxShadow: hovered && !revealed
          ? "0 12px 40px rgba(0, 0, 0, 0.35), 0 0 24px rgba(233, 69, 96, 0.2)"
          : "0 8px 32px rgba(0, 0, 0, 0.2)",
        cursor: revealed ? "default" : "pointer",
        transform: hovered && !revealed ? "scale(1.05)" : "scale(1)",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
    >
      {revealed ? (
        <div style={{ fontSize: "1.6rem" }}>{capitalize(name)}</div>
      ) : (
        <div>
          <span style={{ fontSize: "0.85rem", opacity: 0.8 }}>The </span>
          <span style={{ fontSize: "1.5rem" }}>{category}</span>
          <span style={{ fontSize: "0.85rem", opacity: 0.8 }}> Pokémon</span>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [choices, setChoices] = useState(null);
  const [revealed, setRevealed] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generation, setGeneration] = useState("");

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    setChoices(null);
    setRevealed(new Set());

    try {
      const url = generation
        ? `/api/random-pokemon?generation=${encodeURIComponent(generation)}`
        : "/api/random-pokemon";
      const res = await fetch(url);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      setChoices(data.choices || []);
    } catch (err) {
      setError("Failed to load categories. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        boxSizing: "border-box",
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        color: "#eee",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: 700,
          marginBottom: "1rem",
          letterSpacing: "0.05em",
        }}
      >
        Nuzlocke Randomizer
      </h1>

      <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <label htmlFor="gen" style={{ fontSize: "0.9rem", color: "#aaa" }}>
          Generation:
        </label>
        <select
          id="gen"
          value={generation}
          onChange={(e) => setGeneration(e.target.value)}
          disabled={loading}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            border: "1px solid rgba(255,255,255,0.2)",
            background: "rgba(0,0,0,0.2)",
            color: "#eee",
            fontSize: "0.95rem",
          }}
        >
          <option value="">All</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
            <option key={n} value={n}>
              Gen {n}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleGenerate}
        disabled={loading}
        style={{
          padding: "1rem 2rem",
          fontSize: "1.1rem",
          fontWeight: 600,
          border: "none",
          borderRadius: "12px",
          background: loading ? "#555" : "linear-gradient(135deg, #e94560 0%, #c23a51 100%)",
          color: "#fff",
          cursor: loading ? "not-allowed" : "pointer",
          boxShadow: "0 4px 20px rgba(233, 69, 96, 0.3)",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
        onMouseOver={(e) => {
          if (!loading) {
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 6px 24px rgba(233, 69, 96, 0.4)";
          }
        }}
        onMouseOut={(e) => {
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "0 4px 20px rgba(233, 69, 96, 0.3)";
        }}
      >
        {loading ? "Loading…" : "Generate 3 Pokémon Categories"}
      </button>

      {error && (
        <p
          style={{
            marginTop: "1.5rem",
            padding: "1rem 1.5rem",
            background: "rgba(200, 50, 50, 0.2)",
            borderRadius: "8px",
            color: "#ff8888",
            maxWidth: "400px",
          }}
        >
          {error}
        </p>
      )}

      {choices && choices.length > 0 && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginTop: "2.5rem",
            justifyContent: "center",
          }}
        >
          {choices.map((choice, i) => (
            <ChoiceCard
              key={i}
              choice={choice}
              revealed={revealed.has(i)}
              onReveal={() => setRevealed((prev) => new Set(prev).add(i))}
            />
          ))}
        </div>
      )}
    </main>
  );
}
