import React from 'react';
import PropTypes from 'prop-types';

import { heightLeft, widthLeft } from '../Utils/StyleConstants';
import EnhancementWeaponsMerchantList from './EnhancementWeaponsMerchantList';
import EnhancementWeaponsCharacterWeaponList from './EnhancementWeaponsCharacterWeaponList';
import { currentMerchantWeaponLevelSelector } from '../../selectors';
import { useSelector } from 'react-redux';
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

const EnhancementWeaponsContent = ({ choosedItem, showEnhancers }) => {
  const { merchantWeaponLevel } = useSelector(store => ({
    merchantWeaponLevel: currentMerchantWeaponLevelSelector(store),
  }));

  return (
    <div style={styledEnhancementWeaponsList} className='scrollbar'>
      {parseInt(merchantWeaponLevel, 10) > 0 && (
        <EnhancementWeaponsMerchantList
          choosedItem={choosedItem}
          showEnhancers={showEnhancers}
        />
      )}
      <EnhancementWeaponsCharacterWeaponList
        choosedItem={choosedItem}
        showEnhancers={showEnhancers}
      />
    </div>
  );
};

EnhancementWeaponsContent.propTypes = {
  choosedItem: PropTypes.object.isRequired,
  showEnhancers: PropTypes.func.isRequired,
};

export default EnhancementWeaponsContent;
