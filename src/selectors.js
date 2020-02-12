// import { createSelector } from 'reselect'

export const currentStorySelector = state => state.appState.currentStory;
export const currentUidSelector = state => state.userInfos.uid;
export const currentMusicName = state =>
  state.sounds.isMusicFirst
    ? state.sounds.musicNameFirst
    : state.sounds.musicNameSecond;
