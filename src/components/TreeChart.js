import React, { useRef, useEffect, useState } from "react";
import { hierarchy, tree, linkVertical } from "d3";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Draggable from "../components/Draggable";
import OnBoardOptionCard from "../components/OnBoardOptionCard";
import DropTarget from "./DropTarget";

const cardWidth = 350;
const cardHeight = 126;

const Node = (props) => {
  return (
    <>
      {props.data.map((node, index) => {
        const nodeY = props.rootY + cardHeight + 70;
        const totalWidthOfDepth =
          cardWidth * props.parentValue + 10 * (props.parentValue - 1);

        const findBranchWidth = (value) => {
          return cardWidth * value + 10 * (value - 1);
        };

        const branchWidth = findBranchWidth(node.value);

        const halfPtOfRootCardOnBoard = cardWidth / 2 + props.rootX;
        const furtherPtLeftForLevel =
          halfPtOfRootCardOnBoard - totalWidthOfDepth / 2;

        const leftSiblingsWidth = findBranchWidth(
          props.valueTopSiblings[index]
        );
        const furtherestLeftForBranch =
          furtherPtLeftForLevel + leftSiblingsWidth;

        const thisCardXPt =
          furtherestLeftForBranch + (branchWidth - cardWidth) / 2;

        let sumOfSiblingsToPt = 0;
        let arrayForChildrenValues = [];
        if (node.children !== undefined) {
          for (const i in node.children) {
            arrayForChildrenValues.push(sumOfSiblingsToPt);
            sumOfSiblingsToPt = sumOfSiblingsToPt + node.children[i].value;
          }
        }

        return (
          <>
            <DropTarget
              dropEffect="copy"
              key={node.data.id}
              hoverArea={props.hoverArea}
              id={node.data.id}
            >
              <Draggable>
                <OnBoardOptionCard
                  data={node}
                  setHoverArea={props.setHoverArea}
                  left={thisCardXPt}
                  top={nodeY}
                />
              </Draggable>
            </DropTarget>
            {node.children && (
              <Node
                data={node.children}
                hoverArea={props.hoverArea}
                setHoverArea={props.setHoverArea}
                rootX={thisCardXPt}
                rootY={nodeY}
                parentValue={node.value}
                valueTopSiblings={arrayForChildrenValues}
              />
            )}
          </>
        );
      })}
    </>
  );
};

const TreeChart = (props) => {
  const items = useSelector((state) => state.items);
  const draggedElement = useSelector((state) => state.draggedElement);
  const [tree, setTree] = useState();
  const [hoverArea, setHoverArea] = useState(null);
  const [valueTopSiblings, setValueTopSiblings] = useState(); // this is an array that will tell you how many siblings to the left there are and how much space they take up for their branch

  useEffect(() => {
    const root = hierarchy(items);
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

    let sumOfSiblingsToPt = 0;
    let arrayForChildrenValues = [];
    if (updatedRoot.children !== undefined) {
      for (const i in updatedRoot.children) {
        arrayForChildrenValues.push(sumOfSiblingsToPt);
        sumOfSiblingsToPt = sumOfSiblingsToPt + updatedRoot.children[i].value;
      }
    }
    setValueTopSiblings(arrayForChildrenValues);
    setTree(updatedRoot);
  }, [items]);

  // useEffect(() => {
  //   console.log(tree);
  // }, [tree]);

  return (
    <Wrapper>
      {tree !== undefined && (
        <DropTarget dropEffect="copy" hoverArea={hoverArea} id={tree.data.id}>
          <Draggable>
            <OnBoardOptionCard
              data={tree}
              setHoverArea={setHoverArea}
              left={items.x}
              top={items.y}
            />
          </Draggable>
        </DropTarget>
      )}
      {tree !== undefined && tree.children !== undefined && (
        <Node
          data={tree.children}
          hoverArea={hoverArea}
          setHoverArea={setHoverArea}
          rootX={items.x}
          rootY={items.y}
          parentValue={tree.value}
          valueTopSiblings={valueTopSiblings}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${"" /* position: absolute; */}
  ${"" /* top: ${(props) => props.top}px; */}
  ${"" /* left: ${(props) => props.left}px; */}
`;

export default TreeChart;
