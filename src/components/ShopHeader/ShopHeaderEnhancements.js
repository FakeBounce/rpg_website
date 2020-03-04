import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { cursorPointer, widthLeft } from '../Utils/StyleConstants';
import { colors } from "../Utils/Constants";

const styledTabs = {
  width: `${widthLeft / 2}px`,
  height: 25,
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 1,
};

const styledDoubleTab = {
  width: '50%',
  height: 25,
  display: 'inline-block',
  position: 'relative',
  cursor: cursorPointer,
  color: colors.text,
};

const styledDoubleTabSelected = {
  width: '50%',
  height: 25,
  display: 'inline-block',
  position: 'relative',
  cursor: cursorPointer,
  color: colors.red300,
};

class ShopHeaderEnhancements extends Component {
  render() {
    const { changeTab, currentTab } = this.props;
    return (
      <div style={styledTabs}>
        <div
          style={
            currentTab === 'items'
              ? styledDoubleTabSelected
              : styledDoubleTab
          }
          onClick={() => changeTab('items')}
        >
          Items
        </div>
        <div
          style={
            currentTab === 'enhancements'
              ? styledDoubleTabSelected
              : styledDoubleTab
          }
          onClick={() => changeTab('enhancements')}
        >
          Enhancements
        </div>
      </div>
    );
  }
}

ShopHeaderEnhancements.propTypes = {
  changeTab: PropTypes.func.isRequired,
  currentTab: PropTypes.string.isRequired,
};

export default ShopHeaderEnhancements;
