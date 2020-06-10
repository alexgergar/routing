import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { handleMouseUp } from "../actions/draggedElement-actions";

const DragData = (props) => {
  const dispatch = useDispatch();
  const draggedElement = useSelector((state) => state.draggedElement);

  const startDrag = (e) => {
    e.dataTransfer.setData("drag-item", JSON.stringify(props.dataItem));
    e.dataTransfer.effectAllowed = props.dropEffect;
  };

  const dragEnd = (e) => {
    if (e !== null) {
      const xPosition = e.pageX;
      const yPosition = e.pageY;
      const xDropCoord =
        xPosition -
        350 -
        (draggedElement.positionOfMouseDown.x -
          draggedElement.areaOfClickedElement.x);
      const yDropCoord =
        yPosition -
        50 -
        (draggedElement.positionOfMouseDown.y -
          draggedElement.areaOfClickedElement.y);
      dispatch(handleMouseUp(xDropCoord, yDropCoord));
    }
  };

  return (
    <Wrapper draggable onDragStart={startDrag} onDragEnd={dragEnd}>
      {props.children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  &:hover {
    cursor: pointer;
  }

  &:active {
    cursor: -webkit-grabbing;
    cursor: grabbing;
  }
`;

export default DragData;
