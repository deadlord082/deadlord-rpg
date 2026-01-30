import { GameEvent } from "../../events/Event"

export interface Tile {
    id: string
    name: string
    walkable: boolean
    image?: string
    onEnter?: GameEvent
    onInteract?: GameEvent
}
  