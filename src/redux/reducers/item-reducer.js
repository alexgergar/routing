import {
  ADD_ROOT,
  UPDATE_NODE,
  UPDATE_ROOT_COORDS,
  DELETE_TREE,
} from "../actions/item-actions";

const itemsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ADD_ROOT:
      return payload.newNode;
    case UPDATE_NODE:
      return {
        ...state,
        ...payload,
      };
    case DELETE_TREE:
      return null;
    case UPDATE_ROOT_COORDS:
      return {
        ...state,
        x: state.x + payload.x,
        y: state.y + payload.y,
      };
    default:
      return state;
  }
};

export default itemsReducer;
