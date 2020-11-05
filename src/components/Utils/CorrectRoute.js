import React from 'react';
import { useSelector } from 'react-redux';

import IsNotAuth from '../Authentication/IsNotAuth';
import HasNoNickname from '../NicknameSelection/HasNoNickname';
import CharacterSelection from '../CharacterSelection/CharacterSelection';
import StoriesPanel from '../StoryPanel';
import GameScreen from '../../containers/GameScreen';

const CorrectRoute = () => {
  const {
    characterId,
    currentStory,
    isAuth,
    pseudo,
    isGameMaster,
    oldCharacterId,
  } = useSelector(store => ({
    currentStory: store.appState.currentStory,
    characterId: store.userInfos.characterId,
    characterCreation: store.userInfos.characterCreation,
    isAuth: store.appState.isAuth,
    pseudo: store.userInfos.pseudo,
    isGameMaster: store.appState.isGameMaster,
    oldCharacterId: store.userInfos.oldCharacterId,
  }));
  if (isAuth) {
    if (pseudo.trim() === '') {
      return <HasNoNickname />;
    } else {
      if (currentStory === '') {
        return <StoriesPanel />;
      } else {
        if (
          (!isGameMaster && characterId === '') ||
          (oldCharacterId !== '' && characterId === '')
        ) {
          return <CharacterSelection />;
        } else {
          return <GameScreen />;
        }
      }
    }
  }
  return <IsNotAuth />;
};

export default CorrectRoute;
