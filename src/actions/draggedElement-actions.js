export const CLICKED = "draggedElement:handleClicked"; // the colon scopes the type so it avoids collisions with other reduccers
export const DRAG_ENTER = "draggedElement:handleDragEnter";
export const DRAG_OVER = "draggedElement:handleDragOver";
export const DRAG_LEAVE = "draggedElement:handleDragLeave";
export const DROP = "draggedElement:handleDrop";
export const MOUSE_UP = "draggedElement:handleMouseUp";
export const RESET = "draggedelement:handleReset";

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
