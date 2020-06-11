import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { MoreHorizontal } from "react-feather";
import { useSelector } from "react-redux";
import IconSquare from "./IconSquare";

const OnBoardOptionCard = (props) => {
  const isOver = useSelector((state) => state.draggedElement.isOver);
  const hoveredOverId = useSelector(
    (state) => state.draggedElement.dragOverDropTargetID
  );
  const [area, setArea] = useState({});

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setArea({
        x: node.getBoundingClientRect().x,
        y: node.getBoundingClientRect().y,
        width: node.getBoundingClientRect().width,
        height: node.getBoundingClientRect().height,
        bottom: node.getBoundingClientRect().bottom,
      });
    }
  }, []);

  useEffect(() => {
    isOver ? props.setHoverArea(area) : props.setHoverArea(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOver, area]);

  return (
    <Wrapper
      ref={measuredRef}
      isOver={isOver}
      id={props.data.id}
      hoveredOverId={hoveredOverId}
      left={props.data.x}
      top={props.data.y}
    >
      <CardContents>
        <TitleRow>
          <Row>
            <IconSquare
              showBackground={false}
              icon={props.data.icon}
              size={36}
            />
            <Title>{props.data.title}</Title>
          </Row>
          <MoreHorizontal color="#c2c2c2" />
        </TitleRow>
        <HorizontalLine />
        <BodyRow>
          <ContentText>I am the body text </ContentText>
        </BodyRow>
      </CardContents>
      {/* <ExtraSpace /> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 350px;
  background-color: ${(props) =>
    props.isOver && props.id === props.hoveredOverId ? "red" : "white"};
  position: absolute;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
`;

const CardContents = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: 0px 4px 30px rgba(22, 33, 74, 0.08);
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TitleRow = styled(Row)`
  padding: 20px 20px 10px 20px;
  align-items: center;
`;

const Title = styled.p`
  margin: 0px;
  margin-left: 10px;
  font-weight: 700;
  font-size: 16px;
`;

const HorizontalLine = styled.div`
  height: 1px;
  width: 100%;
  background-color: #e9e9ef;
`;

const BodyRow = styled.div`
  display: flex;
  margin: 15px 20px;
`;

const ContentText = styled.p`
  display: inline-block;
`;

const ExtraSpace = styled.div`
  height: 100px;
  content: "";
  zindex: 0;
`;
export default OnBoardOptionCard;
