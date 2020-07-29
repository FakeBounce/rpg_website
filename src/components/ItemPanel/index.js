import React from 'react';
import PropTypes from 'prop-types';
import { widthLeft, heightLeft } from '../Utils/StyleConstants';
import ItemList from './ItemList';
import Cadre from '../Utils/Cadre';
import firebase from 'firebase';
import { useSelector } from 'react-redux';

const styledMapSide = {
  width: `${widthLeft / 2}px`,
  height: `${heightLeft / 2}px`,
  display: 'inline-block',
  float: 'left',
  textAlign: 'left',
  position: 'relative',
  paddingHorizontal: 10,
};

const ItemPanel = ({ merchants, currentMerchant, doSetState, itemsList }) => {
  const { currentStory } = useSelector(store => ({
    currentStory: store.appState.currentStory,
  }));

  const showItemDescription = i => {
    doSetState(
      {
        isItemDescriptionShowed: true,
        itemToDescribe: merchants[currentMerchant].items[i],
        itemDescribed: i,
      },
      () => {
        // Mandatory ?
        firebase
          .database()
          .ref(
            'stories/' +
              currentStory +
              '/merchants/' +
              currentMerchant +
              '/items/' +
              i,
          )
          .on('value', snapshot => {
            this.props.doSetState({
              itemToDescribe: snapshot.val(),
            });
          });
      },
    );
  };

  return (
    <div style={styledMapSide}>
      <Cadre />
      <ItemList
        itemsList={itemsList}
        showItemDescription={showItemDescription}
      />
    </div>
  );
};

ItemPanel.propTypes = {
  currentMerchant: PropTypes.number.isRequired,
  itemsList: PropTypes.object.isRequired,
  merchants: PropTypes.array.isRequired,
  doSetState: PropTypes.func.isRequired,
};

export default ItemPanel;
