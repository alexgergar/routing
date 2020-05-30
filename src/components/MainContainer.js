import React, {useState, useEffect} from 'react'
import styled from "styled-components";
import SideBar from './SideBar';
import Board from './Board';

const MainContainer = props => {
  const [clickedElementArea, setClickedElementArea] = useState();
  const [mouseDownPagePosition, setMouseDownPagePosition] = useState();
  const [dropElementCoords, setDropElementCoords] = useState(null);
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);

  useEffect(() => {
    if (currentItem !== null && dropElementCoords !== null) {
      const date = new Date();
      const newData = {
        id: date.valueOf(),
        optionType: currentItem.optionType,
        title: currentItem.title,
        shortDesc: currentItem.shortDesc,
        icon: currentItem.icon,
        x: dropElementCoords.x,
        y: dropElementCoords.y,
        nextStep: [],
      };
      setItems([...items, newData]);
      setDropElementCoords(null);
      setCurrentItem(null);
    }
  }, [currentItem, dropElementCoords, items]);

  const onItemDropped = (item) => {
    setCurrentItem(JSON.parse(item));
  };

  const getOptionCardAreaMousePosition = (area, mouseDownPagePosition) => {
    setClickedElementArea(area);
    setMouseDownPagePosition(mouseDownPagePosition);
  }

  const setMouseDropCoords = (mouseUpPosition) => {
    const xDropCoord =
      mouseUpPosition.x - 350 - (mouseDownPagePosition.x - clickedElementArea.x); 
    const yDropCoord =
      mouseUpPosition.y - 50 - (mouseDownPagePosition.y - clickedElementArea.y);
    setDropElementCoords({x: xDropCoord, y: yDropCoord});
  };

  return (
    <Main>
      <SideBar
        getOptionCardAreaMousePosition={getOptionCardAreaMousePosition}
        setMouseDropCoords={setMouseDropCoords}
      />
      <Board
        onItemDropped={onItemDropped}
        items={items}
      />
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
