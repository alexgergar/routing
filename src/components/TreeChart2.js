import React, { useRef, useEffect, useState } from "react";
import { hierarchy, tree, linkVertical } from "d3";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Draggable from "../components/Draggable";
import OnBoardOptionCard from "../components/OnBoardOptionCard";
import DropTarget from "./DropTarget";

const TreeChart2 = (props) => {
  const items = useSelector((state) => state.items);
  const [tree, setTree] = useState();
  const [hoverArea, setHoverArea] = useState(null);

  useEffect(() => {
    const root = hierarchy(items);
    // console.log(typeof root);
    const updatedRoot = root.eachAfter((node) => {
      if (node.value === undefined) {
        node.value = 1;
      }
      if (node.children) {
        let maxSiblingsInBranch = node.children.length; // helps telling the top how many sibilings are below
        node.children.map((node) =>
          node.value > 1
            ? (maxSiblingsInBranch = maxSiblingsInBranch + node.value - 1)
            : maxSiblingsInBranch
        );
        node.value = maxSiblingsInBranch;
      }
    });

    updatedRoot.x = items.x;
    updatedRoot.y = items.y;

    setTree(updatedRoot);
  }, [items]);

  // useEffect(() => {
  //   console.log("in use effect for tree");
  //   console.log(tree);
  // }, [tree]);
  return (
    <Wrapper>
      {tree !== undefined && (
        <DropTarget dropEffect="copy" hoverArea={hoverArea} id={tree.data.id}>
          <Draggable>
            <OnBoardOptionCard data={tree.data} setHoverArea={setHoverArea} />
          </Draggable>
        </DropTarget>
      )}
      {/* {tree !== undefined &&
        tree.map((node) => (
          <DropTarget dropEffect="copy" hoverArea={hoverArea} id={node.data.id}>
            <Draggable>
              <OnBoardOptionCard data={node.data} setHoverArea={setHoverArea} />
            </Draggable>
          </DropTarget>
        ))} */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
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
