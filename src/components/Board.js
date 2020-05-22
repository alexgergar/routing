import React, { useState, useMemo, useCallback, useEffect } from "react";
import styled from "styled-components";
import Draggable from "./Draggable";


const Board = (props) => {
  

  return (
    <Container>
      <Draggable
        id={1}
      >
        <Rect />
      </Draggable>
      <Draggable
        id={2}
      >
        <BlueRect />
      </Draggable>
    </Container>
  );
};

const Container = styled.div`
  width: calc(100vw - 350px);
  min-height: calc(100vh - 50px);
`;

const Rect = styled.div`
  width: 300px;
  height: 100px;
  background: red;
`;

const BlueRect = styled.div`
  width: 300px;
  height: 100px;
  background: blue;
`;

export default Board;
