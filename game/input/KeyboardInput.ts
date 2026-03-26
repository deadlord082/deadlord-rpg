import { Game } from "../core/Game"
import { Direction } from "../utils/direction"
import { MovementSystem } from "../systems/MovementSystem"
import { InteractionSystem } from "../systems/InteractionSystem"
import { PickupSystem } from "../systems/PickupSystem"
import { ChestSystem } from "../systems/ChestSystem"

export function bindKeyboard(game: Game) {
  window.addEventListener("keydown", (e) => {
    const isAnyUIOpen =
      game.state.ui.menuOpen ||
      game.state.ui.merchant ||
      game.state.ui.dialog ||
      game.state.ui.choice ||
      game.state.ui.fight

    if (e.key === "Escape" && !isAnyUIOpen) {
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

    switch (e.key) {
      case "ArrowUp":
      case "z":
      case "Z":
        MovementSystem.move(game.state, Direction.Up)
        PickupSystem.checkPickup(game.state)
        break
      case "ArrowDown":
      case "s":
      case "S":
        MovementSystem.move(game.state, Direction.Down)
        PickupSystem.checkPickup(game.state)
        break
      case "ArrowLeft":
      case "q":
      case "Q":
        MovementSystem.move(game.state, Direction.Left)
        PickupSystem.checkPickup(game.state)
        break
      case "ArrowRight":
      case "d":
      case "D":
        MovementSystem.move(game.state, Direction.Right)
        PickupSystem.checkPickup(game.state)
        break
      case " ":
      case "Enter":
        InteractionSystem.interact(game.state)
        ChestSystem.interact(game.state)
        break
    }
  })
}
