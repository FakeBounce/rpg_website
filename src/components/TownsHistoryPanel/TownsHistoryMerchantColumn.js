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
  merchantIndex,
}) => {
  const {
    currentStory,
    merchants,
  } = useSelector(store => ({
    currentStory: store.appState.currentStory,
    merchants: store.merchants.merchantList,
  }));

  const [currentItem, setCurrentItem] = useState({});

  // @Todo listener
  const showItemDescription = i => {
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
          showItemDescription={showItemDescription}
        />
      </div>

      {currentItem && currentItem.name && (
        <div style={styledItemColumn}>
          <ItemDescriptionPanel
            {...currentItem}
            noBuy
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
