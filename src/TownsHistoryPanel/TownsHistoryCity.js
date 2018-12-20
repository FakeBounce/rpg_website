import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { heightLeft, widthLeftBestiary } from '../Utils/StyleConstants';
import TownsHistoryCityHeader from './TownsHistoryCityHeader';
import TownsHistoryMerchantColumn from './TownsHistoryMerchantColumn';

const styledCityColumn = {
  width: widthLeftBestiary - 1,
  height: heightLeft,
  display: 'inline-block',
  position: 'relative',
  float: 'left',
};

class TownsHistoryCity extends Component {
  render() {
    const { character, merchants, showedTown } = this.props;
    return (
      <div style={styledCityColumn}>
        <TownsHistoryCityHeader name={showedTown.name} />
        {showedTown.merchantsList.map(m => {
          return (
            <TownsHistoryMerchantColumn
              character={character}
              merchants={merchants}
              currentMerchant={m}
            />
          );
        })}
      </div>
    );
  }
}

TownsHistoryCity.propTypes = {
  character: PropTypes.object.isRequired,
  merchants: PropTypes.array.isRequired,
  showedTown: PropTypes.object.isRequired,
};

export default TownsHistoryCity;
