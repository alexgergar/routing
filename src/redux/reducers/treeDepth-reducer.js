import {
  UPDATE_TREE_DEPTH,
  APPEND_NEW_TREE_DEPTH,
} from "../actions/treeDepth-actions";

export const initialTreeDepthState = [];

const treeDepthReducer = (state = initialTreeDepthState, { type, payload }) => {
  switch (type) {
    case UPDATE_TREE_DEPTH:
      return state.map((height, index) => {
        if (index === payload.depth) {
          return payload.newHeight;
        } else {
          return height;
        }
      });
    case APPEND_NEW_TREE_DEPTH:
      return [...state, payload.height];
    default:
      return state;
  }
};

export default treeDepthReducer;
