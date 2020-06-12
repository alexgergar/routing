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
      {props.data.map((node) => {
        {
          /* console.log(`props.rootY: ${props.rootY}`); */
        }
        const nodeY = props.rootY + 1.5 * cardHeight;
        const nodeX = props.rootX;
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
                  left={nodeX}
                  top={nodeY}
                />
              </Draggable>
            </DropTarget>
            {node.children && (
              <Node
                data={node.children}
                hoverArea={props.hoverArea}
                setHoverArea={props.setHoverArea}
                rootX={props.rootX}
                rootY={props.rootY}
              />
            )}
          </>
        );
      })}
    </>
  );
};

const TreeChart2 = (props) => {
  const items = useSelector((state) => state.items);
  const draggedElement = useSelector((state) => state.draggedElement);
  const [tree, setTree] = useState();
  const [hoverArea, setHoverArea] = useState(null);
  const [rootX, setRootX] = useState(items.x);
  const [rootY, setRootY] = useState(items.y);

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
    setTree(updatedRoot);
  }, [items]);

  useEffect(() => {
    console.log(draggedElement.coordsOfDroppedElement);
  }, [draggedElement.coordsOfDroppedElement]);

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
              left={rootX}
              top={rootY}
            />
          </Draggable>
        </DropTarget>
      )}
      {tree !== undefined && tree.children !== undefined && (
        <Node
          data={tree.children}
          hoverArea={hoverArea}
          setHoverArea={setHoverArea}
          rootX={rootX}
          rootY={rootY}
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

const NodeWrapper = styled.div`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
`;

export default TreeChart2;
