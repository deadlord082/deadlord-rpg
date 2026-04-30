import { GameEvent } from "./Event"
import { GameState } from "../core/GameState"
import { loadMap } from "../data/maps/mapLoader"
import { loadDialog } from "../data/dialogs/dialogLoader"
import { DialogLine } from "../data/dialogs/DialogLine"
import { InventorySystem } from "../systems/InventorySystem"
import { GiveItemEvent } from "./GiveItemEvent"
import { ToastSystem } from "../systems/ToastSystem"
import { ModifyPlayerHpEvent } from "./ModifyPlayerHpEvent"
import { SetEntityBlockingEvent } from "./SetEntityBlockingEvent"
import { LevelSystem } from "../systems/LevelSystem"
import { createEnemyFromId } from "../entities/createEnemyFromId"
import { ENEMIES } from "../data/enemies/enemies"
import { NPCS } from "../data/npcs/npcs"
import { t } from "@/game/utils/i18n"

export function runEvent(event: GameEvent, state: GameState) {
  switch (event.type) {
    case "dialog":
      state.running = false

      let lines: DialogLine[] = []

      // Narrow the event shape safely to avoid undefined values
      if (typeof (event as any).dialogId === "string") {
        lines = loadDialog((event as any).dialogId)
      } else if (Array.isArray((event as any).lines)) {
        // translate each line.message if it's a translation key or plain string
        lines = (event as any).lines.map((l: DialogLine) => ({
          ...l,
          message: typeof l.message === "string" ? t(l.message) : l.message,
        }))
      } else if (typeof (event as any).textKey === "string") {
        // keep keys for UI to translate at render time
        lines = [{ name: "", textKey: (event as any).textKey }]
      } else if (typeof (event as any).text === "string" || Array.isArray((event as any).text)) {
        const raw = (event as any).text
        if (Array.isArray(raw)) {
          const joined = raw.map(r => (typeof r === "string" ? t(r) : r)).join("\n")
          lines = [{ name: "", message: joined }]
        } else {
          lines = [{ name: "", message: t(raw) }]
        }
      }

      state.ui.dialog = { lines, index: 0 }
      state._eventBus?.emit("uiUpdate")
      break

    case "choice":
      state.running = false
      // translate any default yes/no labels so UI shows localized text
      try {
        const ev: any = event
          // translate the prompt/text for the choice itself; prefer `textKey` so UI t()s it
          if (typeof ev.text === "string") {
            if ((ev.text as string).startsWith("DIALOG.")) {
              ev.textKey = ev.text
            } else {
              ev.text = t(ev.text)
            }
          } else if (Array.isArray(ev.text)) {
            // join array into a single translated string
            ev.text = ev.text.map((r: any) => (typeof r === "string" ? (r.startsWith("DIALOG.") ? t(r) : t(r)) : r)).join("\n")
          }

          if (Array.isArray(ev.choices)) {
            for (const c of ev.choices) {
              if (c && typeof c.label === "string") {
                if (c.label === "Yes") c.labelKey = "YES"
                else if (c.label === "No") c.labelKey = "NO"
                else if ((c.label as string).startsWith("DIALOG.")) c.labelKey = c.label
                else c.label = t(c.label)
              }
            }
          }
      } catch (e) {}

      state.ui.choice = event
      state._eventBus?.emit("uiUpdate")
      break

    case "merchant":
      state.running = false
      state.ui.merchant = event
      state._eventBus?.emit("uiUpdate")
      break

    case "reward":
      handleRewardEvent(event, state)
      break

    case "fight": {
      const ids = event.enemyIds ?? (event.enemyId ? [event.enemyId] : [])

      state.running = false
      // expose the fight event in the UI state so global input is blocked
      state.ui.fight = event

      const enemies = ids.map(id => createEnemyFromId(id))

      state.combat = {
        player: state.player,
        enemies,
        enemyGauges: enemies.map(() => 0),

        playerGauge: 0,
        threshold: 100,

        actionTimer: 0,
        pendingAction: undefined,
        pendingEnemyIndex: undefined,

        awaitingPlayerInput: false,
        log: [],
        resolved: false,
      }

      state._eventBus?.emit("uiUpdate")
      break
    }

    case "cutscene":
      console.log("Trigger cutscene:", event.id)
      break
    
    case "warp":
      handleWarp(event, state)
      break
 
    case "requireItem": {
      // present a choice to confirm giving the item
      const e = event as any
      // allow using a translation key via `promptKey` or raw `prompt` starting with DIALOG.
      const choiceEvent: any = { type: "choice", choices: [] }

      if (typeof e.promptKey === "string") {
        choiceEvent.textKey = e.promptKey
      } else if (typeof e.prompt === "string" && e.prompt.startsWith("DIALOG.")) {
        choiceEvent.textKey = e.prompt
      } else {
        choiceEvent.text = e.prompt ?? `Give ${e.itemId}?`
      }

      // Use label keys so the UI can localize and react to language changes
      choiceEvent.choices = [
        { labelKey: "YES", event: { type: "giveItem", itemId: e.itemId, consume: e.consume ?? true, success: e.success, fail: e.fail } },
        { labelKey: "NO", event: { type: "dialog", text: "You keep your item." } },
      ]

      state.running = false
      state.ui.choice = choiceEvent
      state._eventBus?.emit("uiUpdate")
      break
    }

    case "giveItem": {
      const e = event as GiveItemEvent
      const player = state.player
      const ok = InventorySystem.removeItem(player, e.itemId, 1)
      if (ok) {
        if (e.success) runEvent(e.success, state)
      } else {
        if (e.fail) runEvent(e.fail, state)
      }
      break
    }

    case "removeEntity": {
      const e = event as any
      const map = state.currentMap
      if (!map || !map.entities) break

      let removedId: string | undefined

      if (e.entityId) {
        removedId = e.entityId
        map.entities = map.entities.filter(ent => ent.id !== e.entityId)
      } else if (typeof e.x === "number" && typeof e.y === "number") {
        const found = map.entities.find(ent => ent.x === e.x && ent.y === e.y)
        if (found) {
          removedId = found.id
          map.entities = map.entities.filter(ent => ent.id !== found.id)
        }
      }

      // record persistent removal (skip for enemies marked `respawn: true`)
      if (removedId) {
        // if this removed entity corresponds to an enemy that should respawn,
        // do not record it in persistent removals. Also skip recording for
        // NPCs (so NPCs will reappear when reloading the map), unless you
        // explicitly add a `respawn` flag to the NPC data.
        const isEnemyRespawn = ENEMIES[removedId]?.respawn === true
        const isNPC = (NPCS as any)[removedId] !== undefined
        if (!isEnemyRespawn && !isNPC) {
          const mapId = state.currentMap.id
          if (!state.removedEntityIdsByMap) state.removedEntityIdsByMap = {}
          const arr = state.removedEntityIdsByMap[mapId] ?? []
          if (!arr.includes(removedId)) {
            arr.push(removedId)
            state.removedEntityIdsByMap[mapId] = arr
          }
        }
      }

      state._eventBus?.emit("uiUpdate")
      break
    }

    case "modifyPlayerHp": {
      const e = event as ModifyPlayerHpEvent
      const player = state.player

      if (e.full) {
        player.hp = player.maxHp
        // show dialog for full heal (bed)
        state.running = false
        state.ui.dialog = { lines: [{ name: "", message: e.message ?? "You rest and feel fully healed." }], index: 0 }
      } else if (typeof e.amount === "number") {
        player.hp = Math.max(0, Math.min(player.maxHp, player.hp + e.amount))
        if (e.amount > 0) {
          state.toasts.push({ id: `${Date.now()}-${Math.random()}`, type: "info", message: e.message ?? `Healed ${e.amount} HP.`, createdAt: Date.now(), duration: 3000 })
        } else if (e.amount < 0) {
          state.toasts.push({ id: `${Date.now()}-${Math.random()}`, type: "danger", message: e.message ?? `Took ${-e.amount} damage.`, createdAt: Date.now(), duration: 3000 })
        }
      }
      // If HP reached zero, show the death UI (match combat defeat behavior)
      if (player.hp <= 0) {
        // clear combat/fight UI if present
        state.combat = undefined
        state.ui.fight = undefined
        // stop the game loop and show death screen
        state.running = false
        state.ui.death = {}
      }

      state._eventBus?.emit("uiUpdate")
      break
    }

    case "setEntityBlocking": {
      const e = event as SetEntityBlockingEvent
      const map = state.currentMap
      if (!map || !map.entities) break

      let found = false
      if (e.entityId) {
        for (const ent of map.entities) {
          if (ent.id === e.entityId) {
            ent.blocking = e.blocking
            found = true
            break
          }
        }
      } else if (typeof e.x === "number" && typeof e.y === "number") {
        for (const ent of map.entities) {
          if (ent.x === e.x && ent.y === e.y) {
            ent.blocking = e.blocking
            found = true
          }
        }
      }

      if (found) state._eventBus?.emit("uiUpdate")
      break
    }

    case "sequence":
      runSequence(event.events, state)
      break
  }
}

function runSequence(events: GameEvent[], state: GameState) {
  if (events.length === 0) return
  const [first, ...rest] = events

  runEvent(first, state)

  // queue remaining events
  state.eventQueue = rest
  // notify UI that event queue changed (so follow-up dialogs show)
  state._eventBus?.emit("uiUpdate")
}

function handleWarp(
  event: { targetMap: string; x: number; y: number },
  state: GameState
) {
  const newMap = loadMap(event.targetMap)

  state.currentMap = newMap
  state.player.x = event.x
  state.player.y = event.y

  // Apply persistent removals and modifications for this map
  const mapId = newMap.id
  const removed = state.removedEntityIdsByMap?.[mapId] ?? []
  if (removed.length > 0) {
    state.currentMap.entities = state.currentMap.entities.filter(e => !removed.includes(e.id))
  }

  const mods = state.modifiedEntitiesByMap?.[mapId]
  if (mods) {
    for (const ent of state.currentMap.entities) {
      const m = mods[ent.id]
      if (m) Object.assign(ent as any, m)
    }
  }

  // clear UI just in case
  state.ui = {}
}

function handleRewardEvent(event: { items?: string[]; gold?: number; xp?: number }, state: GameState) {
  const player = state.player

  if (event.gold) {
    player.gold += event.gold
    ToastSystem.addGoldToast(state, event.gold)
  }

  if (event.xp) {
    const levelUps = LevelSystem.gainXP(player, event.xp)
  
    ToastSystem.addXpToast(state, event.xp)
  
    if (levelUps.length > 0) {
      const first = levelUps[0]
  
      state.running = false
      state.ui.levelUp = {
        newLevel: first.level,
        previousStats: first.previousStats,
        statGains: first.statGains,
      }
    }
  }

  if (event.items) {
    for (const itemId of event.items) {
      InventorySystem.addItem(player, itemId)
      ToastSystem.addItemToast(state, itemId)
    }
  }

  state._eventBus?.emit("uiUpdate")
}

