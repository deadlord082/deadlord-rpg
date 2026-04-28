// Lightweight image preloader used at app startup to avoid visible lazy-loading
import { Tiles } from "@/game/data/tiles/tileSet"
import { ENEMIES } from "@/game/data/enemies/enemies"
import { Items } from "@/game/data/items/items"
import { NPCS } from "@/game/data/npcs/npcs"

export type ProgressCb = (loaded: number, total: number) => void

function addIfString(set: Set<string>, v: any) {
  if (typeof v === "string" && v.startsWith("/")) set.add(v)
}

export async function preloadAll(onProgress?: ProgressCb, timeoutMs = 15000): Promise<void> {
  const urls = new Set<string>()

  // Tiles
  for (const t of Object.values(Tiles)) {
    addIfString(urls, (t as any).image)
  }

  // Enemies
  for (const e of Object.values(ENEMIES)) {
    addIfString(urls, (e as any).image)
  }

  // Items
  for (const it of Object.values(Items)) {
    addIfString(urls, (it as any).image)
  }

  // NPCs: sprites objects may contain multiple rotation keys
  for (const n of Object.values(NPCS)) {
    const s = (n as any).sprites
    if (s && typeof s === "object") {
      for (const v of Object.values(s)) addIfString(urls, v)
    }
  }

  // Title UI / other UI assets (small curated set)
  urls.add("/assets/ui/menu_bg.png")
  urls.add("/assets/ui/menu_title.png")
  urls.add("/assets/ui/death_bg.png")

  const list = Array.from(urls)
  if (list.length === 0) return

  let loaded = 0
  let finished = false

  const p = new Promise<void>((resolve) => {
    for (const u of list) {
      const img = new Image()
      img.onload = () => {
        loaded++
        onProgress?.(loaded, list.length)
        if (!finished && loaded === list.length) {
          finished = true
          resolve()
        }
      }
      img.onerror = () => {
        loaded++
        onProgress?.(loaded, list.length)
        if (!finished && loaded === list.length) {
          finished = true
          resolve()
        }
      }
      img.src = u
    }
  })

  const timeout = new Promise<void>((resolve) => setTimeout(() => {
    if (!finished) finished = true
    resolve()
  }, timeoutMs))

  await Promise.race([p, timeout])
}

export default preloadAll
