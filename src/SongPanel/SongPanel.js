import React, { PureComponent } from "react";
import {
  cursorPointer,
  heightLeft,
  widthRightPanel,
} from "../Utils/StyleConstants";
import { songs, colors } from "../Utils/Constants";

import PropTypes from "prop-types";
import ButtonLarge from "../Utils/ButtonLarge";

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
  height: "20px",
  marginBottom: "5px",
  textAlign: "center",
  position: "absolute",
  display: "block",
};

const styledMusicVolume = {
  width: "100%",
  position: "absolute",
  height: "25px",
  top: "20px",
};
const styledMusicContainer = {
  width: "100%",
  position: "absolute",
  height: `${(heightLeft-50)/2 - 100}px`,
  top: "80px",
  overflowY: "auto",
};

const styledAudioFile = {
  width: "100%",
  height: "30px",
  cursor: cursorPointer,
  borderBottom: "1px solid black",
};

class SongPanel extends PureComponent {
  changeCurrentSong = m => {
    const { onChangeSongs } = this.props;
    onChangeSongs("songName", m);
    onChangeSongs("songStatus", "PLAYING");
  };

  render() {
    const { onChangeSongs, resetSongs, songName, songVolume, toggleIsOnChar } = this.props;

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
          <div style={styledBoxHeaderMusic}>
            Modifier la musique ({songName})
          </div>
          <div style={styledMusicVolume}>
            Volume :
            <input
              type="range"
              onChange={e =>
                onChangeSongs(e.target.name, parseInt(e.target.value, 10))
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
                  onClick={() => this.changeCurrentSong(m)}
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
              right:0,
              width: 124,
            }}
          >
            Play music
          </ButtonLarge>
        </div>
      </div>
    );
  }
}

SongPanel.propTypes = {
  resetSongs: PropTypes.func.isRequired,
  songName: PropTypes.string.isRequired,
  songVolume: PropTypes.number.isRequired,
  toggleIsOnChar: PropTypes.func.isRequired,
  onChangeSongs: PropTypes.func.isRequired,
};

export default SongPanel;
