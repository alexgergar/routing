import {
  ADD_CONDITIONAL,
  UPDATE_CONDITIONAL,
  REMOVE_CONDITIONAL,
  RESET_CONDITIONAL,
} from "../actions/conditional-actions";

export const initialDraggedElementState = [];

const conditionalReducer = (
  state = initialDraggedElementState,
  { type, payload }
) => {
  switch (type) {
    case ADD_CONDITIONAL:
      return [...state, payload];
    case UPDATE_CONDITIONAL:
      return state.map((item, index) => {
        if (index !== payload.index) {
          return item;
        }
        return {
          ...item,
          ...payload.conditional,
        };
      });
    case REMOVE_CONDITIONAL:
      return state.filter((conditional, index) => index !== payload.index);
    case RESET_CONDITIONAL:
      return [];
    default:
      return state;
  }
};

export default conditionalReducer;
