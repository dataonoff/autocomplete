import styled from "styled-components";
import FlexBox from "../FlexBox";
import { IAutocompleteRow } from "./types";
import avatarImg from '../../assets/psyko.png'

const AvatarImg = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
`;

export const AutocompleteRow = styled((props: IAutocompleteRow) => (
    <FlexBox
      justifyContent='space-between'
      onClick={() => props.setSelectedMention({ suggestiontype: props.suggestiontype, id: props.id, name: props.name })}
      onMouseOver={() => props.setCursor(props.index)}
      className={props.cursor === props.index ? 'active' : ''}
      {...props}
    >
      <FlexBox>
        {props.suggestiontype === 'users' ? <AvatarImg src={avatarImg} alt='avtr' /> : <div>#&nbsp;</div>}
        <div>{props.name}</div>
      </FlexBox>
      <div>{props.suggestiontype === 'users' && <span>{props.name}#{props.discriminator}</span>}</div>
    </FlexBox>
  ))`
    padding: 8px;
    font-size: 14px;
    line-height: 16px;
    font-weight: 500;
    cursor: pointer;
    :hover {
      background-color: #36393f;
    }
    background-color:${(props): string => (props.cursor === props.index ? '#36393f' : 'inherit')};
  `;