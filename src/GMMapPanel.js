import React, { Component } from 'react';
import { gridDimension, heightLeft, widthLeft } from './StyleConstants';
import { musics, noises } from './Constants';

import PropTypes from 'prop-types';
import SoundPanel from './SoundPanel';

const styledBoxHeader = {
    width: '100%',
    height: '20px',
    marginBottom: '5px',
    textAlign: 'center',
};

const styledMapButtons = {
    border: '1px solid blue',
    width: `${gridDimension * 3 + 3}px`,
    height: `${gridDimension}px`,
    display: 'inline-block',
    float: 'left',
};

const styledGrid = {
    border: '1px solid pink',
    width: `${gridDimension}px`,
    height: `${gridDimension}px`,
    display: 'inline-block',
    float: 'left',
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

const gridTypes = [
    {
        name: 'Fog',
        background: 'black',
    },
    {
        name: 'Ocean',
        background: 'blue',
    },
    {
        name: 'Forest',
        icon: 'forest.png',
    },
];

class GMMapPanel extends Component {
    getGridTypes = grids => {
        return grids.map(gridType => {
            if (gridType.background) {
                return (
                    <div
                        key={`gridType-${gridType.background}`}
                        style={{
                            ...styledGrid,
                            border: 'none',
                            borderLeft: '1px solid black',
                            backgroundColor: gridType.background,
                        }}
                        onClick={() => this.loadTexture(gridType)}
                    />
                );
            } else if (gridType.icon) {
                return (
                    <div
                        key={`gridType-${gridType.icon}`}
                        style={{
                            ...styledGrid,
                            border: 'none',
                            borderLeft: '1px solid black',
                            backgroundImage: `url(${gridType.icon})`,
                            backgroundSize: 'cover',
                        }}
                        onClick={() => this.loadTexture(gridType)}
                    />
                );
            }
            return null;
        });
    };

    loadTexture = gridType => {
        this.props.doSetState({
            textureToApply: gridType,
        });
    };

    getGridSelected = grid => {
        if (grid.background) {
            return (
                <div
                    style={{
                        ...styledGrid,
                        border: 'none',
                        borderLeft: '1px solid black',
                        backgroundColor: grid.background,
                    }}
                    onClick={() => this.unloadTexture()}
                />
            );
        } else if (grid.icon) {
            return (
                <div
                    style={{
                        ...styledGrid,
                        border: 'none',
                        borderLeft: '1px solid black',
                        backgroundImage: `url(${grid.icon})`,
                        backgroundSize: 'cover',
                    }}
                    onClick={() => this.unloadTexture()}
                />
            );
        }
        return null;
    };

    unloadTexture = () => {
        this.props.doSetState({
            textureToApply: null,
        });
    };

    changeCurrentMusic = m => {
        const { onChangeMusics } = this.props;
        onChangeMusics('musicName', m);
        onChangeMusics('musicStatus', 'PLAYING');
    };

    changeCurrentNoise = n => {
        const { onChangeMusics } = this.props;
        onChangeMusics('noiseName', n);
        onChangeMusics('noiseStatus', 'PLAYING');
    };

    render() {
        const {
            textureToApply,
            onChange,
            musicVolume,
            noiseVolume,
        } = this.props;

        return (
            <div>
                <div style={styledMapSide}>
                    <div style={styledBoxHeader}>Modifier la carte</div>
                    <div style={styledMapButtons}>
                        {this.getGridTypes(gridTypes)}
                    </div>
                    <div style={styledMapButtons}>
                        {textureToApply && this.getGridSelected(textureToApply)}
                    </div>
                </div>
                <SoundPanel
                    musicVolume={musicVolume}
                    noiseVolume={noiseVolume}
                    onChange={onChange}
                    changeCurrentMusic={this.changeCurrentMusic}
                    changeCurrentNoise={this.changeCurrentNoise}
                />
            </div>
        );
    }
}

GMMapPanel.propTypes = {
    textureToApply: PropTypes.object.isRequired,
    musicVolume: PropTypes.number.isRequired,
    noiseVolume: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    doSetState: PropTypes.func.isRequired,
    triggerError: PropTypes.func.isRequired,
};

export default GMMapPanel;
