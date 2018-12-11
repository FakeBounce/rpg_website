import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { heightLeft, widthLeft } from '../Utils/StyleConstants';
import Cadre from '../Utils/Cadre';
import ButtonLarge from '../Utils/ButtonLarge';
import EnhancerItem from './EnhancerItem';

const styledEnhancersContainer = {
  width: `${widthLeft / 2}px`,
  height: `${heightLeft / 2}px`,
  display: 'inline-block',
  float: 'left',
  textAlign: 'left',
  position: 'relative',
  paddingHorizontal: 10,
  color: 'white',
};
const styledSeparator = { width: '100%', display: 'block' };
const styledItemsContainer = {
  display: 'inline-block',
  float: 'left',
  position: 'relative',
  marginTop: 20,
  marginLeft: 16,
  overflowY: 'auto',
  height: `${heightLeft / 2 - 80}px`,
  width: `${widthLeft / 2 - 42}px`,
};
const styledEnhanceButton = {
  display: 'block',
  float: 'right',
  position: 'relative',
  marginTop: 20,
  marginRight: 20,
};

class EnhancersPanel extends Component {
  render() {
    const {
      character,
      itemsList,
      merchants,
      currentMerchant,
      chooseEnhancer1,
      chooseEnhancer2,
      choosedEnhancer1,
      choosedEnhancer2,
      slots,
      enhanceWeapon,
    } = this.props;

    return (
      <div style={styledEnhancersContainer}>
        <Cadre />
        <div style={styledItemsContainer} className="scrollbar">
          <div style={styledSeparator}>Choose enhancer (temporary) :</div>
          {parseInt(merchants[currentMerchant].enhancements, 10) > 0 &&
            itemsList.map((itemFromMerchant, index) => {
              const isHidden =
                character.education < itemFromMerchant.rarity * 9;
              if (
                itemFromMerchant.itemType === 'enhancements' &&
                itemFromMerchant.slot <= slots &&
                itemFromMerchant.slot <=
                  parseInt(merchants[currentMerchant].level, 10)
              ) {
                return (
                  <EnhancerItem
                    key={`item-${itemFromMerchant.name}-${index}`}
                    {...itemFromMerchant}
                    index={index}
                    isHidden={isHidden}
                    isSelected={
                      (choosedEnhancer1 &&
                        choosedEnhancer1.name === itemFromMerchant.name) ||
                      (choosedEnhancer2 &&
                        choosedEnhancer2.name === itemFromMerchant.name)
                    }
                    itemAction={() => {
                      if (parseInt(itemFromMerchant.slot, 10) === 1) {
                        chooseEnhancer1(itemFromMerchant);
                      } else {
                        chooseEnhancer2(itemFromMerchant);
                      }
                    }}
                  />
                );
              }
            })}
          <div style={styledSeparator}>Your enhancers :</div>
          {character.items.map((item, index) => {
            const isHidden = character.education < item.rarity * 9;
            if (
              item.itemType === 'enhancements' &&
              item.slot <= slots &&
              item.slot <= parseInt(merchants[currentMerchant].level, 10)
            ) {
              return (
                <EnhancerItem
                  key={`item-${item.name}-${index}`}
                  {...item}
                  index={index}
                  isHidden={isHidden}
                  isSelected={
                    (choosedEnhancer1 && choosedEnhancer1.name === item.name) ||
                    (choosedEnhancer2 && choosedEnhancer2.name === item.name)
                  }
                  showItemDescription={() => {
                    if (parseInt(item.slot, 10) === 1) {
                      chooseEnhancer1(item);
                    } else {
                      chooseEnhancer2(item);
                    }
                  }}
                />
              );
            }
          })}
        </div>
        {(choosedEnhancer1 !== null || choosedEnhancer2 !== null) && (
          <ButtonLarge onClick={() => enhanceWeapon} style={styledEnhanceButton}>
            Enhance item
          </ButtonLarge>
        )}
      </div>
    );
  }
}

EnhancersPanel.propTypes = {
  currentMerchant: PropTypes.number.isRequired,
  character: PropTypes.object.isRequired,
  itemsList: PropTypes.array.isRequired,
  merchants: PropTypes.array.isRequired,
  chooseEnhancer1: PropTypes.func.isRequired,
  chooseEnhancer2: PropTypes.func.isRequired,
  choosedEnhancer1: PropTypes.object.isRequired,
  choosedEnhancer2: PropTypes.object.isRequired,
  slots: PropTypes.number.isRequired,
  enhanceWeapon: PropTypes.func.isRequired,
};

export default EnhancersPanel;
