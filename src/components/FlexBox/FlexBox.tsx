import styled from 'styled-components';
import { space, SpaceProps } from 'styled-system';
type FlexBoxProps = SpaceProps;
export interface IFlexBoxProps {
  display?: 'flex' | 'inline-flex';
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  justifyContent?:
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
  alignContent?:
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | 'stretch';
}

const FlexBox = styled.div<IFlexBoxProps & FlexBoxProps>`
  display: ${(props): string => props.display || 'flex'};
  flex-direction: ${(props): string => props.flexDirection || 'row'};
  flex-wrap: ${(props): string => props.flexWrap || 'nowrap'};
  justify-content: ${(props): string => props.justifyContent || 'flex-start'};
  align-items: ${(props): string => props.alignItems || 'stretch'};
  align-content: ${(props): string => props.alignContent || 'stretch'};
  ${space}
`;

export default FlexBox;
