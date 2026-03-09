# Deadlord RPG — Project Specification

This document is a self-contained specification for the "Deadlord RPG" project. It describes the project architecture, core data types, gameplay systems, assets layout, and run instructions so another developer without code access can understand, reason about, or modify the game.

---

## 1) High-level overview

- Name: Deadlord RPG
- Type: 2D tile-based RPG with turn/ATB-like combat, inventory, equipment, and event-driven scenes.
- Stack: Next.js + React + TypeScript. Tailwind is present for styling. Assets served from `public/assets`.
- Entry: a Next.js app under the `app/` directory that provides UI components and integrates the game logic from the `game/` folder.

## 2) How to run (developer)

1. Install dependencies:

```bash
npm install
```

2. Run dev server:

```bash
npm run dev
```

Available scripts (from `package.json`):

- `dev` — `next dev`
- `build` — `next build`
- `start` — `next start`
- `lint` — `eslint`

Core dependencies: `next`, `react`, `react-dom`. Dev: `typescript`, `tailwindcss`, `eslint`.

---

## 3) Project layout (important folders)

- `app/` — Next.js app UI (React/TSX). Contains global layout, pages and UI components like combat HUD, inventory, and menus.
- `public/assets/` — Art assets (tiles, entities, UI sprites, combats).
- `game/` — Core game code (pure TS, independent from React UI). Subfolders:
  - `core/` — central game state constructs (`Game.ts`, `GameState.ts`, `CombatState.ts`)
  - `data/` — definitions for maps, enemies, items, dialog data, buffs, etc.
  - `entities/` — runtime entity types and factories (`Player`, `Enemy`, `Entity`, `CombatEntity`, `ItemEntity`, `NPC`, `Chest`)
  - `events/` — event types and runner for quest/dialog/merchant/fight sequences
  - `systems/` — gameplay systems: `CombatSystem`, `MovementSystem`, `InventorySystem`, `LevelSystem`, `DamageSystem`, `ToastSystem`, etc.
  - `utils/` — helpers like `direction`, grid math, etc.

---

## 4) Gameplay concepts & flow

- World: tile-based maps (map files under `game/data/maps`). The `Game` class composes the `GameState` and runs the main loop.
- Entities: `Entity` is a minimal shape (id, x, y, direction, sprites, blocking). `CombatEntity` extends with stats and HP. `Player` extends `CombatEntity` with inventory, level/xp, gold, and `equipment` slots.
- Events: sequences of game events (warps, dialogs, merchant interactions, fights, cutscenes, rewards). The `EventRunner` consumes queued events and runs them against `GameState`.

Combat basics (what happens during a fight):

- Combat is represented by a `CombatState` object with:
  - `player` and `enemy` (both `CombatEntity` types)
  - `playerGauge`, `enemyGauge`, `threshold` (gauge / ATB system)
  - `actionTimer` and `pendingAction` to model delayed attack animations
  - `awaitingPlayerInput` boolean when it's the player's turn to act
  - `log` (string[])
  - `resolved` flag when combat ends

- The `CombatSystem.update()` method advances gauges using entity `speed`, triggers turns when gauges cross `threshold`, sets `awaitingPlayerInput` for the player, or schedules enemy attacks with a short `actionTimer` delay.
- Player actions (example): `playerAttack` queues `pendingAction` with `actionTimer`, `playerGuard` adds a temporary `guard` buff that multiplies `defense`.
- Attack resolution uses `DamageSystem.basicAttack(attacker, defender)` which computes damage and subtracts HP.
- Victory and defeat flow live in `CombatSystem.handleVictory()` and `handlePlayerDefeat()` — victory grants gold/xp and triggers `LevelSystem.gainXP()` and toast notifications. Defeat currently resets player HP and position as a simple penalty.

---

## 5) Key data shapes (type summaries)

- Entity (minimal):
  - `id: string`
  - `x: number, y: number`
  - `direction: Direction`
  - `sprites?: Partial<Record<Direction, string>>`
  - `blocking: boolean`
  - `interact?: () => void`

- Player (extends CombatEntity):
  - `inventory: Item[]`
  - `level, xp, xpToNextLevel`
  - `gold`
  - `equipment: Partial<Record<EquipmentSlot, EquipmentItem>>`
  - `equip(slot, item)` and `unequip(slot)` functions
  - `getTotalStats()` merges base stats + equipment

- CombatState:
  - `player: Player`
  - `enemy: Enemy`
  - `playerGauge`, `enemyGauge`, `threshold` (numbers)
  - `actionTimer: number`
  - `pendingAction?: "playerAttack" | "enemyAttack"`
  - `awaitingPlayerInput: boolean`
  - `log: string[]`
  - `resolved?: boolean`

- GameEvent (union): WarpEvent | DialogEvent | ChoiceEvent | MerchantEvent | CutsceneEvent | RewardEvent | FightEvent | SequenceEvent

---

## 6) Systems overview

- CombatSystem: manages ATB-like gauges, schedules/executes attacks, handles guard, flee attempts, victory/defeat, and communicates changes to the UI.
- DamageSystem: provides damage calculations (e.g., `basicAttack`).
- LevelSystem: applies XP gains and calculates level-ups and stat improvements.
- InventorySystem: manages items, pickups, and equipment interactions.
- MovementSystem / CollisionSystem: move entities on the tile grid and prevent walking through blocking tiles/entities.
- ToastSystem: small notifications for gold/xp/levelups shown in UI.

Each system operates on the plain `GameState`/`CombatState` objects and then the top-level `Game` notifies the UI (via `Game.onUIChange` callback) so the React components can re-render.

---

## 7) Data & assets

- Items: stored under `game/data/items/`. Items include `EquipmentItem` with `slot` metadata and `stats` modifiers applied when equipped.
- Enemies: definitions in `game/data/enemies/` include `xpReward`, `goldReward`, `fleeChance` and base stats.
- Dialogs: `game/data/dialogs/` contains dialog text JSON used by dialog events.
- Maps: `game/data/maps/` stores map definitions and tile layouts.
- Assets: `public/assets/` contains subfolders:
  - `entities/` (players, enemies, chests, items, npcs)
  - `tiles/` (floors, walls, warps)
  - `ui/` (combat UI, icons)

Note: sprites referenced in entities are relative paths like `/assets/entities/players/up.png`.

---

## 8) UI integration points

- `Game` class: constructed with `currentMap`, `player`, and `running` flag. It holds `GameState` and exposes `notifyUI()` for React.
- `GameState` (not fully expanded here) contains top-level runtime data used by UI components (player position, map tiles, active events, combat state, ui overlays).
- React components under `app/components/` subscribe to `Game` updates (via callback) and render HUD, inventory, level up screens, combat UI, dialogs, and the main viewport.

When modifying behavior, change systems or event runners in `game/systems` or `game/events`, not UI files — the UI reads from `GameState`.

---

## 9) Extending or modifying the game (guidance for another AI)

- To add a new enemy: add definition to `game/data/enemies/enemies.ts` with base stats, `xpReward`, `goldReward`, and sprite references. Use `ENEMIES[enemyId]` to look it up.
- To add an item: create an item in `game/data/items/`, set `id`, `slot` (e.g., `rightHand`, `head`), `stats` (flat or percent modifiers), and appropriate sprite.
- To add a new event type: create the event structure in `game/events/` and extend the `GameEvent` union; implement handling in `EventRunner`.
- To tune combat: adjust `CombatState.threshold`, attack delays (`actionTimer`), or damage calculation in `DamageSystem.basicAttack` to change pacing and balance.

---

## 10) Useful references inside project (entry points)

- `game/core/Game.ts` — root game object and integration point with UI.
- `game/core/GameState.ts` — application runtime state (map, player, eventQueue, combat, ui overlays).
- `game/core/CombatState.ts` — fight runtime structure and fields (see above).
- `game/systems/CombatSystem.ts` — fight logic and flow (gauge advancement, pending actions, victory/defeat).
- `game/events/EventRunner.ts` — runs queued events and sequences.

---

## 11) Notes & assumptions

- The code is TypeScript-first: types are helpful and present for main shapes.
- UI is Next.js and may import the pure game code and call `Game.notifyUI()` via a bound callback so React components re-render on state changes.
- Persistence and saving are not documented here (look for any `save`/`load` helpers in `game/core` or `game/systems`).

