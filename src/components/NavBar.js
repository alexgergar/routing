import React from "react";
import styled from "styled-components";
import IconSquare from "./IconSquare";

const NavBar = (props) => {
  const onSettingsClick = () => {
    alert("This would hold settings.");
  };

  const onUserClick = () => {
    alert("This would hold user information");
  };

  const onSaveClick = () => {
    alert("This would save your workflow");
  };

  return (
    <NavBarRow>
      <Row>
        <IconWrapper onClick={onSaveClick}>
          <IconSquare showBackground={false} icon="Save" size={40} />
        </IconWrapper>
        <IconWrapper onClick={onSettingsClick}>
          <IconSquare showBackground={false} icon="Settings" size={40} />
        </IconWrapper>
        <IconWrapper onClick={onUserClick}>
          <IconSquare showBackground={false} icon="User" size={40} />
        </IconWrapper>
      </Row>
    </NavBarRow>
  );
};

const NavBarRow = styled.div`
  width: 100%;
  height: 50px;
  background-color: #fff;
  border-bottom: 1px solid #c7c7c7;
  z-index: 10;
  box-sizing: border-box;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 20px;
`;

const IconWrapper = styled.div`
  padding-right: 20px;
`;

export default NavBar;
