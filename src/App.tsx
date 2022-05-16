import React from 'react';
import { FlexBox, AutocompleteTextArea } from './components';
import { Container, SubContainer } from './components/Container/Container';

function App() {
  return (
    <Container>
      <SubContainer>
          <AutocompleteTextArea />
      </SubContainer>
    </Container>
  );
}

export default App;
