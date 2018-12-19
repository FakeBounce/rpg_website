import React, { Component } from 'react';
import PropTypes from 'prop-types';

import GMMapPanel from './GMMapPanel';
import RightPanel from './RightPanel';
import PlayerMapPanel from './PlayerMapPanel';
import MapGenerator from './MapGenerator/MapGenerator';
import ChatPanel from './ChatPanel/ChatPanel';
import SoundPanel from './SoundPanel/SoundPanel';

class MiddlePanel extends Component {
  changeCurrentScale = value => {
    this.props.doSetState({
      currentScale: value,
    });
  };

  render() {
    const {
      buyItem,
      character,
      chatHistory,
      chatInput,
      currentMerchant,
      currentQuest,
      currentScale,
      currentStory,
      currentTile,
      currentTown,
      currentX,
      currentY,
      currentZoom,
      doSetState,
      eventHistory,
      gameMaster,
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
      musicName,
      musicVolume,
      noiseName,
      noiseVolume,
      onChange,
      onChangeMusics,
      pseudo,
      quests,
      questsList,
      resetSounds,
      stories,
      storyCharacters,
      textureToApply,
      tilesTypes,
      towns,
      triggerError,
      uid,
      users,
    } = this.props;

    return (
      <div>
        <MapGenerator
          currentScale={currentScale}
          currentStory={currentStory}
          currentX={currentX}
          currentY={currentY}
          currentZoom={currentZoom}
          doSetState={doSetState}
          isGameMaster={isGameMaster}
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
            character={character}
            chatHistory={chatHistory}
            chatInput={chatInput}
            currentStory={currentStory}
            doSetState={doSetState}
            gameMaster={gameMaster}
            isGameMaster={isGameMaster}
            onChange={onChange}
            pseudo={pseudo}
            storyCharacters={storyCharacters}
            triggerError={triggerError}
            uid={uid}
            users={users}
          />
        )}
        {isGameMaster &&
          !isOnPlayerView && (
            <GMMapPanel
              changeCurrentScale={this.changeCurrentScale}
              currentScale={currentScale}
              currentStory={currentStory}
              currentTile={currentTile}
              currentTown={currentTown}
              doSetState={doSetState}
              eventHistory={eventHistory}
              gameMaster={gameMaster}
              items={items}
              merchants={merchants}
              musicName={musicName}
              musicVolume={musicVolume}
              noiseName={noiseName}
              noiseVolume={noiseVolume}
              onChangeMusics={onChangeMusics}
              quests={quests}
              resetSounds={resetSounds}
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
            character={character}
            currentMerchant={currentMerchant}
            currentQuest={currentQuest}
            currentStory={currentStory}
            doSetState={doSetState}
            isItemDescriptionShowed={isItemDescriptionShowed}
            isItemShowed={isItemShowed}
            isQuestShowed={isQuestShowed}
            isTownShowed={isTownShowed}
            itemsList={itemsList}
            itemToDescribe={itemToDescribe}
            isGameMaster={isGameMaster}
            merchants={merchants}
            merchantsList={merchantsList}
            quests={quests}
            questsList={questsList}
            uid={uid}
            triggerError={triggerError}
          />
        )}

        {(!isGameMaster || isOnPlayerView) && (
          <RightPanel
            character={character}
            chatHistory={chatHistory}
            chatInput={chatInput}
            currentStory={currentStory}
            doSetState={doSetState}
            gameMaster={gameMaster}
            isGameMaster={isGameMaster}
            onChange={onChange}
            pseudo={pseudo}
            storyCharacters={storyCharacters}
            triggerError={triggerError}
            uid={uid}
            users={users}
          />
        )}
        {isGameMaster &&
          !isOnPlayerView && (
            <SoundPanel
              musicName={musicName}
              noiseName={noiseName}
              musicVolume={musicVolume}
              noiseVolume={noiseVolume}
              resetSounds={resetSounds}
              onChangeMusics={onChangeMusics}
            />
          )}
      </div>
    );
  }
}

MiddlePanel.defaultProps = {
  textureToApply: null,
};

MiddlePanel.propTypes = {
  buyItem: PropTypes.func.isRequired,
  character: PropTypes.object.isRequired,
  chatHistory: PropTypes.array.isRequired,
  chatInput: PropTypes.string.isRequired,
  currentMerchant: PropTypes.number.isRequired,
  currentQuest: PropTypes.number.isRequired,
  currentScale: PropTypes.number.isRequired,
  currentStory: PropTypes.number.isRequired,
  currentTile: PropTypes.object.isRequired,
  currentTown: PropTypes.number.isRequired,
  currentX: PropTypes.number.isRequired,
  currentY: PropTypes.number.isRequired,
  currentZoom: PropTypes.number.isRequired,
  doSetState: PropTypes.func.isRequired,
  eventHistory: PropTypes.array.isRequired,
  gameMaster: PropTypes.string.isRequired,
  isGameMaster: PropTypes.bool.isRequired,
  isItemDescriptionShowed: PropTypes.bool.isRequired,
  isItemShowed: PropTypes.bool.isRequired,
  isOnPlayerView: PropTypes.bool.isRequired,
  isQuestShowed: PropTypes.bool.isRequired,
  isTownShowed: PropTypes.bool.isRequired,
  items: PropTypes.object.isRequired,
  itemsList: PropTypes.object.isRequired,
  itemToDescribe: PropTypes.object.isRequired,
  loadCurrentPosition: PropTypes.func.isRequired,
  map: PropTypes.array.isRequired,
  merchants: PropTypes.array.isRequired,
  merchantsList: PropTypes.array.isRequired,
  musicName: PropTypes.string.isRequired,
  musicVolume: PropTypes.number.isRequired,
  noiseName: PropTypes.string.isRequired,
  noiseVolume: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeMusics: PropTypes.func.isRequired,
  pseudo: PropTypes.string.isRequired,
  quests: PropTypes.array.isRequired,
  questsList: PropTypes.array.isRequired,
  resetSounds: PropTypes.func.isRequired,
  stories: PropTypes.array.isRequired,
  storyCharacters: PropTypes.array.isRequired,
  textureToApply: PropTypes.object,
  tilesTypes: PropTypes.object.isRequired,
  towns: PropTypes.array.isRequired,
  triggerError: PropTypes.func.isRequired,
  uid: PropTypes.string.isRequired,
  users: PropTypes.object.isRequired,
};

export default MiddlePanel;
