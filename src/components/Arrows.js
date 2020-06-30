import React from "react";
import ArrowToNode from "./ArrowToNode";

const Arrows = (props) => {
  return (
    <>
      {props.data.map((node) => {
        return (
          <>
            <ArrowToNode
              x={node.x}
              y={node.y}
              parentY={node.parent.y}
              parentX={node.parent.x}
            />
            {node.children && <Arrows data={node.children} />}
          </>
        );
      })}
    </>
  );
};

export default Arrows;
