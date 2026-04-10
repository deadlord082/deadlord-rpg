import { DialogLine } from "../data/dialogs/DialogLine"

export interface DialogEvent {
  type: "dialog"
  // Either a reference id to load a dialog, inline lines, or a legacy `text` string
  dialogId?: string
  lines?: DialogLine[]
  text?: string | string[]
}
