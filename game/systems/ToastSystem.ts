import { GameState } from "../core/GameState"
import { Items } from "../data/items/items"

export const ToastSystem = {
    addItemToast(state: GameState, itemId: string, quantity = 1) {
        const item = Items[itemId]
        if (!item) return

        state.toasts.push({
            id: `${Date.now()}-${Math.random()}`,
            type: "item",
            message: `Obtained ${item.name}${quantity > 1 ? ` x${quantity}` : ""}`,
            rarity: item.rarity,
            icon: item.image,
            createdAt: Date.now(),
            duration: 3000,
        })
    },

    addGoldToast(state: GameState, amount: number) {
        state.toasts.push({
          id: `${Date.now()}-${Math.random()}`,
          type: "gold",
          message: `Obtained ${amount} Gold`,
          icon: "/assets/ui/gold.png",
          createdAt: Date.now(),
          duration: 3000,
        })
    },

    addXpToast(state: GameState, amount: number) {
        state.toasts.push({
          id: `${Date.now()}-${Math.random()}`,
          type: "xp",
          message: `Obtained ${amount} XP`,
          icon: "/assets/ui/xp.png",
          createdAt: Date.now(),
          duration: 3000,
        })
    },

    addLevelUpToast(state: GameState, level: number) {
                state.toasts.push({
                    id: `${Date.now()}-${Math.random()}`,
                    type: "levelup",
                    message: `Level Up! You are now level ${level}!`,
                    createdAt: Date.now(),
                    duration: 3000,
                    icon: "/assets/ui/levelup.png",
                })
    },

    update(state: GameState) {
        const now = Date.now()
        state.toasts = state.toasts.filter(
        t => now - t.createdAt < t.duration)
    }
}