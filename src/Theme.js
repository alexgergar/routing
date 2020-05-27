import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyles from './GlobalStyles';

// here is where you can set different aspects of the theme or make different things that then can change - but will need to make the "theme" a prop to send through
const theme = {
  fontFamily: 'Roboto, sans-serif',
}

const Theme = ({children}) => (
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    {children}
  </ThemeProvider>
)

export default Theme;