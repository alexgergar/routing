import { ADD_ROOT, UPDATE_NODE } from "../actions/item-actions";

const itemsReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ADD_ROOT:
      return payload.newNode;
    case UPDATE_NODE:
      return state.map((item) =>
        item.id === payload.node.parentID ? payload.newNode : item
      );
    default:
      return state;
  }
};

export default itemsReducer;
