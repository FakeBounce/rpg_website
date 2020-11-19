import React from 'react';
import { useSelector } from 'react-redux';
import { Icon } from 'semantic-ui-react';
import { cursorPointer } from './StyleConstants';
import useApp from '../../hooks/useApp';

const HeaderGlobal = () => {
  const { isAuth, globalMute } = useSelector(store => ({
    isAuth: store.appState.isAuth,
    globalMute: store.sounds.globalMute,
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
          name={!globalMute ? 'volume up' : 'volume off'}
          inverted
          color={'black'}
        />
      </>
    );
  }

  return null;
};

export default HeaderGlobal;
