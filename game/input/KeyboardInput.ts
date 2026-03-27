import { Game } from "../core/Game"
import { Direction } from "../utils/direction"
import { MovementSystem } from "../systems/MovementSystem"
import { InteractionSystem } from "../systems/InteractionSystem"
import { PickupSystem } from "../systems/PickupSystem"
import { ChestSystem } from "../systems/ChestSystem"
import { isActionKey } from "./keybindings"

export function bindKeyboard(game: Game) {
  window.addEventListener("keydown", (e) => {
    const isAnyUIOpen =
      game.state.ui.menuOpen ||
      game.state.ui.merchant ||
      game.state.ui.dialog ||
      game.state.ui.choice ||
      game.state.ui.fight

    if (isActionKey(e, "cancel") && !isAnyUIOpen) {
      game.state.ui.menuOpen = true
      game.state.running = false
      game.state.ui.menuTab = null // default tab
      game.state._eventBus?.emit("uiUpdate")
      e.preventDefault()
      return
    }

    if (game.state.ui.levelUp) {
      if (e.key === "Enter" || e.key === " ") {
        game.state.ui.levelUp = undefined
        game.state.running = true
        game.state._eventBus?.emit("uiUpdate")
      }
    
      e.preventDefault()
      return
    }

    // If any UI overlay is open (dialog, menu, merchant, choice, fight),
    // block core game input so keys like Enter don't also trigger interactions.
    if (isAnyUIOpen) {
      e.preventDefault()
      return
    }

    // Block movement when the engine is not running or a choice UI is open
    if (!game.state.running || game.state.ui.choice) return

    // Movement
    if (isActionKey(e, "up")) {
      MovementSystem.move(game.state, Direction.Up)
      PickupSystem.checkPickup(game.state)
      e.preventDefault()
      return
    }

    if (isActionKey(e, "down")) {
      MovementSystem.move(game.state, Direction.Down)
      PickupSystem.checkPickup(game.state)
      e.preventDefault()
      return
    }

    if (isActionKey(e, "left")) {
      MovementSystem.move(game.state, Direction.Left)
      PickupSystem.checkPickup(game.state)
      e.preventDefault()
      return
    }

    if (isActionKey(e, "right")) {
      MovementSystem.move(game.state, Direction.Right)
      PickupSystem.checkPickup(game.state)
      e.preventDefault()
      return
    }

    // Interact / confirm
    if (isActionKey(e, "confirm")) {
      InteractionSystem.interact(game.state)
      ChestSystem.interact(game.state)
      e.preventDefault()
      return
    }
  })
}
