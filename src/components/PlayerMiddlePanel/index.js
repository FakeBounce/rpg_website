import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ItemDescriptionPanel from '../ItemDescriptionPanel';
import MerchantPanel from '../MerchantPanel';
import ItemPanel from '../ItemPanel';
import QuestPanel from '../QuestPanel';
import { heightLeft, widthLeft } from '../Utils/StyleConstants';
import TempImage from './TempImage';
import EnhancementWeaponsPanel from '../EnhancementWeaponsPanel';
import ShopHeaderBlacksmith from '../ShopHeader/ShopHeaderBlacksmith';
import ShopHeaderEnhancements from '../ShopHeader/ShopHeaderEnhancements';
import ShopHeaderDefault from '../ShopHeader/ShopHeaderDefault';
import EnhancersPanel from '../EnhancersPanel/EnhancersPanel';
import { useSelector } from 'react-redux';
import Cadre from '../Utils/Cadre';
import {
  currentItemsListSelector,
  currentMerchantEnhancementLevelSelector,
  currentMerchantJobSelector,
  currentMerchantRawLevelSelector,
} from '../../selectors';
import useMerchants from '../../hooks/useMerchants';

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

const styledCadreContainer = {
  width: `${widthLeft / 2}px`,
  height: `${heightLeft / 2}px`,
  display: 'inline-block',
  float: 'left',
  textAlign: 'left',
  position: 'relative',
  paddingHorizontal: 10,
};

const styledCadreSecondContainer = {
  width: `${widthLeft / 2 - 20}px`,
  height: `${heightLeft / 2}px`,
  display: 'inline-block',
  float: 'left',
  textAlign: 'left',
  position: 'relative',
  paddingHorizontal: 10,
};

const PlayerMiddlePanel = ({
  buyItem,
  isItemDescriptionShowed,
  itemToDescribe,
  isItemShowed,
  doSetState,
}) => {
  const [currentTab, setCurrentTab] = useState('items');
  const [showEnhancers, setShowEnhancers] = useState(false);
  const [choosedItem, setChoosedItem] = useState(null);
  const [choosedEnhancer1, setChoosedEnhancer1] = useState(null);
  const [choosedEnhancer2, setChoosedEnhancer2] = useState(null);
  const [enhancePrice, setEnhancePrice] = useState(0);

  const {
    character,
    currentMerchant,
    merchants,
    isTownShowed,
    itemsList,
    merchantEnhancementLevel,
    merchantEnhancementJob,
    merchantRawLevel
  } = useSelector(store => ({
    character: store.character,
    currentMerchant: store.merchants.currentMerchant,
    merchants: store.merchants.merchantList,
    isTownShowed: store.mapInfos.isTownShowed,
    itemsList: currentItemsListSelector(store),
    merchantEnhancementLevel: currentMerchantEnhancementLevelSelector(store),
    merchantEnhancementJob: currentMerchantJobSelector(store),
    merchantRawLevel:currentMerchantRawLevelSelector(store),
  }));

  const { enhanceWeapons } = useMerchants();

  useEffect(() => {
    resetTabs();
  }, [currentMerchant]);

  useEffect(() => {
    calculateEnhancePrice();
  }, [choosedItem, choosedEnhancer1, choosedEnhancer2]);

  useEffect(() => {
    if (
      choosedItem !== null &&
      typeof itemsList[choosedItem.index] === 'undefined'
    ) {
      setChoosedItem(null);
      setShowEnhancers(false);
    }
    if (
      choosedEnhancer1 !== null &&
      typeof itemsList[choosedEnhancer1.index] === 'undefined'
    ) {
      setChoosedEnhancer1(null);
    }
    if (
      choosedEnhancer2 !== null &&
      typeof itemsList[choosedEnhancer2.index] === 'undefined'
    ) {
      setChoosedEnhancer2(null);
    }
  }, [itemsList]);

  const resetTabs = () => {
    setShowEnhancers(false);
    setChoosedItem(null);
    setChoosedEnhancer1(null);
    setChoosedEnhancer2(null);
    setEnhancePrice(0);
    doSetState({
      isItemDescriptionShowed: false,
      itemDescribed: 0,
    });
  };

  const changeTab = newTab => {
    setCurrentTab(newTab);
    resetTabs();
  };

  const calculateEnhancePrice = () => {
    let enhancePrice = 0;
    if (showEnhancers) {
      if (choosedItem !== null && choosedItem.isFromMerchant) {
        enhancePrice += parseInt(choosedItem.item.price, 10);
      }

      if (choosedEnhancer1 !== null && choosedEnhancer1.isFromMerchant) {
        enhancePrice += parseInt(choosedEnhancer1.item.price, 10);
      }

      if (choosedEnhancer2 !== null && choosedEnhancer2.isFromMerchant) {
        enhancePrice += parseInt(choosedEnhancer2.item.price, 10);
      }
    }

    if (currentTab === 'enhancements') {
      enhancePrice =
        Math.ceil(
          enhancePrice *
            (0.75 + parseInt(merchantRawLevel * 0.1, 10)),
        ) +
        15 +
        Math.ceil(3 * parseInt(merchantRawLevel, 10));
    } else {
      enhancePrice =
        Math.ceil(
          enhancePrice *
            (1.25 + parseInt(merchantRawLevel * 0.1, 10)),
        ) +
        30 +
        Math.ceil(7 * parseInt(merchantRawLevel, 10));
    }
    setEnhancePrice(enhancePrice);
  };

  const displayEnhancers = (isFromMerchant, item, index) => {
    setShowEnhancers(true);
    setChoosedItem({ item, index, isFromMerchant });
  };

  const chooseEnhancer1 = (isFromMerchant, item, index) => {
    if (choosedEnhancer1 !== null && item.name === choosedEnhancer1.item.name) {
      setChoosedEnhancer1(null);
    } else {
      setChoosedEnhancer1({ item, index, isFromMerchant });
    }
  };

  const chooseEnhancer2 = (isFromMerchant, item, index) => {
    if (choosedEnhancer2 !== null && item.name === choosedEnhancer2.item.name) {
      setChoosedEnhancer2(null);
    } else {
      setChoosedEnhancer2({ item, index, isFromMerchant });
    }
  };

  const enhanceWeapon = () => {
    let newWeapon = choosedItem.item.name ? choosedItem.item.name : choosedItem;
    if (choosedEnhancer1 !== null) {
      newWeapon += ' (' + choosedEnhancer1.item.name + ')';
    }
    if (choosedEnhancer2 !== null) {
      newWeapon += ' (' + choosedEnhancer2.item.name + ')';
    }
    if (currentTab === 'enhancements') {
      newWeapon += ' (T)';
    } else {
      newWeapon += ' (P)';
    }

    const newItemsTab = character.weapons ? [...character.weapons] : [];
    newItemsTab.push(newWeapon);

    const newMerchantList = { ...itemsList };
    if (choosedItem.isFromMerchant) {
      if (newMerchantList[choosedItem.index].quantity > 1) {
        newMerchantList[choosedItem.index].quantity =
          newMerchantList[choosedItem.index].quantity - 1;
      } else {
        delete newMerchantList[choosedItem.index];
      }
    } else {
      delete newItemsTab[choosedItem.index];
    }

    const toSplice = [];
    if (choosedEnhancer1 !== null) {
      if (choosedEnhancer1.isFromMerchant) {
        if (newMerchantList[choosedEnhancer1.index].quantity > 1) {
          newMerchantList[choosedEnhancer1.index].quantity =
            newMerchantList[choosedEnhancer1.index].quantity - 1;
        } else {
          delete newMerchantList[choosedEnhancer1.index];
        }
      } else {
        if (character.items[choosedEnhancer1.index].quantity > 1) {
          character.items[choosedEnhancer1.index].quantity =
            character.items[choosedEnhancer1.index].quantity - 1;
        } else {
          toSplice.push(choosedEnhancer1.index);
        }
      }
    }
    if (choosedEnhancer2 !== null) {
      if (choosedEnhancer2.isFromMerchant) {
        if (newMerchantList[choosedEnhancer2.index].quantity > 1) {
          newMerchantList[choosedEnhancer2.index].quantity =
            newMerchantList[choosedEnhancer2.index].quantity - 1;
        } else {
          delete newMerchantList[choosedEnhancer2.index];
        }
      } else {
        if (character.items[choosedEnhancer2.index].quantity > 1) {
          character.items[choosedEnhancer2.index].quantity =
            character.items[choosedEnhancer2.index].quantity - 1;
        } else {
          if (toSplice.length > 0 && toSplice[0] > choosedEnhancer2.index) {
            toSplice.shift(choosedEnhancer2.index);
          } else {
            toSplice.push(choosedEnhancer2.index);
          }
        }
      }
    }

    if (toSplice.length > 0) {
      toSplice.map(i => character.items.splice(i, 1));
    }

    enhanceWeapons(enhancePrice, newItemsTab, character.items, newMerchantList);
    resetTabs();
  };

  return (
    <div style={styledPlayerMapContainer}>
      {isTownShowed ? (
        <>
          <QuestPanel />
          <MerchantPanel />
          {isItemShowed ? (
            <div style={styledPanelContainer}>
              {merchantEnhancementJob === 'Forgeron' ? (
                <ShopHeaderBlacksmith
                  changeTab={changeTab}
                  currentTab={currentTab}
                />
              ) : parseInt(merchantEnhancementLevel, 10) > 0 ? (
                <ShopHeaderEnhancements
                  changeTab={changeTab}
                  currentTab={currentTab}
                />
              ) : (
                <ShopHeaderDefault />
              )}
              {currentTab === 'items' && <ItemPanel />}
              {currentTab === 'enhancements' && (
                <EnhancementWeaponsPanel
                  choosedItem={choosedItem}
                  showEnhancers={displayEnhancers}
                />
              )}
              {currentTab === 'blacksmith' && (
                <EnhancementWeaponsPanel
                  choosedItem={choosedItem}
                  showEnhancers={displayEnhancers}
                />
              )}
            </div>
          ) : (
            <div style={styledCadreContainer}>
              <Cadre />
            </div>
          )}
          {showEnhancers ? (
            <EnhancersPanel
              enhanceWeapon={enhanceWeapon}
              chooseEnhancer1={chooseEnhancer1}
              chooseEnhancer2={chooseEnhancer2}
              choosedEnhancer1={choosedEnhancer1}
              choosedEnhancer2={choosedEnhancer2}
              enhancePrice={enhancePrice}
              slots={choosedItem.item.slots ? choosedItem.item.slots : 1}
              currentTab={currentTab}
            />
          ) : isItemDescriptionShowed ? (
            <ItemDescriptionPanel
              {...itemToDescribe}
              buyItem={() => buyItem(itemToDescribe, itemToDescribe.price)}
            />
          ) : (
            <div style={styledCadreSecondContainer}>
              <Cadre />
            </div>
          )}
        </>
      ) : (
        <TempImage />
      )}
    </div>
  );
};

PlayerMiddlePanel.propTypes = {
  isItemShowed: PropTypes.bool.isRequired,
  isItemDescriptionShowed: PropTypes.bool.isRequired,
  itemToDescribe: PropTypes.object.isRequired,
  buyItem: PropTypes.func.isRequired,
  doSetState: PropTypes.func.isRequired,
};

export default PlayerMiddlePanel;
