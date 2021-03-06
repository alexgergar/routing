import React, { useEffect, useState } from "react";
import { hierarchy } from "d3";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Draggable from "../components/Draggable";
import OnBoardOptionCard from "../components/OnBoardOptionCard";
import DropTarget from "./DropTarget";
import Node from "./Node";
import { handleUpdateRootCoords } from "../redux/actions/item-actions";
import Arrows from "./Arrows";
import ToolTip from "./ToolTip";

const cardWidth = 350;

const TreeChart = (props) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items);
  const treeDepth = useSelector((state) => state.treeDepth);
  const [tree, setTree] = useState();
  const [hoverArea, setHoverArea] = useState(null);
  const [draggingCoords, setDraggingCoords] = useState({
    x: 0,
    y: 0,
  });
  const [draggingParentID, setDraggingParentID] = useState(0);
  const [showToolTip, setShowToolTip] = useState(true);

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
        if (node.x !== items.x || node.y !== items.y) {
          node.x = items.x;
          node.y = items.y;
        }
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
        node.y =
          treeDepth[node.depth] !== 0
            ? node.parent.y + treeDepth[node.depth - 1] + 70
            : node.parent.y + 126 + 70;
      }
    });
    setTree(updatedRoot);
  }, [items, treeDepth]);

  const handleCoordinateUpdateToRootNode = () => {
    dispatch(
      handleUpdateRootCoords({ x: draggingCoords.x, y: draggingCoords.y })
    );
    setDraggingCoords({ x: 0, y: 0 });
    setDraggingParentID(0);
  };

  useEffect(() => {
    if (showToolTip === true) {
      const handleSeShowToolTip = () => {
        setShowToolTip(false);
      };
      window.addEventListener("mousedown", handleSeShowToolTip);

      return () => {
        window.removeEventListener("mousedown", handleSeShowToolTip);
      };
    }
  }, [showToolTip]);

  const leftAmt = props.sideBarOpen ? 0 : 700;

  return (
    <Wrapper marginLeft={leftAmt}>
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
            {tree.children !== undefined && <Arrows data={tree.children} />}
            <OnBoardOptionCard
              data={tree}
              children={tree.children}
              setHoverArea={setHoverArea}
              left={tree.x}
              top={tree.y}
              showToolTip={showToolTip}
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
          showToolTip={showToolTip}
        />
      )}
      {tree !== undefined && tree.children === undefined && showToolTip && (
        <ToolTip left={items.x + 701} top={items.y + 60}>
          Click or Double Click to Add Possible Conditional to Child Blocks or
          Routes. <br />
          <br />
          This Flowchart is draggable - Click & Hold to see more!
        </ToolTip>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-left: ${(props) => props.marginLeft}px;
  transition: 0.5s;
`;

export default TreeChart;
