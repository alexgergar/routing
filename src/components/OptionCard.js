import React from "react";
import styled from "styled-components";
import { MoreVertical } from "react-feather";



const OptionCard = (props) => {
  return (
    <Wrapper>
      <MoreVertical color="#c2c2c2" />
      <BlockDescp>
        <Title>Title of Option</Title>
        <DetailText>this is where the details of the option go</DetailText>
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