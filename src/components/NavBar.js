import React from "react";
import styled from "styled-components";
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const NavBar = props => {
  return (
    <NavBarRow>
      <p>nav bar</p>
    </NavBarRow>
  );
}

const NavBarRow = styled.div`
  width: 100%;
  height: 50px;
  background-color: #FFF;
  border-bottom: 1px solid #C7C7C7;
  z-index: 10;
  box-sizing: border-box;
  position: fixed; /* this is needed so the b
  /* top: 0; */

`;

 export default NavBar;