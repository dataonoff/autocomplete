import styled from "styled-components";
import { AutocompleteRow } from "./AutocompleteRow";
import { IListBoxProps } from "./types";

const ScrollBox = styled.div`
overflow: hidden scroll;
max-height: 490px;
padding-right: 0px;
border-radius: 5px;
color: ${({ theme }): string => theme.colors.text};
`;

const MentionTitle = styled.div`
    border-radius: 3px;
    padding: 8px;
    text-transform: uppercase;
    font-weight: 600;
`;

export const ListBox = styled((props: IListBoxProps) => (
  <div {...props} >
    <ScrollBox>
      <MentionTitle>{props.suggestiontype === 'users' ?
        'Members corresponding to @' + props.searchedMention :
        'Channels corresponding to #' + props.searchedMention}</MentionTitle>
      {props.usersMention.map((user, i) => (
        <AutocompleteRow
          key={user.id}
          index={i}
          cursor={props.cursor}
          setCursor={props.setCursor}
          name={user.username}
          suggestiontype={props.suggestiontype}
          discriminator={user.discriminator}
          id={user.id}
          setSelectedMention={props.setSelectedMention} />
      ))}
      {props.channelsMention.map((channel, i) => (
        <AutocompleteRow
          key={channel.id}
          index={i}
          cursor={props.cursor}
          setCursor={props.setCursor}
          name={channel.name}
          suggestiontype={props.suggestiontype}
          id={channel.id}
          setSelectedMention={props.setSelectedMention} />
      ))}
    </ScrollBox>
  </div>
))`
background-color: ${({ theme }): string => theme.colors.autoComplete};
position: absolute;
left: 0;
right: 0;
bottom: calc(100% + 8px);
`;