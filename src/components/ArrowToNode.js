import React, { useEffect } from "react";
import styled from "styled-components";

const cardWidth = 350;

const ArrowToNode = (props) => {
  const topMostPt = props.y - 70;

  let xDiff, leftMostPt, arrowPoint, stepLadder;

  if (props.parentX - props.x >= 0) {
    xDiff = props.parentX - props.x + 10;
    leftMostPt = props.x - 10 + cardWidth / 2;
    arrowPoint = `M5 62 h10 L10 68 L5 62 Z`;
    stepLadder = `M${xDiff} 0 V30 L${10} 30 V61`;
  } else {
    xDiff = props.x - props.parentX + 10;
    leftMostPt = props.parentX + cardWidth / 2;
    arrowPoint = `M${xDiff - 5} 62 h10 L${xDiff} 68 L${xDiff - 5} 62 Z`;
    stepLadder = `M0 0 L0 30 L${xDiff} 30 L${xDiff} 61`;
  }

  return (
    <SVGWrapper left={leftMostPt} top={topMostPt}>
      <SVG fill="none" preserveAspectRatio="none">
        <path d={stepLadder} stroke="black" stroke-width="2px" />
        <path d={arrowPoint} stroke="black" stroke-width="2px" />
      </SVG>
    </SVGWrapper>
  );
};

const SVGWrapper = styled.div`
  position: absolute;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  overflow: visible;
  pointer-events: none;
`;

const SVG = styled.svg`
  overflow: visible;
`;

export default ArrowToNode;
