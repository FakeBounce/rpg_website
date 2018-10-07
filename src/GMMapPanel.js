import React, { Component } from "react";
import { gridDimension, heightLeft, widthLeft } from "./StyleConstants";
import { musics, noises } from "./Constants";

import PropTypes from "prop-types";
import SoundPanel from "./SoundPanel";

const styledBoxHeader = {
    width: "100%",
    height: "20px",
    marginBottom: "5px",
    textAlign: "center",
};

const styledMapButtons = {
    border: "1px solid blue",
    width: `${gridDimension * 9 + 3}px`,
    height: `${gridDimension}px`,
    display: "inline-block",
    float: "left",
};

const styledGrid = {
    border: "1px solid pink",
    width: `${gridDimension}px`,
    height: `${gridDimension}px`,
    display: "inline-block",
    float: "left",
};

const styledMapSide = {
    border: "1px solid brown",
    width: `${widthLeft / 2 - 3}px`,
    height: `${heightLeft / 2 - 1}px`,
    display: "inline-block",
    float: "left",
    textAlign: "left",
};

class GMMapPanel extends Component {
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
                        backgroundColor: tilesTypes[key].backgroundColor,
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

    render() {
        const {
            textureToApply,
            onChangeMusics,
            resetSounds,
            musicName,
            musicVolume,
            noiseName,
            noiseVolume,
        } = this.props;

        return (
            <div>
                <div style={styledMapSide}>
                    <div style={styledBoxHeader}>Modifier la carte</div>
                    <div style={styledMapButtons}>
                        {this.getGridTypes()}
                        {textureToApply && this.getGridSelected(textureToApply)}
                    </div>
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
            </div>
        );
    }
}

GMMapPanel.propTypes = {
    textureToApply: PropTypes.object.isRequired,
    musicName: PropTypes.number.isRequired,
    noiseName: PropTypes.number.isRequired,
    musicVolume: PropTypes.number.isRequired,
    noiseVolume: PropTypes.number.isRequired,
    onChangeMusics: PropTypes.func.isRequired,
    resetSounds: PropTypes.func.isRequired,
    doSetState: PropTypes.func.isRequired,
    triggerError: PropTypes.func.isRequired,
    tilesTypes: PropTypes.array.isRequired,
};

export default GMMapPanel;
