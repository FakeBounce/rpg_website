import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { heightLeft, widthLeft } from '../Utils/StyleConstants';
import EnhancementWeaponsMerchantList from './EnhancementWeaponsMerchantList';
import EnhancementWeaponsCharacterWeaponList from './EnhancementWeaponsCharacterWeaponList';
import EnhancementWeaponsCharacterItemsList from './EnhancementWeaponsCharacterItemsList';

const styledEnhancementWeaponsList = {
  display: 'inline-block',
  float: 'left',
  position: 'absolute',
  top: 40,
  left: 16,
  overflowY: 'auto',
  height: `${heightLeft / 2 - 60}px`,
  width: `${widthLeft / 2 - 42}px`,
};

class EnhancementWeaponsContent extends Component {
  render() {
    const {
      character,
      merchants,
      currentMerchant,
      isFromMerchant,
      choosedItem,
      showEnhancers,
      itemsList,
    } = this.props;

    return (
      <div style={styledEnhancementWeaponsList} className="scrollbar">
        {parseInt(merchants[currentMerchant].weapons, 10) > 0 && (
          <EnhancementWeaponsMerchantList
            character={character}
            isFromMerchant={isFromMerchant}
            choosedItem={choosedItem}
            showEnhancers={showEnhancers}
            itemsList={itemsList}
          />
        )}
        <EnhancementWeaponsCharacterWeaponList
          character={character}
          isFromMerchant={isFromMerchant}
          choosedItem={choosedItem}
          showEnhancers={showEnhancers}
        />
        <EnhancementWeaponsCharacterItemsList
          isFromMerchant={isFromMerchant}
          character={character}
          choosedItem={choosedItem}
          showEnhancers={showEnhancers}
        />
      </div>
    );
  }
}

EnhancementWeaponsContent.propTypes = {
  currentMerchant: PropTypes.number.isRequired,
  character: PropTypes.object.isRequired,
  isFromMerchant: PropTypes.bool.isRequired,
  choosedItem: PropTypes.object.isRequired,
  showEnhancers: PropTypes.func.isRequired,
  merchants: PropTypes.array.isRequired,
  itemsList: PropTypes.array.isRequired,
};

export default EnhancementWeaponsContent;
