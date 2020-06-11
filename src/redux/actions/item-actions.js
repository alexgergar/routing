export const ADD_ROOT = "ADD_ROOT";
export const UPDATE_NODE = "UPDATE_NODE";

const handleAddRoot = (node) => ({
  type: ADD_ROOT,
  payload: {
    newNode: node,
  },
});

const handleUpdateNode = (node) => ({
  type: UPDATE_NODE,
  payload: node,
});

export { handleAddRoot, handleUpdateNode };
