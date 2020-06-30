import React from "react";
import styled from "styled-components";

const ToolTip = (props) => {
  return (
    <Wrapper left={props.left} top={props.top}>
      <ArrowWrapper />
      <TextBox>
        <Text>{props.children}</Text>
      </TextBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: absolute;
  left: ${(props) => props.left}px;
  top: ${(props) => props.top}px;
  max-width: 250px;
  display: flex;
  flex-direction: row;
`;

const ArrowWrapper = styled.div`
  width: 0; 
  height: 0; 
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent; 
  border-right:10px solid black; 
  }
`;

const TextBox = styled.div`
  padding: 10px;
  background: black;
  border-radius: 5px;
  margin-top: -10px;
`;

const Text = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: white;
`;

export default ToolTip;
