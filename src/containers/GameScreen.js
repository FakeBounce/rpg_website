import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import BottomPanel from '../components/BottomPanel';
import ChatCommandsPanel from '../components/ChatCommandsPanel';
import Header from '../components/Utils/Header';
import MiddlePanel from './MiddlePanel';
import EventModal from '../components/EventModal';
import BestiaryPanel from '../components/BestiaryPanel';
import TownsHistoryPanel from '../components/TownsHistoryPanel';

const GameScreen = () => {
  const [isEventHidden, setIsEventHidden] = useState(false);
  const [isOnBestiary, setIsOnBestiary] = useState(false);
  const [onChatHelp, setOnChatHelp] = useState(false);
  const [isOnMerchantList, setIsOnMerchantList] = useState(false);

  const {
    bestiary,
    currentEvent,
    eventHistory,
    isGameMaster,
    merchants,
    towns,
    uid,
  } = useSelector(store => ({
    bestiary: store.bestiary.bestiary,
    currentEvent: store.events.currentEvent,
    eventHistory: store.events.history,
    isGameMaster: store.appState.isGameMaster,
    merchants: store.merchants.merchantList,
    towns: store.mapInfos.towns,
    uid: store.userInfos.uid,
  }));

  const canReadEvent = () => {
    if (currentEvent > -1) {
      if (eventHistory[currentEvent]) {
        if (eventHistory[currentEvent].isActive) {
          if (isGameMaster && !isEventHidden) {
            return true;
          }
          if (eventHistory[currentEvent].viewers) {
            let isAViewer = false;
            eventHistory[currentEvent].viewers.map(v => {
              if (v === uid) {
                isAViewer = true;
              }
              return null;
            });
            return isAViewer;
          } else if (!isEventHidden) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const toggleEvent = () => {
    setIsEventHidden(!isEventHidden);
  };

  const toggleBestiary = () => {
    setIsOnBestiary(!isOnBestiary);
    setOnChatHelp(false);
    setIsOnMerchantList(false);
  };

  const toggleMerchantList = () => {
    setIsOnMerchantList(!isOnMerchantList);
    setOnChatHelp(false);
    setIsOnBestiary(false);
  };

  const accessChatHelp = () => {
    setOnChatHelp(!onChatHelp);
    setIsOnMerchantList(false);
    setIsOnBestiary(false);
  };

  return (
    <>
      <Header
        accessChatHelp={accessChatHelp}
        isOnBestiary={isOnBestiary}
        onChatHelp={onChatHelp}
        isEventHidden={isEventHidden}
        isOnMerchantList={isOnMerchantList}
        toggleBestiary={toggleBestiary}
        toggleEvent={toggleEvent}
        toggleMerchantList={toggleMerchantList}
      />
      {canReadEvent() && <EventModal />}
      {isOnBestiary && bestiary.length > 0 ? (
        <BestiaryPanel />
      ) : isOnMerchantList &&
        towns &&
        towns.length > 0 &&
        merchants &&
        merchants.length > 0 ? (
        <TownsHistoryPanel />
      ) : onChatHelp ? (
        <ChatCommandsPanel />
      ) : (
        <MiddlePanel />
      )}
      <BottomPanel />
    </>
  );
};

export default GameScreen;
