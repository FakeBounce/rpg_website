import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

const styledDoubleTab = {
  width: '50%',
  height: 25,
  display: 'inline-block',
  position: 'relative',
};

class ShopHeaderEnhancements extends Component {

  render() {
    const { changeTab } = this.props;
    return (
      <div style={styledTabs}>
        <div
          style={styledDoubleTab}
          onClick={() => this.changeTab('items')}
        >
          Items
        </div>
        <div
          style={styledDoubleTab}
          onClick={() => this.changeTab('enhancements')}
        >
          Enhancements
        </div>
      </div>
    );
  }
}

ShopHeaderEnhancements.propTypes = {
  changeTab: PropTypes.func.isRequired,
};

export default ShopHeaderEnhancements;
