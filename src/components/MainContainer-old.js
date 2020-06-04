import React, { useEffect, useReducer} from 'react'
import styled from "styled-components";
import SideBar from './SideBar';
import Board from './Board';
import OnBoardOptionCard from './OnBoardOptionCard';

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

const initialList = {
  list: [],
  levels: [0],
}



const itemReducer = (state, action) => {
  switch (action.type) {
    case "ADD_NODE":
      return {
        ...state,
        list: [...state.list, action.payload],
      }
    case "UPDATE_LEVELS":
      return {
        ...state,
        levels: state.levels.splice(action.payload.parentIndex, 1, action.payload.parentHeight)
      }
    case "ADD_LEVEL":
      return {
        ...state,
        levels: [...state.levels, action.payload.newLevel]
      }
    case "ADD_CHILDREN_TO_PARENT":
      return {
        ...state,
        list: state.list.map((item) => item.id === action.payload.parentID ? {...item, children: action.payload.children} : item)
      }
    default:
      console.log('error in item reducer')
  }
}


const MainContainer = props => {
  const [draggedElement, dispatchDraggedElement] = useReducer(draggedElementReducer, initialDragElement);
  const [itemList, dispatchItems] = useReducer(itemReducer, initialList);

  useEffect(() => {
    if (draggedElement.currentItem !== null && draggedElement.coordsOfDroppedElement !== null) {
      const date = new Date();
      const nodeID = date.valueOf();
      let xCoord = draggedElement.coordsOfDroppedElement.x;
      let yCoord = draggedElement.coordsOfDroppedElement.y;
      let level = 0;
      let children = []
      if (itemList.list.length > 0) {
        const indexOfParent = itemList.list.findIndex(card => card.id === draggedElement.dragOverDropTargetID);
        const parentData = itemList.list[indexOfParent];
        const parentLevel = parentData.treeLevel;
        const parentX = parentData.x;
        const parentY = parentData.y;
        const parentHeight = draggedElement.dragOverArea.height;
        const parentLevelHeightInState = itemList.levels[parentLevel];
        level = parentLevel + 1;
        if (parentHeight > parentLevelHeightInState) {
          // this updates the parent level height
          dispatchItems({
            type: "UPDATE_LEVELS",
            payload: {
              parentIndex: parentLevel,
              parentHeight: parentHeight,
            }
          })
        }
        if (itemList.levels[level] === undefined) {
          // adds new item to the levels array 
          dispatchItems({
            type: "ADD_LEVEL",
            payload: {
              newLevel: 0,
            }
          })
        }
        parentData.children.push(nodeID);
        dispatchItems({
          type: "ADD_CHILDREN_TO_PARENT",
          payload: {
            children: parentData.children,
          }
        })
      }
      const newNode = {
        id: nodeID, // to find in the array
        parentId: draggedElement.dragOverDropTargetID, // tells the parent node
        treeLevel: level,
        optionType: draggedElement.currentItem.optionType, // for the card option type
        title: draggedElement.currentItem.title, // title for the card
        shortDesc: draggedElement.currentItem.shortDesc, // description of the the card
        icon: draggedElement.currentItem.icon, // icon to help with visuals
        x: xCoord, // where the x-posiiton should be om the card. 
        y: yCoord, // where the y-position should be on the car
        children: children,
      };
      dispatchItems({
        type: "ADD_NODE", 
        payload: newNode,
      })
      dispatchDraggedElement({type: "RESET"})
    }
  }, [draggedElement.currentItem, draggedElement.coordsOfDroppedElement, draggedElement.dragOverDropTargetID, draggedElement.dragOverArea, itemList])


  useEffect(() => {
    console.log(itemList)
    // this will add the children
  }, [itemList])


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