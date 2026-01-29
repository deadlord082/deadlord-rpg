import { Direction } from "../utils/direction"

export interface Entity {
  id: string
  x: number
  y: number

  direction: Direction

  sprites?: Partial<Record<Direction, string>>

  blocking: boolean
  interact?: () => void
}
