import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TownsHistoryPanel extends Component {
  state = {
    merchantsOrdered: {},
    showedMerchant: {},
  };

  componentDidMount() {
    const { merchants, towns } = this.props;
    const tempMerchants = {};
    towns.map(t => {
      if (t.merchantsList && t.merchantsList.length > 0) {
        tempMerchants[t.name] = [];
        t.merchantsList.map(mIndex => {
          if (merchants[mIndex].isDiscovered) {
            tempMerchants[t.name].push(merchants[mIndex]);
          }
        });
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
    }));
  };

  render() {
    const { merchantsOrdered, showedMerchant } = this.state;
    return (
      <div>
        {Object.keys(merchantsOrdered).map(townKey => {
          return (
            <div>
              {townKey}
              {merchantsOrdered[townKey].map(m => {
                return <div onClick={() => this.showMerchant(m)}>{m.name}</div>;
              })}
            </div>
          );
        })}
        {showedMerchant.items &&
          Object.keys(showedMerchant.items).map(iKey => {
            return <div>{showedMerchant.items[iKey].name}</div>;
          })}
      </div>
    );
  }
}

TownsHistoryPanel.propTypes = {
  merchants: PropTypes.array.isRequired,
  towns: PropTypes.array.isRequired,
};

export default TownsHistoryPanel;
