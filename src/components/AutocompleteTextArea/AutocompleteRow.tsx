import styled from "styled-components";
import FlexBox from "../FlexBox";
import { IAutocompleteRow } from "./types";
import avatarImg from '../../assets/psyko.png'

const AvatarImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
`;

export const AutocompleteRow = styled(({setSelectedMention, suggestiontype, id, name, index, ...props}: IAutocompleteRow) => (
    <FlexBox
      justifyContent='space-between'
      onClick={() => setSelectedMention({ suggestiontype: suggestiontype, id: id, name: name })}
      onMouseOver={() => props.setCursor(index)}
      {...props}
    >
      <FlexBox alignItems="center">
        {suggestiontype === 'users' ? <AvatarImg src={avatarImg} alt='avtr' /> : <div>#&nbsp;</div>}
        <div>{name}</div>
      </FlexBox>
      <div>{suggestiontype === 'users' && <span>{name}#{props.discriminator}</span>}</div>
    </FlexBox>
  ))`
    height: 48px;
    padding: 8px 24px;
    text-align: left;
    font: normal normal normal 20px/26px Roboto;
    letter-spacing: 0px;
    color: #EAEAEA;
    cursor: pointer;
    :hover {
      background-color: ${(props): string => props.theme.colors.listBoxItemBg};
    }
    background:${(props): string => (props.cursor === props.index ? props.theme.colors.listBoxItemBg : 'inherit')};
    border-radius: ${({ theme }): string => theme.borderRadius};
  `;