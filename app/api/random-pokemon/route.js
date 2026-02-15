const POKEAPI_BASE = "https://pokeapi.co/api/v2";

async function fetchJson(url) {
  const res = await fetch(url, {
    headers: { "Accept": "application/json" },
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(`PokéAPI error: ${res.status}`);
  }
  return res.json();
}

function getEnglishGenus(detail) {
  const genera = detail.genera || [];
  const enGenus = genera.find((g) => g.language?.name === "en");
  if (!enGenus || !enGenus.genus) return null;
  return enGenus.genus.replace(/\s*Pokémon\s*$/i, "").trim() || null;
}

function pickRandomUnique(arr, count) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

async function getSpeciesForMaxGeneration(maxGen) {
  const all = [];
  for (let g = 1; g <= maxGen; g++) {
    const genData = await fetchJson(`${POKEAPI_BASE}/generation/${g}`);
    const species = genData.pokemon_species || [];
    all.push(...species);
  }
  return all;
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const maxGeneration = searchParams.get("maxGeneration");

    let speciesList = [];

    if (maxGeneration) {
      const maxGen = parseInt(maxGeneration, 10);
      if (isNaN(maxGen) || maxGen < 1 || maxGen > 9) {
        return Response.json(
          { error: "Invalid maxGeneration. Use 1–9." },
          { status: 400 }
        );
      }
      speciesList = await getSpeciesForMaxGeneration(maxGen);
    } else {
      const listData = await fetchJson(
        `${POKEAPI_BASE}/pokemon-species?limit=10000`
      );
      speciesList = listData.results || [];
    }

    if (speciesList.length < 3) {
      return Response.json(
        { error: "Not enough species available for selection." },
        { status: 503 }
      );
    }

    const choices = [];
    const seen = new Set();
    const shuffled = pickRandomUnique(speciesList, Math.min(speciesList.length, 20));

    for (const speciesRef of shuffled) {
      if (choices.length >= 3) break;
      const url = speciesRef.url;
      if (!url) continue;
      const detail = await fetchJson(url);
      const genus = getEnglishGenus(detail);
      const name = detail.name || speciesRef.name;
      const id = detail.id;
      if (genus && name && !seen.has(genus)) {
        seen.add(genus);
        choices.push({ category: genus, name, id });
      }
    }

    if (choices.length < 3) {
      return Response.json(
        { error: "Could not generate 3 unique categories." },
        { status: 503 }
      );
    }

    return Response.json({ choices });
  } catch (err) {
    console.error("[random-pokemon]", err.message);
    return Response.json(
      { error: "Failed to fetch Pokémon data. Please try again." },
      { status: 502 }
    );
  }
}
