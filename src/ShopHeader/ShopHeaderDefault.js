import React, { Component } from 'react';
import { widthLeft } from '../Utils/StyleConstants';

const styledTabs = {
  width: `${widthLeft / 2}px`,
  height: 25,
  position: 'absolute',
  top: 0,
  left: 0,
  color: 'white',
  zIndex: 1,
};

class ShopHeaderDefault extends Component {
  render() {
    return <div style={styledTabs} />;
  }
}

export default ShopHeaderDefault;
