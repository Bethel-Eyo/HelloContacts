import { ActionType } from "../types";

export interface getContactAction {
  type: ActionType.SET_CONTACTS,
  payload: Array<object>
}

export interface setSyncAction {
  type: ActionType.SYNC_CONTACTS,
  payload: boolean
}