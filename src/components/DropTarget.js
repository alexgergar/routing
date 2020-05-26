import React, {useState} from 'react';
import * as dropEffect from '../utils/dropEffects'

const DropTarget = (props) => {
const [isOver, setIsOver] = useState(false);

const dragOver = (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = props.dropEffect;
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
  console.log('drag enter');
  e.dataTransfer.dropEffect = props.dropEffect;
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
