import React from 'react';
import { heightLeft } from '../Utils/StyleConstants';

import PropTypes from 'prop-types';
import TownMerchant from './TownMerchant';
import ButtonLarge from '../Utils/ButtonLarge';
import { colors } from '../Utils/Constants';
import { useSelector } from 'react-redux';

const styledBoxHeader = {
  width: '100%',
  height: 30,
  paddingBottom: 5,
  textAlign: 'center',
  float: 'left',
  display: 'inline-block',
  position: 'relative',
};

const styledSemiContainer = {
  width: '100%',
  height: `${heightLeft / 4 - 48}px`,
  display: 'inline-block',
  float: 'left',
  position: 'relative',
  overflowY: 'auto',
  backgroundColor: colors.background,
  color: 'white',
};

const TownMerchants = ({
  removeMerchantFromTown,
  toggleMerchantDiscover,
  toggleRightPanel,
}) => {
  const { currentTown, merchants } = useSelector(store => ({
    currentTown: store.mapInfos.currentTown,
    merchants: store.mapInfos.merchants,
  }));
  return (
    <div>
      <ButtonLarge
        onClick={() => toggleRightPanel(false)}
        style={styledBoxHeader}
      >
        Merchants
      </ButtonLarge>
      <div style={styledSemiContainer} className='scrollbar'>
        {merchants &&
          merchants.map((m, i) => {
            if (m.town === currentTown) {
              return (
                <TownMerchant
                  key={`town-${m.name}`}
                  m={m}
                  i={i}
                  removeMerchantFromTown={removeMerchantFromTown}
                  toggleMerchantDiscover={toggleMerchantDiscover}
                />
              );
            }
            return null;
          })}
      </div>
    </div>
  );
};

TownMerchants.propTypes = {
  toggleMerchantDiscover: PropTypes.func.isRequired,
  removeMerchantFromTown: PropTypes.func.isRequired,
  toggleRightPanel: PropTypes.func.isRequired,
};

export default TownMerchants;
