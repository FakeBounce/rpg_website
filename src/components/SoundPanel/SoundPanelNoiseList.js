import React from "react";
import { useSelector } from "react-redux";

import { cursorPointer } from "../Utils/StyleConstants";
import { noises } from "../Utils/Constants";
import useSounds from "../../hooks/useSounds";

const styledMusicListContainer = {
  width: "100%",
  overflowY: "auto",
  display: "flex",
  flexDirection: "row",
};

const styledMusicContainer = {
  width: "50%",
  overflowY: "auto",
};

const styledAudioFile = {
  width: "100%",
  height: "30px",
  cursor: cursorPointer,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderBottom: "1px solid white",
  borderLeft: "1px solid white",
};

const styledAudioFileSelected = {
  width: "100%",
  height: "30px",
  cursor: cursorPointer,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#547494",
  borderBottom: "1px solid white",
  borderLeft: "1px solid white",
};

const SoundPanelNoiseList = ({ activeNoiseItem }) => {
  const { changeCurrentNoise } = useSounds();
  const {
    noise: { noiseName },
  } = useSelector(store => ({
    noise: store.sounds.noise,
  }));

  return (
    <div style={styledMusicListContainer}>
      <div style={styledMusicContainer}>
        {noises[activeNoiseItem].map((m, i) => {
          if (i < noises[activeNoiseItem].length / 2) {
            return (
              <div
                key={`noise-${m}`}
                style={
                  noiseName === m ? styledAudioFileSelected : styledAudioFile
                }
                onClick={() => changeCurrentNoise(m)}
              >
                {noiseName === m ? `${m} (Playing)` : m}
              </div>
            );
          }
          return null;
        })}
      </div>
      <div style={styledMusicContainer}>
        {noises[activeNoiseItem].map((m, i) => {
          if (i >= noises[activeNoiseItem].length / 2) {
            return (
              <div
                key={`noise-${m}`}
                style={
                  noiseName === m ? styledAudioFileSelected : styledAudioFile
                }
                onClick={() => changeCurrentNoise(m)}
              >
                {noiseName === m ? `${m} (Playing)` : m}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default SoundPanelNoiseList;
