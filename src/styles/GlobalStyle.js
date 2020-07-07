import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`

  * {
    padding: 0;
    margin: 0;
    outline:0;
    box-sizing: border-box;
  }
  html, body, #root {
    height: 100%;
  }
  body {
    -webkit-font-smoothing: antialiased;
  }
  body, input, button {
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    background: #333;
  }
  a {
    text-decoration: none;
  }
  ul {
    list-style:none !important;
  }
  button {
    cursor: pointer;
  }

`;
