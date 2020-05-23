import React from 'react';
import styled from "styled-components";
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import Board from './components/Board'
import dotgrid from './images/dotgrid.png';


const App = () => {
  return (
    <Container>
      <NavBar />
      <Main>
        <SideBar />
        <Board />
      </Main>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background-image: url(${dotgrid});
  background-repeat: repeat;
  background-size: 30px 30px;
`;

const Main = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 50px;
`;

export default App;
