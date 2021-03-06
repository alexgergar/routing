import React, { useEffect, useState } from "react";
import dotgrid from "../images/dotgrid.png";
import styled from "styled-components";
import SideBar from "./SideBar";
import Board from "./Board";
import DetailsSideBar from "./DetailsSideBar";
import { useSelector, useDispatch } from "react-redux";
import { handleAddRoot, handleUpdateNode } from "../redux/actions/item-actions";
import { handleReset } from "../redux/actions/draggedElement-actions";

const MainContainer = (props) => {
  const draggedElement = useSelector((state) => state.draggedElement);
  const [sideBarOpen, setSideBarOpen] = useState(true);
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();

  const handleToggleSideBar = () => {
    setSideBarOpen(!sideBarOpen);
  };

  useEffect(() => {
    if (
      draggedElement.currentItem !== null &&
      draggedElement.coordsOfDroppedElement !== null
    ) {
      const date = new Date();
      const nodeID = date.valueOf();
      let xCoord = draggedElement.coordsOfDroppedElement.x;
      let yCoord = draggedElement.coordsOfDroppedElement.y;

      const newNodeData = {
        id: nodeID, // to find in the array
        parentId: draggedElement.dragOverDropTargetID,
        optionType: draggedElement.currentItem.optionType, // for the card option type
        title: draggedElement.currentItem.title, // title for the card
        shortDesc: draggedElement.currentItem.shortDesc, // description of the the card
        icon: draggedElement.currentItem.icon, // icon to help with visuals
        noun: draggedElement.currentItem.noun, // noun to help details sidebar
        conditionalOptions: draggedElement.currentItem.conditionalOptions, // options for detail sidebar for route
        conditionsForRoute: [],
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
        dispatch(handleUpdateNode(items));
      }
      dispatch(handleReset());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    draggedElement.currentItem,
    draggedElement.coordsOfDroppedElement,
    draggedElement.dragOverDropTargetID,
    items,
  ]);

  return (
    <Main>
      <SideBar
        handleToggleSideBar={handleToggleSideBar}
        sideBarOpen={sideBarOpen}
      />
      <Board sideBarOpen={sideBarOpen} />
      <DetailsSideBar sideBarOpen={sideBarOpen} />
    </Main>
  );
};

const Main = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 50px;
  background-image: url(${dotgrid});
  background-repeat: repeat;
  background-size: 30px 30px;
`;

export default MainContainer;
