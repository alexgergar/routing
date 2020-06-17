import React, { useEffect } from "react";
import styled from "styled-components";
import NavBar from "./components/NavBar";
import MainContainer from "./components/MainContainer";
import dotgrid from "./images/dotgrid.png";
import Theme from "./Theme";
import { useSelector, useDispatch } from "react-redux";
import { handleUpdateWidthHeight } from "./redux/actions/widthHeight-actions";

const App = (props) => {
  const widthHeight = useSelector((state) => state.widthHeight);
  const dispatch = useDispatch();

  useEffect(() => {
    window.addEventListener("resize", updatedWidthHeight);
    return () => {
      window.removeEventListener("resize", updatedWidthHeight);
    };
  });

  const updatedWidthHeight = () => {
    dispatch(handleUpdateWidthHeight(window.innerWidth, window.innerHeight));
  };

  return (
    <Theme>
      <Container width={widthHeight.width} height={widthHeight.height}>
        <NavBar />
        <MainContainer />
      </Container>
    </Theme>
  );
};

const Container = styled.div`
  width: ${(props) => props.width};
  min-height: ${(props) => props.height};
  overflow: hidden;
  background-image: url(${dotgrid});
  background-repeat: repeat;
  background-size: 30px 30px;
`;

export default App;
