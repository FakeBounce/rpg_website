import React from "react";
import Sound from "react-sound";
import { useSelector } from "react-redux";
import useSounds from "../../hooks/useSounds";

const SoundPlayer = () => {
  const { resetNoise, resetSongs } = useSounds();

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
  } = useSelector(store => ({
    music: store.sounds.music,
    song: store.sounds.song,
    noise: store.sounds.noise,
  }));

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
          onFinishedPlaying={() => {
            resetNoise();
          }}
          autoLoad
        />
      )}
      {songName !== "" && (
        <Sound
          url={`./songs/${songName}.mp3`}
          playStatus={songStatus}
          volume={musicMute ? 0 : songVolume / 2}
          onFinishedPlaying={() => {
            resetSongs();
          }}
          autoLoad
        />
      )}
    </div>
  );
};

export default SoundPlayer;
