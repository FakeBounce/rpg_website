import * as actionTypesSounds from "../actionsTypes/actionsTypesSounds";

export const toggleMusic = () => {
  return {
    type: actionTypesSounds.TOGGLE_MUSIC,
  };
};

export const updateAllMusic = payload => {
  return {
    type: actionTypesSounds.UPDATE_ALL_MUSIC,
    payload,
  };
};

export const loadSong = payload => {
  return {
    type: actionTypesSounds.LOAD_SONG,
    payload,
  };
};

export const loadMusic = payload => {
  return {
    type: actionTypesSounds.LOAD_MUSIC,
    payload,
  };
};

// Saga will call reset sounds, which will dispatch RESET_SOUNDS for each user
export const resetSounds = () => {
  return {
    type: actionTypesSounds.RESET_SOUNDS,
  };
};

export const loadNoise = payload => {
  return {
    type: actionTypesSounds.LOAD_NOISE,
    payload,
  };
};

export const stopNoise = () => {
  return {
    type: actionTypesSounds.STOP_NOISE,
  };
};

export const stopSong = () => {
  return {
    type: actionTypesSounds.STOP_SONG,
  };
};

export const toggleMusicFirst = payload => {
  return {
    type: actionTypesSounds.TOGGLE_MUSIC_FIRST,
    payload,
  };
};
