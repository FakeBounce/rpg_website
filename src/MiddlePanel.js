import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';

import GMMapPanel from './GMMapPanel';
import RightPanel from './RightPanel';
import PlayerMapPanel from './PlayerMapPanel';
import Town from './Town';

import { gridDimension, gridLength } from './StyleConstants';
import { towns } from './Constants';

const styledGrid = {
    border: '1px solid pink',
    width: `${gridDimension}px`,
    height: `${gridDimension}px`,
    display: 'inline-block',
    float: 'left',
};

const styledRow = {
    width: `${gridDimension * gridLength + gridLength * 2}px`,
    height: `${gridDimension}px`,
    display: 'inline-block',
    float: 'left',
};

const styledMap = {
    border: '1px solid grey',
    width: `${gridDimension * gridLength + gridLength * 2}px`,
    height: `${gridDimension * gridLength}px`,
    display: 'inline-block',
    float: 'left',
};

class MiddlePanel extends Component {
    generateTable = mapToRender => {
        const table = [];
        mapToRender.map((row, index) => {
            table.push(
                <div key={`table-row-${index}`} style={styledRow}>
                    {this.createGrid(index, row)}
                </div>
            );
            return null;
        });
        return table;
    };

    createGrid = (positionX, rowToRender) => {
        const { isGameMaster, textureToApply } = this.props;
        const table = [];

        rowToRender.map((row, index) => {
            const tileStyle = row.background
                ? {
                      backgroundColor: row.background,
                  }
                : row.icon
                    ? {
                          backgroundImage: `url(${row.icon})`,
                          backgroundSize: 'cover',
                      }
                    : {};
            table.push(
                isGameMaster ? (
                    <div
                        key={`row-${index}`}
                        style={{ ...styledGrid, ...tileStyle }}
                        onClick={() => {
                            if (textureToApply)
                                this.setTexture(positionX, index);
                        }}
                    >
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
                        style={{ ...styledGrid, ...tileStyle }}
                    >
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
                )
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
            .ref('maps/' + stories[currentStory].map + '/' + x + '/' + y)
            .set(textureToApply)
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
            musicVolume,
            noiseVolume,
            merchants,
            currentMerchant,
            generateTable,
            onChangeMusics,
            doSetState,
            triggerError,
            buyItem,
            onChange,
        } = this.props;

        return (
            <div>
                <div style={styledMap}>{this.generateTable(map)}</div>
                {isGameMaster && (
                    <GMMapPanel
                        textureToApply={textureToApply}
                        musicVolume={musicVolume}
                        noiseVolume={noiseVolume}
                        onChange={onChangeMusics}
                        doSetState={doSetState}
                        triggerError={triggerError}
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
    musicVolume: PropTypes.number.isRequired,
    noiseVolume: PropTypes.number.isRequired,
    merchants: PropTypes.array.isRequired,
    currentMerchant: PropTypes.number.isRequired,
    generateTable: PropTypes.func.isRequired,
    onChangeMusics: PropTypes.func.isRequired,
    doSetState: PropTypes.func.isRequired,
    triggerError: PropTypes.func.isRequired,
    buyItem: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default MiddlePanel;
