// import { createSelector } from 'reselect'

export const currentStorySelector = state => state.appState.currentStory;
export const currentMusicName = state =>
  state.sounds.isMusicFirst
    ? state.sounds.musicNameFirst
    : state.sounds.musicNameSecond;
