import React, { Component } from "react";
import { gridDimension, heightLeft, widthLeft } from "./StyleConstants";
import { musics, noises } from "./Constants";

import PropTypes from "prop-types";
import SoundPanel from "./SoundPanel";
import firebase from "firebase";

const styledBoxHeader = {
    width: "100%",
    height: "20px",
    marginBottom: "5px",
    textAlign: "center",
    float: "left",
    display: "inline-block",
    position: "relative",
};

const styledSemiBoxHeader = {
    width: "50%",
    height: "20px",
    marginBottom: "5px",
    textAlign: "center",
    float: "left",
    display: "inline-block",
    position: "relative",
};

const styledTownListItem = {
    width: "75%",
    height: "20px",
    marginBottom: "5px",
    textAlign: "center",
    float: "left",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
};

const styledTownListDiscover = {
    width: "25%",
    height: "20px",
    textAlign: "center",
    float: "left",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
};

const styledMapButtons = {
    border: "1px solid blue",
    width: "100%",
    height: `${gridDimension * 2 + 1}px`,
    display: "inline-block",
    float: "left",
};

const styledGrid = {
    border: "1px solid pink",
    width: `${(widthLeft / 2 - 3) / 8}px`,
    height: `${gridDimension}px`,
    display: "inline-block",
    float: "left",
    position: "relative",
};

const styledMapSide = {
    border: "1px solid brown",
    width: `${widthLeft / 2 - 3}px`,
    height: `${heightLeft / 2 - 1}px`,
    display: "inline-block",
    float: "left",
    textAlign: "left",
    position: "relative",
};

const styledSemiContainer = {
    width: "100%",
    height: `${heightLeft / 4 - 40}px`,
    display: "inline-block",
    float: "left",
    position: "relative",
    overflowY: "auto",
};

const styledMiddlePanel = {
    width: `${widthLeft - 2}px`,
    height: `${heightLeft - 1}px`,
    display: "inline-block",
    float: "left",
    position: "relative",
};

const styledQuestsContainer = {
    width: "100%",
    height: `${heightLeft / 2 - 20}px`,
    display: "inline-block",
    float: "left",
    position: "absolute",
    top: 20,
    left: 0,
    overflowY: "auto",
};

const styledMerchantsContainer = {
    width: "100%",
    height: `${heightLeft / 2 - 20}px`,
    display: "inline-block",
    float: "left",
    position: "absolute",
    top: 20,
    left: 0,
    overflowY: "auto",
};

class GMMapPanel extends Component {
    state = {
        isOnQuest: true,
        isOnMap: true,
        townToAssign: -1,
    };

    getGridTypes = () => {
        const { tilesTypes } = this.props;
        return Object.keys(tilesTypes).map(key => {
            return (
                <div
                    key={`gridType-${key}`}
                    style={{
                        ...styledGrid,
                        border: "none",
                        borderLeft: "1px solid black",
                        backgroundColor:
                            key === "Fog"
                                ? "black"
                                : key === "NoFog"
                                    ? "white"
                                    : tilesTypes[key].backgroundColor,
                    }}
                    onClick={() => this.loadTexture(key)}
                >
                    {tilesTypes[key].icon && (
                        <div
                            style={{
                                ...styledGrid,
                                backgroundImage: `url(${tilesTypes[key].icon})`,
                                backgroundSize: "cover",
                            }}
                        />
                    )}
                </div>
            );
            return null;
        });
    };

    loadTexture = gridType => {
        if (gridType === "Fog") {
            this.props.doSetState({
                textureToApply: {
                    hasFog: true,
                },
            });
        } else if (gridType === "NoFog") {
            this.props.doSetState({
                textureToApply: {
                    hasFog: false,
                },
            });
        } else {
            this.props.doSetState({
                textureToApply: {
                    environment: gridType,
                },
            });
        }
    };

    getGridSelected = grid => {
        const { tilesTypes } = this.props;
        let bg = "";

        if (grid.hasFog) {
            bg = tilesTypes["Fog"];
        } else {
            Object.keys(tilesTypes).map(key => {
                if (key === grid.environment) {
                    bg = tilesTypes[key];
                }
                return null;
            });
        }
        return (
            <div
                style={{
                    ...styledGrid,
                    border: "none",
                    borderLeft: "1px solid black",
                    backgroundColor: bg.backgroundColor,
                }}
                onClick={() => this.unloadTexture()}
            >
                {bg.icon && (
                    <div
                        style={{
                            ...styledGrid,
                            backgroundImage: `url(${bg.icon})`,
                            backgroundSize: "cover",
                        }}
                    />
                )}
            </div>
        );
    };

    unloadTexture = () => {
        this.props.doSetState({
            textureToApply: null,
        });
    };

    changeCurrentMusic = m => {
        const { onChangeMusics } = this.props;
        onChangeMusics("musicName", m);
    };

    changeCurrentNoise = n => {
        const { onChangeMusics } = this.props;
        onChangeMusics("noiseName", n);
        onChangeMusics("noiseStatus", "PLAYING");
    };

    addQuestToTown = i => {
        const { currentStory, currentTown, towns, quests } = this.props;
        if (!quests[i].validated) {
            const newTown = { ...towns[currentTown] };
            newTown.questsList
                ? newTown.questsList.push(i)
                : (newTown.questsList = [i]);
            firebase
                .database()
                .ref("stories/" + currentStory + "/towns/" + currentTown)
                .set(newTown)
                .catch(error => {
                    // Handle Errors here.
                    this.props.triggerError(error);
                });

            const newQuest = { ...quests[i] };
            newQuest.town = currentTown;
            firebase
                .database()
                .ref("stories/" + currentStory + "/quests/" + i)
                .set(newQuest)
                .catch(error => {
                    // Handle Errors here.
                    this.props.triggerError(error);
                });
        }
    };

    addMerchantToTown = i => {
        const { currentStory, currentTown, towns, merchants } = this.props;
        const newTown = { ...towns[currentTown] };
        newTown.merchantsList
            ? newTown.merchantsList.push(i)
            : (newTown.merchantsList = [i]);
        firebase
            .database()
            .ref("stories/" + currentStory + "/towns/" + currentTown)
            .set(newTown)
            .catch(error => {
                // Handle Errors here.
                this.props.triggerError(error);
            });

        const newMerchant = { ...merchants[i] };
        newMerchant.town = currentTown;
        newMerchant.isDiscovered = false;
        firebase
            .database()
            .ref("stories/" + currentStory + "/merchants/" + i)
            .set(newMerchant)
            .catch(error => {
                // Handle Errors here.
                this.props.triggerError(error);
            });
    };

    toggleMerchantDiscover = i => {
        const { currentStory, currentTown, merchants } = this.props;

        const newMerchant = { ...merchants[i] };
        newMerchant.isDiscovered = !newMerchant.isDiscovered;
        firebase
            .database()
            .ref("stories/" + currentStory + "/merchants/" + i)
            .set(newMerchant)
            .catch(error => {
                // Handle Errors here.
                this.props.triggerError(error);
            });
    };

    validateQuest = i => {
        const { currentStory, quests } = this.props;

        const newQuest = { ...quests[i] };
        newQuest.validated = !newQuest.validated;
        firebase
            .database()
            .ref("stories/" + currentStory + "/quests/" + i)
            .set(newQuest)
            .catch(error => {
                // Handle Errors here.
                this.props.triggerError(error);
            });
    };

    removeQuestFromTown = i => {
        const { currentStory, currentTown, towns, quests } = this.props;
        const newTown = { ...towns[currentTown] };
        if (!quests[i].validated) {
            newTown.questsList.map((ql, index) => {
                if (ql === i) {
                    newTown.questsList.splice(index, 1);
                }
            });

            firebase
                .database()
                .ref("stories/" + currentStory + "/towns/" + currentTown)
                .set(newTown)
                .catch(error => {
                    // Handle Errors here.
                    this.props.triggerError(error);
                });

            const newQuest = { ...quests[i] };
            newQuest.town = null;
            firebase
                .database()
                .ref("stories/" + currentStory + "/quests/" + i)
                .set(newQuest)
                .catch(error => {
                    // Handle Errors here.
                    this.props.triggerError(error);
                });
        }
    };

    removeMerchantFromTown = i => {
        const { currentStory, currentTown, towns, merchants } = this.props;
        const newTown = { ...towns[currentTown] };
        newTown.merchantsList.map((ql, index) => {
            if (ql === i) {
                newTown.merchantsList.splice(index, 1);
            }
        });

        firebase
            .database()
            .ref("stories/" + currentStory + "/towns/" + currentTown)
            .set(newTown)
            .catch(error => {
                // Handle Errors here.
                this.props.triggerError(error);
            });

        const newMerchant = { ...merchants[i] };
        newMerchant.town = null;
        firebase
            .database()
            .ref("stories/" + currentStory + "/merchants/" + i)
            .set(newMerchant)
            .catch(error => {
                // Handle Errors here.
                this.props.triggerError(error);
            });
    };

    toggleRightPanel = bool => {
        this.setState(state => ({
            ...state,
            isOnQuest: bool,
        }));
    };

    toggleIsCurrent = () => {
        const { stories, currentStory, currentTile, doSetState } = this.props;
        const newTile = { ...currentTile };
        newTile.isCurrent = !newTile.isCurrent;
        firebase
            .database()
            .ref(
                "maps/" +
                    stories[currentStory].map +
                    "/" +
                    currentTile.y +
                    "/" +
                    currentTile.x,
            )
            .set(newTile)
            .then(() => {
                doSetState({
                    currentTile: { ...newTile },
                });
                if (newTile.isCurrent) {
                    firebase
                        .database()
                        .ref("stories/" + currentStory + "/currentX")
                        .set(parseInt(newTile.x, 10) - 6)
                        .catch(error => {
                            // Handle Errors here.
                            this.props.triggerError(error);
                        });
                    firebase
                        .database()
                        .ref("stories/" + currentStory + "/currentY")
                        .set(parseInt(newTile.y, 10) - 6)
                        .catch(error => {
                            // Handle Errors here.
                            this.props.triggerError(error);
                        });
                }
            })
            .catch(error => {
                // Handle Errors here.
                this.props.triggerError(error);
            });
    };

    toggleHasTown = () => {
        const { stories, currentStory, currentTile, doSetState } = this.props;
        const { townToAssign } = this.state;
        const newTile = { ...currentTile };
        newTile.hasTown = townToAssign;
        firebase
            .database()
            .ref(
                "maps/" +
                    stories[currentStory].map +
                    "/" +
                    currentTile.y +
                    "/" +
                    currentTile.x,
            )
            .set(newTile)
            .then(() => {
                doSetState({
                    currentTile: { ...newTile },
                });
            })
            .catch(error => {
                // Handle Errors here.
                this.props.triggerError(error);
            });
    };

    onChangeTown = value => {
        this.setState(state => ({
            ...state,
            townToAssign: value,
        }));
    };

    render() {
        const {
            textureToApply,
            onChangeMusics,
            resetSounds,
            musicName,
            musicVolume,
            noiseName,
            noiseVolume,
            changeCurrentScale,
            currentScale,
            currentTown,
            towns,
            quests,
            merchants,
            currentTile,
        } = this.props;
        const { isOnQuest, townToAssign, isOnMap } = this.state;
        return (
            <div style={styledMiddlePanel}>
                <div style={styledMapSide}>
                    <div style={styledSemiBoxHeader}>Modifier la carte</div>
                    <div style={styledSemiBoxHeader}>Ajouter un event</div>
                    {isOnMap && (
                        <div>
                            <div style={styledMapButtons}>
                                {this.getGridTypes()}
                                {textureToApply &&
                                    this.getGridSelected(textureToApply)}
                            </div>
                            <input
                                type="number"
                                onChange={e => {
                                    changeCurrentScale(
                                        parseInt(e.target.value, 10),
                                    );
                                }}
                                value={currentScale}
                            />
                            <div style={styledBoxHeader}>
                                Modifier la case :
                            </div>
                            {Object.keys(currentTile).length > 0 && (
                                <div>
                                    environment : {currentTile.environment}
                                    <br />
                                    hasFog : {currentTile.hasFog}
                                    <br />
                                    hasTown : {currentTile.hasTown}
                                    <input
                                        type="number"
                                        value={townToAssign}
                                        onChange={e =>
                                            this.onChange(
                                                parseInt(e.target.value, 10),
                                            )
                                        }
                                    />
                                    <button onClick={() => this.toggleHasTown}>
                                        Validate
                                    </button>
                                    <br />
                                    isCurrent : {currentTile.isCurrent}
                                    <button onClick={this.toggleIsCurrent}>
                                        Toggle current
                                    </button>
                                    <br />x :{currentTile.x}
                                    <br />y : {currentTile.y}
                                </div>
                            )}
                        </div>
                    )}
                    {
                        !isOnMap &&
                            <div>
                                Choose event type :
                            </div>
                    }
                </div>
                <SoundPanel
                    musicName={musicName}
                    noiseName={noiseName}
                    musicVolume={musicVolume}
                    noiseVolume={noiseVolume}
                    onChange={onChangeMusics}
                    resetSounds={resetSounds}
                    changeCurrentMusic={this.changeCurrentMusic}
                    changeCurrentNoise={this.changeCurrentNoise}
                />
                {currentTown > -1 && (
                    <div style={styledMapSide}>
                        <div style={styledBoxHeader}>
                            {towns[currentTown].name}
                        </div>
                        <div
                            onClick={() => this.toggleRightPanel(true)}
                            style={styledBoxHeader}
                        >
                            Quests
                        </div>
                        <div style={styledSemiContainer}>
                            {quests.map((q, i) => {
                                if (q.town === currentTown) {
                                    return (
                                        <div key={`quest-${q.name}`}>
                                            <div
                                                onClick={() =>
                                                    this.removeQuestFromTown(i)
                                                }
                                                style={styledTownListItem}
                                            >
                                                {q.name}
                                            </div>
                                            <button
                                                style={styledTownListDiscover}
                                                onClick={() =>
                                                    this.validateQuest(i)
                                                }
                                            >
                                                {q.validated
                                                    ? "Complete"
                                                    : "Validate"}
                                            </button>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                        <div
                            onClick={() => this.toggleRightPanel(false)}
                            style={styledBoxHeader}
                        >
                            Merchants
                        </div>
                        <div style={styledSemiContainer}>
                            {merchants.map((m, i) => {
                                if (m.town === currentTown) {
                                    return (
                                        <div key={`town-${m.name}`}>
                                            <div
                                                onClick={() =>
                                                    this.removeMerchantFromTown(
                                                        i,
                                                    )
                                                }
                                                style={styledTownListItem}
                                            >
                                                {m.name}({m.job})
                                            </div>
                                            <button
                                                style={styledTownListDiscover}
                                                onClick={() =>
                                                    this.toggleMerchantDiscover(
                                                        i,
                                                    )
                                                }
                                            >
                                                ToggleDiscover(
                                                {m.isDiscovered ? "Y" : "N"})
                                            </button>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                )}
                {currentTown > -1 && (
                    <div style={styledMapSide}>
                        <div style={styledBoxHeader}>
                            {isOnQuest ? "Quests" : "Merchants"}
                        </div>
                        {isOnQuest ? (
                            <div style={styledQuestsContainer}>
                                {quests.map((q, i) => {
                                    return (
                                        <div
                                            onClick={() =>
                                                this.addQuestToTown(i)
                                            }
                                            style={styledBoxHeader}
                                        >
                                            {q.name}
                                            {typeof q.town !== "undefined" &&
                                                q.town > -1 && (
                                                    <span>
                                                        ({towns[q.town].name})
                                                    </span>
                                                )}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div style={styledMerchantsContainer}>
                                {merchants.map((m, i) => {
                                    return (
                                        <div
                                            onClick={() =>
                                                this.addMerchantToTown(i)
                                            }
                                            style={styledBoxHeader}
                                        >
                                            {m.name}({m.job})
                                            {typeof m.town !== "undefined" &&
                                                m.town > -1 && (
                                                    <span>
                                                        ({towns[m.town].name})
                                                    </span>
                                                )}
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}

GMMapPanel.defaultProps = {
    textureToApply: null,
};

GMMapPanel.propTypes = {
    textureToApply: PropTypes.object,
    musicName: PropTypes.string.isRequired,
    noiseName: PropTypes.string.isRequired,
    musicVolume: PropTypes.number.isRequired,
    noiseVolume: PropTypes.number.isRequired,
    onChangeMusics: PropTypes.func.isRequired,
    resetSounds: PropTypes.func.isRequired,
    doSetState: PropTypes.func.isRequired,
    triggerError: PropTypes.func.isRequired,
    changeCurrentScale: PropTypes.func.isRequired,
    tilesTypes: PropTypes.object.isRequired,
    currentScale: PropTypes.number.isRequired,
    currentTown: PropTypes.number.isRequired,
    currentStory: PropTypes.number.isRequired,
    towns: PropTypes.array.isRequired,
    quests: PropTypes.array.isRequired,
    merchants: PropTypes.array.isRequired,
    stories: PropTypes.array.isRequired,
    currentTile: PropTypes.object.isRequired,
};

export default GMMapPanel;
