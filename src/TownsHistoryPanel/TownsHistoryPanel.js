import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Item from '../ItemPanel/Item';
import { heightLeft, widthLeftBestiary } from '../Utils/StyleConstants';
import TownsHistoryList from './TownsHistoryList';
import TownsHistorySoloMerchant from './TownsHistorySoloMerchant';
import TownsHistoryCity from './TownsHistoryCity';

const styledTownsHistoryContainer = {
  height: heightLeft,
  width: '100%',
  position: 'relative',
  backgroundColor: '#34495e',
  color: 'white',
};
const styledCityColumn = {
  width: widthLeftBestiary - 1,
  height: heightLeft,
  display: 'inline-block',
  position: 'relative',
  float: 'left',
};
const styledTownColumn = {
  width: widthLeftBestiary / 6 - 1,
  height: heightLeft,
  display: 'inline-block',
  position: 'relative',
  float: 'left',
  borderRight: '1px solid white',
};
const styledMerchantHeader = {
  width: '100%',
  height: 25,
  borderBottom: '1px solid white',
  position: 'relative',
};
const styledMerchantList = {
  width: '100%',
  height: heightLeft - 26,
  position: 'relative',
  overflowY: 'auto',
  overflowX: 'hidden',
};

class TownsHistoryPanel extends Component {
  state = {
    merchantsOrdered: {},
    showedMerchant: {},
    showedTown: {},
  };

  componentDidMount() {
    const { merchants, towns } = this.props;
    const tempMerchants = {};
    towns.map(t => {
      if (t.merchantsList && t.merchantsList.length > 0) {
        tempMerchants[t.name] = [];
        let merchantsNumber = 0;
        t.merchantsList.map(mIndex => {
          if (merchants[mIndex].isDiscovered) {
            tempMerchants[t.name].push(merchants[mIndex]);
            merchantsNumber += 1;
          }
        });
        if (merchantsNumber === 0) {
          delete tempMerchants[t.name];
        }
      }
    });
    this.setState(state => ({
      ...state,
      merchantsOrdered: { ...tempMerchants },
    }));
  }

  showMerchant = m => {
    this.setState(state => ({
      ...state,
      showedMerchant: { ...m },
      showedTown: {},
    }));
  };

  showCity = city => {
    const { towns } = this.props;
    let showedTown = {};
    towns.map(t => {
      if (t.name === city) {
        showedTown = t;
      }
    });
    this.setState(state => ({
      ...state,
      showedMerchant: {},
      showedTown: { ...showedTown },
    }));
  };

  render() {
    const { character, merchants } = this.props;
    const { merchantsOrdered, showedMerchant, showedTown } = this.state;
    return (
      <div style={styledTownsHistoryContainer}>
        <TownsHistoryList
          merchantsOrdered={merchantsOrdered}
          showMerchant={this.showMerchant}
          showCity={this.showCity}
        />
        {showedMerchant.items &&
          !showedTown.name && (
            <TownsHistorySoloMerchant
              character={character}
              showedMerchant={showedMerchant}
            />
          )}
        {showedTown.name && (
          <TownsHistoryCity
            character={character}
            merchants={merchants}
            showedTown={showedTown}
          />
        )}
      </div>
    );
  }
}

TownsHistoryPanel.propTypes = {
  character: PropTypes.object.isRequired,
  merchants: PropTypes.array.isRequired,
  towns: PropTypes.array.isRequired,
};

export default TownsHistoryPanel;
