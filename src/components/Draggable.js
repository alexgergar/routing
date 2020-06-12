import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

const Draggable = (props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0, coords: {} });

  const handleMouseDown = (e) => {
    setIsDragging(true);
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
    setPosition((position) => ({
      ...position,
      coords: {},
    }));
  };

  return (
    <Wrapper
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      position={position}
      isDragging={isDragging}
    >
      {props.children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  cursor: ${(props) =>
    props.isDragging ? "-webkit-grabbing" : "-webkit-grab"};
  transform: ${(props) =>
    `translate(${props.position.x}px, ${props.position.y}px)`};
`;

export default Draggable;
