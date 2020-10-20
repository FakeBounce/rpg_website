import React from 'react';
import { widthLeft, heightLeft } from '../Utils/StyleConstants';
import ItemList from './ItemList';
import Cadre from '../Utils/Cadre';

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

export default ItemPanel;
