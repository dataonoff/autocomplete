import { createGlobalStyle } from 'styled-components/macro';

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Roboto', sans-serif;
}
    html, 
    body {
       height: 100%;
       width: 100%;
       margin: 0;
  }
  #root {
    height: 100%;
  }
  * {
  box-sizing: border-box;
}
  .App-logo {
    height: 20vmin;
    pointer-events: none;
    margin-top: 40px;
    margin-bottom: 100px;
  }
  @media (prefers-reduced-motion: no-preference) {
    .App-logo {
      animation: App-logo-spin infinite 20s linear;
    }
  }
  @keyframes App-logo-spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

export default GlobalStyle;
