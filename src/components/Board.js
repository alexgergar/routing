import React, {useState, useCallback} from 'react';
import styled from "styled-components";
import Draggable from './Draggable';
import {range, inRange} from 'lodash';

const MAX = 5;
const HEIGHT = 88;

const Board = (props) => {
  const items = range(MAX);
  const [state, setState] = useState({
    order: items, // sorting list in idle state
    dragOrder: items, // sorting list while dragging 
    draggedIndex: null, // know the current drag row in the list
  });

  const handleDrag = useCallback(
    ({translation, id}) => {
      const delta = Math.round(translation.y / HEIGHT);
      const index = state.order.indexOf(id);
      const dragOrder = state.order.filter(index => index !== id);

      if (!inRange(index + delta, 0, items.length)) {
        return
      }
      dragOrder.splice(index + delta, 0, id);

      setState(state => ({
        ...state,
        draggedIndex: id,
        dragOrder,
      }))
    }, [state.order, items.length],
  )

  const handleDragEnd = useCallback(() => {
    setState(state => ({
      ...state,
      order: state.dragOrder,
      draggedIndex: null,
    }))
  }, []);

  return (
    <Container>
      {items.map((index) => {
        const isDragging = state.draggedIndex === index;
        const top = state.dragOrder.indexOf(index) * (HEIGHT + 10);
        const draggedTop = state.order.indexOf(index) * (HEIGHT + 10);

        return (
          <Draggable 
            key={index}
            id={index}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            <Rect 
              isDragging={isDragging}
              top={isDragging ? draggedTop: top}
              >{index}</Rect>
          </Draggable>
        );
      })}
    </Container>
  );

}

const Container = styled.div`
  width: calc(100vw - 350px);
  min-height: calc(100vh - 50px);
  display: flex;
`;

const Rect = styled.div.attrs((props) => ({
  style: {
    transition: props.isDragging ? 'none' : 'all 500ms',
    top: `${props.top}px`,
  },
}))`
  width: 300px;
  height: ${HEIGHT}px;
  user-select: none;
  background: #fff;
  bow-shadow: 0 5px 10px rgba(0, 0, 0 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  
  left: calc((100vw - 350px)/2 - 150px);
  font-size: 20px;
  color: #777;
`;
export default Board;