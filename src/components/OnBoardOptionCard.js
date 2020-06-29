import React, { useState, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import { MoreHorizontal } from "react-feather";
import { useSelector, useDispatch } from "react-redux";
import IconSquare from "./IconSquare";
import { handleToggleMenuOpen } from "../redux/actions/menu-actions";
import {
  handleUpdateTreeDepthHeight,
  handleAppendNewTreeDepth,
} from "../redux/actions/treeDepth-actions";
import ConditionIcon from "./ConditionIcon";

const OnBoardOptionCard = (props) => {
  const isOver = useSelector((state) => state.draggedElement.isOver);
  const hoveredOverId = useSelector(
    (state) => state.draggedElement.dragOverDropTargetID
  );
  const [area, setArea] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    bottom: 0,
  });
  const menu = useSelector((state) => state.menu);
  const treeDepth = useSelector((state) => state.treeDepth);
  const [hasConditionals, setHasConditionals] = useState(false);
  const dispatch = useDispatch();

  const boardRef = useRef();

  useEffect(() => {
    if (
      boardRef.current &&
      boardRef.current.getBoundingClientRect().height !== area.height
    ) {
      setArea({
        x: boardRef.current.getBoundingClientRect().x,
        y: boardRef.current.getBoundingClientRect().y,
        width: boardRef.current.getBoundingClientRect().width,
        height: boardRef.current.getBoundingClientRect().height,
        bottom: boardRef.current.getBoundingClientRect().bottom,
      });
      if (treeDepth[props.data.depth] === undefined) {
        dispatch(
          handleAppendNewTreeDepth(
            boardRef.current.getBoundingClientRect().height
          )
        );
      } else if (
        boardRef.current.getBoundingClientRect().height >
        treeDepth[props.data.depth]
      ) {
        dispatch(
          handleUpdateTreeDepthHeight(
            props.data.depth,
            boardRef.current.getBoundingClientRect().height
          )
        );
      }
    }
  }, [area.height, hasConditionals, props.data.depth, treeDepth]);

  useEffect(() => {
    isOver ? props.setHoverArea(area) : props.setHoverArea(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOver, area]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setHasConditionals(props.data.data.conditionsForRoute.conditionals);
  }, [props.data.data.conditionsForRoute.conditionals]);

  const handleOnClick = () => {
    dispatch(handleToggleMenuOpen(props.data.data));
  };

  return (
    <Wrapper
      ref={boardRef}
      left={props.data.x}
      top={props.data.y}
      onDoubleClick={handleOnClick}
      id={props.data.data.id}
      selectedID={menu.optionID}
    >
      {hasConditionals && (
        <ConditionalWrapper
          isOver={isOver}
          id={props.data.data.id}
          hoveredOverId={hoveredOverId}
          selectedID={menu.optionID}
        >
          <ConditionalsIconWrapper>
            <ConditionIcon />
          </ConditionalsIconWrapper>
          <ConditionalsColumn>
            {props.data.data.conditionsForRoute.conditionals.map((item) => (
              <ConditionalStatementText>
                {item.question} {item.condition} {item.answer}
              </ConditionalStatementText>
            ))}
          </ConditionalsColumn>
        </ConditionalWrapper>
      )}
      <CardContents
        isOver={isOver}
        id={props.data.data.id}
        hoveredOverId={hoveredOverId}
      >
        <TitleRow>
          <Row>
            <IconSquare
              showBackground={false}
              icon={props.data.data.icon}
              size={36}
            />
            <Title>{props.data.data.title}</Title>
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
  position: absolute;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  border: ${(props) =>
    props.id === props.selectedID ? "3px solid #293D87" : "none"};
  border-radius: 5px;
`;

const CardContents = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: ${(props) =>
    props.isOver && props.id === props.hoveredOverId
      ? "0px 4px 30px rgba(22, 33, 74, 0.8)"
      : "0px 4px 30px rgba(22, 33, 74, 0.08)"};
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

const ConditionalWrapper = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  border-radius: 5px;
  justify-content: flex-start;
  align-items: center;
  color: red;
  margin-bottom: 10px;
  box-shadow: ${(props) =>
    props.isOver && props.id === props.hoveredOverId
      ? "0px 4px 30px rgba(22, 33, 74, 0.8)"
      : "0px 4px 30px rgba(22, 33, 74, 0.08)"};
`;

const ConditionalsIconWrapper = styled.div`
  padding: 10px;
`;

const ConditionalsColumn = styled.div`
  padding: 10px;
`;

const ConditionalStatementText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const ExtraSpace = styled.div`
  height: 100px;
  content: "";
  zindex: 0;
`;
export default OnBoardOptionCard;
