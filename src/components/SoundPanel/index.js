import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
  cursorPointer,
  heightLeft,
  widthRightPanel,
} from "../Utils/StyleConstants";
import { colors, musics, noises } from "../Utils/Constants";
import { currentMusicNameSelector } from "../../selectors";
import useSounds from "../../hooks/useSounds";
import { Menu, Button } from "semantic-ui-react";

const styledBoxHeaderMusic = {
  height: "20px",
  textAlign: "center",
};

const styledBoxHeaderNoise = {
  width: "50%",
  height: "20px",
  textAlign: "center",
};

const styledMapSide = {
  width: `${widthRightPanel}px`,
  height: `${heightLeft}px`,
  display: "flex",
  flexDirection: "column",
  position: "relative",
  justifyContent: "space-between",
};

const styledMusicVolume = {
  width: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const styledNoiseVolume = {
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

const styledResetSoundButton = {
  cursor: cursorPointer,
};

const SoundPanel = () => {
  const [activeMusicItem, setActiveMusicItem] = useState("boss");
  const [activeNoiseItem, setActiveNoiseItem] = useState("others");
  const {
    onChangeMusics,
    changeCurrentMusic,
    changeCurrentNoise,
    resetSounds,
  } = useSounds();

  const {
    currentMusicName,
    isMusicFirst,
    musicVolumeFirst,
    musicVolumeSecond,
    noise: { noiseName, noiseVolume },
  } = useSelector(store => ({
    currentMusicName: currentMusicNameSelector(store),
    musicVolumeFirst: store.sounds.music.musicVolumeFirst,
    musicVolumeSecond: store.sounds.music.musicVolumeSecond,
    isMusicFirst: store.sounds.music.isMusicFirst,
    noise: store.sounds.noise,
  }));

  return (
    <div style={styledMapSide}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
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
        <div>
          <Menu attached="top" tabular>
            {Object.keys(musics).map(mKey => {
              return (
                <Menu.Item
                  name={mKey}
                  active={activeMusicItem === mKey.toLowerCase()}
                  onClick={() => {
                    setActiveMusicItem(mKey);
                  }}
                  style={{
                    width: 75,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 0,
                    backgroundColor: colors.background,
                    color: "white",
                    cursor: cursorPointer,
                  }}
                />
              );
            })}
          </Menu>
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
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "40%",
        }}
      >
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
        </div>
        <div>
          <Menu attached="top" tabular>
            {Object.keys(noises).map(mKey => {
              return (
                <Menu.Item
                  name={mKey}
                  active={activeNoiseItem === mKey.toLowerCase()}
                  onClick={() => {
                    setActiveNoiseItem(mKey);
                  }}
                  style={{
                    width: 75,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: 0,
                    backgroundColor: colors.background,
                    color: "white",
                    cursor: cursorPointer,
                  }}
                />
              );
            })}
          </Menu>
          <div style={styledMusicListContainer}>
            <div style={styledMusicContainer}>
              {noises[activeNoiseItem].map((m, i) => {
                if (i < noises[activeNoiseItem].length / 2) {
                  return (
                    <div
                      key={`noise-${m}`}
                      style={
                        noiseName === m
                          ? styledAudioFileSelected
                          : styledAudioFile
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
                        noiseName === m
                          ? styledAudioFileSelected
                          : styledAudioFile
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
        </div>
      </div>
    </div>
  );
};

export default SoundPanel;
