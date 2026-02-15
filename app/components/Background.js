"use client";

export default function Background() {
  const pokeballPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Ccircle cx='30' cy='30' r='28' fill='none' stroke='%23fff' stroke-width='1' opacity='0.06'/%3E%3Cpath d='M30 2 L30 58 M2 30 L58 30' fill='none' stroke='%23fff' stroke-width='0.5' opacity='0.04'/%3E%3Ccircle cx='30' cy='30' r='6' fill='%23fff' opacity='0.03'/%3E%3C/svg%3E")`;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
        backgroundImage: `${pokeballPattern}, linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)`,
        backgroundSize: "60px 60px, 100% 100%",
        backgroundPosition: "0 0, 0 0",
      }}
    />
  );
}
