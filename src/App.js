import React, { useEffect } from "react";
import styled from "styled-components";
import NavBar from "./components/NavBar";
import MainContainer from "./components/MainContainer";
import dotgrid from "./images/dotgrid.png";
import Theme from "./Theme";
import { useDispatch } from "react-redux";
import { handleUpdateWidthHeight } from "./redux/actions/widthHeight-actions";

const App = (props) => {
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
      <Container>
        <NavBar />
        <MainContainer />
      </Container>
    </Theme>
  );
};

const Container = styled.div`
  background-image: url(${dotgrid});
  background-repeat: repeat;
  background-size: 30px 30px;
  overflow: auto;
`;

export default App;
