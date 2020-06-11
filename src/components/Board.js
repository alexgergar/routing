import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Draggable from "./Draggable";
import DropTarget from "./DropTarget";

import TreeChart from "./TreeChart";
import TreeChart2 from "./TreeChart2";

const Board = (props) => {
  const items = useSelector((state) => state.items);

  return (
    <>
      {items !== null ? (
        <ContainerForBoard>
          <TreeChart2 />
        </ContainerForBoard>
      ) : (
        <DropTarget dropEffect="copy">
          <ContainerForBoard />
        </DropTarget>
      )}
    </>
  );
};

const ContainerForBoard = styled.div`
  min-width: calc(100vw - 350px);
  min-height: calc(100vh - 50px);
  z-index: 0;
`;

export default Board;
