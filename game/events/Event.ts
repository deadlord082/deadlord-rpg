import { WarpEvent } from "./WarpEvent"
import { DialogEvent } from "./DialogEvent"
import { ChoiceEvent } from "./ChoiceEvent"
import { MerchantEvent } from "./MerchantEvent"
import { CutsceneEvent } from "./CutsceneEvent"
import { RewardEvent } from "./RewardEvent"
import { FightEvent } from "./FightEvent"
import { SequenceEvent } from "./SequenceEvent"

export type GameEvent =
  | WarpEvent
  | DialogEvent
  | ChoiceEvent
  | MerchantEvent
  | CutsceneEvent
  | RewardEvent
  | FightEvent
  | SequenceEvent
