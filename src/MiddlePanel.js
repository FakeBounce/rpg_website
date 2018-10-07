import React, { Component } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import "./Grid.css";

import GMMapPanel from "./GMMapPanel";
import RightPanel from "./RightPanel";
import PlayerMapPanel from "./PlayerMapPanel";
import Town from "./Town";

import { gridDimension, gridLength } from "./StyleConstants";
import { towns } from "./Constants";
import GameScreen from "./GameScreen";

const styledGrid = {
    width: `${gridDimension}px`,
    height: `${gridDimension}px`,
};

const styledRow = {
    width: `${gridDimension * gridLength + gridLength}px`,
    height: `${gridDimension}px`,
};

const styledMap = {
    width: `${gridDimension * gridLength + gridLength}px`,
    height: `${gridDimension * gridLength}px`,
};

class MiddlePanel extends Component {
    generateTable = mapToRender => {
        const table = [];
        mapToRender.map((row, index) => {
            table.push(
                <div
                    key={`table-row-${index}`}
                    className="row"
                    style={styledRow}
                >
                    {this.createGrid(index, row)}
                </div>,
            );
            return null;
        });
        return table;
    };

    createGrid = (positionX, rowToRender) => {
        const { isGameMaster, textureToApply, tilesTypes } = this.props;
        const table = [];

        rowToRender.map((row, index) => {
            table.push(
                isGameMaster ? (
                    <div
                        key={`row-${index}`}
                        className="grid"
                        style={{
                            ...styledGrid,
                            backgroundColor:
                                tilesTypes[row.environment].backgroundColor,
                        }}
                        onClick={() => {
                            if (textureToApply)
                                this.setTexture(positionX, index);
                        }}
                    >
                        {row.hasFog && (
                            <div
                                className="fog-gm"
                                style={{
                                    width: `${gridDimension}px`,
                                    height: `${gridDimension}px`,
                                }}
                            />
                        )}
                        {towns.map(town => {
                            if (
                                positionX === town.positionX &&
                                index === town.positionY
                            ) {
                                return (
                                    <Town
                                        key={`town-${town.positionX}-${
                                            town.positionY
                                        }`}
                                        town={town}
                                        showTownList={this.showTownList}
                                    />
                                );
                            }
                            return null;
                        })}
                    </div>
                ) : (
                    <div
                        key={`row-${index}`}
                        style={{
                            ...styledGrid,
                            backgroundColor:
                                tilesTypes[row.environment].backgroundColor,
                        }}
                    >
                        {row.hasFog && (
                            <div
                                style={{
                                    backgroundColor: "black",
                                    position: "absolute",
                                    width: `${gridDimension}px`,
                                    height: `${gridDimension}px`,
                                }}
                            />
                        )}
                        {towns.map(town => {
                            if (
                                positionX === town.positionX &&
                                index === town.positionY
                            ) {
                                return (
                                    <Town
                                        key={`town-${town.positionX}-${
                                            town.positionY
                                        }`}
                                        {...town}
                                        showTownList={this.showTownList}
                                    />
                                );
                            }
                            return null;
                        })}
                    </div>
                ),
            );
            return null;
        });
        return table;
    };

    showTownList = town => {
        this.props.doSetState({
            isTownShowed: true,
            merchantsList: town.merchants,
            questsList: town.quests,
        });
    };

    setTexture = (x, y) => {
        const {
            stories,
            currentStory,
            textureToApply,
            triggerError,
        } = this.props;
        firebase
            .database()
            .ref("maps/" + stories[currentStory].map + "/" + x + "/" + y)
            .update(textureToApply)
            .catch(error => {
                // Handle Errors here.
                triggerError(error);
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
            tilesTypes,
        } = this.props;

        return (
            <div>
                <div className="map" style={styledMap}>
                    {this.generateTable(map)}
                </div>
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
                            towns={towns}
                            quests={quests}
                            tilesTypes={tilesTypes}
                        />
                    )}
                {!isGameMaster && (
                    <PlayerMapPanel
                        isQuestShowed={isQuestShowed}
                        currentQuest={currentQuest}
                        character={character}
                        isItemShowed={isItemShowed}
                        itemsList={itemsList}
                        merchants={merchants}
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

MiddlePanel.propTypes = {
    isOnPlayerView: PropTypes.bool.isRequired,
    isItemShowed: PropTypes.bool.isRequired,
    itemsList: PropTypes.array.isRequired,
    isItemDescriptionShowed: PropTypes.bool.isRequired,
    itemToDescribe: PropTypes.object.isRequired,
    isTownShowed: PropTypes.bool.isRequired,
    merchantsList: PropTypes.array.isRequired,
    pseudo: PropTypes.string.isRequired,
    character: PropTypes.object.isRequired,
    map: PropTypes.array.isRequired,
    chatInput: PropTypes.string.isRequired,
    chatHistory: PropTypes.array.isRequired,
    textureToApply: PropTypes.object.isRequired,
    users: PropTypes.array.isRequired,
    uid: PropTypes.string.isRequired,
    isGameMaster: PropTypes.bool.isRequired,
    currentStory: PropTypes.number.isRequired,
    storyCharacters: PropTypes.array.isRequired,
    gameMaster: PropTypes.bool.isRequired,
    currentQuest: PropTypes.number.isRequired,
    isQuestShowed: PropTypes.bool.isRequired,
    questsList: PropTypes.array.isRequired,
    musicName: PropTypes.number.isRequired,
    noiseName: PropTypes.number.isRequired,
    musicVolume: PropTypes.number.isRequired,
    noiseVolume: PropTypes.number.isRequired,
    merchants: PropTypes.array.isRequired,
    towns: PropTypes.array.isRequired,
    quests: PropTypes.array.isRequired,
    tilesTypes: PropTypes.array.isRequired,
    currentMerchant: PropTypes.number.isRequired,
    currentTown: PropTypes.number.isRequired,
    onChangeMusics: PropTypes.func.isRequired,
    resetSounds: PropTypes.func.isRequired,
    doSetState: PropTypes.func.isRequired,
    triggerError: PropTypes.func.isRequired,
    buyItem: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    stories: PropTypes.array.isRequired,
};

export default MiddlePanel;
