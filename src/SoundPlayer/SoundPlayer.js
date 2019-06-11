import React, { PureComponent } from "react";
import Sound from "react-sound";
import PropTypes from "prop-types";

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
      stopNoise,
      stopSong,
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
            onFinishedPlaying={stopNoise}
            autoLoad
          />
        )}
        {songName !== "" && (
          <Sound
            url={`./songs/${songName}.mp3`}
            playStatus={songStatus}
            volume={musicMute ? 0 : songVolume/2}
            onFinishedPlaying={stopSong}
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
  stopNoise: PropTypes.func.isRequired,
  songName: PropTypes.string.isRequired,
  songStatus: PropTypes.string.isRequired,
  songVolume: PropTypes.number.isRequired,
  stopSong: PropTypes.func.isRequired,
};

export default SoundPlayer;
