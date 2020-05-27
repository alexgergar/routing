import React from 'react'
import styled from 'styled-components';
import { MoreVertical } from "react-feather";

const OnBoardOptionCard = props => {
  return (
    <Wrapper dropElementCoords={props.dropElementCoords}>
      <TitleRow>
        <Title>I am a card</Title>
        <MoreVertical color="#c2c2c2" />
      </TitleRow>
      <HorizontalLine />
      <BodyRow>
        <ContentText>I am the body text</ContentText>
      </BodyRow>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  width: 350px;
  left: ${(props) => props.dropElementCoords.x}px;
  top: ${(props) => props.dropElementCoords.y}px;
  border-radius: 5px;
  box-shadow: 0px 4px 30px rgba(22, 33, 74, 0.08);
`;

const TitleRow = styled.div`
  margin: 20px 20px 10px 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-weight: 700;
`;

const Title = styled.p`
  margin: 0px;
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

const ContentText = styled(Title)`

`;
export default OnBoardOptionCard
