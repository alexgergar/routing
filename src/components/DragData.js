import React, {useState, useRef, useEffect} from 'react'


const DragData = props => {
  const [isDragging, setIsDragging] = useState(false);
  
  const startDrag = (e) => {
    setIsDragging(true);
    e.dataTransfer.setData("drag-item", JSON.stringify(props.dataItem));
    e.dataTransfer.effectAllowed = props.dropEffect;
  }

  const dragEnd = e => {
    setIsDragging(false);
    props.setMouseDropCoords({x: e.pageX, y: e.pageY});
  };

  return (
    <div 
      draggable 
      onDragStart={startDrag} 
      onDragEnd={dragEnd}
      >
        {props.children}
    </div>
  )
}

export default DragData
