import { createGlobalStyle } from 'styled-components/macro';

const GlobalStyle = createGlobalStyle`
    html, 
    body {
       height: 100%;
       width: 100%;
  }
  body {
    background: ${({ theme }): string => theme.colors.background};
  }
  .App-logo {
    height: 20vmin;
    pointer-events: none;
    margin-top: 40px;
    margin-bottom: 100px;
  }
  .user-tag {
    background-color: #007ac5;
    color: white;
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
