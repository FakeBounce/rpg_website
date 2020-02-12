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
  changeCurrentScale = value => {
    this.props.doSetState({
      currentScale: value,
    });
  };

  render() {
    const {
      buyItem,
      chatHistory,
      chatInput,
      currentMerchant,
      currentQuest,
      currentScale,
      currentTile,
      currentTown,
      currentX,
      currentY,
      currentZoom,
      doSetState,
      eventHistory,
      isGameMaster,
      isItemDescriptionShowed,
      isItemShowed,
      isOnPlayerView,
      isQuestShowed,
      isTownShowed,
      items,
      itemsList,
      itemToDescribe,
      loadCurrentPosition,
      map,
      merchants,
      merchantsList,
      onChange,
      onChangeMusics,
      quests,
      questsList,
      stories,
      storyCharacters,
      textureToApply,
      tilesTypes,
      towns,
      triggerError,
      users,
    } = this.props;

    return (
      <Fragment>
        <MapGenerator
          currentScale={currentScale}
          currentX={currentX}
          currentY={currentY}
          currentZoom={currentZoom}
          doSetState={doSetState}
          isOnPlayerView={isOnPlayerView}
          loadCurrentPosition={loadCurrentPosition}
          map={map}
          stories={stories}
          textureToApply={textureToApply}
          tilesTypes={tilesTypes}
          towns={towns}
          triggerError={triggerError}
        />
        {((isGameMaster && isOnPlayerView) || !isGameMaster) && (
          <ChatPanel
            chatHistory={chatHistory}
            chatInput={chatInput}
            doSetState={doSetState}
            onChange={onChange}
            storyCharacters={storyCharacters}
            triggerError={triggerError}
            users={users}
          />
        )}
        {isGameMaster && !isOnPlayerView && (
          <GMMapPanel
            changeCurrentScale={this.changeCurrentScale}
            currentScale={currentScale}
            currentTile={currentTile}
            currentTown={currentTown}
            currentX={currentX}
            currentY={currentY}
            doSetState={doSetState}
            eventHistory={eventHistory}
            items={items}
            merchants={merchants}
            onChangeMusics={onChangeMusics}
            quests={quests}
            stories={stories}
            storyCharacters={storyCharacters}
            textureToApply={textureToApply}
            tilesTypes={tilesTypes}
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
            users={users}
            onChangeMusics={onChangeMusics}
          />
        )}
        {isGameMaster && !isOnPlayerView && (
          <SoundPanel
            onChangeMusics={onChangeMusics}
          />
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
  textureToApply: null,
};

MiddlePanel.propTypes = {
  buyItem: PropTypes.func.isRequired,
  chatHistory: PropTypes.object.isRequired,
  chatInput: PropTypes.string.isRequired,
  currentMerchant: PropTypes.number.isRequired,
  currentQuest: PropTypes.number.isRequired,
  currentScale: PropTypes.number.isRequired,
  currentTile: PropTypes.object.isRequired,
  currentTown: PropTypes.number.isRequired,
  currentX: PropTypes.number.isRequired,
  currentY: PropTypes.number.isRequired,
  currentZoom: PropTypes.number.isRequired,
  doSetState: PropTypes.func.isRequired,
  eventHistory: PropTypes.array.isRequired,
  isItemDescriptionShowed: PropTypes.bool.isRequired,
  isItemShowed: PropTypes.bool.isRequired,
  isQuestShowed: PropTypes.bool.isRequired,
  isTownShowed: PropTypes.bool.isRequired,
  items: PropTypes.object,
  itemsList: PropTypes.array.isRequired,
  itemToDescribe: PropTypes.object.isRequired,
  loadCurrentPosition: PropTypes.func.isRequired,
  map: PropTypes.array.isRequired,
  merchants: PropTypes.array.isRequired,
  merchantsList: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeMusics: PropTypes.func.isRequired,
  quests: PropTypes.array.isRequired,
  questsList: PropTypes.array.isRequired,
  stories: PropTypes.array.isRequired,
  storyCharacters: PropTypes.array.isRequired,
  textureToApply: PropTypes.object,
  tilesTypes: PropTypes.object.isRequired,
  towns: PropTypes.array.isRequired,
  triggerError: PropTypes.func.isRequired,
  users: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(MiddlePanel);
