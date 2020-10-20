import React, { Fragment } from 'react';

import GMMapPanel from './GMMapPanel';
import RightPanel from './RightPanel';
import PlayerMapPanel from '../components/PlayerMiddlePanel';
import ChatPanel from '../components/ChatPanel';
import SoundPanel from '../components/SoundPanel';
import { useSelector } from 'react-redux';
import MapGenerator from '../components/MapGenerator/MapGenerator';
import useApp from '../hooks/useApp';

const MiddlePanel = () => {
  // @TODO
  // const {
  //   isItemDescriptionShowed,
  //   isItemShowed,
  //   itemsList,
  //   itemToDescribe,
  // } = this.props;

  const { isGameMaster, isOnPlayerView } = useSelector(store => ({
    isGameMaster: store.appState.isGameMaster,
    isOnPlayerView: store.appState.isOnPlayerView,
  }));

  return (
    <Fragment>
      <MapGenerator />
      {((isGameMaster && isOnPlayerView) || !isGameMaster) && <ChatPanel />}
      {isGameMaster && !isOnPlayerView && <GMMapPanel />}
      {(!isGameMaster || isOnPlayerView) && <PlayerMapPanel />}

      {(!isGameMaster || isOnPlayerView) && <RightPanel />}
      {isGameMaster && !isOnPlayerView && <SoundPanel />}
    </Fragment>
  );
};

export default MiddlePanel;
