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
      if (state.isOver == false) {
        return {
          ...state,
          isOver: true,
          dragOverDropTargetID: action.dragOverDropTargetID,
          dragOverArea: action.dragOverArea,
        }
      } 
      // else {
      //   return {
      //     ...state,
      //     dragOverDropTargetID: action.dragOverDropTargetID,
      //     dragOverArea: action.dragOverArea,
      //   }
      // }
    // case "DRAG_OVER":
    //   return {
    //     ...state,
    //     isOver: true,
    //     dragOverDropTargetID: action.dragOverDropTargetID,
    //     dragOverArea: action.dragOverArea,
    //   }
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

const initialList = {
  list: [],
  levels: [0],
}


const itemReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NODE":
      return {
        list: state.list.concat(action.data),
        levels: action.levels,
      };
    default:
      console.log('error in item reducer')
  }
}




const MainContainer = props => {
  const [draggedElement, dispatchDraggedElement] = useReducer(draggedElementReducer, initialDragElement);
  const [itemList, dispatchItems] = useReducer(itemReducer, initialList);
  const [hoverOverArea, setHoverOverArea] = useState(null);

  useEffect(() => {
    if (draggedElement.currentItem !== null && draggedElement.coordsOfDroppedElement !== null && draggedElement.dragOverDropTargetID !== null) {
      const date = new Date();
      const nodeID = date.valueOf();
      let xCoord = draggedElement.coordsOfDroppedElement.x;
      let yCoord = draggedElement.coordsOfDroppedElement.y;
      let level = 0;
      if (itemList.length > 0 ) {
        const indexOfParentNode = itemList.list.findIndex(card => card.id === draggedElement.dragOverDropTargetID);
        const parentLevel = itemList.list[indexOfParentNode].treeLevel;
        level = parentLevel + 1;
        // if (itemList.list[indexOfParentNode].children.length > 0) {
        //   if (itemList.levels[parentLevel] < gra)
        // }
        itemList.list[indexOfParentNode].children.push(draggedElement.dragOverDropTargetID);
      }
      const newData = {
        id: nodeID, // to find in the array
        parentId: draggedElement.dragOverDropTargetID, // tells the parent node
        treeLevel: level,
        optionType: draggedElement.currentItem.optionType, // for the card option type
        title: draggedElement.currentItem.title, // title for the card
        shortDesc: draggedElement.currentItem.shortDesc, // description of the the card
        icon: draggedElement.currentItem.icon, // icon to help with visuals
        x: xCoord, // where the x-posiiton should be om the card. 
        y: yCoord, // where the y-position should be on the car
        children: [],
      };
      dispatchItems({type: "ADD_NODE", data: newData})
      dispatchDraggedElement({type: "RESET"})
    }
  }, [itemList, draggedElement.currentItem, draggedElement.coordsOfDroppedElement, draggedElement.areaOfClickedElement, draggedElement.dragOverDropTargetID]);


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
        items={itemList.list}
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
