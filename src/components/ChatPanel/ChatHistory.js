import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { heightLeft, widthLeft } from '../Utils/StyleConstants';
import ChatRow from './ChatRow';
import { colors } from '../Utils/Constants';

const styledChatHistoric = {
  width: widthLeft / 2,
  height: `${heightLeft / 2 - (25 + 5) - 25 - 40}px`,
  float: 'left',
  display: 'inline-block',
  overflowY: 'auto',
  backgroundImage: 'url("./backgrounds/ChatHistory_BG.jpg")',
};

const ChatHistory = ({ activeChatTab }) => {
  const messagesEnd = useRef(null);

  const { history, pseudo, isGameMaster } = useSelector(store => ({
    isGameMaster: store.appState.isGameMaster,
    pseudo: store.userInfos.pseudo,
    history: store.chat.history,
  }));

  useEffect(() => {
    scrollToBottom();
  }, [activeChatTab, history]);

  const scrollToBottom = () => {
    if (messagesEnd !== null) {
      messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isAViewer = viewersTab => {
    let canSeeMessage = false;
    let isFiltered = false;

    viewersTab.map(viewer => {
      if ((viewer === 'gm' && isGameMaster) || viewer === pseudo) {
        canSeeMessage = true;
      }
      isFiltered = !checkIsFiltered(viewer);
      return null;
    });
    return canSeeMessage && isFiltered;
  };

  const getChatColor = row => {
    let color = colors.chatAll;
    if (row.channel) {
      switch (row.channel) {
        case 'Team':
          color = colors.chatTeam;
          break;
        case 'Dices':
          color = colors.yellow300;
          break;
        case 'Private':
          let hasGM = false;
          row.viewers.map(v => {
            if (v === 'gm') hasGM = true;
            return null;
          });
          color = hasGM ? colors.chatGM : colors.pink300;
          break;
        default:
          color = colors.chatAll;
          break;
      }
    }
    return color;
  };

  const checkIsFiltered = row => {
    let isFiltered = true;
    switch (activeChatTab) {
      case 'All':
        isFiltered = false;
        break;
      case 'Team':
        if (row.channel === 'Team' && !isGameMaster) {
          isFiltered = false;
        }
        break;
      case 'GM':
        if (
          row.channel === 'GM' &&
          (isGameMaster || (row.viewers && row.viewers.indexOf(pseudo) > -1))
        ) {
          isFiltered = false;
        }
        break;
      case 'Dices':
        if (row.channel === 'Dices') {
          isFiltered = false;
        }
        break;
      default:
        if (row.channel === 'Private') {
          if (
            row.viewers &&
            row.viewers.indexOf(activeChatTab) > -1 &&
            (row.viewers.indexOf(pseudo) > -1 ||
              (isGameMaster && row.viewers.indexOf('gm') > -1))
          ) {
            isFiltered = false;
          }
        }
        break;
    }
    return isFiltered;
  };

  return (
    <div style={styledChatHistoric} className='scrollbar'>
      {Object.keys(history).map(key => {
        if (!checkIsFiltered(history[key])) {
          if (history[key].viewers && isAViewer(history[key].viewers)) {
            return (
              <ChatRow
                key={`chat-row-${key}`}
                {...history[key]}
                color={getChatColor(history[key])}
              />
            );
          }
          return (
            <ChatRow
              key={`chat-row-${key}`}
              {...history[key]}
              color={getChatColor(history[key])}
            />
          );
        }
        return null;
      })}
      <div style={{ float: 'left', clear: 'both' }} ref={messagesEnd} />
    </div>
  );
};

export default ChatHistory;
