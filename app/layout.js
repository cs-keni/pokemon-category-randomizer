import "./globals.css";

export const metadata = {
  title: "Nuzlocke Randomizer",
  description: "Randomly generate 3 Pokémon categories for your Nuzlocke run",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
