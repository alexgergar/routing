import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import DropTarget from "./DropTarget";
import TreeChart from "./TreeChart";
import dotgrid from "../images/dotgrid.png";

const Board = (props) => {
  const items = useSelector((state) => state.items);
  const widthHeight = useSelector((state) => state.widthHeight);

  return (
    <>
      {items !== null ? (
        <ContainerForBoard
          width={widthHeight.width}
          height={widthHeight.height}
        >
          <TreeChart />
        </ContainerForBoard>
      ) : (
        <DropTarget dropEffect="copy">
          <ContainerForBoard
            width={widthHeight.width}
            height={widthHeight.height}
          />
        </DropTarget>
      )}
    </>
  );
};

const ContainerForBoard = styled.div`
  min-width: ${(props) => props.width - 350}px;
  min-height: ${(props) => props.height - 50}px;
  z-index: 0;
  background-image: url(${dotgrid});
  background-repeat: repeat;
  background-size: 30px 30px;
  overflow: auto;
`;

export default Board;
