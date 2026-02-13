import { RARITY_STYLES } from "@/game/data/items/rarityColors"

interface ToastUIProps {
    toasts: {
      id: string
      message: string
      type: "item" | "gold"
      rarity?: string
    }[]
  }
  
  export function ToastUI({ toasts }: ToastUIProps) {
    return (
      <div
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          pointerEvents: "none",
        }}
      >
       {toasts.map(t => {
          let border = "#facc15"
          let bg = "rgba(255,204,51,0.15)"
          let textColor = "#fff"

          if (t.type === "item" && t.rarity) {
            const rarityStyle = RARITY_STYLES[t.rarity as keyof typeof RARITY_STYLES]
            if (rarityStyle) {
              border = rarityStyle.border
              bg = rarityStyle.bg
              textColor = rarityStyle.text
            }
          }

          return (
            <div
              key={t.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 16px",
                background: bg,
                border: `2px solid ${border}`,
                color: textColor,
                fontWeight: 500,
                borderRadius: 6,
                boxShadow: `0 0 8px ${border}`,
                minWidth: 220,
              }}
            >
              {t.icon && (
                <img
                  src={t.icon}
                  style={{
                    width: 32,
                    height: 32,
                    objectFit: "contain",
                  }}
                />
              )}

              <span>{t.message}</span>
            </div>
          )
        })}
      </div>
    )
  }