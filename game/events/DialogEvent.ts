import { DialogLine } from "../data/dialogs/DialogLine"

export interface DialogEvent {
  type: "dialog"
  // Either a reference id to load a dialog, inline lines, or a legacy `text` string
  dialogId?: string
  lines?: DialogLine[]
  text?: string | string[]
  // optional translation key (preferred) so UI can call `t()` at render time
  textKey?: string
}
