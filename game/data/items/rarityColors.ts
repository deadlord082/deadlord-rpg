import { ItemRarity } from "./itemRarity"

export const RARITY_STYLES: Record<
  ItemRarity,
  { border: string; bg: string; text: string }
> = {
  common: {
    border: "#ccc",
    bg: "rgba(200,200,200,0.08)",
    text: "#ddd",
  },
  uncommon: {
    border: "#6c9",
    bg: "rgba(108,153,0,0.1)",
    text: "#bdf",
  },
  rare: {
    border: "#4aa3ff",
    bg: "rgba(74,163,255,0.15)",
    text: "#9ccfff",
  },
  epic: {
    border: "#b14cff",
    bg: "rgba(177,76,255,0.18)",
    text: "#dab6ff",
  },
  legendary: {
    border: "#ffcc33",
    bg: "rgba(255,204,51,0.18)",
    text: "#ffe38a",
  },
  deadlordary: {
    border: "#ff0000",
    bg: "rgba(255,0,0,0.15)",
    text: "#ff6666",
  },
}
