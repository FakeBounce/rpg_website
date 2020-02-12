import {
  TOGGLE_MUSIC,
  RESET_SOUNDS,
  TOGGLE_MUSIC_FIRST,
  STOP_NOISE,
  STOP_SONG,
  UPDATE_ALL_MUSIC,
  LOAD_SONG,
  LOAD_MUSIC,
  LOAD_NOISE,
} from "../actionsTypes/actionsTypesSounds";

const initialState = {
  musicMute: false,
  musicNameFirst: "",
  musicNameSecond: "",
  musicStatusFirst: "STOPPED",
  musicStatusSecond: "STOPPED",
  musicVolume: 50,
  musicVolumeFirst: 50,
  musicVolumeSecond: 0,
  noiseMute: false,
  noiseName: "",
  noiseStatus: "STOPPED",
  noiseVolume: 50,
  songName: "",
  songStatus: "STOPPED",
  songVolume: 50,
  isMusicFirst: true,
};

const sounds = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MUSIC: {
      return {
        ...state,
        musicMute: !state.musicMute,
        noiseMute: !state.noiseMute,
      };
    }
    case RESET_SOUNDS: {
      return {
        ...initialState,
      };
    }
    case TOGGLE_MUSIC_FIRST: {
      return {
        ...state,
        isMusicFirst: action.payload,
      };
    }
    case STOP_NOISE: {
      return {
        ...state,
        noiseStatus: "STOPPED",
        noiseName: "",
      };
    }
    case STOP_SONG: {
      return {
        ...state,
        songStatus: "STOPPED",
        songName: "",
      };
    }
    case UPDATE_ALL_MUSIC: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case LOAD_SONG: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case LOAD_MUSIC: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case LOAD_NOISE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};

export default sounds;
