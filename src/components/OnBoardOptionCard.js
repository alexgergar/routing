import React, {useState, useCallback, useEffect} from 'react'
import styled from 'styled-components';
import { MoreHorizontal } from "react-feather";
import IconSquare from "./IconSquare";

const OnBoardOptionCard = props => {
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
    props.isOver ? props.setHoverArea(area) : props.setHoverArea(null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isOver, area])



  return (
    <Wrapper
      ref={measuredRef}
      rootCoords={props.rootCoords}
    >
      <CardContents isOver={props.isOver}>
        <TitleRow>
          <Row>
            <IconSquare
              showBackground={false}
              icon={props.cardData.icon}
              size={36}
            />
            <Title>{props.cardData.title}</Title>
          </Row>
          <MoreHorizontal color="#c2c2c2" />
        </TitleRow>
        <HorizontalLine />
        <BodyRow>
          <ContentText>I am the body text </ContentText>
        </BodyRow>
      </CardContents>
      <ExtraSpace />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  width: 350px;
  left: ${(props) => props.rootCoords.x}px;
  top: ${(props) => props.rootCoords.y}px;
`;

const CardContents = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: 0px 4px 30px rgba(22, 33, 74, 0.08);
  background-color: ${(props) => (props.isOver ? "red" : "white")};
  zIndex: 10;
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
  content: '';
  zIndex: 0;
`;
export default OnBoardOptionCard