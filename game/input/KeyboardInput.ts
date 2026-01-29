import { Game } from "../core/Game"
import { Direction } from "../utils/direction"
import { MovementSystem } from "../systems/MovementSystem"
import { InteractionSystem } from "../systems/InteractionSystem"
import { PickupSystem } from "../systems/PickupSystem"

export function bindKeyboard(game: Game) {
  window.addEventListener("keydown", (e) => {
    // Menu toggle
    if (e.key === "Escape") {
      game.state.ui.menuOpen = !game.state.ui.menuOpen
      if (game.state.ui.menuOpen) {
        game.state.ui.menuTab = "status" // default tab
        game.state.running = false
      } else {
        game.state.running = true
      }
      ;(game.state as any)._game?.notifyUI()
      e.preventDefault()
      return
    }
    
    if (!game.state.running) return
    // if (game.state.ui.dialog) return

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
        // PickupSystem.pickupFacing(game.state)
        break
    }    
  })
}