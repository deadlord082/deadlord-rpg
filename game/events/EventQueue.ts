import { GameEvent } from "./Event"
import { GameState } from "../core/GameState"
import { runEvent } from "./EventRunner"

export class EventQueue {
  private queue: GameEvent[] = []

  enqueue(event: GameEvent) {
    this.queue.push(event)
  }

  update(state: GameState) {
    if (this.queue.length === 0) return

    const event = this.queue.shift()
    if (!event) return

    runEvent(event, state)
  }

  isBusy() {
    return this.queue.length > 0
  }
}

// Example usage:
// npc.onInteract = {
//     type: "sequence",
//     events: [
//       { type: "message", text: "Hey!" },
//       { type: "message", text: "Don't go in there." },
//       { type: "warp", targetMap: "jail", x: 3, y: 2 }
//     ]
//   }