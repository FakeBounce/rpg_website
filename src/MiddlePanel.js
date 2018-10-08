import React, { Component } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import "./Grid.css";

import GMMapPanel from "./GMMapPanel";
import RightPanel from "./RightPanel";
import PlayerMapPanel from "./PlayerMapPanel";
import Town from "./Town";

import {
    gridDimension,
    gridLength,
    totalRows,
    totalColumn,
} from "./StyleConstants";
import { towns } from "./Constants";

const styledMap = {
    width: `${gridDimension * gridLength}px`,
    height: `${gridDimension * gridLength}px`,
};

class MiddlePanel extends Component {
    generateTable = mapToRender => {
        const { currentZoom } = this.props;
        const table = [];
        mapToRender.map((row, index) => {
            table.push(
                <div
                    key={`table-row-${index}`}
                    className="row"
                    style={{
                        width: `${(totalRows * gridDimension * currentZoom) /
                            10 +
                            totalRows}px`,
                        height: `${(gridDimension * currentZoom) / 10}px`,
                    }}
                >
                    {this.createGrid(index, row)}
                </div>,
            );
            return null;
        });
        return table;
    };

    createGrid = (positionX, rowToRender) => {
        const {
            isGameMaster,
            isOnPlayerView,
            textureToApply,
            tilesTypes,
            currentZoom,
            doSetState,
        } = this.props;
        const table = [];

        rowToRender.map((row, index) => {
            table.push(
                isGameMaster && !isOnPlayerView ? (
                    <div
                        key={`row-${index}`}
                        className="grid"
                        style={{
                            backgroundColor:
                                tilesTypes[row.environment].backgroundColor,
                            width: `${(gridDimension * currentZoom) / 10}px`,
                            height: `${(gridDimension * currentZoom) / 10}px`,
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
                                    width: `${(gridDimension * currentZoom) /
                                        10}px`,
                                    height: `${(gridDimension * currentZoom) /
                                        10}px`,
                                }}
                            />
                        )}
                        {towns.map((town, i) => {
                            if (
                                positionX === town.positionY &&
                                index === town.positionX
                            ) {
                                return (
                                    <Town
                                        key={`town-${town.positionX}-${
                                            town.positionY
                                        }`}
                                        town={town}
                                        showTownList={() => {
                                            doSetState({
                                                currentTown: i,
                                            });
                                        }}
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
                            backgroundColor:
                                tilesTypes[row.environment].backgroundColor,
                            width: `${(gridDimension * currentZoom) / 10}px`,
                            height: `${(gridDimension * currentZoom) / 10}px`,
                        }}
                    >
                        {row.hasFog && (
                            <div
                                style={{
                                    backgroundColor: "black",
                                    position: "absolute",
                                    width: `${(gridDimension * currentZoom) /
                                        10}px`,
                                    height: `${(gridDimension * currentZoom) /
                                        10}px`,
                                }}
                            />
                        )}
                        {towns.map(town => {
                            if (
                                positionX === town.positionY &&
                                index === town.positionX
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
            currentScale,
        } = this.props;

        let updates = {};
        let path = "";
        Object.keys(textureToApply).map(key => {
            path = key;
        });
        updates["/" + parseInt(x, 10) + "/" + parseInt(y, 10) + "/" + path] =
            textureToApply[path];
        for (let i = 0; i < currentScale - 1; i++) {
            if (i === 0) {
                for (let j = 0; j < currentScale - 1; j++) {
                    if (y - j >= 0) {
                        updates[
                            "/" + x + "/" + parseInt(y - j, 10) + "/" + path
                        ] = textureToApply[path];
                    }
                    if (y + j <= 39) {
                        updates[
                            "/" + x + "/" + parseInt(y + j, 10) + "/" + path
                        ] = textureToApply[path];
                    }
                }
            } else {
                for (let j = 0; j < currentScale - 1; j++) {
                    if (x - i >= 0 && y - j >= 0) {
                        updates[
                            "/" +
                                parseInt(x - i, 10) +
                                "/" +
                                parseInt(y - j, 10) +
                                "/" +
                                path
                        ] = textureToApply[path];
                    }
                    if (x - i >= 0 && y + j <= 39) {
                        updates[
                            "/" +
                                parseInt(x - i, 10) +
                                "/" +
                                parseInt(y + j, 10) +
                                "/" +
                                path
                        ] = textureToApply[path];
                    }
                }
                for (let j = 0; j < currentScale - 1; j++) {
                    if (x - i >= 0 && y - j >= 0) {
                        updates[
                            "/" +
                                parseInt(x + i, 10) +
                                "/" +
                                parseInt(y - j, 10) +
                                "/" +
                                path
                        ] = textureToApply[path];
                    }
                    if (x + i <= 39 && y + j <= 39) {
                        updates[
                            "/" +
                                parseInt(x + i, 10) +
                                "/" +
                                parseInt(y + j, 10) +
                                "/" +
                                path
                        ] = textureToApply[path];
                    }
                }
            }
        }

        firebase
            .database()
            .ref("maps/" + stories[currentStory].map)
            .update(updates)
            .catch(error => {
                // Handle Errors here.
                triggerError(error);
            });
    };

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
            tilesTypes,
            currentScale,
            currentX,
            currentY,
            currentZoom,
        } = this.props;

        return (
            <div>
                <div className="map" style={styledMap}>
                    <div className="map-zoom">
                        <input
                            type="range"
                            name="currentZoom"
                            onChange={e => {
                                doSetState({
                                    currentZoom: parseInt(e.target.value, 10),
                                });
                            }}
                            value={currentZoom}
                            min="5"
                            max="12"
                            step="1"
                        />
                    </div>
                    <div
                        className="map-move map-move-left"
                        onClick={() => {
                            doSetState({ currentX: currentX - 1 });
                        }}
                    >
                        <img
                            src={"./arrow-left.png"}
                            className="map-arrow"
                            alt="arrow-left"
                        />
                    </div>
                    <div
                        className="map-move map-move-right"
                        onClick={() => {
                            doSetState({ currentX: currentX + 1 });
                        }}
                    >
                        <img
                            src={"./arrow-right.png"}
                            className="map-arrow"
                            alt="arrow-right"
                        />
                    </div>
                    <div
                        className="map-move map-move-up"
                        onClick={() => {
                            doSetState({ currentY: currentY - 1 });
                        }}
                    >
                        <img
                            src={"./arrow-up.png"}
                            className="map-arrow"
                            alt="arrow-up"
                        />
                    </div>
                    <div
                        className="map-move map-move-down"
                        onClick={() => {
                            doSetState({ currentY: currentY + 1 });
                        }}
                    >
                        <img
                            src={"./arrow-down.png"}
                            className="map-arrow"
                            alt="arrow-down"
                        />
                    </div>
                    <div
                        className="map-mover"
                        style={{
                            width: totalRows * gridDimension,
                            height: totalColumn * gridDimension,
                            left:
                                (-gridDimension * currentX * currentZoom) / 10,
                            top: (-gridDimension * currentY * currentZoom) / 10,
                        }}
                    >
                        {this.generateTable(map)}
                    </div>
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
                            currentStory={currentStory}
                            towns={towns}
                            quests={quests}
                            merchants={merchants}
                            tilesTypes={tilesTypes}
                            currentScale={currentScale}
                            changeCurrentScale={this.changeCurrentScale}
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
    currentScale: PropTypes.number.isRequired,
    currentX: PropTypes.number.isRequired,
    currentY: PropTypes.number.isRequired,
    currentZoom: PropTypes.number.isRequired,
};

export default MiddlePanel;
