export interface Toast {
    id: string
    type: "item" | "gold"
    message: string
    rarity?: string
    icon?: string
    createdAt: number
    duration: number
  }