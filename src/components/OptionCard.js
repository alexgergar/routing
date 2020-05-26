import React, {useState, useCallback} from "react";
import styled from "styled-components";
import { MoreVertical } from "react-feather";



const OptionCard = (props) => {
  const [area, setArea] = useState({});
  const [position, setPosition] = useState({});

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

  const onMouseDown = e => {
    setPosition({x: e.pageX, y: e.pageY})
    const mousePosition = {
      x: e.pageX,
      y: e.pageY,
    };
    props.getOptionCardAreaMousePosition(area, mousePosition);

  }

  return (
    <Wrapper ref={measuredRef} onMouseDown={onMouseDown}>
      <MoreVertical color="#c2c2c2" />
      <BlockDescp>
        <Title>Title of Option</Title>
        <DetailText>
          this is block x/left: {area.x} and y/top: {area.y}
        </DetailText>
        <DetailText>
          width: {area.width} and height: {area.height}
        </DetailText>
        <DetailText>
          mousePositionX: {position.x} mouse position Y: {position.y}
        </DetailText>
      </BlockDescp>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  user-select: none;
  ${"" /* background-color: red; */}

  &:hover {
    box-shadow: 0px 4px 30px rgba(22, 33, 74, 0.08);
  }
`;

const BlockDescp = styled.div`
  flex-direction: column;
`;

const Title = styled.h6`
  margin: 0;
`;

const DetailText = styled.p`
  margin: 0;
  font-size: 14px;
`;

export default OptionCard;