import React from 'react';
import { FlexBox, AutocompleteTextArea } from './components';
import logo from './logo.svg';

function App() {
  return (
    <FlexBox justifyContent='center' flexDirection='column' alignItems='center' mt={20}>
      <img src={logo} className="App-logo" alt="logo" />
        <AutocompleteTextArea />    
    </FlexBox>
  );
}

export default App;
