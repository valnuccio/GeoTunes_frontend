import { createGlobalStyle } from 'styled-components';

const GlobalStyle= createGlobalStyle`


body {
    margin: 0;
    height:100%;
    width:100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif,'Quattrocento Sans';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  h1 {
    font-family:Quattrocento Sans;
    font-size: 100px;
  }
  
  h3{
      font-family: georgia;
  }

  .ui.button {
    background-color: #124E78;
    width:100%  
  } 

  #root{
    height:100%;
    width:100%;
    position:absolute;
    display:flex;
    justify-content:center;
    align-items: center;
    background: #202020
  }
  
`
export {GlobalStyle}
