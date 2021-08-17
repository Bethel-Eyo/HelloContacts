import {getContactAction, setSyncAction} from '../actions';
import {ActionType} from '../types';

export type State = {
  contacts: Array<object>;
  syncedState: boolean;
};

export const initialState: State = {
  contacts: [],
  syncedState: false,
};

interface PayloadProps {
  type: string;
  payload: [];
}

const contactReducer = (state = initialState, {type, payload}: any) => {
  switch (type) {
    case ActionType.SET_CONTACTS:
      return {
        ...state,
        contacts: payload,
      };
    case ActionType.SYNC_CONTACTS:
      return {
        ...state,
        syncedState: payload,
      };
    default:
      return state;
  }
};

export default contactReducer;
