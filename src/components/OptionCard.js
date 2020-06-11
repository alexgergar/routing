import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { MoreVertical } from "react-feather";
import IconSquare from "./IconSquare";
import { useDispatch, useSelector } from "react-redux";
import { handleClicked } from "../redux/actions/draggedElement-actions";

const OptionCard = (props) => {
  const [area, setArea] = useState({});
  const dispatch = useDispatch();

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      setArea({
        x: node.getBoundingClientRect().x,
        y: node.getBoundingClientRect().y,
        width: node.getBoundingClientRect().width,
        height: node.getBoundingClientRect().height,
      });
    }
  }, []);

  const onMouseDown = (e) => {
    const mousePosition = {
      x: e.pageX,
      y: e.pageY,
    };
    dispatch(handleClicked(area, mousePosition));
  };

  return (
    <Wrapper ref={measuredRef} onMouseDown={onMouseDown}>
      <MoveIcon>
        <MoreVertical color="#c2c2c2" />
      </MoveIcon>
      <OptionIconColumn>
        <IconSquare icon={props.cardData.icon} size={36} />
      </OptionIconColumn>
      <BlockDescp>
        <Title>{props.cardData.title}</Title>
        <DetailText>{props.cardData.shortDesc}</DetailText>
      </BlockDescp>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 20px;
  border-radius: 10px;
  user-select: none;

  &:hover {
    box-shadow: 0px 4px 30px rgba(22, 33, 74, 0.08);
  }
`;

const MoveIcon = styled.div``;

const OptionIconColumn = styled.div`
  margin: 0 12px;
`;

const BlockDescp = styled.div`
  flex-direction: column;
`;

const Title = styled.h6`
  margin: 0;
  font-weight: 900;
  font-size: 16px;
  color: #393c44;
`;

const DetailText = styled.h6`
  margin: 0;
  font-size: 15px;
  color: #808292;
  padding-top: 5px;
`;

export default OptionCard;
