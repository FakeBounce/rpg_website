import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { Icon } from 'semantic-ui-react';
import { cursorPointer, heightHeader } from './StyleConstants';
import { hydrateAllMerchants, resetStoryMerchants } from './MerchantsFunctions';
import Camera from './Camera';
import { togglePlayerView } from '../../redux/actions/actionsAppState';
import { CALL_GET_ITEM_LIST } from '../../redux/actionsTypes/actionsTypesItems';
import useCharacter from '../../hooks/useCharacter';

const styledHeaderLeft = {
  height: heightHeader,
};

const styledHeader = {
  width: '100%',
  height: `${heightHeader}px`,
  backgroundImage: `url(./common/dravos_header.jpg)`,
  backgroundSize: 'cover',
  display: 'flex',
  justifyContent: 'space-between',
  // backgroundColor: colors.background,
};

const Header = props => {
  const { selectAnotherCharacter } = useCharacter();
  const dispatch = useDispatch();
  const [hasHydrated, setHasHydrated] = useState(false);

  const { currentStory, isGameMaster, merchants, items } = useSelector(
    store => ({
      currentStory: store.appState.currentStory,
      isGameMaster: store.appState.isGameMaster,
      merchants: store.merchants.merchantList,
      items: store.items.items,
    }),
  );

  const dispatchTogglePlayerView = () => {
    dispatch(togglePlayerView());
  };
  const dispatchCallGetItemList = () => {
    dispatch({ type: CALL_GET_ITEM_LIST });
  };

  const {
    accessChatHelp,
    isEventHidden,
    isOnBestiary,
    isOnMerchantList,
    onChatHelp,
    toggleBestiary,
    toggleEvent,
    toggleMerchantList,
  } = props;

  const hydrateMerchants = () => {
    hydrateAllMerchants(currentStory, merchants, items, true);
  };

  const resetMerchants = () => {
    if (items.length > 0) {
      resetStoryMerchants(currentStory, items);
      hydrate();
    } else {
      dispatchCallGetItemList();
    }
  };

  const hydrate = () => {
    setHasHydrated(true);
    setTimeout(() => {
      setHasHydrated(false);
    }, 3000);
  };

  return (
    <div style={styledHeader}>
      <div style={styledHeaderLeft}>
        <Camera />
      </div>
      <div
        style={{
          width: 250,
          position: 'relative',
        }}
      >
        <Icon
          style={{
            position: 'absolute',
            top: 80,
            right: 20,
            cursor: cursorPointer,
          }}
          onClick={selectAnotherCharacter}
          circular
          name={'address book'}
          inverted
          color={'black'}
          data-tip={'Characters'}
        />
        <Icon
          style={{
            position: 'absolute',
            top: 115,
            right: 20,
            cursor: cursorPointer,
          }}
          onClick={accessChatHelp}
          circular
          name={'chat'}
          inverted
          color={onChatHelp ? 'blue' : 'black'}
          data-tip={'Chat help'}
        />
        {isGameMaster && (
          <Icon
            style={{
              position: 'absolute',
              top: 10,
              right: 60,
              cursor: cursorPointer,
            }}
            onClick={toggleBestiary}
            circular
            name={'bug'}
            inverted
            color={isOnBestiary ? 'blue' : 'black'}
            data-tip={'Bestiary'}
            data-place='bottom'
          />
        )}

        {isGameMaster && (
          <Icon
            style={{
              position: 'absolute',
              top: 45,
              right: 60,
              cursor: cursorPointer,
            }}
            onClick={toggleMerchantList}
            circular
            name={'gem'}
            inverted
            color={isOnMerchantList ? 'blue' : 'black'}
            data-tip={'Merchant list'}
          />
        )}
        {isGameMaster && (
          <Icon
            style={{
              position: 'absolute',
              top: 80,
              right: 60,
              cursor: cursorPointer,
            }}
            onClick={dispatchTogglePlayerView}
            circular
            name={'cogs'}
            inverted
            color={'black'}
            data-tip={'Toggle Player View'}
          />
        )}
        {isGameMaster && (
          <Icon
            style={{
              position: 'absolute',
              top: 115,
              right: 60,
              cursor: cursorPointer,
            }}
            onClick={toggleEvent}
            circular
            name={'time'}
            inverted
            color={isEventHidden ? 'red' : 'green'}
            data-tip={'Toggle event'}
          />
        )}
        {isGameMaster && (
          <Icon
            style={{
              position: 'absolute',
              top: 10,
              right: 100,
              cursor: cursorPointer,
            }}
            onClick={() => {
              hydrate();
              hydrateMerchants();
            }}
            circular
            name={'theme'}
            inverted
            color={hasHydrated ? 'green' : 'black'}
            data-tip={'Hydrate merchant'}
            data-place='bottom'
          />
        )}
        {isGameMaster && (
          <Icon
            style={{
              position: 'absolute',
              top: 45,
              right: 100,
              cursor: cursorPointer,
            }}
            onClick={resetMerchants}
            circular
            name={'cart'}
            inverted
            color={hasHydrated ? 'green' : 'black'}
            data-tip={'Reset merchant'}
          />
        )}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 150,
          }}
        >
          V 1.0.0
        </div>
        <ReactTooltip />
      </div>
    </div>
  );
};

export default Header;
