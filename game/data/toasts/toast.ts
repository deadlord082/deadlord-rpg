export interface Toast {
    id: string
    type: "item" | "gold" | "xp" | "levelup"
    message: string
    rarity?: string
    icon?: string
    createdAt: number
    duration: number
  }