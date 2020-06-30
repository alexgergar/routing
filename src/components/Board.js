import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import DropTarget from "./DropTarget";
import TreeChart from "./TreeChart";
import dotgrid from "../images/dotgrid.png";

const Board = (props) => {
  const items = useSelector((state) => state.items);
  const widthHeight = useSelector((state) => state.widthHeight);

  const boardWidth = props.sideBarOpen
    ? widthHeight.width - 350
    : widthHeight.width;

  return (
    <>
      {items !== null ? (
        <ContainerForBoard width={boardWidth} height={widthHeight.height}>
          <TreeChart sideBarOpen={props.sideBarOpen} />
        </ContainerForBoard>
      ) : (
        <DropTarget dropEffect="copy">
          <ContainerForBoard width={boardWidth} height={widthHeight.height} />
        </DropTarget>
      )}
    </>
  );
};

const ContainerForBoard = styled.div`
  min-width: ${(props) => props.width}px;
  min-height: ${(props) => props.height - 50}px;
  z-index: 0;
  background-image: url(${dotgrid});
  background-repeat: repeat;
  background-size: 30px 30px;
  overflow: auto;
  transition: 0.5s;
`;

export default Board;
