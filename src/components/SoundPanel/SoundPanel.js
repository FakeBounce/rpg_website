import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  cursorPointer,
  heightLeft,
  widthRightPanel,
} from "../Utils/StyleConstants";
import { musics, noises } from "../Utils/Constants";
import { CALL_RESET_SOUNDS } from "../../redux/actionsTypes/actionsTypesSounds";
import { currentMusicName } from "../../selectors";

const styledBoxHeaderMusic = {
  width: "100%",
  height: "20px",
  marginBottom: "5px",
  textAlign: "center",
  position: "absolute",
  display: "block",
};

const styledBoxHeaderNoise = {
  width: "100%",
  height: "20px",
  marginBottom: "5px",
  textAlign: "center",
  position: "absolute",
  display: "block",
  top: `${(heightLeft - 1 - 45 * 2) / 2 + 45}px`,
};

const styledMapSide = {
  width: `${widthRightPanel}px`,
  height: `${heightLeft}px`,
  display: "inline-block",
  float: "left",
  textAlign: "left",
  position: "relative",
};

const styledMusicVolume = {
  width: "100%",
  position: "absolute",
  height: "25px",
  top: "20px",
};

const styledNoiseVolume = {
  width: "100%",
  position: "absolute",
  height: "25px",
  top: `${(heightLeft - 1 - 45 * 2) / 2 + 45 + 20}px`,
};

const styledMusicContainer = {
  width: "50%",
  position: "absolute",
  height: `${(heightLeft - 1 - 45 * 2) / 2}px`,
  top: "45px",
  overflowY: "auto",
};

const styledMusicContainer2 = {
  width: "50%",
  position: "absolute",
  height: `${(heightLeft - 1 - 45 * 2) / 2}px`,
  left: "50%",
  top: "45px",
  overflowY: "auto",
};

const styledNoiseContainer = {
  width: "50%",
  position: "absolute",
  height: `${(heightLeft - 1 - 45 * 2) / 2}px`,
  top: `${(heightLeft - 1 - 45 * 2) / 2 + 45 + 45}px`,
  overflowY: "auto",
};

const styledNoiseContainer2 = {
  width: "50%",
  position: "absolute",
  height: `${(heightLeft - 1 - 45 * 2) / 2}px`,
  top: `${(heightLeft - 1 - 45 * 2) / 2 + 45 + 45}px`,
  left: "50%",
  overflowY: "auto",
};

const styledAudioFile = {
  width: "100%",
  height: "30px",
  cursor: cursorPointer,
  borderBottom: "1px solid black",
};

const styledResetSoundButton = {
  position: "absolute",
  left: 0,
  top: 0,
  cursor: cursorPointer,
  zIndex: 2,
};

class SoundPanel extends PureComponent {
  changeCurrentMusic = m => {
    const { onChangeMusics } = this.props;
    onChangeMusics("musicName", m);
  };

  changeCurrentNoise = n => {
    const { onChangeMusics } = this.props;
    onChangeMusics("noiseName", n);
    onChangeMusics("noiseStatus", "PLAYING");
  };

  render() {
    const {
      onChangeMusics,
      resetSounds,
      musicName,
      musicVolume,
      noiseName,
      noiseVolume,
    } = this.props;

    return (
      <div style={styledMapSide}>
        <button onClick={resetSounds} style={styledResetSoundButton}>
          Reset
        </button>
        <div style={styledBoxHeaderMusic}>
          Modifier la musique ({musicName})
        </div>
        <div style={styledMusicVolume}>
          Volume :
          <input
            type="range"
            onChange={e =>
              onChangeMusics(e.target.name, parseInt(e.target.value, 10))
            }
            min="0"
            max="100"
            name="musicVolume"
            value={musicVolume}
          />
        </div>
        <div style={styledMusicContainer}>
          {musics.map((m, i) => {
            if (i < musics.length / 2) {
              return (
                <div
                  key={`music-${m}`}
                  style={styledAudioFile}
                  onClick={() => this.changeCurrentMusic(m)}
                >
                  {m}
                </div>
              );
            }
            return null;
          })}
        </div>
        <div style={styledMusicContainer2}>
          {musics.map((m, i) => {
            if (i >= musics.length / 2) {
              return (
                <div
                  key={`music-${m}`}
                  style={styledAudioFile}
                  onClick={() => this.changeCurrentMusic(m)}
                >
                  {m}
                </div>
              );
            }
            return null;
          })}
        </div>
        <div style={styledBoxHeaderNoise}>
          Modifier les bruits ({noiseName})
        </div>
        <div style={styledNoiseVolume}>
          Volume :
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

        <div style={styledNoiseContainer}>
          {noises.map((n, i) => {
            if (i < noises.length / 2) {
              return (
                <div
                  key={`noise-${n}`}
                  style={styledAudioFile}
                  onClick={() => this.changeCurrentNoise(n)}
                >
                  {n}
                </div>
              );
            }
            return null;
          })}
        </div>

        <div style={styledNoiseContainer2}>
          {noises.map((n, i) => {
            if (i >= noises.length / 2) {
              return (
                <div
                  key={`noise-${n}`}
                  style={styledAudioFile}
                  onClick={() => this.changeCurrentNoise(n)}
                >
                  {n}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    resetSounds: () => {
      dispatch({ type: CALL_RESET_SOUNDS });
    },
  };
};

const mapStateToProps = store => ({
  musicName: currentMusicName(store),
  noiseName: store.sounds.noiseName,
  musicVolume: store.sounds.musicVolume,
  noiseVolume: store.sounds.noiseVolume,
});

SoundPanel.propTypes = {
  resetSounds: PropTypes.func.isRequired,
  onChangeMusics: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SoundPanel);
