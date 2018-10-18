import React, { Component } from "react";
import PropTypes from "prop-types";

import GMMapPanel from "./GMMapPanel";
import RightPanel from "./RightPanel";
import PlayerMapPanel from "./PlayerMapPanel";
import MapGenerator from "./MapGenerator/MapGenerator";

class MiddlePanel extends Component {
    changeCurrentScale = value => {
        this.props.doSetState({
            currentScale: value,
        });
    };

    render() {
        const {
            isItemShowed,
            itemsList,
            isItemDescriptionShowed,
            itemToDescribe,
            isTownShowed,
            merchantsList,
            pseudo,
            character,
            map,
            chatInput,
            chatHistory,
            textureToApply,
            users,
            uid,
            isGameMaster,
            currentStory,
            storyCharacters,
            gameMaster,
            currentQuest,
            isQuestShowed,
            questsList,
            musicName,
            musicVolume,
            noiseName,
            noiseVolume,
            merchants,
            currentMerchant,
            onChangeMusics,
            doSetState,
            triggerError,
            buyItem,
            onChange,
            resetSounds,
            isOnPlayerView,
            currentTown,
            towns,
            quests,
            stories,
            tilesTypes,
            currentScale,
            currentX,
            currentY,
            currentZoom,
            loadCurrentPosition,
            currentTile,
            eventHistory,
            items,
        } = this.props;

        return (
            <div>
                <MapGenerator
                    map={map}
                    doSetState={doSetState}
                    currentX={currentX}
                    currentY={currentY}
                    currentZoom={currentZoom}
                    isGameMaster={isGameMaster}
                    isOnPlayerView={isOnPlayerView}
                    tilesTypes={tilesTypes}
                    towns={towns}
                    stories={stories}
                    textureToApply={textureToApply}
                    currentStory={currentStory}
                    triggerError={triggerError}
                    currentScale={currentScale}
                    loadCurrentPosition={loadCurrentPosition}
                />
                {isGameMaster &&
                    !isOnPlayerView && (
                        <GMMapPanel
                            textureToApply={textureToApply}
                            musicName={musicName}
                            noiseName={noiseName}
                            musicVolume={musicVolume}
                            noiseVolume={noiseVolume}
                            onChangeMusics={onChangeMusics}
                            resetSounds={resetSounds}
                            doSetState={doSetState}
                            triggerError={triggerError}
                            currentTown={currentTown}
                            currentStory={currentStory}
                            towns={towns}
                            quests={quests}
                            merchants={merchants}
                            tilesTypes={tilesTypes}
                            currentScale={currentScale}
                            changeCurrentScale={this.changeCurrentScale}
                            currentTile={currentTile}
                            stories={stories}
                            eventHistory={eventHistory}
                            storyCharacters={storyCharacters}
                            items={items}
                            gameMaster={gameMaster}
                        />
                    )}
                {(!isGameMaster || isOnPlayerView) && (
                    <PlayerMapPanel
                        isQuestShowed={isQuestShowed}
                        currentQuest={currentQuest}
                        character={character}
                        isItemShowed={isItemShowed}
                        itemsList={itemsList}
                        merchants={merchants}
                        quests={quests}
                        currentMerchant={currentMerchant}
                        isItemDescriptionShowed={isItemDescriptionShowed}
                        itemToDescribe={itemToDescribe}
                        isTownShowed={isTownShowed}
                        merchantsList={merchantsList}
                        questsList={questsList}
                        buyItem={buyItem}
                        doSetState={doSetState}
                        triggerError={triggerError}
                    />
                )}

                <RightPanel
                    gameMaster={gameMaster}
                    storyCharacters={storyCharacters}
                    currentStory={currentStory}
                    uid={uid}
                    users={users}
                    character={character}
                    pseudo={pseudo}
                    isGameMaster={isGameMaster}
                    chatInput={chatInput}
                    chatHistory={chatHistory}
                    onChange={onChange}
                    doSetState={doSetState}
                    triggerError={triggerError}
                />
            </div>
        );
    }
}

MiddlePanel.defaultProps = {
    textureToApply: null,
};

MiddlePanel.propTypes = {
    isOnPlayerView: PropTypes.bool.isRequired,
    isItemShowed: PropTypes.bool.isRequired,
    itemsList: PropTypes.array.isRequired,
    items: PropTypes.object.isRequired,
    isItemDescriptionShowed: PropTypes.bool.isRequired,
    itemToDescribe: PropTypes.object.isRequired,
    isTownShowed: PropTypes.bool.isRequired,
    merchantsList: PropTypes.array.isRequired,
    pseudo: PropTypes.string.isRequired,
    character: PropTypes.object.isRequired,
    map: PropTypes.array.isRequired,
    chatInput: PropTypes.string.isRequired,
    chatHistory: PropTypes.array.isRequired,
    textureToApply: PropTypes.object,
    users: PropTypes.object.isRequired,
    uid: PropTypes.string.isRequired,
    isGameMaster: PropTypes.bool.isRequired,
    currentStory: PropTypes.number.isRequired,
    storyCharacters: PropTypes.array.isRequired,
    gameMaster: PropTypes.string.isRequired,
    currentQuest: PropTypes.number.isRequired,
    isQuestShowed: PropTypes.bool.isRequired,
    questsList: PropTypes.array.isRequired,
    musicName: PropTypes.string.isRequired,
    noiseName: PropTypes.string.isRequired,
    musicVolume: PropTypes.number.isRequired,
    noiseVolume: PropTypes.number.isRequired,
    merchants: PropTypes.array.isRequired,
    towns: PropTypes.array.isRequired,
    quests: PropTypes.array.isRequired,
    tilesTypes: PropTypes.object.isRequired,
    currentMerchant: PropTypes.number.isRequired,
    currentTown: PropTypes.number.isRequired,
    onChangeMusics: PropTypes.func.isRequired,
    resetSounds: PropTypes.func.isRequired,
    doSetState: PropTypes.func.isRequired,
    triggerError: PropTypes.func.isRequired,
    buyItem: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    stories: PropTypes.array.isRequired,
    currentScale: PropTypes.number.isRequired,
    currentX: PropTypes.number.isRequired,
    currentY: PropTypes.number.isRequired,
    currentZoom: PropTypes.number.isRequired,
    loadCurrentPosition: PropTypes.func.isRequired,
    currentTile: PropTypes.object.isRequired,
    eventHistory: PropTypes.array.isRequired,
};

export default MiddlePanel;
