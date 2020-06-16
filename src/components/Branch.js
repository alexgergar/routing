import React from "react";
import styled from "styled-components";

// value equals the width of the most number of nodes in that branch under it

const Branch = (props) => {
  const widthForBranch = props.cardWidth * props.value;
  return <Wrapper width={widthForBranch}>{props.children}</Wrapper>;
};

const Wrapper = styled.div`
  width= ${(props) => props.width}px;
`;

export default Branch;
