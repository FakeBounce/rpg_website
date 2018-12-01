import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import ItemDescriptionPanel from "./ItemDescriptionPanel/ItemDescriptionPanel";
import MerchantPanel from "./MerchantPanel/MerchantPanel";
import ItemPanel from "./ItemPanel/ItemPanel";
import QuestPanel from "./QuestPanel/QuestPanel";
import { heightHeader, widthLeft } from "./Utils/StyleConstants";
import ButtonLarge from "./Utils/ButtonLarge";
import { tempoImagesList } from "./Utils/Constants";
import firebase from "firebase";

class PlayerMapPanel extends Component {
  state = {
    tempImage: "noTown.jpg",
  };

  componentDidMount() {
    firebase
      .database()
      .ref("stories/" + 0 + "/tempoImage")
      .on("value", snapshot => {
        this.setState(state => ({
          ...state,
          tempImage: snapshot.val(),
        }));
      });
  }

  onChange = value => {
    firebase
      .database()
      .ref("stories/" + 0 + "/tempoImage")
      .set(value)
      .catch(error => {
        // Handle Errors here.
        this.triggerError(error);
      });
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

    const { tempImage } = this.state;

    return (
      <div
        style={{
          float: "left",
          width: `${widthLeft}px`,
          height: `${window.innerHeight - heightHeader}px`,
          display: "inline-block",
          position: "relative",
        }}
      >
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
          </Fragment>
        ) : (
          <Fragment>
            {isGameMaster && (
              <select
                value={tempImage}
                onChange={e => {
                  this.onChange(e.target.value);
                }}
                style={{
                  position: "absolute",
                  zIndex: 1,
                }}
              >
                {tempoImagesList.map(sts => {
                  return (
                    <option key={sts} value={sts}>
                      {sts}
                    </option>
                  );
                })}
              </select>
            )}
            <img
              src={"./common/"+tempImage}
              style={{
                float: "left",
                width: `${widthLeft}px`,
                height: `${window.innerHeight - heightHeader}px`,
                display: "inline-block",
                position: "relative",
              }}
            />
          </Fragment>
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
