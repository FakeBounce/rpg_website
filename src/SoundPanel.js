import React, { Component } from 'react';
import { gridDimension, heightLeft, widthLeft } from './StyleConstants';
import { musics, noises } from './Constants';

import PropTypes from 'prop-types';

const styledBoxHeader = {
    width: '100%',
    height: '20px',
    marginBottom: '5px',
    textAlign: 'center',
};

const styledMapSide = {
    border: '1px solid brown',
    width: `${widthLeft / 2 - 3}px`,
    height: `${heightLeft / 2 - 1}px`,
    display: 'inline-block',
    float: 'left',
    textAlign: 'left',
};

const styledMusicContainer = {
    width: '100%',
    position: 'absolute',
    height: '45%',
    top: '50px',
    overflowY: 'auto',
};

const styledNoiseContainer = {
    width: '100%',
    position: 'absolute',
    height: '45%',
    top: '55%',
    overflowY: 'auto',
};

const styledAudioFile = {
    width: '100%',
    height: '30px',
    cursor: 'pointer',
};

class SoundPanel extends Component {
    render() {
        const {
            changeCurrentMusic,
            changeCurrentNoise,
            onChange,
            musicVolume,
            noiseVolume,
        } = this.props;

        return (
            <div style={styledMapSide}>
                <div style={styledBoxHeader}>Modifier la musique</div>
                <div>
                    Volume :
                    <input
                        type="range"
                        onChange={e => onChange(e.target.name, e.target.value)}
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
                <div style={styledBoxHeader}>Modifier les bruits</div>
                <div>
                    Volume :
                    <input
                        type="range"
                        onChange={e => onChange(e.target.name, e.target.value)}
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
    musicVolume: PropTypes.number.isRequired,
    noiseVolume: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    changeCurrentMusic: PropTypes.func.isRequired,
    changeCurrentNoise: PropTypes.func.isRequired,
};

export default SoundPanel;
