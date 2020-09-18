import React from 'react';
import PropTypes from 'prop-types';
import { widthLeft, heightLeft } from '../Utils/StyleConstants';
import MerchantList from './MerchantList';
import Cadre from '../Utils/Cadre';

const styledMapSide = {
  width: `${widthLeft / 2 - 20}px`,
  height: `${heightLeft / 2}px`,
  display: 'inline-block',
  float: 'left',
  textAlign: 'left',
  position: 'relative',
  paddingHorizontal: 20,
};

const MerchantPanel = () => {
  return (
    <div style={styledMapSide}>
      <Cadre />
      <MerchantList />
    </div>
  );
};

export default MerchantPanel;
