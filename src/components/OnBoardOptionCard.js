import React from "react";
import styled from "styled-components";
import { MoreHorizontal } from "react-feather";
import IconSquare from "./IconSquare";

const OnBoardOptionCard = (props) => {
  return (
    <Wrapper x={props.x} y={props.y}>
      <CardContents>
        <TitleRow>
          <Row>
            {/* <IconSquare
              showBackground={false}
              icon={props.data.icon}
              size={36}
            /> */}
            <Title>{props.data.name}</Title>
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
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
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
