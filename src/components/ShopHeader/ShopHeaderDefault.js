import React from 'react';
import { widthLeft } from '../Utils/StyleConstants';
import { colors } from '../Utils/Constants';

const styledTabs = {
  width: `${widthLeft / 2}px`,
  height: 25,
  position: 'absolute',
  top: 0,
  left: 0,
  color: colors.text,
  zIndex: 1,
};

const ShopHeaderDefault = () => {
  return <div style={styledTabs} />;
};

export default ShopHeaderDefault;
