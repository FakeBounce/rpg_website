import * as actionTypesSounds from "../actionsTypes/actionsTypesSounds";

export const toggleMusic = () => {
  return {
    type: actionTypesSounds.TOGGLE_MUSIC,
  };
};

// Saga will call reset sounds, which will dispatch RESET_SOUNDS for each user
export const resetSounds = () => {
  return {
    type: actionTypesSounds.RESET_SOUNDS,
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
