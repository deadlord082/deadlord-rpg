interface HpBarProps {
    hp: number
    maxHp: number
  }
  
  export function HpBar({ hp, maxHp }: HpBarProps) {
    const percent = Math.max(0, Math.min(100, (hp / maxHp) * 100))
  
    return (
      <div style={{ width: 200 }}>
        <div
          style={{
            height: 12,
            background: "#400",
            borderRadius: 6,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${percent}%`,
              height: "100%",
              background: percent > 50 ? "#0f0" : percent > 25 ? "#ff0" : "#f00",
              transition: "width 0.2s",
            }}
          />
        </div>
        <div style={{ fontSize: 12, marginTop: 4 }}>
          HP {hp} / {maxHp}
        </div>
      </div>
    )
  }
  