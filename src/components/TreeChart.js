import React, { useRef, useEffect, useState } from "react";
import { hierarchy, tree, linkVertical, dispatch } from "d3";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Draggable from "../components/Draggable";
import OnBoardOptionCard from "../components/OnBoardOptionCard";
import DropTarget from "./DropTarget";
import Node from "./Node";
import { handleUpdateRootCoords } from "../redux/actions/item-actions";

const cardWidth = 350;
const cardHeight = 126;

const TreeChart = (props) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const [tree, setTree] = useState();
  const [hoverArea, setHoverArea] = useState(null);
  const [draggingCoords, setDraggingCoords] = useState({
    x: 0,
    y: 0,
  });
  const [draggingParentID, setDraggingParentID] = useState(0);

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

    updatedRoot.each((node) => {
      if (node.depth === 0) {
        node.x = items.x;
        node.y = items.y;
      } else {
        let sumOfSiblingsToPt = 0;
        let arrayForSiblingsValues = [];
        for (const i in node.parent.children) {
          arrayForSiblingsValues.push(sumOfSiblingsToPt);
          sumOfSiblingsToPt = sumOfSiblingsToPt + node.parent.children[i].value;
        }

        const findBranchWidth = (value) => {
          return cardWidth * value + 10 * (value - 1);
        };
        const totalWidthOfDepth = findBranchWidth(node.parent.value);
        const branchWidth = findBranchWidth(node.value);
        const halfPtOfRootCardOnBoard = cardWidth / 2 + node.parent.x;
        const furtherPtLeftForLevel =
          halfPtOfRootCardOnBoard - totalWidthOfDepth / 2;
        const thisNodeIndex = node.parent.children.findIndex(
          (child) => child.data.id === node.data.id
        );
        const leftSiblingsWidth =
          thisNodeIndex === 0
            ? 0
            : findBranchWidth(arrayForSiblingsValues[thisNodeIndex]) + 10;
        const furtherestLeftForBranch =
          furtherPtLeftForLevel + leftSiblingsWidth;

        const thisCardXPt =
          furtherestLeftForBranch + (branchWidth - cardWidth) / 2;

        node.x = thisCardXPt;
        node.y = node.parent.y + cardHeight + 70;
      }
    });

    setTree(updatedRoot);
  }, [items]);

  const handleCoordinateUpdateToRootNode = () => {
    dispatch(
      handleUpdateRootCoords({ x: draggingCoords.x, y: draggingCoords.y })
    );
    setDraggingCoords({ x: 0, y: 0 });
    setDraggingParentID(0);
  };

  // useEffect(() => {
  //   console.log(items);
  //   // console.log(tree);
  // }, [items]);

  return (
    <Wrapper>
      {tree !== undefined && (
        <DropTarget dropEffect="copy" hoverArea={hoverArea} id={tree.data.id}>
          <Draggable
            id={tree.data.id}
            setDraggingCoords={setDraggingCoords}
            handleCoordinateUpdateToRootNode={handleCoordinateUpdateToRootNode}
            setDraggingParentID={setDraggingParentID}
            draggingParentID={draggingParentID}
            draggingCoords={draggingCoords}
          >
            <OnBoardOptionCard
              data={tree}
              setHoverArea={setHoverArea}
              left={tree.x}
              top={tree.y}
            />
          </Draggable>
        </DropTarget>
      )}
      {tree !== undefined && tree.children !== undefined && (
        <Node
          data={tree.children}
          hoverArea={hoverArea}
          setHoverArea={setHoverArea}
          handleCoordinateUpdateToRootNode={handleCoordinateUpdateToRootNode}
          setDraggingCoords={setDraggingCoords}
          setDraggingParentID={setDraggingParentID}
          draggingParentID={draggingParentID}
          draggingCoords={draggingCoords}
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
