import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
${'' /* @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400&display=swap'); */}
  body {
    font-family: ${(props) => props.theme.fontFamily};
  }
`;

export default GlobalStyles