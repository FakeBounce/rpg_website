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
import firebase from 'firebase';
import { hydrateStoryArtefacts } from './Utils/MerchantsFunctions';

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

  calculateEnhancePrice = price => {
    const { merchants, currentMerchant } = this.props;
    return (
      Math.ceil(
        price * (0.75 + parseInt(merchants[currentMerchant].level * 0.1, 10))
      ) +
      15 +
      Math.ceil(7 * parseInt(merchants[currentMerchant].level, 10))
    );
  };

  showEnhancers = (isFromMerchant, item, index) => {
    const { showEnhancers, choosedEnhancer1, choosedEnhancer2 } = this.state;

    let enhancePrice = 0;
    if (showEnhancers) {
      if (isFromMerchant) {
        enhancePrice += parseInt(item.price, 10);
      }

      if (choosedEnhancer1 !== null && choosedEnhancer1.isFromMerchant) {
        enhancePrice += parseInt(choosedEnhancer1.item.price, 10);
      }

      if (choosedEnhancer2 !== null && choosedEnhancer2.isFromMerchant) {
        enhancePrice += parseInt(choosedEnhancer2.item.price, 10);
      }
    }
    enhancePrice = this.calculateEnhancePrice(enhancePrice);
    this.setState(state => ({
      ...state,
      showEnhancers: true,
      choosedItem: { item, index, isFromMerchant },
      itemIndex: index,
      enhancePrice,
    }));
  };

  chooseEnhancer1 = (isFromMerchant, item, index) => {
    const { choosedItem, choosedEnhancer1, choosedEnhancer2 } = this.state;

    if (choosedEnhancer1 !== null && item.name === choosedEnhancer1.item.name) {
      let enhancePrice = 0;

      if (choosedItem.isFromMerchant) {
        enhancePrice += parseInt(choosedItem.item.price, 10);
      }

      if (choosedEnhancer2 !== null && choosedEnhancer2.isFromMerchant) {
        enhancePrice += parseInt(choosedEnhancer2.item.price, 10);
      }
      enhancePrice = this.calculateEnhancePrice(enhancePrice);

      this.setState(state => ({
        ...state,
        choosedEnhancer1: null,
        enhancePrice,
      }));
    } else {
      let enhancePrice = 0;

      if (choosedItem.isFromMerchant) {
        enhancePrice += parseInt(choosedItem.item.price, 10);
      }

      if (choosedEnhancer2 !== null && choosedEnhancer2.isFromMerchant) {
        enhancePrice += parseInt(choosedEnhancer2.item.price, 10);
      }

      enhancePrice += parseInt(item.price, 10);
      enhancePrice = this.calculateEnhancePrice(enhancePrice);

      this.setState(state => ({
        ...state,
        choosedEnhancer1: { item, index, isFromMerchant },
        enhancer1Index: index,
        enhancePrice,
      }));
    }
  };

  chooseEnhancer2 = (isFromMerchant, item, index) => {
    const { choosedItem, choosedEnhancer1, choosedEnhancer2 } = this.state;

    if (choosedEnhancer2 !== null && item.name === choosedEnhancer2.name) {
      let enhancePrice = 0;

      if (choosedItem.isFromMerchant) {
        enhancePrice += parseInt(choosedItem.item.price, 10);
      }

      if (choosedEnhancer1 !== null && choosedEnhancer1.isFromMerchant) {
        enhancePrice += parseInt(choosedEnhancer1.item.price, 10);
      }
      enhancePrice = this.calculateEnhancePrice(enhancePrice);

      this.setState(state => ({
        ...state,
        choosedEnhancer2: null,
        enhancePrice,
      }));
    } else {
      let enhancePrice = 0;

      if (isFromMerchant) {
        enhancePrice += parseInt(choosedItem.item.price, 10);
      }

      if (choosedEnhancer1 !== null && choosedEnhancer1.isFromMerchant) {
        enhancePrice += parseInt(choosedEnhancer1.item.price, 10);
      }

      enhancePrice += parseInt(item.price, 10);
      enhancePrice = this.calculateEnhancePrice(enhancePrice);

      this.setState(state => ({
        ...state,
        choosedEnhancer2: { item, index, isFromMerchant },
        enhancer2Index: index,
        enhancePrice,
      }));
    }
  };

  enhanceWeapon = () => {
    const {
      choosedItem,
      choosedEnhancer1,
      choosedEnhancer2,
      enhancePrice,
    } = this.state;

    const {
      currentStory,
      currentMerchant,
      merchants,
      uid,
      character,
      itemsList,
      doSetState,
      triggerError,
    } = this.props;

    let newWeapon = choosedItem.item.name ? choosedItem.item.name : choosedItem;
    if (choosedEnhancer1 !== null) {
      newWeapon += ' (' + choosedEnhancer1.item.name + ')';
    }
    if (choosedEnhancer2 !== null) {
      newWeapon += ' (' + choosedEnhancer2.item.name + ')';
    }

    const newItemsTab = character.weapons ? [...character.weapons] : [];
    newItemsTab.push(newWeapon);

    const newMerchantList = [...itemsList];
    if (choosedItem.isFromMerchant) {
      if (newMerchantList[choosedItem.index].quantity > 1) {
        newMerchantList[choosedItem.index].quantity =
          newMerchantList[choosedItem.index].quantity - 1;
      } else {
        newMerchantList.splice(choosedItem.index, 1);
      }
    }
    if (choosedEnhancer1 !== null) {
      if (choosedEnhancer1.isFromMerchant) {
        if (newMerchantList[choosedEnhancer1.index].quantity > 1) {
          newMerchantList[choosedEnhancer1.index].quantity =
            newMerchantList[choosedEnhancer1.index].quantity - 1;
        } else {
          newMerchantList.splice(choosedEnhancer1.index, 1);
        }
      }
    }
    if (choosedEnhancer2 !== null) {
      if (choosedEnhancer2.isFromMerchant) {
        if (newMerchantList[choosedEnhancer2.index].quantity > 1) {
          newMerchantList[choosedEnhancer2.index].quantity =
            newMerchantList[choosedEnhancer2.index].quantity - 1;
        } else {
          newMerchantList.splice(choosedEnhancer2.index, 1);
        }
      }
    }

    const newMerchants = [...merchants];
    newMerchants[currentMerchant].items = newMerchantList;

    doSetState(
      {
        itemsList: newMerchantList,
        merchants: newMerchants,
      },
      () => {
        firebase
          .database()
          .ref('stories/' + currentStory + '/characters/' + uid + '/character')
          .set({
            ...character,
            gold: character.gold - enhancePrice,
            weapons: newItemsTab,
          })
          .then(() => {
            firebase
              .database()
              .ref('stories/' + currentStory + '/merchants/' + currentMerchant)
              .set(newMerchants[currentMerchant]);
            this.setState(state => ({
              ...state,
              showEnhancers: false,
              choosedItem: null,
              choosedEnhancer1: null,
              choosedEnhancer2: null,
              enhancePrice: 0,
            }));
          })
          .catch(error => {
            // Handle Errors here.
            triggerError(error);
          });
      }
    );
  };

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
                slots={choosedItem.item.slots ? choosedItem.item.slots : 1}
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
  currentStory: PropTypes.number.isRequired,
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
