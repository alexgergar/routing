import React, { useState, useRef } from "react";
import styled from "styled-components";

const Draggable = (props) => {
  const [position, setPosition] = useState({x: 0, y: 0, coords: {}});

  const handleMouseMove = useRef(event => {
    setPosition(position => {
      const xDiff = position.coords.x - event.pageX;
      const yDiff = position.coords.y - event.pageY;
      return {
        x: position.x - xDiff,
        y: position.y - yDiff,
        coords: {
          x: event.pageX,
          y: event.pageY,
        },
      }
    })
  })

  const handleMouseDown = e => {
    const pageX = e.pageX;
    const pageY = e.pageY;
    setPosition(position => ({
      ...position,
      coords: {
        x: pageX,
        y: pageY,
      },
    }))
    document.addEventListener("mousemove", handleMouseMove.current);
  }

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove.current);
    setPosition(position => ({
      ...position,
      coords: {}
    }))
  }

  

  return (
    <Wrapper onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} position={position}>
      {props.children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* cursor: ${(props) =>
    props.isDragging ? "-webkit-grabbing" : "-webkit-grab"}; */
  transform: ${(props) =>
    `translate(${props.position.x}px, ${props.position.y}px)`};
  /* transition: ${(props) => (props.isDragging ? "none" : "transform 500ms")}; */
  /* z-index: ${(props) => (props.isDragging ? 2 : 1)}; */
  /* position: ${(props) => (props.isDragging ? "absolute" : "relative")}; */
`;

export default Draggable;
