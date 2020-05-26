import React, {useState} from 'react'


const DragData = props => {
  const [isDragging, setIsDragging] = useState(false);

  
  const startDrag = (e) => {
    setIsDragging(true);
    e.dataTransfer.setData("drag-item", JSON.stringify(props.dataItem));
    e.dataTransfer.effectAllowed = props.dropEffect;
  }

  const dragEnd = () => setIsDragging(false);

  return (
    <div draggable onDragStart={startDrag} onDragEnd={dragEnd}>
        {props.children}
    </div>
  )
}

export default DragData
