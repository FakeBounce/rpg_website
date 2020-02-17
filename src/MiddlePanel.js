import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import GMMapPanel from "./GMMapPanel";
import RightPanel from "./RightPanel";
import PlayerMapPanel from "./PlayerMapPanel";
import MapGenerator from "./components/MapGenerator/MapGenerator";
import ChatPanel from "./components/ChatPanel/ChatPanel";
import SoundPanel from "./components/SoundPanel/SoundPanel";
import { connect } from "react-redux";
import { setCurrentScale } from "./redux/actions/actionsMapInfos";

class MiddlePanel extends Component {
  render() {
    const {
      buyItem,
      chatInput,
      currentMerchant,
      currentQuest,
      doSetState,
      isGameMaster,
      isItemDescriptionShowed,
      isItemShowed,
      isOnPlayerView,
      isQuestShowed,
      isTownShowed,
      items,
      itemsList,
      itemToDescribe,
      merchants,
      merchantsList,
      onChange,
      onChangeMusics,
      quests,
      questsList,
      storyCharacters,
      towns,
      triggerError,
    } = this.props;

    return (
      <Fragment>
        <MapGenerator doSetState={doSetState} towns={towns} />
        {((isGameMaster && isOnPlayerView) || !isGameMaster) && (
          <ChatPanel storyCharacters={storyCharacters} />
        )}
        {isGameMaster && !isOnPlayerView && (
          <GMMapPanel
            doSetState={doSetState}
            items={items}
            merchants={merchants}
            onChangeMusics={onChangeMusics}
            quests={quests}
            storyCharacters={storyCharacters}
            towns={towns}
            triggerError={triggerError}
          />
        )}
        {(!isGameMaster || isOnPlayerView) && (
          <PlayerMapPanel
            buyItem={buyItem}
            currentMerchant={currentMerchant}
            currentQuest={currentQuest}
            doSetState={doSetState}
            isItemDescriptionShowed={isItemDescriptionShowed}
            isItemShowed={isItemShowed}
            isQuestShowed={isQuestShowed}
            isTownShowed={isTownShowed}
            itemsList={itemsList}
            itemToDescribe={itemToDescribe}
            merchants={merchants}
            merchantsList={merchantsList}
            quests={quests}
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
  currentMerchant: PropTypes.number.isRequired,
  currentQuest: PropTypes.number.isRequired,
  dispatchSetCurrentScale: PropTypes.func.isRequired,
  doSetState: PropTypes.func.isRequired,
  isItemDescriptionShowed: PropTypes.bool.isRequired,
  isItemShowed: PropTypes.bool.isRequired,
  isQuestShowed: PropTypes.bool.isRequired,
  isTownShowed: PropTypes.bool.isRequired,
  items: PropTypes.object,
  itemsList: PropTypes.array.isRequired,
  itemToDescribe: PropTypes.object.isRequired,
  merchants: PropTypes.array.isRequired,
  merchantsList: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeMusics: PropTypes.func.isRequired,
  quests: PropTypes.array.isRequired,
  questsList: PropTypes.array.isRequired,
  storyCharacters: PropTypes.array.isRequired,
  towns: PropTypes.array.isRequired,
  triggerError: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(MiddlePanel);
