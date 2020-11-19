import React from "react";
import { useSelector } from "react-redux";

import useSounds from "../../hooks/useSounds";

const styledBoxHeaderNoise = {
  width: "33%",
  height: "20px",
  textAlign: "center",
};

const styledNoiseVolume = {
  width: "33%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const styledMusicControlsContainer = {
  width: "100%",
  display: "flex",
  flexDirection: "row",
  marginTop: 10,
  marginBottom: 10,
};

const SoundPanelNoiseHeader = () => {
  const { onChangeMusics, toggleNoiseLooping } = useSounds();

  const {
    noise: { noiseName, noiseVolume, isLooping },
  } = useSelector(store => ({
    noise: store.sounds.noise,
  }));

  return (
    <div style={styledMusicControlsContainer}>
      <div style={styledBoxHeaderNoise}>
        Modifier les bruits ({noiseName || "None"})
      </div>
      <div style={styledNoiseVolume}>
        <input
          type="range"
          onChange={e =>
            onChangeMusics(e.target.name, parseInt(e.target.value, 10))
          }
          min="0"
          max="100"
          name="noiseVolume"
          value={noiseVolume}
        />
      </div>
      <div style={styledBoxHeaderNoise} onClick={toggleNoiseLooping}>
        ({isLooping ?"Looping" : "NLooping"})
      </div>
    </div>
  );
};

export default SoundPanelNoiseHeader;
