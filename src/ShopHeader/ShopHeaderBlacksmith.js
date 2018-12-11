import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { cursorPointer, widthLeft } from '../Utils/StyleConstants';

const styledTabs = {
  width: `${widthLeft / 2}px`,
  height: 25,
  position: 'absolute',
  top: 0,
  left: 0,
  color: 'white',
  zIndex: 1,
};

const styledTripleTab = {
  width: '33%',
  height: 25,
  display: 'inline-block',
  position: 'relative',
  cursor: cursorPointer,
};

class ShopHeaderBlacksmith extends Component {
  render() {
    const { changeTab } = this.props;
    return (
      <div style={styledTabs}>
        <div style={styledTripleTab} onClick={() => changeTab('items')}>
          Items
        </div>
        <div style={styledTripleTab} onClick={() => changeTab('enhancements')}>
          Enhancements
        </div>
        <div style={styledTripleTab} onClick={() => changeTab('blacksmith')}>
          Blacksmith
        </div>
      </div>
    );
  }
}

ShopHeaderBlacksmith.propTypes = {
  changeTab: PropTypes.func.isRequired,
};

export default ShopHeaderBlacksmith;
