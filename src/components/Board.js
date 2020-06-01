import React, { useState } from "react";
import styled from "styled-components";
import Draggable from "./Draggable";
import DropTarget from "./DropTarget";
import OnBoardOptionCard from "./OnBoardOptionCard";

const Board = (props) => {
  const [isOver, setIsOver] = useState(false);

  return (
    <>
      {props.items.length >= 1 ? (
        <ContainerForBoard>
            {props.items.map((item) => {
              const extraSpace = item.nextStep.length > 0 ? true : false;
              return (
              <DropTarget
                onItemDropped={props.onItemDropped}
                dropEffect="copy"
                setIsOver={setIsOver}
                isOver={isOver}
                key={item.id}
                id={item.id}
                setDragOverDropTargetID={props.setDragOverDropTargetID}
              >
                  <Draggable>
                    <OnBoardOptionCard
                      cardData={item}
                      isOver={isOver}
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
          setIsOver={setIsOver}
          setDragOverDropTargetID={props.setDragOverDropTargetID}
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
