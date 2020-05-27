import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400&family=Roboto:ital,wght@0,100;0,400;0,700;1,400&display=swap');

  body {
    font-family: ${(props) => props.theme.fontFamily};
  }
`;

export default GlobalStyles