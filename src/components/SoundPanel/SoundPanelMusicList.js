import React from "react";
import { useSelector } from "react-redux";

import { cursorPointer } from "../Utils/StyleConstants";
import { musics } from "../Utils/Constants";
import { currentMusicNameSelector } from "../../selectors";
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

const SoundPanelMusicList = ({ activeMusicItem }) => {
  const { changeCurrentMusic } = useSounds();

  const { currentMusicName } = useSelector(store => ({
    currentMusicName: currentMusicNameSelector(store),
  }));

  return (
    <div style={styledMusicListContainer}>
      <div style={styledMusicContainer}>
        {musics[activeMusicItem].map((m, i) => {
          if (i < musics[activeMusicItem].length / 2) {
            return (
              <div
                key={`music-${m}`}
                style={
                  currentMusicName === m
                    ? styledAudioFileSelected
                    : styledAudioFile
                }
                onClick={() => changeCurrentMusic(m)}
              >
                {currentMusicName === m ? `${m} (Playing)` : m}
              </div>
            );
          }
          return null;
        })}
      </div>
      <div style={styledMusicContainer}>
        {musics[activeMusicItem].map((m, i) => {
          if (i >= musics[activeMusicItem].length / 2) {
            return (
              <div
                key={`music-${m}`}
                style={
                  currentMusicName === m
                    ? styledAudioFileSelected
                    : styledAudioFile
                }
                onClick={() => changeCurrentMusic(m)}
              >
                {currentMusicName === m ? `${m} (Playing)` : m}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default SoundPanelMusicList;
