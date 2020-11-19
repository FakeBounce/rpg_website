import {
  CALL_LOAD_MUSIC,
  CALL_LOAD_NOISE,
  CALL_LOAD_SONG,
  CALL_RESET_SOUNDS,
  CALL_STOP_NOISE,
  CALL_STOP_SONG,
  CALL_TOGGLE_NOISE_LOOPING,
} from '../redux/actionsTypes/actionsTypesSounds';
import { useDispatch, useSelector } from 'react-redux';
import firebase from 'firebase';
import { CALL_PRINT_ERROR } from '../redux/actionsTypes/actionsTypesAppState';
import debounce from 'lodash/debounce';

const useSounds = () => {
  const dispatch = useDispatch();

  const {
    currentStory,
    music: {
      // musicNameFirst,
      // musicNameSecond,
      musicVolume,
      isMusicFirst,
      isMusicTransition,
    },
    music,
    song,
    noise,
  } = useSelector(store => ({
    currentStory: store.appState.currentStory,
    music: store.sounds.music,
    song: store.sounds.song,
    noise: store.sounds.noise,
  }));

  const onChangeMusics = (name, value) => {
    const obj = {};
    obj[name] = value;
    if (name === 'musicName') {
      if (!isMusicTransition) {
        if (isMusicFirst) {
          firebase
            .database()
            .ref('/stories/' + currentStory + '/music')
            .set({
              ...music,
              musicVolume: musicVolume,
              musicVolumeFirst: musicVolume,
              musicVolumeSecond: musicVolume,
              isMusicTransition: false,
              musicStatusFirst: 'STOPPED',
              musicStatusSecond: 'PLAYING',
              musicNameSecond: value,
              isMusicFirst: false,
            })
            .catch(error => {
              dispatch({ type: CALL_PRINT_ERROR, payload: error });
            });
          // for (let i = 1; i < 21; i++) {
          // setTimeout(() => {
          // firebase
          //   .database()
          //   .ref('/stories/' + currentStory + '/music')
          //   .set({
          //     ...music,
          //     musicVolumeFirst: musicVolume * ((100 - i * 5) / 100),
          //     musicVolumeSecond: musicVolume * ((i * 5) / 100),
          //     isMusicTransition: i !== 20,
          //     musicStatusFirst:
          //       i !== 20 && musicNameFirst !== '' ? 'PLAYING' : 'STOPPED',
          //     musicStatusSecond: 'PLAYING',
          //     musicNameSecond: value,
          //     isMusicFirst: false,
          //   })
          //   .catch(error => {
          //     dispatch({ type: CALL_PRINT_ERROR, payload: error });
          //   });
          // }, i * 300);
          // }
        } else {
          firebase
            .database()
            .ref('/stories/' + currentStory + '/music')
            .set({
              ...music,
              musicVolume: musicVolume,
              musicVolumeFirst: musicVolume,
              musicVolumeSecond: musicVolume,
              isMusicTransition: false,
              musicStatusSecond: 'STOPPED',
              musicStatusFirst: 'PLAYING',
              musicNameFirst: value,
              isMusicFirst: true,
            })
            .catch(error => {
              dispatch({ type: CALL_PRINT_ERROR, payload: error });
            });
          // for (let i = 1; i < 21; i++) {
          //   setTimeout(() => {
          //     firebase
          //       .database()
          //       .ref('/stories/' + currentStory + '/music')
          //       .set({
          //         ...music,
          //         musicVolumeSecond: (musicVolume * (100 - i * 5)) / 100,
          //         musicVolumeFirst: musicVolume * ((i * 5) / 100),
          //         isMusicTransition: i !== 20,
          //         musicStatusSecond:
          //           i !== 20 && musicNameSecond !== '' ? 'PLAYING' : 'STOPPED',
          //         musicStatusFirst: 'PLAYING',
          //         musicNameFirst: value,
          //         isMusicFirst: true,
          //       })
          //       .catch(error => {
          //         dispatch({ type: CALL_PRINT_ERROR, payload: error });
          //       });
          //   }, i * 300);
          // }
        }
      }
    } else {
      if (
        name === 'songName' ||
        name === 'songStatus' ||
        name === 'songVolume'
      ) {
        debouncedSavingSound({ ...song, ...obj });
      } else if (
        name === 'noiseName' ||
        name === 'noiseStatus' ||
        name === 'noiseVolume'
      ) {
        debouncedSavingNoise({ ...noise, ...obj });
      } else {
        debouncedSavingMusic({ ...music, ...obj });
      }
    }
  };

  const debouncedSavingSound = debounce(
    params => dispatch({ type: CALL_LOAD_SONG, payload: params }),
    300,
    {
      leading: true,
      maxWait: 2000,
    },
  );

  const debouncedSavingMusic = debounce(
    params => dispatch({ type: CALL_LOAD_MUSIC, payload: params }),

    300,
    {
      leading: true,
      maxWait: 2000,
    },
  );

  const debouncedSavingNoise = debounce(
    params => dispatch({ type: CALL_LOAD_NOISE, payload: params }),
    300,
    {
      leading: true,
      maxWait: 2000,
    },
  );

  const changeCurrentNoise = n => {
    dispatch({
      type: CALL_LOAD_NOISE,
      payload: {
        ...noise,
        noiseStatus: 'PLAYING',
        noiseName: n,
      },
    });
  };

  const changeCurrentMusic = m => {
    onChangeMusics('musicName', m);
  };

  const updateVolume = v => {
    firebase
      .database()
      .ref('/stories/' + currentStory + '/music')
      .set({
        ...music,
        musicVolume: v,
        musicVolumeFirst: v,
        musicVolumeSecond: v,
      })
      .catch(error => {
        dispatch({ type: CALL_PRINT_ERROR, payload: error });
      });
  };

  const changeCurrentSong = m => {
    dispatch({
      type: CALL_LOAD_SONG,
      payload: {
        ...song,
        songStatus: 'PLAYING',
        songName: m,
      },
    });
  };

  const resetSounds = () => {
    dispatch({ type: CALL_RESET_SOUNDS });
  };

  const resetSongs = () => {
    dispatch({ type: CALL_STOP_SONG });
  };

  const resetNoise = () => {
    dispatch({ type: CALL_STOP_NOISE });
  };

  const toggleNoiseLooping = () => {
    dispatch({ type: CALL_TOGGLE_NOISE_LOOPING });
  };

  return {
    onChangeMusics,
    updateVolume,
    changeCurrentNoise,
    changeCurrentMusic,
    changeCurrentSong,
    resetSounds,
    resetSongs,
    resetNoise,
    toggleNoiseLooping,
  };
};

export default useSounds;
