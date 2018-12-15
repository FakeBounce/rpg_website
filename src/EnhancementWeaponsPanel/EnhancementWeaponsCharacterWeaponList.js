import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import EnhancementWeaponsItem from './EnhancementWeaponsItem';
import EnhancementWeaponsSeparator from './EnhancementWeaponsSeparator';

class EnhancementWeaponsCharacterWeaponList extends Component {
  render() {
    const { character, choosedItem, showEnhancers } = this.props;

    return (
      <Fragment>
        <EnhancementWeaponsSeparator text="Your weapons :" />
        {character.weapons.map((item, index) => {
          if (item.indexOf('(') === -1) {
            return (
              <EnhancementWeaponsItem
                key={`item-${item.name}-${index}`}
                index={index}
                isHidden={false}
                isSelected={choosedItem && !choosedItem.isFromMerchant && choosedItem.index === index}
                itemAction={() =>
                  showEnhancers(
                    false,
                    { name: item.name ? item.name : item },
                    index
                  )
                }
                name={item}
              />
            );
          }
          return null;
        })}
      </Fragment>
    );
  }
}

EnhancementWeaponsCharacterWeaponList.propTypes = {
  character: PropTypes.object.isRequired,
  choosedItem: PropTypes.object.isRequired,
  showEnhancers: PropTypes.func.isRequired,
};

export default EnhancementWeaponsCharacterWeaponList;
