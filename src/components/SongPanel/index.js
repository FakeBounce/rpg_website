import React, { PureComponent } from "react";
import { cursorPointer, heightLeft } from "../Utils/StyleConstants";
import { songs, colors } from "../Utils/Constants";

import PropTypes from "prop-types";
import ButtonLarge from "../Utils/ButtonLarge";
import { connect, useSelector } from "react-redux";
import useSounds from "../../hooks/useSounds";
import { currentMusicNameSelector } from "../../selectors";

const styles = {
  CharPanel: {
    borderBottom: "1px solid black",
    width: "100%",
    height: "50%",
    backgroundColor: colors.background,
    color: colors.text,
  },
  CharacterBox: { position: "relative", height: "100%" },
};

const styledBoxHeaderMusic = {
  width: "100%",
  height: 20,
  marginBottom: 5,
  textAlign: "center",
  position: "absolute",
  display: "block",
};

const styledMusicVolume = {
  width: "100%",
  position: "absolute",
  height: 25,
  top: 20,
};
const styledMusicContainer = {
  width: "100%",
  position: "absolute",
  height: `${(heightLeft - 50) / 2 - 100}px`,
  top: 80,
  overflowY: "auto",
};

const styledAudioFile = {
  width: "100%",
  height: 30,
  cursor: cursorPointer,
  borderBottom: "1px solid black",
};

const SongPanel = ({ props }) => {
  const { onChangeMusics, changeCurrentSong, resetSongs } = useSounds();

  const {
    song: { songName, songVolume },
  } = useSelector(store => ({
    song: store.sounds.song,
  }));

  const { toggleIsOnChar } = props;

  return (
    <div style={styles.CharPanel}>
      <div style={styles.CharacterBox}>
        <button
          onClick={resetSongs}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            cursor: cursorPointer,
            zIndex: 2,
          }}
        >
          Reset
        </button>
        <div style={styledBoxHeaderMusic}>Modifier la musique ({songName})</div>
        <div style={styledMusicVolume}>
          Volume :
          <input
            type="range"
            onChange={e =>
              onChangeMusics(e.target.name, parseInt(e.target.value, 10))
            }
            min="0"
            max="100"
            name="songVolume"
            value={songVolume}
          />
        </div>
        <div style={styledMusicContainer} className="scrollbar">
          {songs.map((m, i) => {
            return (
              <div
                key={`song-${m}`}
                style={styledAudioFile}
                onClick={() => changeCurrentSong(m)}
              >
                {m}
              </div>
            );
          })}
        </div>
        <ButtonLarge
          onClick={toggleIsOnChar}
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 124,
          }}
        >
          Play music
        </ButtonLarge>
      </div>
    </div>
  );
};

SongPanel.propTypes = {
  toggleIsOnChar: PropTypes.func.isRequired,
};

export default SongPanel;
