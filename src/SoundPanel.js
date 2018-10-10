import React, { Component } from "react";
import { heightLeft, widthLeft } from "./StyleConstants";
import { musics, noises } from "./Constants";

import PropTypes from "prop-types";

const styledBoxHeaderMusic = {
    width: "100%",
    height: "20px",
    marginBottom: "5px",
    textAlign: "center",
    position: "absolute",
    display: "block",
};

const styledBoxHeaderNoise = {
    width: "100%",
    height: "20px",
    marginBottom: "5px",
    textAlign: "center",
    position: "absolute",
    display: "block",
    top: `${(heightLeft / 2 - 1 - 45 * 2) / 2 + 45}px`,
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

const styledMusicVolume = {
    width: "100%",
    position: "absolute",
    height: "25px",
    top: "20px",
};

const styledNoiseVolume = {
    width: "100%",
    position: "absolute",
    height: "25px",
    top: `${(heightLeft / 2 - 1 - 45 * 2) / 2 + 45 + 20}px`,
};

const styledMusicContainer = {
    width: "100%",
    position: "absolute",
    height: `${(heightLeft / 2 - 1 - 45 * 2) / 2}px`,
    top: "45px",
    overflowY: "auto",
};

const styledNoiseContainer = {
    width: "100%",
    position: "absolute",
    height: `${(heightLeft / 2 - 1 - 45 * 2) / 2}px`,
    top: `${(heightLeft / 2 - 1 - 45 * 2) / 2 + 45 + 45}px`,
    overflowY: "auto",
};

const styledAudioFile = {
    width: "100%",
    height: "30px",
    cursor: "pointer",
    borderBottom:'1px solid black',
};

class SoundPanel extends Component {
    render() {
        const {
            changeCurrentMusic,
            changeCurrentNoise,
            resetSounds,
            onChange,
            musicName,
            musicVolume,
            noiseName,
            noiseVolume,
        } = this.props;

        return (
            <div style={styledMapSide}>
                <button
                    onClick={resetSounds}
                    style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        cursor: "pointer",
                        zIndex: 2,
                    }}
                >
                    Reset
                </button>
                <div style={styledBoxHeaderMusic}>
                    Modifier la musique ({musicName})
                </div>
                <div style={styledMusicVolume}>
                    Volume :
                    <input
                        type="range"
                        onChange={e =>
                            onChange(
                                e.target.name,
                                parseInt(e.target.value, 10),
                            )
                        }
                        min="0"
                        max="100"
                        name="musicVolume"
                        value={musicVolume}
                    />
                </div>
                <div style={styledMusicContainer}>
                    {musics.map(m => {
                        return (
                            <div
                                style={styledAudioFile}
                                onClick={() => changeCurrentMusic(m)}
                            >
                                {m}
                            </div>
                        );
                    })}
                </div>
                <div style={styledBoxHeaderNoise}>
                    Modifier les bruits ({noiseName})
                </div>
                <div style={styledNoiseVolume}>
                    Volume :
                    <input
                        type="range"
                        onChange={e =>
                            onChange(
                                e.target.name,
                                parseInt(e.target.value, 10),
                            )
                        }
                        min="0"
                        max="100"
                        name="noiseVolume"
                        value={noiseVolume}
                    />
                </div>

                <div style={styledNoiseContainer}>
                    {noises.map(n => {
                        return (
                            <div
                                style={styledAudioFile}
                                onClick={() => changeCurrentNoise(n)}
                            >
                                {n}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

SoundPanel.propTypes = {
    musicName: PropTypes.number.isRequired,
    noiseName: PropTypes.number.isRequired,
    musicVolume: PropTypes.number.isRequired,
    noiseVolume: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    resetSounds: PropTypes.func.isRequired,
    changeCurrentMusic: PropTypes.func.isRequired,
    changeCurrentNoise: PropTypes.func.isRequired,
};

export default SoundPanel;