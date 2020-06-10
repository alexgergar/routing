import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, shallowEqual } from "react-redux";
import Draggable from "./Draggable";
import DropTarget from "./DropTarget";

import TreeChart from "./TreeChart";
import TreeChart2 from "./TreeChart2";

const Board = (props) => {
  const [hoverArea, setHoverArea] = useState(null);
  // const user = useSelector(state => state.user) // state => and then what selector to return the objec you need - use one selector for each state you need or will rerender for any change of state o
  const { draggedElement, items } = useSelector(
    (state) => ({
      // use this if you want to combine your selectors , will make a shallow compare to see if state changed
      draggedElement: state.draggedElement,
      items: state.items,
    }),
    shallowEqual
  );

  return (
    <>
      {items !== null ? (
        <ContainerForBoard>
          <TreeChart2
            data={items}
            hoverArea={hoverArea}
            setHoverArea={setHoverArea}
          />
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
