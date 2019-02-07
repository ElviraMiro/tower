import { EditLabelAction } from '../actions';
import {
    EDIT_USER_LABEL_ERROR,
    EDIT_USER_LABEL_FETCH,
} from '../constants';

export interface EditLabelState {
    labelEdited: boolean;
    error?: string;
}

const initial: EditLabelState = {
    labelEdited: false,
};

export const editLabelReducer = (state = initial, action: EditLabelAction) => {
    switch (action.type) {
      case EDIT_USER_LABEL_FETCH:
          return {
              ...state,
              labelEdited: true,
              error: undefined,
          };
      case EDIT_USER_LABEL_ERROR:
          return {
              labelEdited: false,
              error: action.payload.message,
          };
      default:
          return {
              ...state,
          };
    }
};
