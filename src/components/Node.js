import React from "react";
import styled from "styled-components";
import Draggable from "./Draggable";
import OnBoardOptionCard from "../components/OnBoardOptionCard";
import DropTarget from "./DropTarget";

const Node = (props) => {
  return (
    <>
      {props.data.map((node) => {
        return (
          <>
            <DropTarget
              dropEffect="copy"
              key={node.data.id}
              hoverArea={props.hoverArea}
              id={node.data.id}
            >
              <Draggable
                id={node.data.id}
                position={props.position}
                setPosition={props.setPosition}
                handleCoordinateUpdateToRootNode={
                  props.handleCoordinateUpdateToRootNode
                }
                setDraggingParentID={props.setDraggingParentID}
                draggingParentID={props.draggingParentID}
                draggingCoords={props.draggingCoords}
                setDraggingCoords={props.setDraggingCoords}
              >
                <OnBoardOptionCard
                  data={node}
                  setHoverArea={props.setHoverArea}
                />
              </Draggable>
            </DropTarget>
            {node.children && (
              <Node
                data={node.children}
                hoverArea={props.hoverArea}
                setHoverArea={props.setHoverArea}
                handleCoordinateUpdateToRootNode={
                  props.handleCoordinateUpdateToRootNode
                }
                setDraggingParentID={props.setDraggingParentID}
                draggingParentID={props.draggingParentID}
                draggingCoords={props.draggingCoords}
                setDraggingCoords={props.setDraggingCoords}
              />
            )}
          </>
        );
      })}
    </>
  );
};

export default Node;
