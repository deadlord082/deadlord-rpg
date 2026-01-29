import { useEffect, useState } from "react"
import { Player } from "@/game/entities/Player"
import { Item } from "@/game/data/items/itemTypes"

interface GameMenuProps {
  player: Player
  onClose: () => void
}

export function GameMenu({ player, onClose }: GameMenuProps) {
  const menuOptions: ("status" | "inventory" | "close")[] = ["status", "inventory", "close"]
  const [menuIndex, setMenuIndex] = useState(0) // selection in menu
  const [activeTab, setActiveTab] = useState<"status" | "inventory" | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0) // for inventory grid
  const [hoveredItem, setHoveredItem] = useState<Item | null>(null)

  const columns = 5
  const rows = 4
  const totalSlots = columns * rows

  // keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (activeTab === null) {
        // navigating menu
        if (e.key === "ArrowRight") setMenuIndex((menuIndex + 1) % menuOptions.length)
        if (e.key === "ArrowLeft") setMenuIndex((menuIndex - 1 + menuOptions.length) % menuOptions.length)
        if (e.key === "Enter") {
          const selectedTab = menuOptions[menuIndex]
          if (selectedTab === "close") {
            onClose()
          } else {
            setActiveTab(selectedTab)
          }
        }
        if (e.key === "Escape") onClose()
      } else {
        // inside a tab
        if (activeTab === "inventory") {
          let newIndex = selectedIndex
          if (e.key === "ArrowRight") newIndex = (selectedIndex + 1) % totalSlots
          if (e.key === "ArrowLeft") newIndex = (selectedIndex - 1 + totalSlots) % totalSlots
          if (e.key === "ArrowDown") newIndex = (selectedIndex + columns) % totalSlots
          if (e.key === "ArrowUp") newIndex = (selectedIndex - columns + totalSlots) % totalSlots
          if (newIndex !== selectedIndex) setSelectedIndex(newIndex)
          if (e.key === "Enter") {
            const item = player.inventory[selectedIndex]
            if (item) alert(`You selected: ${item.name}`) // placeholder
          }
        }
        if (e.key === "Escape") {
          setActiveTab(null) // go back to menu selection
        }
      }
      e.preventDefault()
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [activeTab, menuIndex, selectedIndex, player])

  const renderContent = () => {
    if (!activeTab) return null

    switch (activeTab) {
      case "status":
        return (
          <div>
            <p><strong>Name:</strong> {player.id}</p>
            <p><strong>Direction:</strong> {player.direction}</p>
            <p><strong>Inventory slots:</strong> {player.inventory.length}/{totalSlots}</p>
          </div>
        )
      case "inventory":
        return (
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 64px)`, gap: 8 }}>
              {Array.from({ length: totalSlots }).map((_, i) => {
                const item = player.inventory[i]
                const isSelected = i === selectedIndex
                return (
                  <div
                    key={i}
                    style={{
                      width: 64,
                      height: 64,
                      border: `2px solid ${isSelected ? "#fff" : "#888"}`,
                      background: "#222",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      color: "white",
                      fontSize: 12,
                      cursor: "pointer",
                      position: "relative",
                    }}
                    onMouseEnter={() => setHoveredItem(item || null)}
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => {
                      setSelectedIndex(i)
                      if (item) alert(`You selected: ${item.name}`)
                    }}
                  >
                    {item && (
                      <>
                        <img src={item.image} />
                        <span>{item.name}</span>
                        <span>x{item.quantity}</span>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
            {hoveredItem && (
              <div
                style={{
                  marginLeft: 12,
                  padding: 8,
                  background: "rgba(0,0,0,0.85)",
                  border: "1px solid white",
                  minWidth: 160,
                }}
              >
                <p><strong>{hoveredItem.name}</strong></p>
                <p>{hoveredItem.description}</p>
              </div>
            )}
          </div>
        )
    }
  }

  return (
    <div
      style={{
        position: "absolute",
        inset: "10% 15%",
        background: "rgba(0,0,0,0.9)",
        color: "white",
        padding: 20,
        borderRadius: 12,
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {/* Menu Selection (only visible if no active tab) */}
      {!activeTab && (
        <div style={{ display: "flex", gap: 12 }}>
          {menuOptions.map((tab, i) => (
            <button
              key={tab}
              style={{
                padding: "6px 12px",
                background: i === menuIndex ? "#555" : "#222",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
              }}
              onClick={() => {
                if (tab === "close") onClose()
                else setActiveTab(tab)
                setMenuIndex(i)
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Tab Content */}
      {renderContent()}
    </div>
  )
}
