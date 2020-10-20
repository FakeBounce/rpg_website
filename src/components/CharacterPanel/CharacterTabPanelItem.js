import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { widthRightPanelLeft } from '../Utils/StyleConstants';
import ButtonLarge from '../Utils/ButtonLarge';
import firebase from 'firebase';

const styledTabPanelItem = {
  width: `${widthRightPanelLeft - 6}px`,
  paddingHorizontal: 5,
  position: 'relative',
  float: 'left',
  display: 'inline-block',
  borderBottom: '1px solid black',
};

const styledItemName = {
  width: `${widthRightPanelLeft - 120}px`,
  position: 'relative',
  float: 'left',
  display: 'inline-block',
};

const styledItemQuantity = {
  width: 30,
  height: 26,
  position: 'relative',
  float: 'left',
  display: 'inline-block',
  padding: 0,
  margin: 0,
  textAlign: 'center',
};
const styledItemButton = {
  width: 50,
  height: 30,
  position: 'relative',
  float: 'right',
  display: 'inline-block',
  padding: 0,
  margin: 0,
  textAlign: 'center',
};

const styledDiscoverButton = {
  width: 90,
  height: 16,
  padding: 0,
  position: 'absolute',
  bottom: 0,
  textAlign: 'center',
  left: 80,
};

const CharacterTabPanelItem = ({ onItemUse }) => {
  const [itemValue, setItemValue] = useState('');

  const { currentStory, isGameMaster, character } = useSelector(store => ({
    currentStory: store.appState.currentStory,
    isGameMaster: store.appState.isGameMaster,
    character: store.character,
  }));

  const onChangeItem = value => {
    setItemValue(value);
  };

  const onValidateItem = () => {
    let obj = [];
    if (character.items) obj = [...character.items];
    const newObject = {
      name: itemValue,
      quantity: 1,
      rarity: 1,
    };
    obj.push(newObject);

    //@TODO saga
    firebase
      .database()
      .ref(
        'stories/' +
          currentStory +
          '/characters/' +
          character.userUid +
          '/character/items',
      )
      .set(obj)
      .catch(error => {
        // Handle Errors here.
        console.log('Error', error);
      });
  };

  const discoverItem = (index, isDiscovered = false) => () => {
    const obj = [...character.items];
    obj[index].isDiscovered = isDiscovered;

    firebase
      .database()
      .ref(
        'stories/' +
          0 +
          '/characters/' +
          character.userUid +
          '/character/items',
      )
      .set(obj)
      .catch(error => {
        // Handle Errors here.
        console.log('Error', error);
      });
  };

  return (
    <div>
      {character.items &&
        character.items.map((item, index) => {
          return (
            <div key={`${item.name}-${index}`} style={styledTabPanelItem}>
              <input
                type='number'
                value={item.quantity}
                style={styledItemQuantity}
                onChange={e => {
                  onItemUse(index, e.target.value);
                }}
              />
              <div style={styledItemName}>
                {/* {character.education < item.rarity * 9 && !item.isDiscovered
                  ? '???'
                  : item.name} */}
                  {item.name}
              </div>
              <ButtonLarge
                style={styledItemButton}
                onClick={() => onItemUse(index, item.quantity - 1)}
              >
                Use ({item.quantity} left)
              </ButtonLarge>
              {isGameMaster && (
                <ButtonLarge
                  style={styledDiscoverButton}
                  onClick={discoverItem(index, !item.isDiscovered)}
                >
                  {item.isDiscovered ? 'Uncover' : 'Discover'}
                </ButtonLarge>
              )}
            </div>
          );
        })}

      <div style={styledTabPanelItem}>
        <input
          type='text'
          placeholder={`Item + description if needed`}
          value={itemValue}
          onChange={e => {
            onChangeItem(e.target.value);
          }}
        />
        <ButtonLarge style={styledItemButton} onClick={onValidateItem}>
          Add Item
        </ButtonLarge>
      </div>
    </div>
  );
};

CharacterTabPanelItem.propTypes = {
  onItemUse: PropTypes.func.isRequired,
};

export default CharacterTabPanelItem;
