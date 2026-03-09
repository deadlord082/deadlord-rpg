export interface FightEvent {
  type: "fight"
  // single enemy id or multiple enemy ids
  enemyId?: string
  enemyIds?: string[]
}
  