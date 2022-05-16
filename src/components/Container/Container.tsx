import styled from "styled-components";
import FlexBox from "../FlexBox";

export const Container = styled.div`
    padding: 24px;
    background: ${(props) => props.theme.colors.background};
    opacity: 1;
    height: 100%;
`;

export const SubContainer = styled(FlexBox).attrs({
    alignItems: 'flex-end',
    p: 24
  })`
  padding: 24px;
  background: ${(props) => props.theme.colors.subBackground};
  box-shadow: 0px 3px 6px #00000029;
  border-radius: 2px;
  opacity: 1;
  height: -webkit-fill-available;
  `;