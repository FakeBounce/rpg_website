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
import MapZoom from "./MapZoom";
import MapArrows from "./MapArrows";

const styledMap = {
    width: `${gridDimension * gridLength}px`,
    height: `${gridDimension * gridLength}px`,
};

class MapGenerator extends Component {
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
            towns,
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
                                className="fog"
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
            merchantsList: town.merchantsList || [],
            questsList: town.questsList || [],
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

    render() {
        const { map, doSetState, currentX, currentY, currentZoom } = this.props;

        return (
            <div className="map" style={styledMap}>
                <MapZoom doSetState={doSetState} currentZoom={currentZoom} />
                <MapArrows
                    doSetState={doSetState}
                    currentX={currentX}
                    currentY={currentY}
                />
                <div
                    className="map-mover"
                    style={{
                        width: totalRows * gridDimension,
                        height: totalColumn * gridDimension,
                        left: (-gridDimension * currentX * currentZoom) / 10,
                        top: (-gridDimension * currentY * currentZoom) / 10,
                    }}
                >
                    {this.generateTable(map)}
                </div>
            </div>
        );
    }
}

MapGenerator.defaultProps = {
    textureToApply: null,
};

MapGenerator.propTypes = {
    map: PropTypes.array.isRequired,
    doSetState: PropTypes.func.isRequired,
    currentX: PropTypes.number.isRequired,
    currentY: PropTypes.number.isRequired,
    currentZoom: PropTypes.number.isRequired,
    isGameMaster: PropTypes.bool.isRequired,
    isOnPlayerView: PropTypes.bool.isRequired,
    tilesTypes: PropTypes.object.isRequired,
    towns: PropTypes.array.isRequired,
    stories: PropTypes.array.isRequired,
    currentStory: PropTypes.number.isRequired,
    textureToApply: PropTypes.object,
    triggerError: PropTypes.func.isRequired,
    currentScale: PropTypes.number.isRequired,
};

export default MapGenerator;
