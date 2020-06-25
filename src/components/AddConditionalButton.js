import React, { useState } from "react";
import styled from "styled-components";
import IconSquare from "./IconSquare";

const AddConditionalButton = ({
  label = "Add Condition for Route",
  ...props
}) => {
  const [plusButtonColor, setPlusButtonColor] = useState("black");
  return (
    <CenterRow>
      <Wrapper
        onClick={props.onClick}
        onMouseEnter={() => setPlusButtonColor("#7d7d7d")}
        onMouseLeave={() => setPlusButtonColor("black")}
      >
        <IconSquare
          showBackground={false}
          icon="PlusCircle"
          size={30}
          color={plusButtonColor}
          onMouseEnter={() => setPlusButtonColor("#7d7d7d")}
          onMouseLeave={() => setPlusButtonColor("black")}
        />
        &nbsp; {label}
      </Wrapper>
    </CenterRow>
  );
};

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
const CenterRow = styled(Row)`
  justify-content: center;
  text-align: center;
`;

const Wrapper = styled(Row)`
  font-size: 14px;
  align-content: center;
  &:hover {
    cursor: pointer;
    color: #7d7d7d;
  }
`;

export default AddConditionalButton;
