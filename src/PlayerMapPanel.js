import React, { Component } from "react";
import PropTypes from "prop-types";

import ItemDescriptionPanel from "./ItemDescriptionPanel/ItemDescriptionPanel";
import MerchantPanel from "./MerchantPanel/MerchantPanel";
import ItemPanel from "./ItemPanel/ItemPanel";
import QuestPanel from "./QuestPanel/QuestPanel";
import { widthLeft } from "./Utils/StyleConstants";

class PlayerMapPanel extends Component {
  render() {
    const {
      character,
      isItemShowed,
      itemsList,
      isItemDescriptionShowed,
      itemToDescribe,
      isTownShowed,
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

    return (
      <div
        style={{
          float: "left",
          width: `${widthLeft}px`,
          display: "inline-block",
          position: "relative",
        }}
      >
        {isTownShowed && (
          <QuestPanel
            isQuestShowed={isQuestShowed}
            currentQuest={currentQuest}
            quests={quests}
            questsList={questsList}
            doSetState={doSetState}
          />
        )}
        {isTownShowed && (
          <MerchantPanel
            currentMerchant={currentMerchant}
            merchantsList={merchantsList}
            merchants={merchants}
            doSetState={doSetState}
          />
        )}
        {isItemShowed && (
          <ItemPanel
            currentMerchant={currentMerchant}
            character={character}
            itemsList={itemsList}
            merchants={merchants}
            doSetState={doSetState}
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
};

export default PlayerMapPanel;
