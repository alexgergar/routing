import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Draggable = (props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0, coords: {} });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    props.setDraggingParentID(props.id);
    const pageX = e.pageX;
    const pageY = e.pageY;
    setPosition((position) => ({
      ...position,
      coords: {
        x: pageX,
        y: pageY,
      },
    }));
    document.addEventListener("mousemove", handleMouseMove.current);
  };

  const handleMouseMove = useRef((event) => {
    setPosition((position) => {
      const xDiff = position.coords.x - event.pageX;
      const yDiff = position.coords.y - event.pageY;
      props.setDraggingCoords({
        x: position.x - xDiff,
        y: position.y - yDiff,
      });
      return {
        x: position.x - xDiff,
        y: position.y - yDiff,
        coords: {
          x: event.pageX,
          y: event.pageY,
        },
      };
    });
  });

  const handleMouseUp = () => {
    setIsDragging(false);
    document.removeEventListener("mousemove", handleMouseMove.current);
    props.handleCoordinateUpdateToRootNode();
    setPosition({
      x: 0,
      y: 0,
      coords: {},
    });
  };

  return (
    <Wrapper
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      position={position}
      isDragging={isDragging}
      draggingParentID={props.draggingParentID}
      id={props.id}
      draggingCoords={props.draggingCoords}
    >
      {props.children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  zindex: 10;
  cursor: ${(props) =>
    props.isDragging ? "-webkit-grabbing" : "-webkit-grab"};
  transform: ${(props) =>
    props.draggingParentID !== props.id
      ? `translate(${props.draggingCoords.x}px, ${props.draggingCoords.y}px)`
      : `translate(${props.position.x}px, ${props.position.y}px)`};
`;

export default Draggable;
