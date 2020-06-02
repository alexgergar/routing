import React, {useState} from "react";
import styled from "styled-components";
import Draggable from "./Draggable";
import DropTarget from "./DropTarget";
import OnBoardOptionCard from "./OnBoardOptionCard";

const Board = (props) => {
  const [hoverArea, setHoverArea] = useState(null);
  return (
    <>
      {props.items.length >= 1 ? (
        <ContainerForBoard>
            {props.items.map((item) => {
              const extraSpace = item.children.length > 0 ? true : false;
              return (
              <DropTarget
                onItemDropped={props.onItemDropped}
                dropEffect="copy"
                dispatchDraggedElement={props.dispatchDraggedElement}
                isOver={props.isOver}
                key={item.id}
                id={item.id}
                hoverArea={hoverArea}
              >
                  <Draggable>
                    <OnBoardOptionCard
                      setHoverArea={setHoverArea}
                      cardData={item}
                      isOver={props.isOver}
                      extraSpace={extraSpace}
                    />
                  </Draggable>
                </DropTarget>
              );
            })}
          
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
