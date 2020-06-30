import {
  CLICKED,
  DRAG_ENTER,
  DRAG_OVER,
  DRAG_LEAVE,
  DROP,
  MOUSE_UP,
  RESET,
} from "../actions/draggedElement-actions";

export const initialDraggedElementState = {
  areaOfClickedElement: null,
  positionOfMouseDown: null,
  coordsOfDroppedElement: null,
  currentItem: null,
  dragOverDropTargetID: null,
  dragOverArea: null,
  isOver: false,
  transformCoords: { x: 0, y: 0 },
};

const draggedElementReducer = (
  state = initialDraggedElementState,
  { type, payload }
) => {
  switch (type) {
    case CLICKED:
      return {
        ...state,
        areaOfClickedElement: payload.areaOfClickedElement,
        positionOfMouseDown: payload.positionOfMouseDown,
      };
    case DRAG_ENTER:
      return {
        ...state,
        isOver: true,
        dragOverDropTargetID: payload.dragOverDropTargetID,
        dragOverArea: payload.dragOverArea,
      };
    case DRAG_OVER:
      if (state.isOver === false) {
        return {
          ...state,
          isOver: true,
          dragOverDropTargetID: payload.dragOverDropTargetID,
          dragOverArea: payload.dragOverArea,
        };
      } else return state;
    case DRAG_LEAVE:
      return {
        ...state,
        isOver: false,
        dragOverDropTargetID: null,
        dragOverArea: null,
      };
    case DROP:
      return {
        ...state,
        currentItem: payload.currentItem,
        dragOverDropTargetID: payload.dragOverDropTargetID,
        dragOverArea: payload.dragOverArea,
        isOver: false,
        coordsOfDroppedElement: null,
      };
    case MOUSE_UP:
      return {
        ...state,
        coordsOfDroppedElement: payload.coordsOfDroppedElement,
      };
    case RESET:
      return {
        areaOfClickedElement: null,
        positionOfMouseDown: null,
        coordsOfDroppedElement: null,
        currentItem: null,
        dragOverDropTargetID: null,
        dragOverArea: null,
        isOver: false,
        transformCoords: { x: 0, y: 0 },
      };
    default:
      return state;
  }
};

export default draggedElementReducer;
