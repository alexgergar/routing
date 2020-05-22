import React, {useState} from 'react'

const DropTarget = (props) => {

  const dragOver = event => {
    event.preventDefault();
  }

  const drop = event => {
    const droppedItem = event.dataTransfer.getData("drag-item");
    // This should update coordinates of the item
    if (droppedItem) {
      props.onItemDropped(droppedItem);
    }
  }
  return (
    <div onDragOver={dragOver} onDrop={drop}>
      {props.children}
    </div>
  )
}

export default DropTarget;
