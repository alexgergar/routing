import React from 'react';
import styled from "styled-components";
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import Board from './components/Board'
import MainContainer from './components/MainContainer'
import dotgrid from './images/dotgrid.png';


const App = () => {
  return (
    <Container>
      <NavBar />
      <MainContainer />
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


export default App;
