import React from "react";
import Draggable from "./Draggable";
import OnBoardOptionCard from "../components/OnBoardOptionCard";
import DropTarget from "./DropTarget";
import Arrows from "./Arrows";

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
                handleCoordinateUpdateToRootNode={
                  props.handleCoordinateUpdateToRootNode
                }
                setDraggingParentID={props.setDraggingParentID}
                draggingParentID={props.draggingParentID}
                draggingCoords={props.draggingCoords}
                setDraggingCoords={props.setDraggingCoords}
              >
                {node.children !== undefined && <Arrows data={node.children} />}
                <OnBoardOptionCard
                  data={node}
                  setHoverArea={props.setHoverArea}
                  showToolTip={props.showToolTip}
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
                showToolTip={props.showToolTip}
              />
            )}
          </>
        );
      })}
    </>
  );
};

export default Node;
