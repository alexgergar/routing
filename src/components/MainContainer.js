import React from 'react'
import styled from "styled-components";
import SideBar from './SideBar';
import Board from './Board';

const MainContainer = props => {
  return (
    <Main>
      <SideBar />
      <Board />
    </Main>
  );
};

const Main = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 50px;
`;

export default MainContainer;