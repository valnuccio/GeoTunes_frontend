import { createGlobalStyle } from 'styled-components';

const GlobalStyle= createGlobalStyle`
@import url(‘https://fonts.googleapis.com/css?family=Montserrat|Roboto');

body {
    margin: 0;
    height:100%;
    width:100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  h1 {
    font-family:montserrat;
    font-size: 100px;
  }
  
  h3{
      font-family: georgia;
  }

  #root{
    height:100%;
    width:100%;
    position:absolute;
    justify-content:center;
    align-items: center;
    background: #202020
  }
  
`
export {GlobalStyle}
