import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import DropTarget from "./DropTarget";
import TreeChart from "./TreeChart";

const Board = (props) => {
  const items = useSelector((state) => state.items);

  return (
    <>
      {items !== null ? (
        <ContainerForBoard>
          <TreeChart />
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
