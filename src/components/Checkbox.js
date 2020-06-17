import React, { useState } from "react";
import styled from "styled-components";

const Checkbox = (props) => {
  const [checked, setChecked] = useState(false);

  return (
    <Wrapper>
      <CheckboxLabel>
        <CheckboxInput
          type="checkbox"
          checked={checked}
          onChange={(e) => {
            setChecked(e.target.checked);
          }}
        />
        {props.label}
      </CheckboxLabel>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const CheckboxInput = styled.input`
  transform: scale(2);
  ${"" /* height: 20px; */}
  margin: 0 20px 0  !important;
  cursor: pointer;
`;
const CheckboxLabel = styled.label`
  cursor: pointer;
  display: block;
  font-weight: normal;
  text-align: center;
`;

export default Checkbox;
