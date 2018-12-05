import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { widthLeft, heightLeft } from '../Utils/StyleConstants';
import MerchantList from './MerchantList';

const styledMapSide = {
  width: `${widthLeft / 2 - 20}px`,
  height: `${heightLeft / 2 - 10}px`,
  display: 'inline-block',
  float: 'left',
  textAlign: 'left',
  position: 'relative',
  padding: 10,
};

const styledCadre = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: `${widthLeft / 2 - 3}px`,
  height: `${heightLeft / 2}px`,
};

class MerchantPanel extends Component {
  showItems = (list, index) => {
    this.props.doSetState({
      isItemShowed: true,
      itemsList: list,
      currentMerchant: index,
    });
  };

  render() {
    const { merchantsList, merchants, currentMerchant } = this.props;

    return (
      <div style={styledMapSide}>
        <img src={'./common/cadreall.png'} style={styledCadre} alt="Cadre" />
        <MerchantList
          currentMerchant={currentMerchant}
          merchantsList={merchantsList}
          merchants={merchants}
          showItems={this.showItems}
        />
      </div>
    );
  }
}

MerchantPanel.propTypes = {
  currentMerchant: PropTypes.number.isRequired,
  merchantsList: PropTypes.array.isRequired,
  merchants: PropTypes.array.isRequired,
  doSetState: PropTypes.func.isRequired,
};

export default MerchantPanel;
