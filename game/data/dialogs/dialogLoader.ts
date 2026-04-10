// game/data/dialogs/dialogLoader.ts
import npcBob from "./data/npcBob.json"
import npcJason from "./data/npcJason.json"
import { DialogLine } from "./DialogLine"

const dialogs: Record<string, DialogLine[]> = {
  npcBob: npcBob as unknown as DialogLine[],
  npcJason: npcJason as unknown as DialogLine[],
}

export function loadDialog(id: string): DialogLine[] {
  const dialog = dialogs[id]
  if (!dialog) throw new Error(`Dialog not found: ${id}`)
  return structuredClone(dialog)
}
