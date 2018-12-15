import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { heightLeft, widthLeft } from '../Utils/StyleConstants';
import EnhancementWeaponsMerchantList from './EnhancementWeaponsMerchantList';
import EnhancementWeaponsCharacterWeaponList from './EnhancementWeaponsCharacterWeaponList';
// Not supported now
// import EnhancementWeaponsCharacterItemsList from './EnhancementWeaponsCharacterItemsList';

const styledEnhancementWeaponsList = {
  display: 'inline-block',
  float: 'left',
  position: 'absolute',
  top: 40,
  left: 26,
  overflowY: 'auto',
  height: `${heightLeft / 2 - 60}px`,
  width: `${widthLeft / 2 - 52}px`,
};

class EnhancementWeaponsContent extends Component {
  render() {
    const {
      character,
      merchants,
      currentMerchant,
      choosedItem,
      showEnhancers,
      itemsList,
    } = this.props;

    return (
      <div style={styledEnhancementWeaponsList} className="scrollbar">
        {parseInt(merchants[currentMerchant].weapons, 10) > 0 && (
          <EnhancementWeaponsMerchantList
            character={character}
            choosedItem={choosedItem}
            showEnhancers={showEnhancers}
            itemsList={itemsList}
          />
        )}
        <EnhancementWeaponsCharacterWeaponList
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
  choosedItem: PropTypes.object.isRequired,
  showEnhancers: PropTypes.func.isRequired,
  merchants: PropTypes.array.isRequired,
  itemsList: PropTypes.object.isRequired,
};

export default EnhancementWeaponsContent;
