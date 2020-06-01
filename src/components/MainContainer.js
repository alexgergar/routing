import React, {useState, useEffect, useReducer} from 'react'
import styled from "styled-components";
import SideBar from './SideBar';
import Board from './Board';

const initialDragElement = {
  areaOfClickedElement: null,
  positionOfMouseDown: null,
  coordsOfDroppedElement: null,
  currentItem: null,
  dragOverDropTargetID: null,
}

const draggedElementReducer = (state, action) => {
  switch (action.type) {
    case "CLICKED":
      return {
        ...state, 
        areaOfClickedElement: action.areaOfClickedElement,
        positionOfMouseDown: action.positionOfMouseDown, 
    }
    case "DRAG_ENTER":
      return {
        ...state,
        isOver: true,
        dragOverDropTargetID: action.dragOverDropTargetID,
      }
    case "DRAG_OVER":
      return {
        ...state,
        isOver: true,
        dragOverDropTargetID: action.dragOverDropTargetID,
      }
    case "DRAG_LEAVE": 
      return {
        ...state,
        isOver: false,
        dragOverDropTargetID: null,
      }
    case "DROP":
      return {
        ...state,
        currentItem: action.currentItem,
        isOver: false,
      }
    case "MOUSE_UP":
      return {
        ...state,
        coordsOfDroppedElement: action.coordsOfDroppedElement,
      }
    case "RESET":
      return {
        areaOfClickedElement: null,
        positionOfMouseDown: null, 
        coordsOfDroppedElement: null,
        currentItem: null,
        dragOverDropTargetID: null,
      }
    default: 
      console.log('error in dragged element reducer')
  }
}


const itemReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return state.concat(action.data)
    default:
      console.log('error in item reducer')
  }
}



const MainContainer = props => {
  const [draggedElement, dispatchDraggedElement] = useReducer(draggedElementReducer, initialDragElement);
  const [itemList, dispatchItems] = useReducer(itemReducer, [])


  useEffect(() => {
    if (draggedElement.currentItem !== null && draggedElement.coordsOfDroppedElement !== null && draggedElement.dragOverDropTargetID !== null) {
      const date = new Date();
      const newData = {
        id: date.valueOf(), // to find in the array
        parentId: draggedElement.dragOverDropTargetID, // tells the parent node
        optionType: draggedElement.currentItem.optionType, // for the card option type
        title: draggedElement.currentItem.title, // title for the card
        shortDesc: draggedElement.currentItem.shortDesc, // description of the the card
        icon: draggedElement.currentItem.icon, // icon to help with visuals
        x: draggedElement.coordsOfDroppedElement.x, // where the x-posiiton should be om the card. 
        y: draggedElement.coordsOfDroppedElement.y, // where the y-position should be on the car
        nextStep: [],
      };
      dispatchItems({type: "ADD", data: newData})
      dispatchDraggedElement({type: "RESET"})
    }
  }, [draggedElement.currentItem, draggedElement.coordsOfDroppedElement, draggedElement.dragOverDropTargetID]);


  const onItemDropped = (item) => {
    dispatchDraggedElement({
      type: 'DROP', 
      currentItem: JSON.parse(item),
    })
  };

  const handleCardClicked = (area, mouseDownPagePosition) => {
    dispatchDraggedElement({
      type: "CLICKED",
      areaOfClickedElement: area,
      positionOfMouseDown: mouseDownPagePosition,
    })
  }

  const setMouseDropCoords = (mouseUpPosition) => {
    const xDropCoord =
      mouseUpPosition.x - 350 - (draggedElement.positionOfMouseDown.x - draggedElement.areaOfClickedElement.x); 
    const yDropCoord =
      mouseUpPosition.y - 50 - (draggedElement.positionOfMouseDown.y - draggedElement.areaOfClickedElement.y);
    dispatchDraggedElement({
      type: "MOUSE_UP",
      coordsOfDroppedElement: {x: xDropCoord, y: yDropCoord},
    });
  }

  return (
    <Main>
      <SideBar
        setMouseDropCoords={setMouseDropCoords}
        handleCardClicked={handleCardClicked}
      />
      <Board
        items={itemList}
        onItemDropped={onItemDropped}
        isOver={draggedElement.isOver}
        dispatchDraggedElement={dispatchDraggedElement}
      />
    </Main>
  );
};

const Main = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 50px;
`;

export default MainContainer;
