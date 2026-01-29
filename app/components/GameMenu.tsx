import { useEffect, useState } from "react"
import { Player } from "@/game/entities/Player"
import { Item } from "@/game/data/items/itemTypes"
import { RARITY_STYLES } from "@/game/data/items/rarityColors"

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
  const [itemDetailsIndex, setItemDetailsIndex] = useState<number | null>(null)

  const columns = 5
  const rows = 4
  const totalSlots = columns * rows

  // keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (activeTab === null) {
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
      
        if (e.key === "Escape") {
          onClose()
        }
      
        e.preventDefault()
        return
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
              if (item) {
                setItemDetailsIndex(selectedIndex)
              }
            }            
        }
        if (activeTab !== null) {
          if (itemDetailsIndex !== null) {
            if (e.key === "Escape") {
              setItemDetailsIndex(null)
              e.preventDefault()
              return
            }
          }          
        }
      }
      e.preventDefault()
    }

    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [activeTab, menuIndex, selectedIndex, player])

  const renderItemDetails = () => {
    if (itemDetailsIndex === null) return null
  
    const item = player.inventory[itemDetailsIndex]
    if (!item) return null
    const rarity = RARITY_STYLES[item.rarity]
  
    return (
      <div
        style={{
          position: "absolute",
          inset: "20% 30%",
          border: `2px solid ${rarity.border}`,
          background: rarity.bg,
          boxShadow: `0 0 12px ${rarity.border}`,
          padding: 16,
          borderRadius: 8,
          zIndex: 2000,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <h3 style={{ color: rarity.text }}>
          {item.name}
        </h3>

        <small style={{ opacity: 0.8 }}>
          {item.rarity.toUpperCase()}
        </small>
  
        {item.image && (
          <img src={item.image} style={{ width: 64, alignSelf: "center" }} />
        )}
  
        <p>{item.description}</p>
  
        <p><strong>Quantity:</strong> {item.quantity}</p>
  
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          {/* Use button (only if usable later) */}
          <button
            onClick={() => {
              alert("Use item (TODO)")
            }}
          >
            Use
          </button>
  
          <button
            onClick={() => {
              player.inventory.splice(itemDetailsIndex, 1)
              setItemDetailsIndex(null)
            }}
          >
            Discard
          </button>
        </div>
  
        <small style={{ opacity: 0.6 }}>
          Press ESC to return
        </small>
      </div>
    )
  }
  

  const renderContent = () => {
    if (!activeTab) return null

    switch (activeTab) {
      case "status":
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <h3>Status</h3>

      <p><strong>Name:</strong> {player.id}</p>
      <p><strong>Level:</strong> {player.level}</p>

      {/* HP */}
      <div>
        <strong>Health</strong>
        <div
          style={{
            marginTop: 4,
            height: 14,
            width: 220,
            background: "#400",
            borderRadius: 6,
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${(player.hp / player.maxHp) * 100}%`,
              background: "#0f0",
              borderRadius: 6,
            }}
          />
        </div>
        <small>{player.hp} / {player.maxHp}</small>
      </div>

      {/* XP */}
      <div>
        <strong>XP</strong>
        <div
          style={{
            marginTop: 4,
            height: 10,
            width: 220,
            background: "#222",
            borderRadius: 6,
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${(player.xp / player.xpToNextLevel) * 100}%`,
              background: "#44f",
              borderRadius: 6,
            }}
          />
        </div>
        <small>
          {player.xp} / {player.xpToNextLevel}
        </small>
      </div>

      {/* Gold */}
      <p>
        <strong>Gold:</strong> {player.gold}
      </p>
      <h4>Stats</h4>

      <p>💪 Strength: {player.stats.strength}</p>
      <p>🛡️ Defense: {player.stats.defense}</p>
      <p>⚡ Speed: {player.stats.speed}</p>
      <p>🍀 Luck: {player.stats.luck}</p>
      <p>🗣️ Charisma: {player.stats.charisma}</p>

      <hr />

      <p>🎯 Crit Chance: {player.stats.critChance}%</p>
      <p>💥 Crit Damage: x{player.stats.critDamage}</p>
    </div>
  )

      case "inventory":
        return (
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${columns}, 64px)`, gap: 8 }}>
              {Array.from({ length: totalSlots }).map((_, i) => {
                const item = player.inventory[i]
                const isSelected = i === selectedIndex
                const rarityStyle = item ? RARITY_STYLES[item.rarity] : null
                return (
                  <div
                    key={i}
                    style={{
                      width: 64,
                      height: 64,
                      border: `2px solid ${
                        isSelected ? "#fff" : rarityStyle?.border ?? "#444"
                      }`,
                      background: rarityStyle?.bg ?? "#222",
                      boxShadow: item
                        ? `0 0 6px ${rarityStyle?.border}`
                        : "none",
                      filter:
                        item?.rarity === "legendary" || item?.rarity === "deadlordary"
                          ? "drop-shadow(0 0 6px rgba(255,200,0,0.6))"
                          : "none",
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
                      if (item) setItemDetailsIndex(i)
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
                <p
                  style={{
                    color: RARITY_STYLES[hoveredItem.rarity].text,
                  }}
                >
                  <strong>{hoveredItem.name}</strong>
                  <small>{hoveredItem.rarity.toUpperCase()}</small>
                </p>
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
      {renderItemDetails()}

    </div>
  )
}
