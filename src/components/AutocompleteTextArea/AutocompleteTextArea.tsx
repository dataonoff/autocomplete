import { useState } from 'react';
import styled from 'styled-components';
import { data } from '../../api/data';
import { filter } from 'lodash';
import React from 'react';
import avatarImg from '../../assets/psyko.png'
import FlexBox from '../FlexBox';
import { getCaretPosition, getCurrentNode, getInnerHtmlPosition, setCaretPosition } from '../../utils/helpers';


interface IListBoxProps {
  suggestiontype: string;
  usersMention: IUserMention[];
  channelsMention: IChannelMention[];
  searchedMention: string;
  setSelectedMention: React.Dispatch<React.SetStateAction<ISelectedMentionProps>>;
  cursor: number;
  setCursor: React.Dispatch<React.SetStateAction<number>>;
};

interface ISelectedMentionProps {
  suggestiontype: string;
  name: string;
  id: string;
};

interface IUserMention {
  id: string;
  username: string;
  discriminator: string;
};

interface IChannelMention {
  id: string;
  name: string;
};

interface IAutocompleteRow {
  name: string;
  suggestiontype: string;
  discriminator?: string;
  id: string;
  index: number;
  setSelectedMention: React.Dispatch<React.SetStateAction<ISelectedMentionProps>>;
  cursor: number;
  setCursor: React.Dispatch<React.SetStateAction<number>>;
};


const AutocompleteBox = styled.div`
position: relative;
width: 100%;
text-indent: 0;
width: 502px;
`;

export const AvatarImg = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 10px;
`;

const StyledTextArea = styled.div`
background-color: ${({ theme }): string => theme.colors.inputBg};
border-radius: ${({ theme }): string => theme.borderRadius};
width: 480px;
height: 125px;
resize: none;
color: ${({ theme }): string => theme.colors.text};
:focus{
  outline: 0;
}
padding: 10px;
white-space: break-spaces!important;
`;

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

const AutocompleteRow = styled((props: IAutocompleteRow) => (
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

const ListBox = styled((props: IListBoxProps) => (
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

const AutocompleteTextArea: React.FC = (() => {
  const [addedMentionNumber, setAddedMentionNumber] = useState<number>(1);
  const [addMention, setAddMention] = useState<string>('');
  const [caretPosition, setGetCaretPosition] = useState<number>(0);
  const [cursor, setCursor] = useState<number>(0);
  const [caretinnerHtmlPosition, setCaretinnerHtmlPosition] = useState<number>(0);
  const [currentNode, setCurrentNode] = useState<number>(0);
  const [usersMatchingMention, setUsersMatchingMention] = useState<IUserMention[]>([]);
  const [channelsMatchingMention, setChannelsMatchingMention] = useState<IChannelMention[]>([]);
  const [suggestionType, setSuggestionType] = useState('');
  const [searchedMention, setSearchedMention] = useState('');
  const [selectedMention, setSelectedMention] = useState<ISelectedMentionProps>({} as ISelectedMentionProps);
  // const atReg = /\B@\w+/g;
  const atReg = /^@[^ !@#$%^&*(),.?":{}|<>]*$/g;
  const hashtagReg = /^#[^ !@#$%^&*(),.?":{}|<>]*$/gi;
  const myContainer = React.useRef<any>(null);

  React.useEffect(() => {
    // console.log(apiValue);
    if (selectedMention.id) {
      const isCaretPositionAtEnd = myContainer?.current?.innerText.length === caretPosition;
      if (selectedMention.suggestiontype === 'users') {
        const newMention = `</span><span class='user-tag' contenteditable="false" aria-label=${selectedMention.id}>@${selectedMention.name}</span><span> </span>${isCaretPositionAtEnd ? '' : '<span>'}`;
        let currentInnerHtml = myContainer?.current?.innerHTML;
        // first remove the searchedMention from currentInnerHtml
        currentInnerHtml = currentInnerHtml.substr(0, caretinnerHtmlPosition - (searchedMention.length + 1)) + currentInnerHtml.substr(caretinnerHtmlPosition);
        const editCut = [currentInnerHtml.slice(0, caretinnerHtmlPosition - (searchedMention.length + 1)), newMention + currentInnerHtml.slice(caretinnerHtmlPosition - (searchedMention.length + 1))].join('');
        setAddMention(editCut);
        setUsersMatchingMention([]);
      }
      if (selectedMention.suggestiontype === 'channels') {
        const newMention = `</span><span contenteditable="false" class='user-tag' aria-label=${selectedMention.id}>#${selectedMention.name}</span><span> </span>${isCaretPositionAtEnd ? '' : '<span>'}`;
        let currentInnerHtml = myContainer?.current?.innerHTML;
        // first remove the searchedMention from currentInnerHtml
        currentInnerHtml = currentInnerHtml.substr(0, caretinnerHtmlPosition - (searchedMention.length + 1)) + currentInnerHtml.substr(caretinnerHtmlPosition);
        const editCut = [currentInnerHtml.slice(0, caretinnerHtmlPosition - (searchedMention.length + 1)), newMention + currentInnerHtml.slice(caretinnerHtmlPosition - (searchedMention.length + 1))].join('');
        setAddMention(editCut);
        setChannelsMatchingMention([]);
      }
    }
  }, [selectedMention]);

  React.useEffect(() => {
    setAddedMentionNumber(addedMentionNumber + 1);
    addMention && setCaretPosition(document.getElementById("textarea") as HTMLElement, currentNode + 2);
  }, [addMention]);

  React.useEffect(() => {
    if (channelsMatchingMention.length === 0) {
      setCursor(0);
    }
    if (usersMatchingMention.length === 0) {
      setCursor(0);
    }
  }, [channelsMatchingMention, usersMatchingMention]);

  const handleCaretPosition = () => {
    setGetCaretPosition(getCaretPosition(document.getElementById("textarea")));
    setCurrentNode(Array.prototype.indexOf.call(document.getElementById("textarea")?.children, getCurrentNode()));
    setCaretinnerHtmlPosition(getInnerHtmlPosition(document.getElementById("textarea")));
  }

  const handleMention = (event: any) => {
    handleCaretPosition();
    const hasResult = usersMatchingMention.length > 0 || channelsMatchingMention.length > 0;
    if (hasResult) {
      const matchingResults = suggestionType === 'channels' ? channelsMatchingMention as any : usersMatchingMention as any;
      // arrow up
      if (event.keyCode === 38) {
        if (cursor > 0) {
          event.preventDefault();
          setCursor(cursor - 1);
        }
        else if (cursor === 0) {
          event.preventDefault();
          setCursor(matchingResults.length - 1);
        }
      }
      // arrow down
      else if (event.keyCode === 40) {
        if (cursor < matchingResults.length - 1) {
          event.preventDefault();
          setCursor(cursor + 1);
        }
        else if (cursor === matchingResults.length - 1) {
          event.preventDefault();
          setCursor(0);
        }
      }
      // enter and select mention
      else if (event.keyCode === 13) {
        event.preventDefault();
        const name = suggestionType === 'channels' ? matchingResults[cursor].name : matchingResults[cursor].username
        setSelectedMention({ suggestiontype: suggestionType, id: matchingResults[cursor].id, name: name })
      }
      // escape pressed teh remove option list
      else if (event.keyCode === 27) {
        setChannelsMatchingMention([]);
        setUsersMatchingMention([]);
      }
    }
  }


  const initContentEditable = (event: any) => {
    const html = event.target.innerText;
    // set first span
    if (html.length === 0) {
      setAddMention(`<span>&#xFEFF;</span>`)
    }
  };

  const handleChange = (event: any) => {
    let html = event.target.innerText;
    // remove zero width space no-break space characters in first word.
    if (html.split(' ').length === 1) {
      html = html.replace(/[\u00A0\u1680\u180E\u2000-\u200B\u202F\u205F\u3000\uFEFF]/, "");
    }
    setUsersMatchingMention([]);
    setChannelsMatchingMention([]);
    const charUntilCaret = html.substr(0, getCaretPosition(document.getElementById("textarea")));
    const currentWord = charUntilCaret.split(" ");
    const lastWord = currentWord[currentWord.length - 1];
    const currentUserMention = lastWord.match(atReg);
    const currentChannelMention = lastWord.match(hashtagReg);
    // first check @ users mention
    if (currentUserMention?.length) {
      const searchedMention = currentUserMention[0].slice(1);
      const insensCaseRe = RegExp(searchedMention, "ig");
      const matchingUsersMentions = filter(data['users'], ({ username }) => username.match(insensCaseRe));
      if (matchingUsersMentions.length) {
        setSuggestionType('users');
        setSearchedMention(searchedMention);
        setUsersMatchingMention(matchingUsersMentions as IUserMention[])
      }
    }
    // then check # channels mention
    if (currentChannelMention?.length) {
      const searchedMention = currentChannelMention[0].slice(1);
      const insensCaseRe = RegExp(searchedMention, "ig");
      const matchingChannelMentions = filter(data['channels'], ({ name }) => name.match(insensCaseRe));
      if (matchingChannelMentions.length) {
        setSuggestionType('channels');
        setSearchedMention(searchedMention);
        setChannelsMatchingMention(matchingChannelMentions as IChannelMention[])
      }
    }
  };

  return (
    <AutocompleteBox>
      {(usersMatchingMention.length > 0 || channelsMatchingMention.length > 0) && <ListBox
        cursor={cursor}
        setCursor={setCursor}
        suggestiontype={suggestionType}
        usersMention={usersMatchingMention}
        channelsMention={channelsMatchingMention}
        searchedMention={searchedMention}
        setSelectedMention={setSelectedMention}
      />}
      <StyledTextArea
        onInput={handleChange}
        onKeyDown={handleMention}
        onKeyUp={handleCaretPosition}
        onFocus={initContentEditable}
        id="textarea"
        contentEditable
        suppressContentEditableWarning={true}
        ref={myContainer}
        dangerouslySetInnerHTML={{ '__html': addMention }}
        role='textbox' />
    </AutocompleteBox>
  );
});

export default AutocompleteTextArea;
