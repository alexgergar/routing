import React, {useCallback, useState} from 'react'
import styled from "styled-components";
import SideBar from './SideBar';
import Board from './Board';

const MainContainer = props => {
  const [clickedElementArea, setClickedElementArea] = useState();
  const [mouseDownPosition, setMouseDownPosition] = useState();
  const [dropElementCoords, setDropElementCoords] = useState({x: 0, y: 0});


  const getOptionCardAreaMousePosition = (area, mouseDownPosition) => {
    setClickedElementArea(area);
    setMouseDownPosition(mouseDownPosition);
    console.log(mouseDownPosition.x - area.x);
    console.log(mouseDownPosition.y - area.y);
  }

  const setMouseDropCoords = (mouseUpPosition) => {
    console.log("in set mouse up position");
    const xDropCoord =
      mouseUpPosition.x - 350 - (mouseDownPosition.x - clickedElementArea.x); 
    const yDropCoord =
      mouseUpPosition.y - 50 - (mouseDownPosition.y - clickedElementArea.y);
    setDropElementCoords({x: xDropCoord, y: yDropCoord});
    // console.log(
    //   `mouse up x: ${mouseUpPosition.x} mouse up y: ${mouseUpPosition.y}`
    // );
    // console.log(
    //   `What Left for element should be ${
    //     (mouseUpPosition.x - 350) - (mouseDownPosition.x - clickedElementArea.x) 
    //   }`
    // );
    // console.log(
    //   `What Top for element should be ${
    //     (mouseUpPosition.y - 50) - (mouseDownPosition.y - clickedElementArea.y)
    //   }`
    // );
  };


  return (
    <Main>
      <SideBar
        getOptionCardAreaMousePosition={getOptionCardAreaMousePosition}
        setMouseDropCoords={setMouseDropCoords}
      />
      <Board dropElementCoords={dropElementCoords} />
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
