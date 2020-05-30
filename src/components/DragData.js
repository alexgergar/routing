import React from 'react'
import styled from "styled-components";

const DragData = props => {
  // const [isDragging, setIsDragging] = useState(false);
  
  const startDrag = (e) => {
    // setIsDragging(true);
    e.dataTransfer.setData("drag-item", JSON.stringify(props.dataItem));
    e.dataTransfer.effectAllowed = props.dropEffect;
  }

  const dragEnd = e => {
    // setIsDragging(false);
    props.setMouseDropCoords({x: e.pageX, y: e.pageY});
  };

  return (
    <Wrapper draggable onDragStart={startDrag} onDragEnd={dragEnd}>
      {props.children}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  &:hover {
    cursor: pointer;
  }

  &:active {
    cursor: -webkit-grabbing;
    cursor: grabbing;
  }
`;

export default DragData
