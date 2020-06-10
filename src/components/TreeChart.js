import React, { useRef, useEffect, useState } from "react";
import { select, hierarchy, tree, linkVertical } from "d3";
import styled from "styled-components";
import Draggable from "../components/Draggable";
import OnBoardOptionCard from "../components/OnBoardOptionCard";
import Branch from "../components/Branch";

const TreeChart = ({ data }) => {
  const [nodes, setNodes] = useState(null);
  const [rootNode, setRootNode] = useState(null);
  const [links, setLinks] = useState(null);
  const [rootWidth, setRootWidth] = useState(null);
  const wrapperRef = useRef();

  const cardWidth = 350;
  const cardHeight = 125;

  useEffect(() => {
    const root = hierarchy(data);
    const treeLayout = tree().nodeSize([350, 125]); // node size will need to be how big the boxes are from the onBoardOptionCard
    treeLayout(root);
    const updatedRoot = root.eachAfter((node) => {
      if (node.value === undefined) {
        node.value = 1;
      }
      if (node.children) {
        let totalChildren = node.children.length;
        node.children.map((node) =>
          node.value > 1
            ? (totalChildren = totalChildren + node.value - 1)
            : totalChildren
        );
        node.value = totalChildren;
      }
    });

    // const newRoot = updatedRoot.map((node) => {
    //   if (node.parent === null) {
    //     node.x = 400; //////// CHNAGE BASED OFF OF DRAG COORD
    //     node.y = 0; ///// CHNAGE BASED OFF OF DRAG COORD
    //   }
    // });
    // updatedRoot.each((node) => {
    //   // console.log(node.parent.x);
    //   if (node.parent === null) {
    //     node.x = 400; //////// CHNAGE BASED OFF OF DRAG COORD
    //     node.y = 0; ///// CHNAGE BASED OFF OF DRAG COORD
    //   }
    // });
    updatedRoot.x = 400;
    updatedRoot.y = 5;
    setRootWidth(updatedRoot.value * cardWidth + 10 * (updatedRoot.value - 1));

    console.log(updatedRoot);
    setRootNode(updatedRoot);
    setNodes(updatedRoot.descendants());
    setLinks(updatedRoot.links());
    console.log(updatedRoot.descendants());
    // console.log(root.links());
  }, [data]);

  return (
    <Wrapper ref={wrapperRef}>
      <Draggable>
        {rootNode !== null && (
          <RootNodeWrapper x={rootNode.x} y={rootNode.y}>
            <OnBoardOptionCard data={rootNode} />
          </RootNodeWrapper>
        )}
        {rootNode !== null && rootNode.children && (
          <LevelWrapper x={rootNode.x - rootWidth / 2} y={cardHeight * 1.5}>
            <FlexContainer>
              <BranchContainer width={cardWidth * rootNode.children[0].value}>
                <div>here</div>
              </BranchContainer>
              <BranchContainer width={cardWidth * rootNode.children[1].value}>
                <div>here</div>
              </BranchContainer>
            </FlexContainer>
          </LevelWrapper>
        )}
        {/* {nodes !== null &&
          nodes.map((node, index) => (
            <OnBoardOptionCard
              data={node.data}
              x={node.x}
              y={node.y}
              key={index}
            />
          ))} */}
        {/* {tester !== null &&
          tester.map((node, index) =>
            node.source === undefined ? (
              <OnBoardOptionCard data={node.data} />
            ) : (
              <svg>
                <path
                  d={`M ${node.source.x}, ${node.source.y} V100, H ${
                    node.target.x + 175
                  }`}
                  stoke="black"
                />
              </svg>
            )
          )} */}
      </Draggable>
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

export default TreeChart;
