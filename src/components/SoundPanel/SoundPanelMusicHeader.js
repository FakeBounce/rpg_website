import React from "react";
import { useSelector } from "react-redux";

import { cursorPointer } from "../Utils/StyleConstants";
import { currentMusicNameSelector } from "../../selectors";
import useSounds from "../../hooks/useSounds";
import { Button } from "semantic-ui-react";

const styledBoxHeaderMusic = {
  height: "20px",
  textAlign: "center",
};

const styledMusicVolume = {
  width: "50%",
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

const styledResetSoundButton = {
  cursor: cursorPointer,
};

const SoundPanelMusicHeader = () => {
  const { onChangeMusics, resetSounds } = useSounds();

  const {
    currentMusicName,
    isMusicFirst,
    musicVolumeFirst,
    musicVolumeSecond,
  } = useSelector(store => ({
    currentMusicName: currentMusicNameSelector(store),
    musicVolumeFirst: store.sounds.music.musicVolumeFirst,
    musicVolumeSecond: store.sounds.music.musicVolumeSecond,
    isMusicFirst: store.sounds.music.isMusicFirst,
  }));

  return (
    <div style={styledMusicControlsContainer}>
      <Button primary onClick={resetSounds} style={styledResetSoundButton}>
        Reset
      </Button>
      <div style={styledBoxHeaderMusic}>
        Modifier la musique ({currentMusicName || "None"})
      </div>
      <div style={styledMusicVolume}>
        <input
          type="range"
          onChange={e =>
            onChangeMusics(e.target.name, parseInt(e.target.value, 10))
          }
          min="0"
          max="100"
          name={isMusicFirst ? "musicVolumeFirst" : "musicVolumeSecond"}
          value={isMusicFirst ? musicVolumeFirst : musicVolumeSecond}
        />
      </div>
    </div>
  );
};

export default SoundPanelMusicHeader;
