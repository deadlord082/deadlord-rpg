export interface ModifyPlayerHpEvent {
  type: "modifyPlayerHp"
  // If `full` is true, set player HP to maxHp.
  full?: boolean
  // Positive to heal, negative to damage.
  amount?: number
  message?: string
}

export type _ModifyPlayerHpEvent = ModifyPlayerHpEvent
