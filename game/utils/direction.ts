export enum Direction {
    Up = "up",
    Down = "down",
    Left = "left",
    Right = "right",
}

export function directionToDelta(direction: Direction) {
    switch (direction) {
        case Direction.Up:
        return { dx: 0, dy: -1 }
        case Direction.Down:
        return { dx: 0, dy: 1 }
        case Direction.Left:
        return { dx: -1, dy: 0 }
        case Direction.Right:
        return { dx: 1, dy: 0 }
    }
}
  
export function oppositeDirection(direction: Direction): Direction {
    switch (direction) {
      case Direction.Up: return Direction.Down
      case Direction.Down: return Direction.Up
      case Direction.Left: return Direction.Right
      case Direction.Right: return Direction.Left
    }
  }
  