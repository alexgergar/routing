import React, { useRef, useEffect, useState } from "react";
import { select, hierarchy, tree, linkVertical } from "d3";
import styled from "styled-components";
import Draggable from "../components/Draggable";
import OnBoardOptionCard from "../components/OnBoardOptionCard";
import DropTarget from "./DropTarget";

const TreeChart2 = (props) => {
  return (
    <Wrapper>
      {props.data !== null && (
        <DropTarget dropEffect="copy" hoverArea={props.hoverArea}>
          <Draggable>
            <OnBoardOptionCard
              cardData={props.data}
              setHoverArea={props.setHoverArea}
            />
          </Draggable>
        </DropTarget>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const RootNodeWrapper = styled.div`
  position: absolute;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
`;

const LevelWrapper = styled.div`
  position: absolute;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const BranchContainer = styled.div`
  margin-right: 10px;
  width: ${(props) => props.width}px;
  border: 1px solid black;
`;

export default TreeChart2;
