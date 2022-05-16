import { DefaultTheme } from 'styled-components';

const autocompleteTheme: DefaultTheme = {
  borderRadius: '8px',
  spacing: [0, 4, 8, 16, 24, 32, 48, 64],
  colors: {
    background: '#272934 0% 0% no-repeat padding-box',
    subBackground: '#373A46 0% 0% no-repeat padding-box',
    text: '#EAEAEA',
    inputBg: '#36393f',
    autoCompleteBg: '#18191F 0% 0% no-repeat padding-box',
    listBoxItemBg: '#292C39 0% 0% no-repeat padding-box',
    mentionBg: '#09558D 0% 0% no-repeat padding-box',
    listBoxBg: 'transparent linear-gradient(180deg, #18191F 0%, #1F2129 100%) 0% 0% no-repeat padding-box'
  },
};

export { autocompleteTheme };