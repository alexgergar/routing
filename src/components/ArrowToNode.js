import React from "react";
import styled from "styled-components";

const cardWidth = 350;

const ArrowToNode = (props) => {
  const topMostPt = props.parentY;

  let yAmt = props.y - props.parentY;

  let xDiff, leftMostPt, arrowPoint, stepLadder;

  if (props.parentX - props.x >= 0) {
    xDiff = props.parentX - props.x + 10;
    leftMostPt = props.x - 10 + cardWidth / 2;
    arrowPoint = `M5 ${yAmt - 8} h10 L10 ${yAmt - 2} L5 ${yAmt - 8} Z`;
    stepLadder = `M${xDiff} 0 V${yAmt - 40} L${10} ${yAmt - 40}  V${yAmt - 9}`;
  } else {
    xDiff = props.x - props.parentX + 10;
    leftMostPt = props.parentX + cardWidth / 2;
    arrowPoint = `M${xDiff - 5} ${yAmt - 8} h10 L${xDiff} ${yAmt - 2} L${
      xDiff - 5
    } ${yAmt - 8} Z`;
    stepLadder = `M0 0 L0 ${yAmt - 40} L${xDiff} ${yAmt - 40} L${xDiff} ${
      yAmt - 9
    }`;
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
  z-index: 0;
`;

const SVG = styled.svg`
  overflow: visible;
  position: absolute;
  z-index: 0;
`;

export default ArrowToNode;
