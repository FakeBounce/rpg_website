import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { heightLeft, widthLeftBestiary } from '../Utils/StyleConstants';
import TownsHistoryMerchantHeader from './TownsHistoryMerchantHeader';
import TownsHistoryMerchantColumnList from './TownsHistoryMerchantColumnList';
import firebase from 'firebase';
import ItemDescriptionPanel from '../ItemDescriptionPanel';
import { useSelector } from 'react-redux';

const styledTownColumn = {
  width: widthLeftBestiary / 3 - 3,
  marginTop: 25,
  height: heightLeft - 25,
  display: 'inline-block',
  float: 'left',
  borderRight: '1px solid white',
  flex: '0 0 auto',
};

const styledItemColumn = {
  width: widthLeftBestiary / 3 - 3,
  height: heightLeft,
  display: 'flex',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  overflowY: 'auto',
  flex: '0 0 auto',
};

const TownsHistoryMerchantColumn = ({
  currentStory,
  merchantIndex,
  characterGold,
  characterEducation,
  merchants,
}) => {
  const {
    currentStory,
    characterEducation,
    characterGold,
    merchants,
    // currentMerchant,
  } = useSelector(store => ({
    currentStory: store.appState.currentStory,
    characterGold: store.character.gold,
    characterEducation: store.character.education,
    merchants: store.merchants.merchantList,
    // currentMerchant: store.merchants.currentMerchant,
  }));

  const [currentItem, setCurrentItem] = useState({});

  // @Todo listener
  showItemDescription = i => {
    firebase
      .database()
      .ref(
        'stories/' +
          currentStory +
          '/merchants/' +
          merchantIndex +
          '/items/' +
          i,
      )
      .on('value', snapshot => {
        setCurrentItem(snapshot.val());
      });
  };

  return (
    <>
      <div style={styledTownColumn}>
        <TownsHistoryMerchantHeader merchant={merchants[merchantIndex]} />
        <TownsHistoryMerchantColumnList
          showItemDescription={this.showItemDescription}
        />
      </div>

      {currentItem && currentItem.name && (
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

TownsHistoryMerchantColumn.propTypes = {
  merchantIndex: PropTypes.number.isRequired,
};

export default TownsHistoryMerchantColumn;
