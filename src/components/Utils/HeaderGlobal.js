import React from 'react';
import { useSelector } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { cursorPointer } from './StyleConstants';
import useApp from '../../hooks/useApp';

const HeaderGlobal = () => {
  const { isAuth, musicMute } = useSelector(store => ({
    isAuth: store.appState.isAuth,
    musicMute: store.sounds.music.musicMute,
  }));

  const { signOut, toggleMusic } = useApp();

  if (isAuth) {
    return (
      <>
        <Icon
          style={{
            position: 'absolute',
            top: 10,
            right: 20,
            cursor: cursorPointer,
          }}
          onClick={signOut}
          circular
          inverted
          name='shutdown'
          color='red'
        />
        <Icon
          style={{
            position: 'absolute',
            top: 45,
            right: 20,
            cursor: cursorPointer,
          }}
          onClick={toggleMusic}
          circular
          name={!musicMute ? 'volume up' : 'volume off'}
          inverted
          color={'black'}
        />
      </>
    );
  }

  return null;
};

export default HeaderGlobal;
