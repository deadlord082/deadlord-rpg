import { t } from "@/game/utils/i18n"

interface MenuTabsProps {
    menuOptions: ("status" | "inventory" | "equipment" | "save" | "settings" | "quit" | "close")[]
    menuIndex: number
    setMenuIndex: (v: number) => void
    onSelect: (tab: "status" | "inventory" | "equipment" | "save" | "settings" | "quit" | "close") => void
  }
  
  export function MenuTabs({
    menuOptions,
    menuIndex,
    setMenuIndex,
    onSelect,
  }: MenuTabsProps) {
    const labelFor = (tab: string) => {
      switch (tab) {
        case "status": return t("STATUS")
        case "inventory": return t("INVENTORY")
        case "equipment": return t("EQUIPMENT")
        case "save": return t("SAVE")
        case "settings": return t("SETTINGS")
        case "quit": return t("QUIT")
        case "close": return t("CLOSE")
        default: return tab.toUpperCase()
      }
    }
  
    return (
      <div style={{ display: "flex", gap: 12 }}>
        {menuOptions.map((tab, i) => (
          <button
            key={tab}
            style={{
              padding: "10px 18px",
              background: i === menuIndex ? "#666" : "#222",
              border: "1px solid #444",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: 16,
            }}
            onClick={() => {
              setMenuIndex(i)
              onSelect(tab)
            }}
            >
            {labelFor(tab)}
          </button>
        ))}
      </div>
    )
  }
  