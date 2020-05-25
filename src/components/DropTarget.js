import React, {useState} from 'react'

const DropTarget = (props) => {
const [isOver, setIsOver] = useState(false);

const dragOver = (e) => {
  e.preventDefault();
};

const drop = (e) => {
  const droppedItem = e.dataTransfer.getData("drag-item");
  const dataItems = JSON.parse(droppedItem);
  if (droppedItem) {
    console.log(`in dropped item of Drop: ${dataItems.title}`);
    props.onItemDropped(droppedItem); // this will send back the object - that you can't read in console.log
  }
  setIsOver(false);
};

const dragEnter = (e) => {
  setIsOver(true);
};

const dragLeave = () => setIsOver(false);
  return (
    <div
      onDragOver={dragOver}
      onDrop={drop}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
    >
      {props.children}
    </div>
  );
}

export default DropTarget;
