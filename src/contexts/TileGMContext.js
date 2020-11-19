import React, { useState, useContext } from 'react';
import firebase from 'firebase';
import { useStore } from 'react-redux';
import useApp from '../hooks/useApp';

const TileGMContext = React.createContext(undefined);

export const useTileGMContext = () => useContext(TileGMContext);

function TileGMProvider(props) {
  const store = useStore();
  const { triggerError } = useApp();

  const setTexture = (x, y) => {
    const storeValues = store.getState();

    const currentStory = storeValues.appState.currentStory;
    const stories = storeValues.appState.stories;
    const currentScale = storeValues.mapInfos.currentScale;
    const textureToApply = storeValues.mapInfos.textureToApply;

    let updates = {};
    let path = '';
    Object.keys(textureToApply).map(key => {
      path = key;
      return null;
    });
    updates['/' + parseInt(x, 10) + '/' + parseInt(y, 10) + '/' + path] =
      textureToApply[path];
    for (let i = 0; i <= currentScale - 1; i++) {
      if (i === 0) {
        for (let j = 0; j <= currentScale - 1; j++) {
          if (y - j >= 0) {
            updates['/' + x + '/' + parseInt(y - j, 10) + '/' + path] =
              textureToApply[path];
          }
          if (y + j <= 39) {
            updates['/' + x + '/' + parseInt(y + j, 10) + '/' + path] =
              textureToApply[path];
          }
        }
      } else {
        for (let j = 0; j <= currentScale - 1; j++) {
          if (x - i >= 0 && y - j >= 0) {
            updates[
              '/' + parseInt(x - i, 10) + '/' + parseInt(y - j, 10) + '/' + path
            ] = textureToApply[path];
          }
          if (x - i >= 0 && y + j <= 39) {
            updates[
              '/' + parseInt(x - i, 10) + '/' + parseInt(y + j, 10) + '/' + path
            ] = textureToApply[path];
          }
        }
        for (let j = 0; j <= currentScale - 1; j++) {
          if (x + i <= 39 && y - j >= 0) {
            updates[
              '/' + parseInt(x + i, 10) + '/' + parseInt(y - j, 10) + '/' + path
            ] = textureToApply[path];
          }
          if (x + i <= 39 && y + j <= 39) {
            updates[
              '/' + parseInt(x + i, 10) + '/' + parseInt(y + j, 10) + '/' + path
            ] = textureToApply[path];
          }
        }
      }
    }
    firebase
      .database()
      .ref('maps/' + stories[currentStory].map)
      .update(updates)
      .catch(error => {
        // Handle Errors here.
        triggerError(error);
      });
  };

  return (
    <TileGMContext.Provider value={{ setTexture }}>
      {props.children}
    </TileGMContext.Provider>
  );
}

export { TileGMContext, TileGMProvider };
