import { Player } from "../entities/Player"
import { Items } from "../data/items/items"
import { CombatState } from "../core/CombatState"
import { basicAttack } from "./DamageSystem"

export const InventorySystem = {
  addItem(player: Player, itemId: string, quantity = 1) {
    const baseItem = Items[itemId]
    if (!baseItem) {
      console.warn(`Unknown item id: ${itemId}`)
      return
    }

    const existing = player.inventory.find(i => i.id === itemId)

    if (existing) {
      existing.quantity += quantity
    } else {
      player.inventory.push({
        ...baseItem,
        quantity,
      })
    }
    player._eventBus?.emit("uiUpdate")
  },

  removeItem(player: Player, itemId: string, quantity = 1) {
    const existing = player.inventory.find(i => i.id === itemId)
    if (!existing) return false
    existing.quantity -= quantity
    if (existing.quantity <= 0) {
      player.inventory = player.inventory.filter(i => i.id !== itemId)
    }
    player._eventBus?.emit("uiUpdate")
    return true
  },

  /**
   * Use an item. If `combat` is provided, item can target enemies. Returns a result summary or null.
   */
  useItem(player: Player, itemId: string, opts?: { combat?: CombatState; targetIndex?: number }) {
    const existing = player.inventory.find(i => i.id === itemId)
    if (!existing) {
      console.warn(`Tried to use missing item: ${itemId}`)
      return null
    }

    const base = Items[itemId]
    if (!base) return null

    if (!base.effects || base.effects.length === 0) {
      console.warn(`useItem: no effects defined for ${itemId}`)
      return null
    }

    const results: any[] = []

    for (const eff of base.effects) {
      const target = eff.target ?? "self"

      if (eff.type === "heal") {
        if (eff.percent) {
          const amt = Math.floor((eff.amount ?? 100) / 100 * player.maxHp)
          player.hp = Math.min(player.maxHp, player.hp + amt)
          results.push({ type: "heal", amount: amt, target: "self" })
        } else {
          const amt = eff.amount ?? 0
          player.hp = Math.min(player.maxHp, player.hp + amt)
          results.push({ type: "heal", amount: amt, target: "self" })
        }
      }

      if (eff.type === "buff") {
        // create a Buff object compatible with CombatEntity.addBuff
        const buff = {
          id: `item-${itemId}-${Date.now()}`,
          name: base.name,
          type: "buff",
          duration: eff.duration ?? 3,
          modifiers: (eff.stats ?? []).map(s => ({ stat: s.stat as any, value: s.value, type: s.type ?? "flat" })),
          source: "item",
        }
        player.addBuff(buff as any)
        results.push({ type: "buff", buff })
      }

      if (eff.type === "damage") {
        // damage targets an enemy in combat
        if (!opts?.combat) {
          results.push({ type: "error", message: "No combat active" })
          continue
        }
        const enemies = (opts.combat as any).enemies as any[]
        if (!enemies || enemies.length === 0) {
          results.push({ type: "error", message: "No enemies" })
          continue
        }
        if (target === "allEnemies") {
          for (let i = 0; i < enemies.length; i++) {
            const en = enemies[i]
            if (en.hp <= 0) continue
            const amt = eff.amount ?? 0
            en.hp = Math.max(0, en.hp - amt)
            results.push({ type: "damage", amount: amt, targetIndex: i })
          }
        } else {
          const idx = opts.targetIndex ?? 0
          const en = enemies[idx]
          if (!en) {
            results.push({ type: "error", message: "Invalid target" })
          } else {
            const amt = eff.amount ?? 0
            en.hp = Math.max(0, en.hp - amt)
            results.push({ type: "damage", amount: amt, targetIndex: idx })
          }
        }
      }

      if (eff.type === "debuff") {
        if (!opts?.combat) {
          results.push({ type: "error", message: "No combat active" })
          continue
        }
        const idx = opts.targetIndex ?? 0
        const en = (opts.combat as any).enemies?.[idx]
        if (!en) {
          results.push({ type: "error", message: "Invalid target for debuff" })
        } else {
          const buff = {
            id: `item-debuff-${itemId}-${Date.now()}`,
            name: base.name,
            type: "debuff",
            duration: eff.duration ?? 3,
            modifiers: (eff.stats ?? []).map(s => ({ stat: s.stat as any, value: s.value, type: s.type ?? "flat" })),
            source: "item",
          }
          en.addBuff?.(buff)
          results.push({ type: "debuff", buff, targetIndex: idx })
        }
      }
    }

    // consume one
    this.removeItem(player, itemId, 1)

    player._eventBus?.emit("uiUpdate")
    return results
  }
}
