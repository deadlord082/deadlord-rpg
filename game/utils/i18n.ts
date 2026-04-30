const STORAGE_KEY = "deadlord_lang"

export type Lang = "en" | "fr"

// load modular language parts (file-per-area)
import main_en from "@/game/lang/en/main_menu"
import shop_en from "@/game/lang/en/shop_ui"
import menu_en from "@/game/lang/en/game_menu"
import death_en from "@/game/lang/en/death_screen"
import items_en from "@/game/lang/en/items"

import main_fr from "@/game/lang/fr/main_menu"
import shop_fr from "@/game/lang/fr/shop_ui"
import menu_fr from "@/game/lang/fr/game_menu"
import death_fr from "@/game/lang/fr/death_screen"
import items_fr from "@/game/lang/fr/items"

const translations: Record<Lang, Record<string, string>> = {
  en: {
    ...main_en,
    ...shop_en,
    ...items_en,
    ...menu_en,
    ...death_en,
  },
  fr: {
    ...main_fr,
    ...shop_fr,
    ...items_fr,
    ...menu_fr,
    ...death_fr,
  },
}


function detectDefault(): Lang {
  if (typeof window === "undefined") return "en"
  try {
    const nav = navigator.language || (navigator as any).userLanguage || "en"
    const code = nav.split("-")[0]
    if (code === "fr") return "fr"
  } catch (e) {}
  return "en"
}

let current: Lang | null = null

function ensureInit() {
  if (current) return
  if (typeof window === "undefined") {
    current = "en"
    return
  }
  try {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null
    current = stored || detectDefault()
  } catch (e) {
    current = detectDefault()
  }
}

export function getLanguage(): Lang {
  ensureInit()
  return current as Lang
}

export function setLanguage(l: Lang) {
  ensureInit()
  current = l
  try { if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, l) } catch (e) {}
  if (typeof window !== "undefined") window.dispatchEvent(new Event("languageChanged"))
}

export function t(key: string): string {
  ensureInit()
  const lang = current as Lang
  return translations[lang]?.[key] ?? translations.en[key] ?? key
}

export const AVAILABLE_LANGS: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
]

export default { t, setLanguage, getLanguage, AVAILABLE_LANGS }
