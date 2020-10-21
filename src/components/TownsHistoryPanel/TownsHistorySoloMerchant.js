import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { heightLeft, widthLeftBestiary } from '../Utils/StyleConstants';
import TownsHistoryMerchantHeader from './TownsHistoryMerchantHeader';
import TownsHistorySoloMerchantList from './TownsHistorySoloMerchantList';
import firebase from 'firebase';
import ItemDescriptionPanel from '../ItemDescriptionPanel';
import { useSelector } from 'react-redux';

const styledMerchantColumn = {
  width: widthLeftBestiary / 3,
  height: heightLeft,
  display: 'inline-block',
  position: 'relative',
  float: 'left',
  borderRight: '1px solid white',
  overflowY: 'auto',
  overflowX: 'hidden',
};

const styledItemColumn = {
  width: (widthLeftBestiary / 3) * 2 - 3,
  height: heightLeft,
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  overflowY: 'auto',
  overflowX: 'hidden',
};

const TownsHistorySoloMerchant = ({ showedMerchant }) => {
  const { currentStory, characterGold, characterEducation } = useSelector(
    store => ({
      currentStory: store.appState.currentStory,
      characterGold: store.character.gold,
      characterEducation: store.character.education,
    }),
  );

  const [currentItem, setCurrentItem] = useState({});

  const showItemDescription = i => {
    firebase
      .database()
      .ref(
        'stories/' +
          currentStory +
          '/merchants/' +
          showedMerchant.realIndex +
          '/items/' +
          i,
      )
      .on('value', snapshot => {
        setCurrentItem(snapshot.val());
      });
  };
  return (
    <>
      <div style={styledMerchantColumn}>
        <TownsHistoryMerchantHeader currentMerchant={showedMerchant} />
        <TownsHistorySoloMerchantList
          showedMerchant={showedMerchant}
          showItemDescription={showItemDescription}
        />
      </div>

      {currentItem.name && (
        <div style={styledItemColumn}>
          <ItemDescriptionPanel
            {...currentItem}
            noBuy
            gold={characterGold}
            isHidden={characterEducation < currentItem.rarity * 9}
          />
        </div>
      )}
    </>
  );
};

TownsHistorySoloMerchant.propTypes = {
  showedMerchant: PropTypes.object.isRequired,
};

export default TownsHistorySoloMerchant;
