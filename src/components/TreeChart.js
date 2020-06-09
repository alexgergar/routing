import React, { useRef, useEffect, useState } from "react";
import { select, hierarchy, tree, linkVertical } from "d3";
import styled from "styled-components";
import Draggable from "../components/Draggable";
import OnBoardOptionCard from "../components/OnBoardOptionCard";

const TreeChart = ({ data }) => {
  const [nodes, setNodes] = useState(null);
  const [links, setLinks] = useState(null);
  const wrapperRef = useRef();

  useEffect(() => {
    const root = hierarchy(data);
    const treeLayout = tree().nodeSize([350, 125]); // node size will need to be how big the boxes are from the onBoardOptionCard

    root.eachAfter((node) => {
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
    // treeLayout(root);
    setNodes(root.descendants());
    setLinks(root.links());
    console.log(root.descendants());
    // console.log(root.links());
  }, [data]);

  return (
    <Wrapper ref={wrapperRef}>
      <Draggable>
        {nodes !== null &&
          nodes.map((node, index) => (
            <OnBoardOptionCard
              data={node.data}
              x={node.x}
              y={node.y}
              key={index}
            />
          ))}
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

export default TreeChart;
