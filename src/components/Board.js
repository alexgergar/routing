import React from 'react';
import styled from "styled-components";
import Draggable from './Draggable';


const Board = (props) => {
  
  return (
    <div>
      <Draggable>
        <Rect />
      </Draggable>
    </div>
  );

}

const Rect = styled.div`
  width: 200px;
  height: 100px;
  background-color: red;
`;
export default Board;