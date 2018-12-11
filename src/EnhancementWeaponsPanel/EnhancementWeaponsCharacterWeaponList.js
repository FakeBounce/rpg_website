import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import EnhancementWeaponsItem from './EnhancementWeaponsItem';
import EnhancementWeaponsSeparator from "./EnhancementWeaponsSeparator";

class EnhancementWeaponsCharacterWeaponList extends Component {
  render() {
    const {
      character,
      isFromMerchant,
      choosedItem,
      showEnhancers,
    } = this.props;

    return (
      <Fragment>
        <EnhancementWeaponsSeparator text="Your weapons :" />
        {character.weapons.map((item, index) => {
          return (
            <EnhancementWeaponsItem
              key={`item-${item.name}-${index}`}
              index={index}
              isHidden={false}
              isSelected={!isFromMerchant && choosedItem === item}
              itemAction={() => showEnhancers(false, item)}
              name={item}
            />
          );
        })}
      </Fragment>
    );
  }
}

EnhancementWeaponsCharacterWeaponList.propTypes = {
  character: PropTypes.object.isRequired,
  isFromMerchant: PropTypes.bool.isRequired,
  choosedItem: PropTypes.object.isRequired,
  showEnhancers: PropTypes.func.isRequired,
};

export default EnhancementWeaponsCharacterWeaponList;
