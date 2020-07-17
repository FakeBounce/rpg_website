import React from 'react';
import PropTypes from 'prop-types';
import { heightLeft, widthLeftBestiary } from '../Utils/StyleConstants';
import TownsHistoryCityHeader from './TownsHistoryCityHeader';
import TownsHistoryMerchantColumn from './TownsHistoryMerchantColumn';

const styledCityColumn = {
  width: widthLeftBestiary - 1,
  height: heightLeft,
  display: 'flex',
  position: 'relative',
  float: 'left',
  overflowX: 'scroll',
  overflowY: 'hidden',
};

const TownsHistoryCity = ({ showedTown }) => {
  return (
    <div style={styledCityColumn} className='scrollbar'>
      <TownsHistoryCityHeader name={showedTown.name} />
      {showedTown.merchantsList.map(m => {
        return (
          <TownsHistoryMerchantColumn
            key={'town-list-city-merchant-' + m}
            merchantIndex={m}
          />
        );
      })}
    </div>
  );
};

TownsHistoryCity.propTypes = {
  showedTown: PropTypes.object.isRequired,
};

export default TownsHistoryCity;
