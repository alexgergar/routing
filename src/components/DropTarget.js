import React, { useState } from "react";
import styled from "styled-components";
import * as dropEffects from "../utils/dropEffects";

const DropTarget = (props) => {
  const dragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = props.dropEffect;
    // props.setIsOver(true);
    // console.log("drag over");
  };

  const drop = (e) => {
    const droppedItem = e.dataTransfer.getData("drag-item");
    if (droppedItem) {
      props.onItemDropped(droppedItem); // this will send back the object - that you can't read in console.log
    }
    props.setIsOver(false);
    console.log('drop')
  };

  const dragEnter = (e) => {
    e.dataTransfer.dropEffect = props.dropEffect;
    props.setIsOver(true);
    console.log('drag enter')
  };

  const dragLeave = () => { 
    props.setIsOver(false);
  console.log("drag leave");
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
