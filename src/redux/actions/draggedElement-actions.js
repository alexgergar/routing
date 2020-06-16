export const CLICKED = "CLICKED";
export const DRAG_ENTER = "DRAG_ENTER";
export const DRAG_OVER = "DRAG_OVER";
export const DRAG_LEAVE = "DRAG_LEAVE";
export const DROP = "DROP";
export const MOUSE_UP = "MOUSE_UP";
export const RESET = "RESET";

const handleClicked = (area, mouseDownPagePosition) => ({
  type: CLICKED,
  payload: {
    areaOfClickedElement: area,
    positionOfMouseDown: mouseDownPagePosition,
  },
});

const handleDragEnter = (id, area) => ({
  type: DRAG_ENTER,
  payload: {
    dragOverDropTargetID: id,
    dragOverArea: area,
  },
});

const handleDragOver = (id, area) => ({
  type: DRAG_OVER,
  payload: {
    dragOverDropTargetID: id,
    dragOverArea: area,
  },
});

const handleDragLeave = () => ({
  type: DRAG_LEAVE,
});

const handleDrop = (item, id, hoverElementArea) => ({
  type: DROP,
  payload: {
    currentItem: JSON.parse(item),
    dragOverDropTargetID: id,
    dragOverArea: hoverElementArea,
  },
});

const handleMouseUp = (xCoord, yCoord) => ({
  type: MOUSE_UP,
  payload: {
    coordsOfDroppedElement: { x: xCoord, y: yCoord },
  },
});

const handleReset = () => ({
  type: RESET,
});

export {
  handleClicked,
  handleDragEnter,
  handleDragOver,
  handleDragLeave,
  handleDrop,
  handleMouseUp,
  handleReset,
};
