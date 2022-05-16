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
  text-align: left;
  font: normal normal bold 20px/52px Roboto;
  letter-spacing: 0.96px;
  color: #FFFFFF;
  text-transform: uppercase;
`;

export const ListBox = styled(({ suggestiontype, searchedMention, usersMention, cursor, setCursor, setSelectedMention, channelsMention, ...props }: IListBoxProps) => (
  <div {...props} >
    <ScrollBox>
      <MentionTitle>{suggestiontype === 'users' ?
        'Members corresponding to @' + searchedMention :
        'Channels corresponding to #' + searchedMention}
      </MentionTitle>
      {usersMention.map((user, i) => (
        <AutocompleteRow
          key={user.id}
          index={i}
          cursor={cursor}
          setCursor={setCursor}
          name={user.username}
          suggestiontype={suggestiontype}
          discriminator={user.discriminator}
          id={user.id}
          setSelectedMention={setSelectedMention} />
      ))}
      {channelsMention.map((channel, i) => (
        <AutocompleteRow
          key={channel.id}
          index={i}
          cursor={cursor}
          setCursor={setCursor}
          name={channel.name}
          suggestiontype={suggestiontype}
          id={channel.id}
          setSelectedMention={setSelectedMention} />
      ))}
    </ScrollBox>
  </div>
))`
  background: ${({ theme }): string => theme.colors.listBoxBg};
  border: 1px solid #373A46;
  border-radius: ${({ theme }): string => theme.borderRadius};
  height: 360px;
  padding: 24px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(100% + 16px);
`;