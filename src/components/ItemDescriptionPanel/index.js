import React from 'react';
import './ItemDescription.css';
import PropTypes from 'prop-types';
import { widthLeft, heightLeft } from '../Utils/StyleConstants';
import ButtonLarge from '../Utils/ButtonLarge';
import Cadre from '../Utils/Cadre';
import { useSelector } from 'react-redux';

const styledMapSide = {
  width: `${widthLeft / 2 - 20}px`,
  height: `${heightLeft / 2}px`,
  display: 'inline-block',
  float: 'left',
  textAlign: 'left',
  position: 'relative',
  paddingHorizontal: 10,
};

const ItemDescriptionPanel = ({
  icon,
  name,
  itemType,
  price,
  quantity,
  description,
  effect,
  buyItem,
  rarity,
  noBuy,
}) => {
  const { characterGold, characterEducation } = useSelector(store => ({
    characterGold: store.character.gold,
    characterEducation: store.character.education,
  }));

  const isHidden = characterEducation < rarity * 9;

  return (
    <div style={styledMapSide}>
      <Cadre />
      <div className='item-description'>
        <div className='item-description-header'>Description</div>
        <img
          src={
            './' + itemType + '/' + icon || './common/unknown_image_white.png'
          }
          alt={isHidden ? "Can't be described" : description}
          className='item-description-icon'
        />
        <div className='item-description-text'>{isHidden ? '???' : name}</div>
        {/*<div className="item-description-type">{itemType}</div>*/}
        <div className='item-description-description'>
          {isHidden ? "Can't be described" : description}
        </div>
        <div className='item-description-effect'>{isHidden ? '' : effect}</div>
        <div className='item-description-quantity'>
          Quantity left :{quantity}
        </div>
        {!noBuy && (
          <ButtonLarge
            className={`item-description-price ${characterGold < price &&
              'item-description-cant-buy'}`}
            onClick={characterGold >= price && buyItem}
          >
            Buy ({price}
            g)
          </ButtonLarge>
        )}
      </div>
    </div>
  );
};

ItemDescriptionPanel.defaultProps = {
  effect: '',
  description: '',
  noBuy: false,
  buyItem: null,
};

ItemDescriptionPanel.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  itemType: PropTypes.string.isRequired,
  description: PropTypes.string,
  effect: PropTypes.string,
  quantity: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  buyItem: PropTypes.func,
  rarity: PropTypes.number.isRequired,
  noBuy: PropTypes.bool,
};

export default ItemDescriptionPanel;
