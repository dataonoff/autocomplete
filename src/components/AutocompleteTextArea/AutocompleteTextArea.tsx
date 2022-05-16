import { useState } from 'react';
import styled from 'styled-components';
import { data } from '../../api/data';
import { filter } from 'lodash';
import React from 'react';
import { getCaretPosition, getCurrentNode, getInnerHtmlPosition, setCaretPosition } from '../../utils/helpers';
import { IChannelMention, ISelectedMentionProps, IUserMention } from './types';
import { ListBox } from './ListBox';


const AutocompleteBox = styled.div`
  position: relative;
  width: 100%;
  text-indent: 0;
`;

const StyledTextArea = styled.div`
  border-radius: ${({ theme }): string => theme.borderRadius};
  background: ${({ theme }): string => theme.colors.autoCompleteBg};
  min-height: 72px;
  max-height: 50vh;
  color: ${({ theme }): string => theme.colors.text};
  font: normal normal normal 20px/26px Roboto;
  box-shadow: 0px 3px 6px #00000029;
  border: 1px solid #1F2129;
  :focus{
    outline: 0;
  }
  padding: 23px 24px;
  white-space: break-spaces!important;
  .user-tag {
    border-radius: 2px;
    padding: 8px;
    height: 42px;
    font: normal normal medium 20px/26px Roboto;
    letter-spacing: 0px;
    color: #CBE9FF;
    box-shadow: 0px 3px 6px #00000029;
    background: ${({ theme }): string => theme.colors.mentionBg};
    color: white;
  }
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
    if (selectedMention.id) {
      const isCaretPositionAtEnd = myContainer?.current?.innerText.length === caretPosition;
      if (selectedMention.suggestiontype === 'users') {
        const newMention = `</span><span class='user-tag' contenteditable="false" aria-label=${selectedMention.id}>@${selectedMention.name}</span><span> </span>${isCaretPositionAtEnd ? '' : '<span>'}`;
        let currentInnerHtml = myContainer?.current?.innerHTML;
        // first remove the searchedMention from currentInnerHtml
        currentInnerHtml = currentInnerHtml.substr(0, caretinnerHtmlPosition - (searchedMention.length + 1)) + currentInnerHtml.substr(caretinnerHtmlPosition);
        // Then add the newMention to the all innerHtml string
        const editCut = [currentInnerHtml.slice(0, caretinnerHtmlPosition - (searchedMention.length + 1)), newMention + currentInnerHtml.slice(caretinnerHtmlPosition - (searchedMention.length + 1))].join('');
        setAddMention(editCut);
        setUsersMatchingMention([]);
      }
      if (selectedMention.suggestiontype === 'channels') {
        const newMention = `</span><span contenteditable="false" class='user-tag' aria-label=${selectedMention.id}>#${selectedMention.name}</span><span> </span>${isCaretPositionAtEnd ? '' : '<span>'}`;
        let currentInnerHtml = myContainer?.current?.innerHTML;
        // first remove the searchedMention from currentInnerHtml
        currentInnerHtml = currentInnerHtml.substr(0, caretinnerHtmlPosition - (searchedMention.length + 1)) + currentInnerHtml.substr(caretinnerHtmlPosition);
        // Then add the newMention to the all innerHtml string
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
      {(usersMatchingMention.length > 0 || channelsMatchingMention.length > 0) && 
      <ListBox
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
