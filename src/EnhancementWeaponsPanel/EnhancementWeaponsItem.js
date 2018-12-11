import React, { Component } from 'react';
import '../ItemPanel/Item.css';
import PropTypes from 'prop-types';

class EnhancementWeaponsItem extends Component {
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
        <div className="item-text">{isHidden ? '???' : name}</div>
      </div>
    );
  }
}

EnhancementWeaponsItem.defaultProps = {
  type: '',
  description: '',
  icon: 'weapon.png',
  itemType: 'weapons',
};

EnhancementWeaponsItem.propTypes = {
  index: PropTypes.number.isRequired,
  icon: PropTypes.string,
  itemType: PropTypes.string,
  type: PropTypes.string,
  description: PropTypes.string,
  name: PropTypes.string.isRequired,
  itemAction: PropTypes.func.isRequired,
  isHidden: PropTypes.bool.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default EnhancementWeaponsItem;
