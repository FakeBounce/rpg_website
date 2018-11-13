import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { widthRightPanelLeft } from '../Utils/StyleConstants';

const styles = {
  tabPanelItem: {
    width: `${widthRightPanelLeft - 20}px`,
    height: 40,
    paddingHorizontal: 5,
    position: 'relative',
    float: 'left',
    display: 'inline-block',
    borderBottom: '1px solid black',
  },
  itemName: {
    width: `${widthRightPanelLeft - 120}px`,
    height: 40,
    position: 'relative',
    float: 'left',
    display: 'inline-block',
  },
  itemQuantity: {
    width: 30,
    height: 30,
    position: 'relative',
    float: 'left',
    display: 'inline-block',
    padding: 0,
    margin: 0,
    textAlign: 'center',
    marginTop: 5,
  },
  itemButton: {
    width: 50,
    height: 30,
    position: 'relative',
    float: 'right',
    display: 'inline-block',
    padding: 0,
    margin: 0,
    textAlign: 'center',
  },
};

class CharacterTabPanelItem extends Component {
  render() {
    const { character, onItemUse, isGameMaster } = this.props;

    return (
      <div>
        <div style={styles.BoxHeader}>Items :</div>
        {character.items &&
          character.items.map((item, index) => {
            return (
              <div key={`${item.name}-${index}`} style={styles.tabPanelItem}>
                {isGameMaster && (
                  <input
                    type="number"
                    value={item.quantity}
                    style={styles.itemQuantity}
                    onChange={e => {
                      onItemUse(index, e.target.value);
                    }}
                  />
                )}
                <div style={styles.itemName}>
                  {character.education < item.rarity * 9 ? '???' : item.name}
                </div>
                <button style={styles.itemButton} onClick={() => onItemUse(index, item.quantity - 1)}>
                  Use ({item.quantity} left)
                </button>
              </div>
            );
          })}
      </div>
    );
  }
}

CharacterTabPanelItem.propTypes = {
  character: PropTypes.object.isRequired,
  onItemUse: PropTypes.func.isRequired,
  isGameMaster: PropTypes.bool.isRequired,
};

export default CharacterTabPanelItem;
