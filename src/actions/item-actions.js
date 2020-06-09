export const ADD_ROOT = "item:handleAddRoot"; // the colon scopes the type so it avoids collisions with other reduccers
export const UPDATE_NODE = "itemt:handleUpdateNode";

const handleAddRoot = (node) => ({
  type: ADD_ROOT,
  payload: {
    newNode: node,
  },
});

const handleUpdateNode = (node) => ({
  type: UPDATE_NODE,
  payload: {
    newNode: node,
  },
});

export { handleAddRoot, handleUpdateNode };
