export interface Entity {
  id: string
  x: number
  y: number
  image?: string
  blocking: boolean
  interact?: () => void
}
