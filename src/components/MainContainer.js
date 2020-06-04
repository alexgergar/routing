import React, { useEffect, useReducer} from 'react'
import styled from "styled-components";
import SideBar from './SideBar';
import Board from './Board';

const initialDragElement = {
  areaOfClickedElement: null,
  positionOfMouseDown: null,
  coordsOfDroppedElement: null,
  currentItem: null,
  dragOverDropTargetID: null,
  dragOverArea: null,
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
        dragOverArea: action.dragOverArea,
      }
    case "DRAG_OVER":
      // eslint-disable-next-line eqeqeq
      if (state.isOver == false) {
        return {
          ...state,
          isOver: true,
          dragOverDropTargetID: action.dragOverDropTargetID,
          dragOverArea: action.dragOverArea,
        }
      } 
      break;
    case "DRAG_LEAVE": 
      return {
        ...state,
        isOver: false,
        dragOverDropTargetID: null,
        dragOverArea: null,
      }
    case "DROP":
      return {
        ...state,
        currentItem: action.currentItem,
        dragOverDropTargetID: action.dragOverDropTargetID,
        dragOverArea: action.dragOverArea,
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
        dragOverArea: null,
      }
    default: 
      console.log('error in dragged element reducer')
  }
}

const initialItems = {
  list: [],
  rootCoords: {},
}

const itemsReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ROOT":
      return {
        list: [...state.list, action.newNode],
        rootCoords: {x: action.xCoord, y: action.yCoord}
      }
    default: 
    console.log('error in items reducer')
  }
}


const MainContainer = props => {
  const [draggedElement, dispatchDraggedElement] = useReducer(draggedElementReducer, initialDragElement);
  const [items, dispatchItems] = useReducer(itemsReducer, initialItems);

  useEffect(() => {
    if (draggedElement.currentItem !== null && draggedElement.coordsOfDroppedElement !== null) {
      const date = new Date();
      const nodeID = date.valueOf();
      let xCoord = draggedElement.coordsOfDroppedElement.x;
      let yCoord = draggedElement.coordsOfDroppedElement.y;
      let level = 0;
      let children = [];
      
      const cardWidth = 350; // this can be changed - depending on modifcations in the future - this helps with figuing out layout
      const newNode = {
        id: nodeID, // to find in the array
        parentId: draggedElement.dragOverDropTargetID, // tells the parent node
        treeLevel: level,
        optionType: draggedElement.currentItem.optionType, // for the card option type
        title: draggedElement.currentItem.title, // title for the card
        shortDesc: draggedElement.currentItem.shortDesc, // description of the the card
        icon: draggedElement.currentItem.icon, // icon to help with visuals
        children: children,
      };
      if (items.list.length === 0) {
        console.log(newNode)
        dispatchItems({
          type: "ADD_ROOT",
          newNode: newNode, 
          xCoord: xCoord,
          yCoord: yCoord,
        })
      } 
      dispatchDraggedElement({type: "RESET"})
    }
  }, [draggedElement.currentItem, draggedElement.coordsOfDroppedElement, draggedElement.dragOverDropTargetID, draggedElement.dragOverArea, items])


  useEffect(() => {
    console.log(items)
    // this will add the children
  }, [items])

  
  const onItemDropped = (item, id, hoverElementArea) => {
    dispatchDraggedElement({
      type: 'DROP', 
      currentItem: JSON.parse(item),
      dragOverDropTargetID: id,
      dragOverArea: hoverElementArea,
    })
  };

  const handleCardClicked = (area, mouseDownPagePosition) => {
    dispatchDraggedElement({
      type: "CLICKED",
      areaOfClickedElement: area,
      positionOfMouseDown: mouseDownPagePosition,
    })
  }

  const setMouseDropCoords = mouseUpPosition => {
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
        items={items.list}
        rootCoords={items.rootCoords}
        setMouseDropCoords={setMouseDropCoords}
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