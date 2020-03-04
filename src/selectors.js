// import { createSelector } from 'reselect'

export const itemListSelector = state => state.items.items;
export const currentStoryUsers = state => state.appState.users;
export const noiseSelector = state => state.sounds.noise;
export const songSelector = state => state.sounds.song;
export const currentStorySelector = state => state.appState.currentStory;
export const storiesSelector = state => state.appState.stories;
export const isGameMasterSelector = state =>
  state.userInfos.uid === state.appState.gameMaster;
export const currentUidSelector = state => state.userInfos.uid;
export const currentMusicNameSelector = state =>
  state.sounds.music.isMusicFirst
    ? state.sounds.music.musicNameFirst
    : state.sounds.music.musicNameSecond;
