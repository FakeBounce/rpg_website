import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import GMMapPanel from './GMMapPanel';
import RightPanel from './RightPanel';
import PlayerMapPanel from '../components/PlayerMiddlePanel';
import ChatPanel from '../components/ChatPanel';
import SoundPanel from '../components/SoundPanel';
import { connect } from 'react-redux';
import MapGenerator from '../components/MapGenerator/MapGenerator';

class MiddlePanel extends Component {
  render() {
    const {
      buyItem,
      doSetState,
      isGameMaster,
      isItemDescriptionShowed,
      isItemShowed,
      isOnPlayerView,
      itemsList,
      itemToDescribe,
      triggerError,
    } = this.props;

    return (
      <Fragment>
        <MapGenerator />
        {((isGameMaster && isOnPlayerView) || !isGameMaster) && <ChatPanel />}
        {isGameMaster && !isOnPlayerView && <GMMapPanel />}
        {(!isGameMaster || isOnPlayerView) && (
          <PlayerMapPanel
            buyItem={buyItem}
            doSetState={doSetState}
            isItemDescriptionShowed={isItemDescriptionShowed}
            isItemShowed={isItemShowed}
            itemsList={itemsList}
            itemToDescribe={itemToDescribe}
            triggerError={triggerError}
          />
        )}

        {(!isGameMaster || isOnPlayerView) && (
          <RightPanel triggerError={triggerError} />
        )}
        {isGameMaster && !isOnPlayerView && <SoundPanel />}
      </Fragment>
    );
  }
}

const mapStateToProps = store => ({
  isOnPlayerView: store.appState.isOnPlayerView,
  isGameMaster: store.appState.isGameMaster,
});

MiddlePanel.propTypes = {
  buyItem: PropTypes.func.isRequired,
  doSetState: PropTypes.func.isRequired,
  isItemDescriptionShowed: PropTypes.bool.isRequired,
  isItemShowed: PropTypes.bool.isRequired,
  itemsList: PropTypes.array.isRequired,
  itemToDescribe: PropTypes.object.isRequired,
  triggerError: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(MiddlePanel);
