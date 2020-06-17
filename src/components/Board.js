import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import DropTarget from "./DropTarget";
import TreeChart from "./TreeChart";

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
  min-width: ${(props) => props.width - 350};
  min-height: ${(props) => props.height - 50};
  z-index: 0;
`;

export default Board;
