import React, { PureComponent } from "react";
import Sound from "react-sound";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { stopNoise, stopSong } from "../../redux/actions/actionsSounds";

class SoundPlayer extends PureComponent {
  render() {
    const {
      noise: { noiseName, noiseStatus, noiseMute, noiseVolume },
      song: { songName, songStatus, songVolume },
      music: {
        musicMute,
        musicVolumeFirst,
        musicStatusFirst,
        musicNameFirst,
        musicVolumeSecond,
        musicNameSecond,
        musicStatusSecond,
      },
      dispatchStopNoise,
      dispatchStopSong,
    } = this.props;

    return (
      <div>
        {musicNameFirst !== "" && (
          <Sound
            url={`./music/${musicNameFirst}.mp3`}
            playStatus={musicStatusFirst}
            volume={musicMute ? 0 : musicVolumeFirst}
            autoLoad
            loop
          />
        )}
        {musicNameSecond !== "" && (
          <Sound
            url={`./music/${musicNameSecond}.mp3`}
            playStatus={musicStatusSecond}
            volume={musicMute ? 0 : musicVolumeSecond}
            autoLoad
            loop
          />
        )}
        {noiseName !== "" && (
          <Sound
            url={`./noise/${noiseName}.mp3`}
            playStatus={noiseStatus}
            volume={noiseMute ? 0 : noiseVolume}
            onFinishedPlaying={dispatchStopNoise}
            autoLoad
          />
        )}
        {songName !== "" && (
          <Sound
            url={`./songs/${songName}.mp3`}
            playStatus={songStatus}
            volume={musicMute ? 0 : songVolume / 2}
            onFinishedPlaying={dispatchStopSong}
            autoLoad
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  music: store.sounds.music,
  song: store.sounds.song,
  noise: store.sounds.noise,
});

const mapDispatchToProps = dispatch => {
  return {
    dispatchStopNoise: () => {
      dispatch(stopNoise());
    },
    dispatchStopSong: () => {
      dispatch(stopSong());
    },
  };
};

SoundPlayer.propTypes = {
  dispatchStopNoise: PropTypes.func.isRequired,
  dispatchStopSong: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundPlayer);
