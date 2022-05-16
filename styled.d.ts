import 'styled-components';
export type Spacing = number[];
export type SpaceValue = number | string;
export type ResponsiveSpaceValue = ResponsiveValue<SpaceValue>;
export interface SpaceProps {
  m?: ResponsiveSpaceValue;
  mt?: ResponsiveSpaceValue;
  mr?: ResponsiveSpaceValue;
  mb?: ResponsiveSpaceValue;
  ml?: ResponsiveSpaceValue;
  mx?: ResponsiveSpaceValue;
  my?: ResponsiveSpaceValue;
  p?: ResponsiveSpaceValue;
  pt?: ResponsiveSpaceValue;
  pr?: ResponsiveSpaceValue;
  pb?: ResponsiveSpaceValue;
  pl?: ResponsiveSpaceValue;
  px?: ResponsiveSpaceValue;
  py?: ResponsiveSpaceValue;
}

declare module 'styled-components' {
  export interface DefaultTheme {
    borderRadius: string;
    spacing: Spacing;
    colors: {
      background: string;
      subBackground: string;
      text: string;
      inputBg: string;
      autoCompleteBg: string;
      listBoxItemBg: string;
      mentionBg: string;
      listBoxBg: string;
    };
  }
}