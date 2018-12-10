import React, { Component } from 'react';
import './ItemDescription.css';
import PropTypes from 'prop-types';
import { widthLeft, heightLeft, styledCadre } from '../Utils/StyleConstants';
import ButtonLarge from "../Utils/ButtonLarge";

const styledMapSide = {
  width: `${widthLeft / 2 - 20}px`,
  height: `${heightLeft / 2}px`,
  display: 'inline-block',
  float: 'left',
  textAlign: 'left',
  position: 'relative',
  paddingHorizontal: 10,
};

class ItemDescriptionPanel extends Component {
  render() {
    const {
      icon,
      name,
      itemType,
      price,
      quantity,
      description,
      effect,
      gold,
      buyItem,
      isHidden,
    } = this.props;
    return (
      <div style={styledMapSide}>
        <img src={'./common/cadre.png'} style={styledCadre} alt="Cadre" />
        <div className="item-description">
          <div className="item-description-header">Description</div>
          <img
            src={'./' + itemType + '/' + icon || './common/unknown_image_white.png'}
            alt={isHidden ? "Can't be described" : description}
            className="item-description-icon"
          />
          <div className="item-description-text">{isHidden ? '???' : name}</div>
          <div className="item-description-description">
            {isHidden ? "Can't be described" : description}
          </div>
          <div className="item-description-effect">
            {isHidden ? '' : effect}
          </div>
          <div className="item-description-quantity">
            Quantity left :{quantity}
          </div>
          <ButtonLarge
            className={`item-description-price ${gold < price &&
              'item-description-cant-buy'}`}
            onClick={gold >= price && buyItem}
          >
            Buy ({price}
            g)
          </ButtonLarge>
        </div>
      </div>
    );
  }
}
ItemDescriptionPanel.defaultProps = {
  effect: '',
  description: '',
};

ItemDescriptionPanel.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  itemType: PropTypes.string.isRequired,
  description: PropTypes.string,
  effect: PropTypes.string,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  gold: PropTypes.number.isRequired,
  buyItem: PropTypes.func.isRequired,
  isHidden: PropTypes.bool.isRequired,
};

export default ItemDescriptionPanel;
