import React, { Component } from 'react';
import Sound from 'react-sound';
import PropTypes from 'prop-types';

class SoundPlayer extends Component {
    render() {
        const {
            musicMute,
            noiseName,
            noiseStatus,
            noiseMute,
            noiseVolume,
            musicVolumeFirst,
            musicStatusFirst,
            musicNameFirst,
            musicVolumeSecond,
            musicNameSecond,
            musicStatusSecond,
        } = this.props;

        return (
            <div>
                {musicNameFirst !== '' && (
                    <Sound
                        url={`./music/${musicNameFirst}.mp3`}
                        playStatus={musicStatusFirst}
                        volume={musicMute ? 0 : musicVolumeFirst}
                        autoLoad
                        loop
                    />
                )}
                {musicNameSecond !== '' && (
                    <Sound
                        url={`./music/${musicNameSecond}.mp3`}
                        playStatus={musicStatusSecond}
                        volume={musicMute ? 0 : musicVolumeSecond}
                        autoLoad
                        loop
                    />
                )}
                {noiseName !== '' && (
                    <Sound
                        url={`./noise/${noiseName}.mp3`}
                        playStatus={noiseStatus}
                        volume={noiseMute ? 0 : noiseVolume}
                        onFinishedPlaying={this.stopNoise}
                        autoLoad
                    />
                )}
            </div>
        );
    }
}

SoundPlayer.propTypes = {
    musicMute: PropTypes.bool.isRequired,
    musicVolumeFirst: PropTypes.number.isRequired,
    musicStatusFirst: PropTypes.string.isRequired,
    musicNameFirst: PropTypes.string.isRequired,
    musicVolumeSecond: PropTypes.number.isRequired,
    musicNameSecond: PropTypes.string.isRequired,
    musicStatusSecond: PropTypes.string.isRequired,
    noiseMute: PropTypes.bool.isRequired,
    noiseName: PropTypes.string.isRequired,
    noiseStatus: PropTypes.string.isRequired,
    noiseVolume: PropTypes.number.isRequired,
};

export default SoundPlayer;
