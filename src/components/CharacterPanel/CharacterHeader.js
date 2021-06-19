import React from 'react';
import { useSelector } from 'react-redux';
import HealthBar from '../Utils/HealthBar';
import CharacterHeaderInfos from './CharacterHeaderInfos';
import {
  widthRightPanel,
  imageSize,
  widthRightPanelLeft,
  cursorPointer,
} from '../Utils/StyleConstants';
import firebase from 'firebase';
import FileUploader from '../CharacterCreation/FileUploader';
import MentalBar from '../Utils/MentalBar';
import useApp from '../../hooks/useApp';

const styledCharacterHeader = {
  width: `${widthRightPanel}px`,
  height: `${imageSize}px`,
  position: 'relative',
  float: 'left',
  display: 'inline-block',
};
const styledCharacterHeaderName = {
  position: 'relative',
  width: `${widthRightPanelLeft}px`,
  height: 25,
  float: 'left',
  display: 'inline-block',
};
const styledCharacterHeaderIcon = {
  position: 'relative',
  width: `${imageSize}px`,
  height: `${imageSize}px`,
  float: 'left',
  display: 'inline-block',
};

const styledCharacterHeaderIconContainer = {
  position: 'relative',
  width: `${imageSize}px`,
  height: `${imageSize}px`,
  float: 'left',
  display: 'inline-block',
};

const styledCharacterHeaderInactiveIcon = {
  position: 'absolute',
  width: `${imageSize}px`,
  height: `${imageSize}px`,
  backgroundColor: 'grey',
  opacity: 0.3,
};

const CharacterHeader = () => {
  const {
    icon,
    iconPath,
    name,
    health,
    maxHealth,
    mentalState,
    maxMentalState,
    status,
    isGameMaster,
    uid,
    currentStory,
    characterId,
  } = useSelector(store => ({
    icon: store.character.icon,
    iconPath: store.character.iconPath,
    name: store.character.name,
    health: store.character.health,
    maxHealth: store.character.maxHealth,
    mentalState: store.character.mentalState,
    maxMentalState: store.character.maxMentalState,
    status: store.character.status,
    uid: store.userInfos.uid,
    currentStory: store.appState.currentStory,
    isGameMaster: store.appState.isGameMaster,
    characterId: store.userInfos.characterId,
  }));
  const { triggerError } = useApp();

  const onDrop = picture => {
    if (picture.length > 0) {
      const extension =
        picture[picture.length - 1].name.split('.')[1] || '.png';
      const path = `images/${uid}/character_${characterId}.${extension}`;

      firebase
        .storage()
        .ref()
        .child(iconPath)
        .delete()
        .then(() => {
          // File deleted successfully
          firebase
            .storage()
            .ref()
            .child(path)
            .put(picture[picture.length - 1])
            .then(() => {
              firebase
                .storage()
                .ref()
                .child(path)
                .getDownloadURL()
                .then(url => {
                  let updates = {};
                  updates[uid + '/character/iconPath'] = path;
                  updates[uid + '/character/icon'] = url;

                  firebase
                    .database()
                    .ref('stories/' + currentStory + '/characters/')
                    .update(updates)
                    .catch(error => {
                      // Handle Errors here.
                      triggerError(error);
                    });
                })
                .catch(error => {
                  // Handle any errors
                  triggerError(error);
                });
            });
        })
        .catch(error => {
          // Uh-oh, an error occurred!
          triggerError(error);
        });
    }
  };

  return (
    <div style={styledCharacterHeader}>
      <div style={styledCharacterHeaderIconContainer}>
        {status === 'Inactive' && (
          <div style={styledCharacterHeaderInactiveIcon} />
        )}
        <img src={icon} alt={name} style={styledCharacterHeaderIcon} />
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: (imageSize - 20) / 2,
        }}
      >
        <FileUploader
          onDrop={onDrop}
          buttonText='+'
          fileContainerStyle={{ padding: 0, margin: 0, display: 'block' }}
          buttonStyles={{
            width: 20,
            padding: 0,
            margin: 0,
            border: '2px solid #3f4257',
            cursor: cursorPointer,
          }}
          withIcon={false}
          label=''
        />
      </div>
      <div style={styledCharacterHeaderName}>{name}</div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: `${widthRightPanelLeft}px`,
          flexDirection: 'column',
        }}
      >
        <HealthBar
          width={`${Math.floor((health / maxHealth) * 100)}%`}
          maxWidth={`${widthRightPanelLeft}px`}
          health={health}
          maxHealth={maxHealth}
        />
        {/* <MentalBar
          isGM={isGameMaster}
          width={`${Math.floor((mentalState / maxMentalState) * 100)}%`}
          maxWidth={`${maxMentalState * 14}px`}
          mentalState={mentalState}
          maxMentalState={maxMentalState}
        /> */}
      </div>
      <CharacterHeaderInfos />
    </div>
  );
};

export default CharacterHeader;
