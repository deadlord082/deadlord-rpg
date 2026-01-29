interface MenuTabsProps {
    menuOptions: ("status" | "inventory" | "close")[]
    menuIndex: number
    setMenuIndex: (v: number) => void
    onSelect: (tab: "status" | "inventory" | "close") => void
  }
  
  export function MenuTabs({
    menuOptions,
    menuIndex,
    setMenuIndex,
    onSelect,
  }: MenuTabsProps) {
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
            {tab.toUpperCase()}
          </button>
        ))}
      </div>
    )
  }
  