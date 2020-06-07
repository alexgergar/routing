import React from 'react';
import styled from "styled-components";
import NavBar from './components/NavBar'
import MainContainer from './components/MainContainer'
import dotgrid from './images/dotgrid.png';
import Theme from './Theme'
import { DndProvider } from 'react-dnd'
	import { HTML5Backend } from 'react-dnd-html5-backend'


const App = props => {
  return (
    <Theme>
      <DndProvider backend={HTML5Backend}>
        <Container>
          <NavBar />
          <MainContainer/>
        </Container>
      </DndProvider>
    </Theme>
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
