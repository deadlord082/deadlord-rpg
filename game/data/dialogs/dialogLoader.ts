// game/data/dialogs/dialogLoader.ts
import { DialogLine } from "./DialogLine"
import { getLanguage } from "@/game/utils/i18n"

function loadJson(modulePath: string) {
  try {
    // dynamic import will be statically analyzable by bundlers when paths are relative
    // but here we construct per-language folders
    return require(modulePath)
  } catch (e) {
    return null
  }
}

export function loadDialog(id: string): DialogLine[] {
  const lang = getLanguage()
  // try language-specific folder first
  const localizedPath = `./${lang}/${id}.json`
  const fallbackPath = `./data/${id}.json`

  const localized = loadJson(localizedPath)
  if (localized) return structuredClone(localized as DialogLine[])

  const fallback = loadJson(fallbackPath)
  if (fallback) return structuredClone(fallback as DialogLine[])

  throw new Error(`Dialog not found: ${id}`)
}
