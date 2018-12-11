import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import ItemDescriptionPanel from './ItemDescriptionPanel/ItemDescriptionPanel';
import MerchantPanel from './MerchantPanel/MerchantPanel';
import ItemPanel from './ItemPanel/ItemPanel';
import QuestPanel from './QuestPanel/QuestPanel';
import { heightLeft, widthLeft } from './Utils/StyleConstants';
import TempImage from './TempImage';
import Cadre from './Utils/Cadre';
import Item from './ItemPanel/Item';
import EnhancementWeaponsPanel from './EnhancementWeaponsPanel/EnhancementWeaponsPanel';
import ShopHeaderBlacksmith from './ShopHeader/ShopHeaderBlacksmith';
import ShopHeaderEnhancements from './ShopHeader/ShopHeaderEnhancements';
import ShopHeaderDefault from './ShopHeader/ShopHeaderDefault';
import EnhancersPanel from './EnhancersPanel/EnhancersPanel';

const styledPlayerMapContainer = {
  float: 'left',
  width: `${widthLeft}px`,
  height: `${heightLeft}px`,
  display: 'inline-block',
  position: 'relative',
};

const styledPanelContainer = {
  width: `${widthLeft / 2}px`,
  height: `${heightLeft / 2}px`,
  display: 'inline-block',
  float: 'left',
  position: 'relative',
};

class PlayerMapPanel extends Component {
  state = {
    currentTab: 'items',
    showEnhancers: false,
    isFromMerchant: false,
    choosedItem: null,
    choosedEnhancer1: null,
    choosedEnhancer2: null,
    enhancePrice: 0,
  };

  changeTab = newTab => {
    this.setState(
      state => ({
        ...state,
        currentTab: newTab,
        showEnhancers: false,
        isFromMerchant: false,
        choosedItem: null,
      }),
      () => {
        this.props.doSetState({
          isItemDescriptionShowed: false,
          itemDescribed: 0,
        });
      }
    );
  };

  showEnhancers = (isFromMerchant, item) => {
    const { showEnhancers, choosedEnhancer1, choosedEnhancer2 } = this.state;
    const { currentMerchant, merchants } = this.props;

    let enhancePrice = 0;
    if (showEnhancers) {
      if (isFromMerchant) {
        enhancePrice += parseInt(item.price, 10);
      }

      if (choosedEnhancer2 !== null) {
        enhancePrice += parseInt(choosedEnhancer2.price, 10);
      }

      if (choosedEnhancer1 !== null) {
        enhancePrice += parseInt(choosedEnhancer1.price, 10);
      }
    }
    enhancePrice = Math.ceil(
      enhancePrice *
        (0.8 + parseInt(merchants[currentMerchant].level * 0.1, 10))
    );
    this.setState(state => ({
      ...state,
      showEnhancers: true,
      isFromMerchant,
      choosedItem: item,
      enhancePrice,
    }));
  };

  chooseEnhancer1 = item => {
    const {
      isFromMerchant,
      choosedItem,
      choosedEnhancer1,
      choosedEnhancer2,
    } = this.state;
    const { currentMerchant, merchants } = this.props;

    if (choosedEnhancer1 && item.name === choosedEnhancer1.name) {
      let enhancePrice = 0;

      if (isFromMerchant) {
        enhancePrice += parseInt(choosedItem.price, 10);
      }

      if (choosedEnhancer2 !== null) {
        enhancePrice += parseInt(choosedEnhancer2.price, 10);
      }
      enhancePrice = Math.ceil(
        enhancePrice *
          (0.8 + parseInt(merchants[currentMerchant].level * 0.1, 10))
      );

      this.setState(state => ({
        ...state,
        choosedEnhancer1: null,
        enhancePrice,
      }));
    } else {
      let enhancePrice = 0;

      if (isFromMerchant) {
        enhancePrice += parseInt(choosedItem.price, 10);
      }

      if (choosedEnhancer2 !== null) {
        enhancePrice += parseInt(choosedEnhancer2.price, 10);
      }

      enhancePrice += parseInt(item.price, 10);
      enhancePrice = Math.ceil(
        enhancePrice *
          (0.8 + parseInt(merchants[currentMerchant].level * 0.1, 10))
      );

      this.setState(state => ({
        ...state,
        choosedEnhancer1: item,
        enhancePrice,
      }));
    }
  };

  chooseEnhancer2 = item => {
    const {
      isFromMerchant,
      choosedItem,
      choosedEnhancer1,
      choosedEnhancer2,
    } = this.state;
    const { currentMerchant, merchants } = this.props;

    if (choosedEnhancer2 && item.name === choosedEnhancer2.name) {
      let enhancePrice = 0;

      if (isFromMerchant) {
        enhancePrice += parseInt(choosedItem.price, 10);
      }

      if (choosedEnhancer1 !== null) {
        enhancePrice += parseInt(choosedEnhancer1.price, 10);
      }
      enhancePrice = Math.ceil(
        enhancePrice *
          (0.8 + parseInt(merchants[currentMerchant].level * 0.1, 10))
      );

      this.setState(state => ({
        ...state,
        choosedEnhancer2: null,
        enhancePrice,
      }));
    } else {
      let enhancePrice = 0;

      if (isFromMerchant) {
        enhancePrice += parseInt(choosedItem.price, 10);
      }

      if (choosedEnhancer1 !== null) {
        enhancePrice += parseInt(choosedEnhancer1.price, 10);
      }

      enhancePrice += parseInt(item.price, 10);
      enhancePrice = Math.ceil(
        enhancePrice *
          (0.8 + parseInt(merchants[currentMerchant].level * 0.1, 10))
      );

      this.setState(state => ({
        ...state,
        choosedEnhancer2: item,
        enhancePrice,
      }));
    }
  };

  enhanceWeapon = () => {};

  render() {
    const {
      character,
      isItemShowed,
      itemsList,
      isItemDescriptionShowed,
      itemToDescribe,
      isTownShowed,
      isGameMaster,
      merchantsList,
      quests,
      questsList,
      buyItem,
      currentQuest,
      isQuestShowed,
      merchants,
      doSetState,
      currentMerchant,
    } = this.props;

    const {
      currentTab,
      showEnhancers,
      isFromMerchant,
      choosedItem,
      choosedEnhancer1,
      choosedEnhancer2,
      enhancePrice,
    } = this.state;

    return (
      <div style={styledPlayerMapContainer}>
        {isTownShowed ? (
          <Fragment>
            <QuestPanel
              isQuestShowed={isQuestShowed}
              currentQuest={currentQuest}
              quests={quests}
              questsList={questsList}
              doSetState={doSetState}
            />
            <MerchantPanel
              currentMerchant={currentMerchant}
              merchantsList={merchantsList}
              merchants={merchants}
              doSetState={doSetState}
            />
            {isItemShowed && (
              <div style={styledPanelContainer}>
                {merchants[currentMerchant].job === 'Forgeron' ? (
                  <ShopHeaderBlacksmith changeTab={this.changeTab} />
                ) : parseInt(merchants[currentMerchant].enhancements, 10) >
                0 ? (
                  <ShopHeaderEnhancements changeTab={this.changeTab} />
                ) : (
                  <ShopHeaderDefault />
                )}
                {currentTab === 'items' && (
                  <ItemPanel
                    currentMerchant={currentMerchant}
                    character={character}
                    itemsList={itemsList}
                    merchants={merchants}
                    doSetState={doSetState}
                  />
                )}
                {currentTab === 'enhancements' && (
                  <EnhancementWeaponsPanel
                    currentMerchant={currentMerchant}
                    character={character}
                    isFromMerchant={isFromMerchant}
                    choosedItem={choosedItem}
                    showEnhancers={this.showEnhancers}
                    merchants={merchants}
                    itemsList={itemsList}
                  />
                )}
                {currentTab === 'blacksmith' && (
                  <ItemPanel
                    currentMerchant={currentMerchant}
                    character={character}
                    itemsList={itemsList}
                    merchants={merchants}
                    doSetState={doSetState}
                  />
                )}
              </div>
            )}
            {showEnhancers && (
              <EnhancersPanel
                currentMerchant={currentMerchant}
                character={character}
                itemsList={itemsList}
                merchants={merchants}
                enhanceWeapon={this.enhanceWeapon}
                chooseEnhancer1={this.chooseEnhancer1}
                chooseEnhancer2={this.chooseEnhancer2}
                choosedEnhancer1={choosedEnhancer1}
                choosedEnhancer2={choosedEnhancer2}
                enhancePrice={enhancePrice}
                slots={choosedItem.slots ? choosedItem.slots : 1}
              />
            )}
            {isItemDescriptionShowed && (
              <ItemDescriptionPanel
                {...itemToDescribe}
                buyItem={() => buyItem(itemToDescribe, itemToDescribe.price)}
                gold={character.gold}
                isHidden={character.education < itemToDescribe.rarity * 9}
              />
            )}
          </Fragment>
        ) : (
          <TempImage isGameMaster={isGameMaster} />
        )}
      </div>
    );
  }
}

PlayerMapPanel.propTypes = {
  isQuestShowed: PropTypes.bool.isRequired,
  currentQuest: PropTypes.number.isRequired,
  currentMerchant: PropTypes.number.isRequired,
  character: PropTypes.object.isRequired,
  isItemShowed: PropTypes.bool.isRequired,
  itemsList: PropTypes.array.isRequired,
  isItemDescriptionShowed: PropTypes.bool.isRequired,
  itemToDescribe: PropTypes.object.isRequired,
  isTownShowed: PropTypes.bool.isRequired,
  merchantsList: PropTypes.array.isRequired,
  merchants: PropTypes.array.isRequired,
  quests: PropTypes.array.isRequired,
  questsList: PropTypes.array.isRequired,
  buyItem: PropTypes.func.isRequired,
  doSetState: PropTypes.func.isRequired,
  triggerError: PropTypes.func.isRequired,
  isGameMaster: PropTypes.bool.isRequired,
};

export default PlayerMapPanel;
