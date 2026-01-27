// game/data/dialogs/dialogLoader.ts
import npcGreeting from "./data/npcGreeting.json"
import { DialogLine } from "@/game/events/DialogTypes"

const dialogs: Record<string, DialogLine[]> = {
    npcGreeting,
}

export function loadDialog(id: string): DialogLine[] {
  const dialog = dialogs[id]
  if (!dialog) throw new Error(`Dialog not found: ${id}`)
  return structuredClone(dialog)
}
