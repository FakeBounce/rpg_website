import React from 'react';
import PropTypes from 'prop-types';
import { widthLeft, heightLeft } from '../Utils/StyleConstants';
import ItemList from './ItemList';
import Cadre from '../Utils/Cadre';
import firebase from 'firebase';
import { useSelector } from 'react-redux';

const styledMapSide = {
  width: `${widthLeft / 2}px`,
  height: `${heightLeft / 2}px`,
  display: 'inline-block',
  float: 'left',
  textAlign: 'left',
  position: 'relative',
  paddingHorizontal: 10,
};

const ItemPanel = () => {
  return (
    <div style={styledMapSide}>
      <Cadre />
      <ItemList />
    </div>
  );
};

ItemPanel.propTypes = {
  currentMerchant: PropTypes.number.isRequired,
  itemsList: PropTypes.object.isRequired,
  merchants: PropTypes.array.isRequired,
  doSetState: PropTypes.func.isRequired,
};

export default ItemPanel;
