# Pokémon Nuzlocke Randomizer — Ideas & Brainstorm

A living brainstorm doc for features, polish, and new directions. The **core randomizer** (3 category choices → click to reveal) stays sacred. Everything else is optional.

---

## Background & Atmosphere

- **Pokéball / Pokémon-themed background**
  - Subtle tiled Pokéball pattern
  - Gradient with faint Pokéball silhouettes
  - Parallax layers (grass, clouds, distant mountains)
  - Seasonal variants (autumn leaves, snow, cherry blossoms)

- **Grass from Pokémon games**
  - Pixel-art tall grass patches that sway
  - Grass rustles on hover near cards
  - Different grass styles per region (Kanto vs Kalos, etc.)

- **World-building elements**
  - Towns and houses in the background
  - Silhouettes of NPCs and trainers
  - Route signs, fences, trees
  - Day/night cycle (affects lighting and ambience)

- **Sky & weather**
  - Gentle clouds drifting
  - Optional weather (rain, sun, fog)
  - Stars at night

---

## Pokémon “Alive” on the Site

- **Roaming Pokémon**
  - Sprite-based Pokémon walking around the page
  - Path-following or random wandering
  - Speed tied to species or “mood”
  - Stops near grass, water, or UI elements

- **Interaction**
  - Hover over a Pokémon → subtle animation (look, bounce)
  - Click a roaming Pokémon → small reaction (sparkle, noise, emote)

- **Variety**
  - Different Pokémon based on selected game
  - Rarity: some species appear more rarely
  - Evolution lines walking together occasionally

- **Terrain**
  - Grass tiles where Grass-type feel “at home”
  - Water edges for Water-type
  - Rocks / caves for Rock/Ground
  - Different zones for different types

---

## UI & Animations

- **Sliding pill / tab navigation**
  - Animated pill underlining active section
  - Smooth slide when switching pages
  - Spring or elastic feel for snappy feedback

- **Card animations**
  - Cards slide in from sides/bottom on load
  - Staggered reveal (one after another)
  - Flip or “unfold” when revealing Pokémon
  - Shake or pulse on hover before click

- **Button & interaction**
  - Generate button with press-in effect
  - Loading spinner themed like a Pokéball
  - Success/celebration micro-animation on reveal

- **Page transitions**
  - Fade/slide between routes
  - Shared element transitions (e.g. card → detail view)

---

## New Pages & Features

### Randomizer Enhancements (same page)
- **History**: “Previously generated” list (last N choices)
- **Lock favorites**: Pin one or more choices so they stay when regenerating
- **Share**: Copy link or image of current 3 choices (with game filter)

### Additional Tools (new pages)
- **Route randomizer**: Random encounter tables per route/game
- **Team builder**: Build a team of 6 from category hints
- **Death tracker**: Nuzlocke death box / graveyard
- **Encounter log**: Log first encounter per route with timestamps
- **Rule generator**: Random Nuzlocke rules (hardcore, Wedlocke, etc.)

### Settings & Accessibility
- **Animation toggle**: Reduce or disable motion
- **Sprite style**: Official artwork vs pixel sprite vs sprite sheet
- **Color theme**: Region- or game-inspired palettes
- **High-contrast mode**: Better readability

---

## Sound & Haptics

- **Optional SFX**
  - Pokéball open on reveal
  - Menu click sounds
  - Footsteps on grass (looped, subtle)
  - Victory jingle on full reveal

- **Volume controls**
  - Master, SFX, ambient sliders
  - Mute button

---

## Gamification & Engagement

- **Streak / stats**
  - “Pokémon discovered this session”
  - Streak for consecutive generations without repeats (if we track that)

- **Collection feel**
  - Visual progress toward “seen X unique categories”
  - Subtle badges for milestones (100 revealed, etc.)

- **Daily / weekly**
  - “Pokémon of the day” based on category
  - Optional “surprise” encounter once per day

---

## Technical & Polish

- **Performance**
  - Lazy-load sprites for roaming Pokémon
  - Preload next set while viewing current
  - Web Workers for random selection if needed

- **Offline / PWA**
  - Cache static assets and sprites
  - Basic offline support for core randomizer

- **SEO & sharing**
  - Open Graph meta for link previews
  - Dynamic titles per game filter

---

## Prioritization Notes

When turning this into PHASES.md, consider:

1. **Low effort, high impact**: Background, card animations, sliding pill nav  
2. **Medium effort**: Roaming Pokémon, grass tiles, new pages  
3. **Higher effort**: Full world (towns, NPCs), sound system, PWA  

Core randomizer stays stable. New features are additive.
