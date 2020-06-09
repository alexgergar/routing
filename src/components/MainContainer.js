import React, { useEffect } from "react";
import styled from "styled-components";
import SideBar from "./SideBar";
import Board from "./Board";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { handleAddRoot } from "../actions/item-actions";
import { handleReset } from "../actions/draggedElement-actions";

const MainContainer = (props) => {
  const { draggedElement, items } = useSelector(
    (state) => ({
      draggedElement: state.draggedElement,
      items: state.items,
    }),
    shallowEqual
  );
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
        optionType: draggedElement.currentItem.optionType, // for the card option type
        title: draggedElement.currentItem.title, // title for the card
        shortDesc: draggedElement.currentItem.shortDesc, // description of the the card
        icon: draggedElement.currentItem.icon, // icon to help with visuals
        // x: xCoord, // where the x-posiiton should be om the card.
        // y: yCoord, // where the y-position should be on the card
        children: [],
      };
      if (items.length === 0) {
        console.log("length is zero");
        // need to figure out how to push data to this element
      }
      if (items === null) {
        console.log("items is null");
        dispatch(
          handleAddRoot({
            type: "ADD_ROOT",
            payload: {
              newNode: newNodeData,
            },
          })
        );
      }
      dispatch(handleReset({ type: "RESET" }));
    }
  }, [
    draggedElement.currentItem,
    draggedElement.coordsOfDroppedElement,
    draggedElement.dragOverDropTargetID,
    draggedElement.dragOverArea,
    items,
    dispatch,
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
