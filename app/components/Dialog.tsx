interface DialogUIProps {
  dialog: any
}

// UI TUNING CONSTANTS
const DIALOG_HEIGHT = 160
const DIALOG_PADDING = 20
const PORTRAIT_HEIGHT = 220
const NAME_FONT_SIZE = 20
const TEXT_FONT_SIZE = 16

export function DialogUI({ dialog }: DialogUIProps) {
  if (!dialog) return null

  const line = dialog.lines[dialog.index]
  const side = line.side ?? "left"

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
      }}
    >
      {/* 🧍 Character portrait */}
      {line.image && (
        <img
          src={line.image}
          alt={line.name}
          style={{
            position: "absolute",
            bottom: DIALOG_HEIGHT - 40, // overlap dialog box
            [side]: 24,
            height: PORTRAIT_HEIGHT,
            width: "auto",
            zIndex: 5,
            imageRendering: "pixelated",
          }}
        />
      )}

      {/* 💬 Dialog box */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: DIALOG_HEIGHT,
          background: "rgba(0,0,0,0.88)",
          color: "white",
          padding: DIALOG_PADDING,
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box",
        }}
      >
        {/* Speaker name */}
        <div
          style={{
            fontWeight: "bold",
            fontSize: NAME_FONT_SIZE,
            marginBottom: 6,
          }}
        >
          {line.name}
        </div>

        {/* Message */}
        <div
          style={{
            fontSize: TEXT_FONT_SIZE,
            lineHeight: 1.5,
            flex: 1,
          }}
        >
          {line.message}
        </div>

        {/* Continue hint */}
        <div
          style={{
            alignSelf: "flex-end",
            opacity: 0.6,
            fontSize: 14,
          }}
        >
          ⏎
        </div>
      </div>
    </div>
  )
}
