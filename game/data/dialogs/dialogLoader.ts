// game/data/dialogs/dialogLoader.ts
import { DialogLine } from "./DialogLine"
import { getLanguage } from "@/game/utils/i18n"

// Statically import known dialog files so bundlers include them and runtime
// loading doesn't rely on `require` which is not available in the browser.
import en_npcBob from "./en/npcBob.json"
import en_npcJason from "./en/npcJason.json"
import fr_npcBob from "./fr/npcBob.json"
import fr_npcJason from "./fr/npcJason.json"
import data_npcBob from "./data/npcBob.json"
import data_npcJason from "./data/npcJason.json"

const DIALOG_MAP: Record<string, DialogLine[]> = {
  // keyed by `${lang}/${id}` and `data/${id}` for fallback
  ["en/npcBob"]: en_npcBob as any,
  ["en/npcJason"]: en_npcJason as any,
  ["fr/npcBob"]: fr_npcBob as any,
  ["fr/npcJason"]: fr_npcJason as any,
  ["data/npcBob"]: data_npcBob as any,
  ["data/npcJason"]: data_npcJason as any,
}

export function loadDialog(id: string): DialogLine[] {
  const lang = getLanguage()

  const localizedKey = `${lang}/${id}`
  const fallbackKey = `data/${id}`

  const localized = DIALOG_MAP[localizedKey]
  if (localized) return structuredClone(localized)

  const fallback = DIALOG_MAP[fallbackKey]
  if (fallback) return structuredClone(fallback)

  throw new Error(`Dialog not found: ${id}`)
}
