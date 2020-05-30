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
          <DropTarget
            onItemDropped={props.onItemDropped}
            dropEffect="copy"
            setIsOver={setIsOver}
          >
            {props.items.map((item) => {
              const extraSpace = item.nextStep.length > 0 ? true : false;
              return (
                <div key={item.id}>
                  <Draggable>
                    <OnBoardOptionCard
                      cardData={item}
                      isOver={isOver}
                      extraSpace={extraSpace}
                    />
                  </Draggable>
                </div>
              );
            })}
          </DropTarget>
        </ContainerForBoard>
      ) : (
        <DropTarget
          onItemDropped={props.onItemDropped}
          dropEffect="copy"
          setIsOver={setIsOver}
        >
          <ContainerForBoard>
            {props.items.length > 0 &&
              props.items.map((item, index) => (
                <DropTarget
                  onItemDropped={props.onItemDropped}
                  dropEffect="copy"
                  key={index}
                  setIsOver={setIsOver}
                >
                  <Draggable>
                    <OnBoardOptionCard cardData={item} />
                  </Draggable>
                </DropTarget>
              ))}
          </ContainerForBoard>
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
