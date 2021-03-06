import React from 'react';
import { heightLeft } from '../Utils/StyleConstants';

import PropTypes from 'prop-types';
import { colors } from '../Utils/Constants';
import { useSelector } from 'react-redux';

const styledBoxHeader = {
  flex: 1,
  borderBottom: '1px solid white',
  width: '100%',
  paddingBottom: 5,
  textAlign: 'center',
  display: 'inline-block',
  position: 'relative',
  backgroundColor: colors.background,
  color: 'white',
};

const styledMerchantsContainer = {
  width: '100%',
  height: `${heightLeft / 2 - 20}px`,
  display: 'inline-block',
  float: 'left',
  position: 'absolute',
  top: 21,
  left: 0,
  overflowY: 'auto',
  backgroundColor: colors.background,
  color: 'white',
};

const StoryMerchantList = ({ addMerchantToTown }) => {
  const { merchants, towns } = useSelector(store => ({
    towns: store.mapInfos.towns,
    merchants: store.merchants.merchantList,
  }));

  return (
    <div style={styledMerchantsContainer}>
      {merchants &&
        merchants.map((m, i) => {
          return (
            <div onClick={() => addMerchantToTown(i)} style={styledBoxHeader}>
              <img
                src={`./merchants/${m.icon}`}
                style={{ maxWidth: 45, maxHeight: 45, float: 'left' }}
                alt={`${m.name}`}
              />
              {m.name}
              {typeof m.town !== 'undefined' && m.town > -1 && (
                <span>({towns[m.town].name})</span>
              )}
            </div>
          );
        })}
    </div>
  );
};

StoryMerchantList.propTypes = {
  addMerchantToTown: PropTypes.func.isRequired,
};

export default StoryMerchantList;
