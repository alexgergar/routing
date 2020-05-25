import React, { useState, useMemo, useCallback, useEffect } from "react";
import styled from "styled-components";
import Draggable from "./Draggable";
import DropTarget from './DropTarget';


const Board = (props) => {
  const [items, setItems] = React.useState([]);

  const itemDropped = (item) => {
    setItems([...items, item]);
  }

  return (
    <Container onItemDropped={itemDropped}>
      <Draggable>
        <Rect />
      </Draggable>
      <Draggable>
        <BlueRect />
      </Draggable>

      <Draggable>
        <Random />
      </Draggable>
    </Container>
  );
};

const Container = styled(DropTarget)`
  position: absolute;
  width: calc(100% - 350px);
  min-height: calc(100% - 50px);
  top: 50px;
  left: 350px;
  z-index: 0;
`;

const Rect = styled.div`
  width: 300px;
  height: 100px;
  background: red;
  margin: 0;
`;

const BlueRect = styled.div`
  width: 300px;
  height: 100px;
  background: blue;
  margin: 0;
`;

const Random = styled.div`
  height: 200px;
  width: 200px;
  background-color: teal;
`;

export default Board;
