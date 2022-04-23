import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { autocompleteTheme } from './style/autocomplete-theme';
import GlobalStyle from './style/GlobalStyle';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={autocompleteTheme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
