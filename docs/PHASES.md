# Pokémon Nuzlocke Randomizer — Implementation Phases

This document tells you **exactly what to implement** in each phase. Use it to resume work after a break. Check off items as you complete them.

**Status key:** `[ ]` TODO | `[~]` In progress | `[x]` Done

**Reference:** See `docs/IDEAS.md` for the original brainstorm.

---

## Current State (Baseline)

Before Phase 1, the app has:

- **Core randomizer:** `app/page.js` — Game selector, Generate button, 3 ChoiceCards. Click card → reveals sprite + name. No Pokémon names before reveal.
- **API:** `app/api/random-pokemon/route.js` — `?maxGeneration=N` returns `{ choices: [{ category, name, id }] }`.
- **Games:** `app/games.js` — `GAMES` array maps game labels to `maxGen`.
- **Styling:** Inline styles only. Dark gradient background (`#1a1a2e` → `#16213e`). Cards have hover scale + shadow.
- **No:** Animations, nav bar, multiple pages, roaming Pokémon, background art, sound.

---

## Phase 1: Background & Card Polish ✅

**Goal:** Make the existing page feel more polished. Low effort, high visual impact. No new pages.

### 1.1 Pokéball / Pokémon-themed background

- [x] **What:** Replace the flat gradient with a themed background.
- [ ] **How:**
  - Option A: CSS `background-image` with a subtle tiled Pokéball SVG pattern (semi-transparent, low opacity).
  - Option B: Use a large Pokéball or Pokéball silhouettes as a radial gradient overlay.
  - Files: `app/page.js` or new `app/components/Background.js` + `app/globals.css` if you add one.
  - Keep it subtle so text and cards remain readable.

### 1.2 Card entrance animations

- [x] **What:** When 3 choices load, cards should animate in (not appear instantly).
- [ ] **How:**
  - Add CSS keyframes or inline `animation` to each card.
  - Stagger: card 1 `animation-delay: 0ms`, card 2 `100ms`, card 3 `200ms`.
  - Effect: `transform: translateY(20px)` + `opacity: 0` → `translateY(0)` + `opacity: 1`.
  - Place in `ChoiceCard` or the parent `<div>` that maps over choices.
  - Use `@keyframes` in a `<style>` tag in `layout.js` or a global CSS file.

### 1.3 Card reveal animation (flip / unfold)

- [x] **What:** When user clicks to reveal, the card should flip or unfold instead of instantly switching content.
- [ ] **How:**
  - Option A: CSS `transform: rotateY(180deg)` — front shows category, back shows sprite+name. Use `perspective` on parent.
  - Option B: Scale + fade — card briefly scales up and the content crossfades.
  - State: `revealed` already exists. Add a `flipping` or `animating` state for the transition duration (~300ms).
  - Ensure the flip doesn’t affect layout (use `transform-style: preserve-3d` if needed).

### 1.4 Card hover shake / pulse

- [x] **What:** When hovering a hidden card, add a subtle shake or pulse before click.
- [ ] **How:**
  - `@keyframes` for a tiny `translateX` shake (e.g. -2px, 2px, 0) or scale pulse (1 → 1.02 → 1).
  - Apply animation only when `hovered && !revealed`.
  - Keep it light so it doesn’t feel distracting.

### 1.5 Generate button press effect

- [x] **What:** Button should visually “press in” on click.
- [ ] **How:**
  - `:active` or `onMouseDown` / `onMouseUp`: reduce scale to 0.98 and optionally darken.
  - Reset on mouse up. Keep transition short (e.g. 100ms).

### 1.6 Pokéball loading spinner

- [x] **What:** While fetching, show a Pokéball-themed loader instead of plain “Loading…”.
- [ ] **How:**
  - SVG: red top half, white bottom half, black center button. Rotate or “open” animation.
  - Or use a spinning Pokéball icon from a free icon set.
  - Replace or augment the button’s `loading ? "Loading…"` state with this spinner.
  - Consider a small inline SVG in `page.js` or a `components/LoadingSpinner.js`.

### 1.7 Success micro-animation on reveal

- [x] **What:** When a card is revealed, a small celebration effect (sparkle, brief scale-up).
- [ ] **How:**
  - Add a keyframe that plays once when `revealed` becomes true.
  - Example: scale 1 → 1.05 → 1 over ~400ms.
  - Or: brief “sparkle” dots or stars that fade in/out near the sprite.

---

## Phase 2: Atmosphere — Grass & Parallax ✅

**Goal:** Add grass, clouds, and layered background for atmosphere. Still single page.

### 2.1 Grass tiles / patches

- [x] **What:** Pixel-art tall grass patches (like Pokémon games) in the background.
- [ ] **How:**
  - Use a small repeating grass tile image (e.g. 16x16 or 32x32). Source: create one, or use CC0 assets.
  - Place as a layer at the bottom of the viewport, possibly repeating via `background-repeat`.
  - Or: render multiple `<div>` grass patches positioned absolutely with `bottom: 0`.
  - Add a gentle sway animation (`@keyframes` with small `transform` or `filter` shifts).
  - Ensure grass is behind the main content (`z-index` hierarchy).

### 2.2 Grass rustle on hover

- [x] **What:** When hovering near a choice card, nearby grass rustles more.
- [ ] **How:**
  - Track mouse position or card hover state.
  - If cursor is within X pixels of a card, increase the grass animation intensity (stronger sway, shorter cycle).
  - Can use CSS variables updated via JS, or a class toggled on a wrapper.

### 2.3 Parallax layers (clouds, mountains)

- [x] **What:** Background layers that move at different speeds on scroll (or as fixed layers with different `background-position`).
- [ ] **How:**
  - Create 2–3 layers: far mountains (slow), clouds (medium), closer elements (faster).
  - Use `background-attachment: fixed` and different `background-position` values, or `position: fixed` with different `transform: translate` on scroll.
  - Keep colors muted so they don’t compete with the UI.

### 2.4 Day / night cycle (optional)

- [x] **What:** Toggle or auto cycle between day and night ambience.
- [ ] **How:**
  - Day: brighter background, warmer tones.
  - Night: darker, blue tint, optionally stars (small dots or a starfield image).
  - Store preference in `localStorage` or derive from `new Date().getHours()`.
  - Apply via a wrapper class or CSS variables (e.g. `--bg-color`, `--overlay-opacity`).

---

## Phase 3: Navigation & Multi-Page Layout

**Goal:** Add a nav bar and multiple pages. Randomizer stays the main page.

### 3.1 App layout with nav bar

- [ ] **What:** Top nav bar with links to different sections.
- [ ] **How:**
  - Create `app/components/NavBar.js`. Links: “Randomizer” (home), “Tools” (or future pages).
  - Add `<NavBar />` to `app/layout.js` so it appears on all pages.
  - Use Next.js `Link` for client-side navigation.

### 3.2 Sliding pill navigation

- [ ] **What:** Under the nav links, an animated pill/underline that slides to the active section.
- [ ] **How:**
  - Track `pathname` (e.g. `usePathname()` from `next/navigation`).
  - Render a pill `<div>` positioned under the active nav item.
  - Animate `left` and `width` (or `transform: translateX`) when the route changes.
  - Use `transition` or a light animation library for smooth sliding.
  - The pill should match the width of the active tab label.

### 3.3 Page transitions (fade / slide)

- [ ] **What:** When navigating, pages should fade or slide instead of instant swap.
- [ ] **How:**
  - Wrap `{children}` in `layout.js` with an animated container.
  - On route change, fade out old content, fade in new.
  - Or use a view transition approach (e.g. `document.startViewTransition` if supported, or a simple opacity transition keyed by `pathname`).

### 3.4 Route structure

- [ ] **What:** Define routes for current and future pages.
- [ ] **How:**
  - `app/page.js` → `/` (Randomizer, current main page).
  - `app/tools/page.js` → `/tools` (placeholder or hub).
  - `app/death-tracker/page.js` → `/death-tracker` (Phase 4).
  - Add corresponding nav links.

---

## Phase 4: Roaming Pokémon

**Goal:** Pokémon sprites walk around the page. They feel “alive” but don’t block the core randomizer.

### 4.1 Roaming Pokémon component

- [ ] **What:** Create a component that renders 2–5 Pokémon sprites moving around the viewport.
- [ ] **How:**
  - New file: `app/components/RoamingPokemon.js`.
  - Each Pokémon: `<img>` with sprite URL (reuse `SPRITE_BASE` or use front sprite from PokéAPI sprites: `.../sprites/pokemon/versions/generation-v/black-white/{id}.png`).
  - Position: `position: fixed` or `absolute` with `left`, `top` in `%` or `px`.
  - Movement: `requestAnimationFrame` or CSS `animation` with `@keyframes` for a path (e.g. move left-to-right, then back).
  - Start with simple horizontal or diagonal paths. Keep sprites small (32–48px) so they don’t block content.

### 4.2 Game-based spawn pool

- [ ] **What:** Which Pokémon appear depends on the selected game (maxGeneration).
- [ ] **How:**
  - Pass `maxGeneration` (or game) from `page.js` into `RoamingPokemon`.
  - `RoamingPokemon` fetches from `/api/random-pokemon?maxGeneration=N` once on mount (or use a lighter endpoint that just returns N random IDs).
  - Alternatively: precompute a small list of IDs per generation and pick randomly client-side.
  - Spawn 2–5 different species. Avoid duplicates on screen.

### 4.3 Random wandering logic

- [ ] **What:** Pokémon don’t just loop—they wander somewhat randomly.
- [ ] **How:**
  - Store `{ x, y, vx, vy, targetX, targetY }` per Pokémon.
  - Every few seconds, pick a new random target within viewport bounds.
  - Lerp or step toward target. Optionally vary speed by species (e.g. slower for Snorlax).
  - Ensure they stay within view (clamp or bounce at edges).

### 4.4 Hover interaction

- [ ] **What:** Hovering a roaming Pokémon triggers a subtle reaction.
- [ ] **How:**
  - Use `onMouseEnter` / `onMouseLeave` on each sprite.
  - On hover: slight scale-up (1.1x) or a bounce keyframe. Ensure `pointer-events` allows hover.
  - Optional: show a small “!” or sparkle above them.

### 4.5 Click interaction

- [ ] **What:** Clicking a roaming Pokémon plays a small reaction.
- [ ] **How:**
  - `onClick`: play a brief animation (spin, bounce) or show a temporary emote/speech bubble.
  - Optional: trigger a sound (see Phase 6). Keep it lightweight.

### 4.6 Z-index and “behind” content

- [ ] **What:** Roaming Pokémon should stay behind the main UI (cards, button, nav).
- [ ] **How:**
  - Place `RoamingPokemon` in layout with `z-index: 0` or low value.
  - Main content and nav use higher `z-index` (e.g. 10, 20).
  - Optionally: Pokémon can walk “in front” of the background but “behind” the cards.

---

## Phase 5: Randomizer Enhancements

**Goal:** Add history, lock, and share to the existing randomizer. Core behavior unchanged.

### 5.1 History — previously generated

- [ ] **What:** Show the last N (e.g. 5) sets of 3 choices below the current cards.
- [ ] **How:**
  - State: `history: []` — array of `{ choices: [...], game, timestamp }`.
  - On each successful Generate, push current `choices` to history, keep last 5.
  - Render a collapsible “Previous” section. Each history item: 3 small cards (categories only, no reveal). Optional: “Use this set” to restore.
  - Persist in `localStorage` if you want history across sessions.

### 5.2 Lock favorites

- [ ] **What:** User can “pin” 1 or 2 of the 3 choices so they stay when regenerating.
- [ ] **How:**
  - Add a lock icon on each card. State: `lockedIndices: Set<0|1|2>`.
  - On Generate: API returns 3 choices. Replace only non-locked slots with new fetches.
  - May require API change: accept `excludeCategories: string[]` or similar to avoid duplicates with locked.
  - Or: client-side — if slot 1 is locked, only refetch slots 2 and 3, merge results.

### 5.3 Share — copy link / image

- [ ] **What:** Button to copy a shareable link or generate an image of the current 3 choices.
- [ ] **How:**
  - Link: `?game=5&seed=xyz` — encode game and optional seed so the same 3 can be reproduced. Requires API to accept `seed` for deterministic random.
  - Image: use `html-to-image` or `dom-to-image` to capture the 3 cards, then download or copy. Or build a simple canvas rendering of categories (and sprites if revealed).
  - Add “Share” button near Generate. Show toast “Link copied!” on success.

---

## Phase 6: New Pages — Death Tracker & Tools Hub

**Goal:** Add a death tracker and a tools hub. Each is a new page.

### 6.1 Death tracker page

- [ ] **What:** Nuzlocke “graveyard” — list of fallen Pokémon with optional sprite, nickname, cause of death.
- [ ] **How:**
  - Route: `app/death-tracker/page.js` → `/death-tracker`.
  - State: `deaths: [{ name, nickname?, cause?, route?, timestamp }]`.
  - Form to add: Pokémon name (or pick from category?), nickname, cause (optional), route (optional).
  - Display: list or grid of “gravestone” cards. Optional: use graveyard sprite or cross icon.
  - Persist in `localStorage`. No backend required for MVP.

### 6.2 Tools hub page

- [ ] **What:** Landing page for additional Nuzlocke tools.
- [ ] **How:**
  - Route: `app/tools/page.js` or `app/tools/page.js` → `/tools`.
  - Simple layout: cards/links to “Randomizer” (home), “Death Tracker”, future tools (Route Randomizer, Rule Generator, etc.).
  - Each card links to the respective route. Add nav link in Phase 3.

### 6.3 Route randomizer (future)

- [ ] **What:** For a given game and route, show random encounter tables.
- [ ] **How:**
  - Would need route + encounter data. PokéAPI has `location` and `encounter` endpoints but structure is complex.
  - Placeholder: “Coming soon” with brief description.
  - Full implementation: new page, game selector, route selector (dropdown), then fetch encounter data and display or randomize.

### 6.4 Rule generator (future)

- [ ] **What:** Randomly suggest Nuzlocke rule variants (e.g. “No items in battle”, “Nickname all”).
- [ ] **How:**
  - Static list of rules in a JSON or JS file. On button click, pick 1–3 random rules to display.
  - New page or a section on Tools hub. Low effort.

---

## Phase 7: Settings & Accessibility

**Goal:** Animation toggle, themes, sprite style. Improves usability and comfort.

### 7.1 Animation reduce/disable toggle

- [ ] **What:** User can turn off or reduce motion.
- [ ] **How:**
  - Add a Settings page or a gear icon in nav that opens a modal.
  - Toggle: “Reduce animations” → store in `localStorage` and React state/context.
  - When enabled: disable or simplify card animations, roaming Pokémon, background motion. Use `prefers-reduced-motion` as default for users who have it set system-wide.
  - Pass a `reducedMotion` prop or context to relevant components.

### 7.2 Sprite style selector

- [ ] **What:** Choose between official artwork and pixel sprite for revealed Pokémon.
- [ ] **How:**
  - Official: current `.../official-artwork/{id}.png`.
  - Pixel: `.../sprites/pokemon/versions/generation-v/black-white/{id}.png` or similar.
  - Store preference in `localStorage`. `ChoiceCard` reads it and picks the correct `spriteUrl` base.

### 7.3 Color theme / palettes

- [ ] **What:** Region- or game-inspired color themes (e.g. Kanto green, Johto gold).
- [ ] **How:**
  - Define theme objects: `{ name, bg, accent, cardBg, ... }`.
  - Store selected theme in `localStorage`. Apply via CSS variables on `body` or a root wrapper.
  - Themes affect background, button, card border, etc. Keep contrast readable.

### 7.4 High-contrast mode

- [ ] **What:** Option for stronger contrast for readability.
- [ ] **How:**
  - When enabled, increase border width, darken backgrounds, lighten text.
  - Can be a toggle in Settings or combined with a “High contrast” theme.

---

## Phase 8: Sound

**Goal:** Optional SFX. Respect user preference.

### 8.1 SFX on reveal

- [ ] **What:** Play a Pokéball-open or “catch” sound when a card is revealed.
- [ ] **How:**
  - Use Web Audio API or `<audio>` with short SFX files (CC0/royalty-free).
  - On `onReveal` callback, play the sound. Ensure it doesn’t block the main thread.
  - Respect mute (Phase 8.3).

### 8.2 Menu click sounds

- [ ] **What:** Subtle click when pressing Generate, nav links, etc.
- [ ] **How:**
  - Same as above. Short, low-volume clip. Play on button click.

### 8.3 Mute / volume controls

- [ ] **What:** Mute button and optional volume sliders (Master, SFX).
- [ ] **How:**
  - Add to nav or Settings. Store `muted` and `volume` in `localStorage`.
  - Before playing any sound, check `muted` and apply `volume`.
  - Use a small speaker icon that toggles to muted icon.

---

## Phase 9: World Building (Advanced)

**Goal:** Towns, houses, NPCs, terrain zones. Higher effort.

### 9.1 Town / house silhouettes

- [ ] **What:** Simple building shapes in the background (roofs, walls).
- [ ] **How:**
  - SVG or PNG silhouettes. Position at bottom corners or as a skyline.
  - Use low opacity. Parallax (Phase 2) can apply to these.
  - Keep minimal so it doesn’t distract.

### 9.2 NPC / trainer silhouettes

- [ ] **What:** Small humanoid figures standing or walking in the background.
- [ ] **How:**
  - Simple stick figures or pixel-art NPCs. 1–3 on screen.
  - Optional: slow walk animation. Stay in background, low z-index.

### 9.3 Terrain zones for Pokémon

- [ ] **What:** Grass near grass tiles, water near water edges. Pokémon “prefer” certain zones.
- [ ] **How:**
  - Divide viewport into zones (e.g. bottom = grass, top = sky).
  - When spawning roaming Pokémon, Water-type appear more near “water” zone (bottom or edges). Grass-type near grass. Others random.
  - Requires type data from API. Fetch species, get `types` from Pokemon endpoint if needed.

---

## Phase 10: Technical & Polish

**Goal:** Performance, PWA, SEO.

### 10.1 Lazy-load sprites (roaming Pokémon)

- [ ] **What:** Don’t load all roaming Pokémon sprites at once.
- [ ] **How:**
  - Use `loading="lazy"` on `<img>`. Or dynamically add `<img>` only when Pokémon enters viewport.
  - Limit total roaming Pokémon (e.g. max 5) to keep requests low.

### 10.2 PWA / offline

- [ ] **What:** Basic offline support for the randomizer.
- [ ] **How:**
  - Add a service worker (e.g. `next-pwa` or manual setup).
  - Cache: static assets, API responses for a short TTL.
  - Offline: show cached last result + “You’re offline” message. Full implementation is optional.

### 10.3 Open Graph / SEO

- [ ] **What:** Nice link previews when sharing.
- [ ] **How:**
  - Add `metadata` in `app/layout.js` or per-page: `title`, `description`, `openGraph`, `twitter`.
  - Use Next.js metadata API. Optionally: dynamic OG image based on game or last result (requires server-side image generation).

---

## Resuming Work

1. Open this file and scan for `[ ]` (TODO) items.
2. Start with the lowest phase number that has unchecked items.
3. Phases 1–3 can often be done in parallel; 4–6 build on 3; 7–8 can be done anytime.
4. The **core randomizer** (`app/page.js`, `app/api/random-pokemon/route.js`) should not be broken by any phase. If a change risks it, do it in a branch or document the rollback.

**Last updated:** 2025-02-15 — Phase 2 completed.
