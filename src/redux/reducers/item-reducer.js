import { ADD_ROOT, UPDATE_NODE } from "../actions/item-actions";

const itemsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ADD_ROOT:
      return payload.newNode;
    case UPDATE_NODE:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};

export default itemsReducer;
