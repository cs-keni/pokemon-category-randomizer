"use client";

import { useState, useEffect } from "react";

// 32x32 pixel-art tall grass tile (Pokémon-style)
const grassTileSvg = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#1a5c1a"/>
  <rect x="0" y="24" width="32" height="8" fill="#0d3d0d"/>
  <rect x="1" y="4" width="2" height="24" fill="#2e8b2e"/>
  <rect x="5" y="8" width="2" height="20" fill="#228b22"/>
  <rect x="9" y="2" width="2" height="26" fill="#3cb371"/>
  <rect x="13" y="6" width="2" height="22" fill="#228b22"/>
  <rect x="17" y="0" width="2" height="28" fill="#2e8b2e"/>
  <rect x="21" y="10" width="2" height="18" fill="#3cb371"/>
  <rect x="25" y="4" width="2" height="24" fill="#228b22"/>
  <rect x="29" y="8" width="2" height="20" fill="#2e8b2e"/>
</svg>
`)}`;

function getIsNight(theme) {
  if (theme === "day") return false;
  if (theme === "night") return true;
  const h = new Date().getHours();
  return h < 6 || h >= 18;
}

export default function Background({ cardHovered = false, theme = "auto" }) {
  const [scrollY, setScrollY] = useState(0);
  const isNight = getIsNight(theme);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pokeballPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Ccircle cx='30' cy='30' r='28' fill='none' stroke='%23fff' stroke-width='1' opacity='0.06'/%3E%3Cpath d='M30 2 L30 58 M2 30 L58 30' fill='none' stroke='%23fff' stroke-width='0.5' opacity='0.04'/%3E%3Ccircle cx='30' cy='30' r='6' fill='%23fff' opacity='0.03'/%3E%3C/svg%3E")`;

  const baseGradient = isNight
    ? "linear-gradient(135deg, #0d1117 0%, #161b22 40%, #1c2128 100%)"
    : "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)";

  return (
    <>
      {/* Base gradient + Pokéball pattern */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -3,
          background: baseGradient,
          backgroundImage: `${pokeballPattern}, ${baseGradient}`,
          backgroundSize: "60px 60px, 100% 100%",
          backgroundPosition: "0 0, 0 0",
        }}
      />

      {/* Stars (night only) */}
      {isNight && (
        <div
          className="stars-layer"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: -2,
            backgroundImage: `radial-gradient(2px 2px at 20px 30px, rgba(255,255,255,0.4), transparent),
              radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.3), transparent),
              radial-gradient(2px 2px at 50px 160px, rgba(255,255,255,0.35), transparent),
              radial-gradient(2px 2px at 90px 40px, rgba(255,255,255,0.3), transparent),
              radial-gradient(2px 2px at 130px 80px, rgba(255,255,255,0.4), transparent),
              radial-gradient(2px 2px at 200px 120px, rgba(255,255,255,0.25), transparent)`,
            backgroundSize: "250px 250px",
            opacity: 0.8,
          }}
        />
      )}

      {/* Parallax: Far mountains (slow) */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -2,
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400">
              <path d="M0 400 L0 280 Q150 180 300 220 L450 160 Q600 100 750 180 L900 120 Q1050 80 1200 140 L1200 400 Z" fill="${isNight ? "%230d1117" : "%231a2744"}" opacity="0.6"/>
              <path d="M0 400 L0 320 Q200 240 400 280 L600 220 Q800 180 1000 240 L1200 200 L1200 400 Z" fill="${isNight ? "%2308090d" : "%23121a2e"}" opacity="0.5"/>
            </svg>
          `)}")`,
          backgroundSize: "120% 100%",
          backgroundPosition: `${-scrollY * 0.05}px 0`,
          backgroundRepeat: "no-repeat",
          opacity: 0.9,
        }}
      />

      {/* Parallax: Clouds (drifting) */}
      <div
        className="parallax-clouds"
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -2,
          opacity: isNight ? 0.5 : 1,
          backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200">
              <ellipse cx="100" cy="80" rx="60" ry="25" fill="%23ffffff" opacity="0.12"/>
              <ellipse cx="160" cy="85" rx="45" ry="20" fill="%23ffffff" opacity="0.1"/>
              <ellipse cx="350" cy="120" rx="80" ry="30" fill="%23ffffff" opacity="0.1"/>
              <ellipse cx="420" cy="115" rx="55" ry="22" fill="%23ffffff" opacity="0.08"/>
              <ellipse cx="600" cy="60" rx="70" ry="28" fill="%23ffffff" opacity="0.11"/>
              <ellipse cx="670" cy="65" rx="50" ry="20" fill="%23ffffff" opacity="0.09"/>
            </svg>
          `)}")`,
          backgroundSize: "100% auto",
          backgroundPosition: "0 20px",
          backgroundRepeat: "repeat-x",
          animation: "cloudDrift 45s linear infinite",
        }}
      />

      {/* Grass layer at bottom */}
      <div
        className={cardHovered ? "grass-layer grass-rustle" : "grass-layer"}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "120px",
          zIndex: -1,
          backgroundImage: `url("${grassTileSvg}")`,
          backgroundRepeat: "repeat-x",
          backgroundSize: "64px 64px",
          backgroundPosition: "0 bottom",
          opacity: 0.85,
          pointerEvents: "none",
        }}
      />
    </>
  );
}
