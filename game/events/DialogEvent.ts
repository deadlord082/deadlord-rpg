import { DialogLine } from "../data/dialogs/DialogLine"

export interface DialogEvent {
  type: "dialog"
  lines: DialogLine[] // multiple lines from multiple speakers
}
