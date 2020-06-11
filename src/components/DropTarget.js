import React from "react";
import styled from "styled-components";
import * as dropEffects from "../utils/dropEffects";
import { useDispatch, useSelector } from "react-redux";
import {
  handleClicked,
  handleDragOver,
  handleDragEnter,
  handleDragLeave,
  handleDrop,
} from "../redux/actions/draggedElement-actions";

const DropTarget = (props) => {
  const isOver = useSelector((state) => state.draggedElement.isOver);
  const dispatch = useDispatch();

  const dragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = props.dropEffect;
    if (isOver === false) {
      dispatch(handleDragOver(props.id, props.hoverArea));
    }
  };

  const drop = (e) => {
    const droppedItem = e.dataTransfer.getData("drag-item");
    if (droppedItem) {
      dispatch(handleDrop(droppedItem, props.id, props.hoverArea)); // this will send back the object - that you can't read in console.log
    }
  };

  const dragEnter = (e) => {
    e.dataTransfer.dropEffect = props.dropEffect;
    dispatch(handleDragEnter(props.id, props.hoverArea));
  };

  const dragLeave = () => {
    dispatch(handleDragLeave());
  };

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
