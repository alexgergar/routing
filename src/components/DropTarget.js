import React from "react";
import styled from "styled-components";
import * as dropEffects from "../utils/dropEffects";

const DropTarget = (props) => {

  const dragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = props.dropEffect;
    if (props.isOver === false) {
      props.dispatchDraggedElement({
        type: "DRAG_OVER",
        setDragOverDropTargetID: props.id,
      })
    } 
  };

  const drop = (e) => {
    const droppedItem = e.dataTransfer.getData("drag-item");
    if (droppedItem) {
      props.onItemDropped(droppedItem); // this will send back the object - that you can't read in console.log
    }
  };

  const dragEnter = (e) => {
    e.dataTransfer.dropEffect = props.dropEffect;
    props.dispatchDraggedElement({
      type: "DRAG_ENTER",
      setDragOverDropTargetID: props.id,
    })
  };

  const dragLeave = () => { 
    props.dispatchDraggedElement({type: "DRAG_LEAVE"})
  }

  return (
    <Wrapper
      onDragOver={dragOver}
      onDrop={drop}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
    >
      {props.children}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

DropTarget.defaultProps = {
  dropEffect: dropEffects.All,
};

export default DropTarget;
