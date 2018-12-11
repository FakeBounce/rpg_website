import React, { Component } from 'react';
import '../ItemPanel/Item.css';
import PropTypes from 'prop-types';

class EnhancerItem extends Component {
  render() {
    const {
      index,
      icon,
      iconPath,
      itemType,
      name,
      itemAction,
      isHidden,
      isSelected,
      slot,
    } = this.props;
    return (
      <div
        className={`item ${isSelected ? 'selected' : ''}`}
        onClick={() => itemAction(index)}
      >
        <img
          src={iconPath || './' + itemType + '/' + icon}
          alt={' '}
          className="item-icon"
        />
        <div className="item-text">
          {isHidden ? '??? ' : name} (Slot {slot})
        </div>
      </div>
    );
  }
}

EnhancerItem.defaultProps = {
  type: '',
  description: '',
  slot: 1,
};

EnhancerItem.propTypes = {
  index: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  itemType: PropTypes.string.isRequired,
  type: PropTypes.string,
  description: PropTypes.string,
  name: PropTypes.string.isRequired,
  itemAction: PropTypes.func.isRequired,
  isHidden: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
  slot: PropTypes.number,
};

export default EnhancerItem;
