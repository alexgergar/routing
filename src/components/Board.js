import React, { useEffect } from "react";
import styled from "styled-components";
import { useSelector, shallowEqual } from "react-redux";

import TreeChart from "./TreeChart";

const Board = (props) => {
  // const user = useSelector(state => state.user) // state => and then what selector to return the objec you need - use one selector for each state you need or will rerender for any change of state o
  const { draggedElement, items } = useSelector(
    (state) => ({
      // use this if you want to combine your selectors , will make a shallow compare to see if state changed
      draggedElement: state.draggedElement,
      items: state.items,
    }),
    shallowEqual
  );

  // useEffect(() => {
  //   console.log(items);
  // }, [items]);

  return <ContainerForBoard>{<TreeChart data={items} />}</ContainerForBoard>;
};

const ContainerForBoard = styled.div`
  min-width: calc(100vw - 350px);
  min-height: calc(100vh - 50px);
  z-index: 0;
`;

export default Board;
