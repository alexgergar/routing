import React, {useState} from "react";
import styled from "styled-components";
import Draggable from "./Draggable";
import DropTarget from "./DropTarget";
import OnBoardOptionCard from "./OnBoardOptionCard";


const Node = (props) => {
  return (
    <div>
      {props.items.map(item => {
        return (
          <>
          <DropTarget
            onItemDropped={props.onItemDropped}
            dropEffect="copy"
            dispatchDraggedElement={props.dispatchDraggedElement}
            isOver={props.isOver}
            key={item.id}
            id={item.id}
            hoverArea={props.hoverArea}>
            <Draggable cardData={props.items}>
              <OnBoardOptionCard
                setHoverArea={props.setHoverArea}
                cardData={item} 
                rootCoords={props.rootCoords}
                isOver={props.isOver}
                />
            </Draggable>
          </DropTarget>
          {item.children && <Node items={item.children} />}
        </>  
        )
      })}
    </div>
  )
}

const Board = (props) => {
  const [hoverArea, setHoverArea] = useState(null);

  return (
    <>
      {props.items.length === 1 ? (
        <ContainerForBoard>
          <Node 
            items={props.items}
            onItemDropped={props.onItemDropped}
            dropEffect="copy"
            dispatchDraggedElement={props.dispatchDraggedElement}
            isOver={props.isOver}
            hoverArea={hoverArea}
            rootCoords={props.rootCoords}
            setHoverArea={setHoverArea}
             />
        </ContainerForBoard>
      ) : (
        <DropTarget
          onItemDropped={props.onItemDropped}
          dropEffect="copy"
          dispatchDraggedElement={props.dispatchDraggedElement}
          isOver={props.isOver}
        >
          <ContainerForBoard />
        </DropTarget>
      )}
    </>
  );
};

const ContainerForBoard = styled.div`
  min-width: calc(100vw - 350px);
  min-height: calc(100vh - 50px);
  z-index: 0;
`;

export default Board;