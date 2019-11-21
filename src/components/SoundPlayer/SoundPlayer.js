import React, { PureComponent } from "react";
import Sound from "react-sound";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { stopNoise, stopSong } from "../../redux/actions/actionsSounds";

class SoundPlayer extends PureComponent {
  render() {
    const {
      musicMute,
      noiseName,
      noiseStatus,
      noiseMute,
      noiseVolume,
      songName,
      songStatus,
      songVolume,
      musicVolumeFirst,
      musicStatusFirst,
      musicNameFirst,
      musicVolumeSecond,
      musicNameSecond,
      musicStatusSecond,
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
  musicMute: store.sounds.musicMute,
  musicVolumeFirst: store.sounds.musicVolumeFirst,
  musicStatusFirst: store.sounds.musicStatusFirst,
  musicNameFirst: store.sounds.musicNameFirst,
  musicVolumeSecond: store.sounds.musicVolumeSecond,
  musicNameSecond: store.sounds.musicNameSecond,
  musicStatusSecond: store.sounds.musicStatusSecond,
  noiseMute: store.sounds.noiseMute,
  noiseName: store.sounds.noiseName,
  noiseStatus: store.sounds.noiseStatus,
  noiseVolume: store.sounds.noiseVolume,
  songName: store.sounds.songName,
  songStatus: store.sounds.songStatus,
  songVolume: store.sounds.songVolume,
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
  songName: PropTypes.string.isRequired,
  songStatus: PropTypes.string.isRequired,
  songVolume: PropTypes.number.isRequired,
  dispatchStopNoise: PropTypes.func.isRequired,
  dispatchStopSong: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundPlayer);
