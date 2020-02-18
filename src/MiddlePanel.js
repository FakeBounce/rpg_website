import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import GMMapPanel from "./GMMapPanel";
import RightPanel from "./RightPanel";
import PlayerMapPanel from "./PlayerMapPanel";
import MapGenerator from "./components/MapGenerator/MapGenerator";
import ChatPanel from "./components/ChatPanel/ChatPanel";
import SoundPanel from "./components/SoundPanel/SoundPanel";
import { connect } from "react-redux";

class MiddlePanel extends Component {
  render() {
    const {
      buyItem,
      chatInput,
      doSetState,
      isGameMaster,
      isItemDescriptionShowed,
      isItemShowed,
      isOnPlayerView,
      isTownShowed,
      items,
      itemsList,
      itemToDescribe,
      merchantsList,
      onChange,
      onChangeMusics,
      questsList,
      storyCharacters,
      triggerError,
    } = this.props;

    return (
      <Fragment>
        <MapGenerator doSetState={doSetState} />
        {((isGameMaster && isOnPlayerView) || !isGameMaster) && (
          <ChatPanel storyCharacters={storyCharacters} />
        )}
        {isGameMaster && !isOnPlayerView && (
          <GMMapPanel
            doSetState={doSetState}
            items={items}
            onChangeMusics={onChangeMusics}
            storyCharacters={storyCharacters}
            triggerError={triggerError}
          />
        )}
        {(!isGameMaster || isOnPlayerView) && (
          <PlayerMapPanel
            buyItem={buyItem}
            doSetState={doSetState}
            isItemDescriptionShowed={isItemDescriptionShowed}
            isItemShowed={isItemShowed}
            isTownShowed={isTownShowed}
            itemsList={itemsList}
            itemToDescribe={itemToDescribe}
            merchantsList={merchantsList}
            questsList={questsList}
            triggerError={triggerError}
          />
        )}

        {(!isGameMaster || isOnPlayerView) && (
          <RightPanel
            chatInput={chatInput}
            doSetState={doSetState}
            onChange={onChange}
            storyCharacters={storyCharacters}
            triggerError={triggerError}
            onChangeMusics={onChangeMusics}
          />
        )}
        {isGameMaster && !isOnPlayerView && (
          <SoundPanel onChangeMusics={onChangeMusics} />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = store => ({
  isOnPlayerView: store.appState.isOnPlayerView,
  isGameMaster: store.appState.isGameMaster,
});

MiddlePanel.defaultProps = {
  items: null,
};

MiddlePanel.propTypes = {
  buyItem: PropTypes.func.isRequired,
  chatInput: PropTypes.string.isRequired,
  dispatchSetCurrentScale: PropTypes.func.isRequired,
  doSetState: PropTypes.func.isRequired,
  isItemDescriptionShowed: PropTypes.bool.isRequired,
  isItemShowed: PropTypes.bool.isRequired,
  isTownShowed: PropTypes.bool.isRequired,
  items: PropTypes.object,
  itemsList: PropTypes.array.isRequired,
  itemToDescribe: PropTypes.object.isRequired,
  merchantsList: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeMusics: PropTypes.func.isRequired,
  questsList: PropTypes.array.isRequired,
  storyCharacters: PropTypes.array.isRequired,
  triggerError: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(MiddlePanel);
