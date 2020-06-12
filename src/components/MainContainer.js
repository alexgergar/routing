import React, { useEffect } from "react";
import styled from "styled-components";
import SideBar from "./SideBar";
import Board from "./Board";
import { useSelector, useDispatch } from "react-redux";
import { handleAddRoot, handleUpdateNode } from "../redux/actions/item-actions";
import { handleReset } from "../redux/actions/draggedElement-actions";

const MainContainer = (props) => {
  const draggedElement = useSelector((state) => state.draggedElement);
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      draggedElement.currentItem !== null &&
      draggedElement.coordsOfDroppedElement !== null
    ) {
      const date = new Date();
      const nodeID = date.valueOf();
      let xCoord = draggedElement.coordsOfDroppedElement.x;
      let yCoord = draggedElement.coordsOfDroppedElement.y;

      const cardWidth = 350; // this can be changed - depending on modifcations in the future - this helps with figuing out layout
      const newNodeData = {
        id: nodeID, // to find in the array
        parentId: draggedElement.dragOverDropTargetID,
        optionType: draggedElement.currentItem.optionType, // for the card option type
        title: draggedElement.currentItem.title, // title for the card
        shortDesc: draggedElement.currentItem.shortDesc, // description of the the card
        icon: draggedElement.currentItem.icon, // icon to help with visuals
        x: xCoord, // where the x-posiiton should be om the card.
        y: yCoord, // where the y-position should be on the card
        children: [],
      };
      if (items === null) {
        dispatch(handleAddRoot(newNodeData));
      } else {
        let foundValue;
        const findID = (object, id) => {
          if (
            typeof object !== "object" ||
            object === undefined ||
            object === null
          )
            return;
          if (object.id === id) {
            foundValue = object;
            return;
          } else {
            for (const i in object) {
              findID(object[i], id);
            }
          }
        };
        findID(items, draggedElement.dragOverDropTargetID);
        foundValue.children.push(newNodeData);
        console.log(newNodeData);
        dispatch(handleUpdateNode(items));
      }
      dispatch(handleReset());
    }
  }, [
    draggedElement.currentItem,
    draggedElement.coordsOfDroppedElement,
    draggedElement.dragOverDropTargetID,
    draggedElement.dragOverArea,
    items,
  ]);

  return (
    <Main>
      <SideBar />
      <Board />
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
