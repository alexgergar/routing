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
    <DropTarget onItemDropped={itemDropped} dropEffect="copy">
      <Container>
        {items.length > 0 &&
          items.map((item) => (
            <div key={item}>
              <Draggable>
                <OptionContainer dropElementCoords={props.dropElementCoords} />
              </Draggable>
            </div>
          ))}
        {/* <Draggable>
          <Rect />
        </Draggable>
        <Draggable>
          <BlueRect />
        </Draggable>

        <Draggable>
          <Random />
        </Draggable> */}
      </Container>
    </DropTarget>
  );
};

const Container = styled.div`
  min-width: calc(100vw - 350px);
  min-height: calc(100vh - 50px);
  z-index: 0;
  /* background: yellow; */
`;

const OptionContainer = styled.div`
  position: absolute;
  width: 200px;
  height: 100px;
  background: red;
  left: ${props => props.dropElementCoords.x}px;
  top: ${props => props.dropElementCoords.y}px;
`


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
