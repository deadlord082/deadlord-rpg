export type KeyMap = {
  up: string
  left: string
  down: string
  right: string
  confirm: string
  cancel: string
}

const STORAGE_KEY = "dlr_keybindings"

export const DEFAULT_KEYMAP: KeyMap = {
  up: "z",
  left: "q",
  down: "s",
  right: "d",
  confirm: "Enter",
  cancel: "Escape",
}

function normalizeStoredKey(k: string) {
  if (!k) return k
  if (k === "Space") return " "
  return k
}

export function loadKeyMap(): KeyMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return DEFAULT_KEYMAP
    const parsed = JSON.parse(raw)
    return {
      up: normalizeStoredKey(parsed.up ?? DEFAULT_KEYMAP.up),
      left: normalizeStoredKey(parsed.left ?? DEFAULT_KEYMAP.left),
      down: normalizeStoredKey(parsed.down ?? DEFAULT_KEYMAP.down),
      right: normalizeStoredKey(parsed.right ?? DEFAULT_KEYMAP.right),
      confirm: normalizeStoredKey(parsed.confirm ?? DEFAULT_KEYMAP.confirm),
      cancel: normalizeStoredKey(parsed.cancel ?? DEFAULT_KEYMAP.cancel),
    }
  } catch {
    return DEFAULT_KEYMAP
  }
}

export function saveKeyMap(map: KeyMap) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
  } catch {}
}

function normalizeCompareKey(k: string) {
  if (k === " ") return " "
  // single letters: compare lower-case
  if (k.length === 1) return k.toLowerCase()
  return k
}

export function isActionKey(e: KeyboardEvent, action: keyof KeyMap) {
  const map = loadKeyMap()
  const k = map[action]
  const eventKey = e.key === " " ? " " : e.key

  // Always allow arrow keys for directions
  if (action === "up" && eventKey === "ArrowUp") return true
  if (action === "down" && eventKey === "ArrowDown") return true
  if (action === "left" && eventKey === "ArrowLeft") return true
  if (action === "right" && eventKey === "ArrowRight") return true

  const a = normalizeCompareKey(eventKey)
  const b = normalizeCompareKey(k)
  return a === b
}

export function setKey(action: keyof KeyMap, key: string) {
  const map = loadKeyMap()
  const next = { ...map, [action]: key }
  saveKeyMap(next)
  return next
}
