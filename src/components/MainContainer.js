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
  const [dragOverDropTargetID, setDragOverDropTargetID] = useState(null);

  useEffect(() => {
    if (currentItem !== null && dropElementCoords !== null) {
      console.log(`in useefect in main container - id: ${dragOverDropTargetID}`);
      items.findIndex(x => x.id === dragOverDropTargetID);
      const date = new Date();
      const newData = {
        id: date.valueOf(), // to find in the array
        parentId: dragOverDropTargetID, // tells the parent node
        optionType: currentItem.optionType, // for the card option type
        title: currentItem.title, // title for the card
        shortDesc: currentItem.shortDesc, // description of the the card
        icon: currentItem.icon, // icon to help with visuals
        x: dropElementCoords.x, // where the x-posiiton should be om the card. 
        y: dropElementCoords.y, // where the y-position should be on the car
        nextStep: [],
      };

      setItems([...items, newData]);
      setDropElementCoords(null);
      setCurrentItem(null);
      setDragOverDropTargetID(null);
    }
  }, [currentItem, dropElementCoords, items, dragOverDropTargetID]);

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
        setDragOverDropTargetID={setDragOverDropTargetID}
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
