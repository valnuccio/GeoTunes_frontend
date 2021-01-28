import { createGlobalStyle } from 'styled-components';


const GlobalStyle= createGlobalStyle`


body {
    
    height:auto;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif,'Quattrocento Sans';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow:scroll
  }
  
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  h1 {
    font-family:Quattrocento Sans;
    font-size: 100px;
  }

  h2{
    font-family:Quattrocento Sans;
    font-size: 60px;
  }
  
  h3{
      font-family: georgia;
  }

  .ui.button {
    background-image: linear-gradient(to right, #243949 0%, #517fa4 100%);
    width:100%;
    height:5vh;
  } 

  #root{
    height:100%;
    width:100%;
    position:relative;
    
   
    
  }
  
`
export {GlobalStyle}
