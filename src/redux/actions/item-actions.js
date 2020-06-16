export const ADD_ROOT = "ADD_ROOT";
export const UPDATE_NODE = "UPDATE_NODE";
export const UPDATE_ROOT_COORDS = "UPDATE_ROOT_COORDS";

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

const handleUpdateRootCoords = (coords) => ({
  type: UPDATE_ROOT_COORDS,
  payload: {
    x: coords.x,
    y: coords.y,
  },
});

export { handleAddRoot, handleUpdateNode, handleUpdateRootCoords };
