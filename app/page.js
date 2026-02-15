"use client";

import { useState } from "react";
import { GAMES } from "./games";
import Background from "./components/Background";
import LoadingSpinner from "./components/LoadingSpinner";

const SPRITE_BASE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

function capitalize(str) {
  if (!str) return "";
  return str
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
    .join(" ");
}

function ChoiceCard({ choice, revealed, onReveal, index }) {
  const { category, name, id } = choice;
  const [hovered, setHovered] = useState(false);
  const spriteUrl = id ? `${SPRITE_BASE}/${id}.png` : null;

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.08)",
    border: "2px solid rgba(255, 255, 255, 0.15)",
    borderRadius: "16px",
    padding: "2rem 2.5rem",
    minWidth: "220px",
    minHeight: "180px",
    textAlign: "center",
    fontWeight: 600,
    boxShadow: hovered && !revealed
      ? "0 12px 40px rgba(0, 0, 0, 0.35), 0 0 24px rgba(233, 69, 96, 0.2)"
      : "0 8px 32px rgba(0, 0, 0, 0.2)",
    cursor: revealed ? "default" : "pointer",
    transform: hovered && !revealed ? undefined : "scale(1)",
    transition: "transform 0.2s, box-shadow 0.2s",
    animation:
      hovered && !revealed ? "cardHoverPulse 1.2s ease-in-out infinite" : undefined,
  };

  const faceStyle = {
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    borderRadius: "14px",
    padding: "2rem 2.5rem",
    minHeight: "120px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const innerStyle = {
    transformStyle: "preserve-3d",
    transition: "transform 0.5s ease-in-out",
    transform: revealed ? "rotateY(180deg)" : "rotateY(0deg)",
    position: "relative",
    width: "100%",
  };

  const frontFaceStyle = {
    ...faceStyle,
    position: revealed ? "absolute" : "relative",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  const backFaceStyle = {
    ...faceStyle,
    transform: "rotateY(180deg)",
    position: revealed ? "relative" : "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  return (
    <div
      style={{
        animation: "cardEnter 0.4s ease-out both",
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div
        onClick={revealed ? undefined : onReveal}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          ...cardStyle,
          perspective: "1000px",
        }}
      >
      <div style={{ ...innerStyle }}>
        <div style={frontFaceStyle}>
          <div>
            <span style={{ fontSize: "0.85rem", opacity: 0.8 }}>The </span>
            <span style={{ fontSize: "1.5rem" }}>{category}</span>
            <span style={{ fontSize: "0.85rem", opacity: 0.8 }}> Pokémon</span>
          </div>
        </div>
        <div style={backFaceStyle}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.75rem",
              animation: revealed ? "cardRevealPop 0.35s ease-out 0.2s both" : undefined,
            }}
          >
            {spriteUrl && (
              <img
                src={spriteUrl}
                alt=""
                style={{ width: "96px", height: "96px", imageRendering: "auto" }}
              />
            )}
            <div style={{ fontSize: "1.6rem" }}>{capitalize(name)}</div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [choices, setChoices] = useState(null);
  const [revealed, setRevealed] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [game, setGame] = useState("");
  const [buttonPressed, setButtonPressed] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    setError(null);
    setChoices(null);
    setRevealed(new Set());

    try {
      const url = game
        ? `/api/random-pokemon?maxGeneration=${encodeURIComponent(game)}`
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
    <>
      <Background />
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          boxSizing: "border-box",
          color: "#eee",
          position: "relative",
          zIndex: 1,
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
          <label htmlFor="game" style={{ fontSize: "0.9rem", color: "#aaa" }}>
            Game:
          </label>
          <select
            id="game"
            value={game}
            onChange={(e) => setGame(e.target.value)}
            disabled={loading}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              border: "1px solid rgba(255,255,255,0.2)",
              background: "rgba(0,0,0,0.2)",
              color: "#eee",
              fontSize: "0.95rem",
              minWidth: "220px",
            }}
          >
            <option value="">All Pokémon</option>
            {GAMES.map((g) => (
              <option key={g.label} value={String(g.maxGen)}>
                {g.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          onMouseDown={() => setButtonPressed(true)}
          onMouseUp={() => setButtonPressed(false)}
          onMouseLeave={() => setButtonPressed(false)}
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
            transition: "transform 0.1s, box-shadow 0.2s",
            transform: buttonPressed && !loading ? "scale(0.98)" : "translateY(0)",
          }}
          onMouseOver={(e) => {
            if (!loading && !buttonPressed) {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 6px 24px rgba(233, 69, 96, 0.4)";
            }
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = buttonPressed ? "scale(0.98)" : "translateY(0)";
            e.currentTarget.style.boxShadow = "0 4px 20px rgba(233, 69, 96, 0.3)";
          }}
        >
          {loading ? <LoadingSpinner /> : "Generate 3 Pokémon Categories"}
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
                index={i}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
