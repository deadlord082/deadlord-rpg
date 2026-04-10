export interface Toast {
    id: string
    type: "item" | "gold" | "xp" | "levelup" | "info" | "danger"
    message: string
    rarity?: string
    icon?: string
    createdAt: number
    duration: number
  }