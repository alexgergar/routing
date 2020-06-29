export const UPDATE_TREE_DEPTH = "UPDATE_TREE_DEPTH";
export const APPEND_NEW_TREE_DEPTH = "APPEND_NEW_TREE_DEPTH";

const handleAppendNewTreeDepth = (height) => ({
  type: APPEND_NEW_TREE_DEPTH,
  payload: {
    height: height,
  },
});

const handleUpdateTreeDepthHeight = (depth, newHeight) => ({
  type: UPDATE_TREE_DEPTH,
  payload: {
    depth: depth,
    newHeight: newHeight,
  },
});

export { handleAppendNewTreeDepth, handleUpdateTreeDepthHeight };
