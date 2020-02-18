import {
  TOGGLE_MUSIC,
  RESET_SOUNDS,
  TOGGLE_MUSIC_FIRST,
  STOP_NOISE,
  STOP_SONG,
  // UPDATE_ALL_MUSIC,
  LOAD_SONG,
  LOAD_MUSIC,
  LOAD_NOISE,
} from "../actionsTypes/actionsTypesSounds";
import { RESET_APP } from "../actionsTypes/actionsTypesAppState";

const initialState = {
  music: {
    musicMute: false,
    musicNameFirst: "",
    musicNameSecond: "",
    musicStatusFirst: "STOPPED",
    musicStatusSecond: "STOPPED",
    musicVolume: 50,
    musicVolumeFirst: 50,
    musicVolumeSecond: 0,
    isMusicFirst: true,
    isMusicTransition: false,
  },
  noise: {
    noiseMute: false,
    noiseName: "",
    noiseStatus: "STOPPED",
    noiseVolume: 50,
  },
  song: {
    songName: "",
    songStatus: "STOPPED",
    songVolume: 50,
  },
};

const sounds = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MUSIC: {
      return {
        ...state,
        music: { ...state.music, musicMute: !state.musicMute },
        noise: { ...state.noise, noiseMute: !state.noiseMute },
      };
    }
    case TOGGLE_MUSIC_FIRST: {
      return {
        ...state,
        music: { ...state.music, isMusicFirst: action.payload },
      };
    }
    case STOP_NOISE: {
      return {
        ...state,
        noise: { ...state.noise, noiseStatus: "STOPPED", noiseName: "" },
      };
    }
    case STOP_SONG: {
      return {
        ...state,
        song: { ...state.song, songStatus: "STOPPED", songName: "" },
      };
    }
    // case UPDATE_ALL_MUSIC: {
    //   return {
    //     ...state,
    //     ...action.payload,
    //   };
    // }
    case LOAD_SONG: {
      return {
        ...state,
        song: { ...state.song, ...action.payload },
      };
    }
    case LOAD_MUSIC: {
      return {
        ...state,
        music: { ...state.music, ...action.payload },
      };
    }
    case LOAD_NOISE: {
      return {
        ...state,
        noise: { ...state.noise, ...action.payload },
      };
    }
    case RESET_SOUNDS:
    case RESET_APP: {
      return initialState;
    }
    default:
      return state;
  }
};

export default sounds;
