import { GameState } from "../core/GameState"
import { Items } from "../data/items/items"
import { t } from "@/game/utils/i18n"

export const ToastSystem = {
    addItemToast(state: GameState, itemId: string, quantity = 1) {
        const item = Items[itemId]
        if (!item) return

        state.toasts.push({
            id: `${Date.now()}-${Math.random()}`,
            type: "item",
            message: t("TOAST_OBTAINED_ITEM").replace("{name}", item.name).replace("{qty}", quantity > 1 ? ` x${quantity}` : ""),
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
          message: t("TOAST_OBTAINED_GOLD").replace("{amount}", String(amount)),
          icon: "/assets/ui/gold.png",
          createdAt: Date.now(),
          duration: 3000,
        })
    },

    addXpToast(state: GameState, amount: number) {
        state.toasts.push({
          id: `${Date.now()}-${Math.random()}`,
          type: "xp",
          message: t("TOAST_OBTAINED_XP").replace("{amount}", String(amount)),
          icon: "/assets/ui/xp.png",
          createdAt: Date.now(),
          duration: 3000,
        })
    },

    addLevelUpToast(state: GameState, level: number) {
                state.toasts.push({
                    id: `${Date.now()}-${Math.random()}`,
                    type: "levelup",
                    message: t("TOAST_LEVEL_UP").replace("{n}", String(level)),
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