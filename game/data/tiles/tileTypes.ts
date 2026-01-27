import { GameEvent } from "../../events/Event"

export interface Tile {
    id: number
    name: string
    walkable: boolean
    image?: string
    onEnter?: GameEvent
    onInteract?: GameEvent
}
  