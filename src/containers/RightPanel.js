import React, { useState } from "react";

import PropTypes from "prop-types";
import firebase from "firebase";
import TeamPanel from "../components/TeamCharacters/TeamPanel";
import {
  widthRightPanel,
  heightHeader,
} from "../components/Utils/StyleConstants";
import CharacterPanel from "../components/CharacterPanel";
import ExchangePanel from "../components/ExchangePanel";
import SongPanel from "../components/SongPanel";
import { connect } from "react-redux";
import { useChatInputContext } from "../contexts/chatInputContext";
import { callListenOtherCharacter } from "../redux/actions/actionsCharacter";

const styles = {
  RightPanel: {
    position: "absolute",
    top: `${heightHeader}px`,
    right: 0,
    borderLeft: "1px solid black",
    width: `${widthRightPanel}px`,
    height: `${window.innerHeight - heightHeader}px`,
  },
};

const RightPanel = props => {
  const [panelState, setPanelState] = useState({
    status: props.character.status ? props.character.status : "OK",
    infoTab: "Weapons",
    damageTaken: 0,
    gold: 0,
    currentExchangeCharacter: null,
    isOnChar: true,
  });
  const { setChatInput } = useChatInputContext();

  const chatWithTeamMember = receiverPseudo => {
    if (receiverPseudo === "GM") {
      setChatInput(`/gmw `);
    } else {
      setChatInput(`/w ${receiverPseudo} `);
    }
  };

  const goldWithTeamMember = receiverPseudo => {
    if (receiverPseudo === "GM") {
      setChatInput(`/goldgm `);
    } else {
      setChatInput(`/gold ${receiverPseudo} `);
    }
  };

  const exchangeWithTeamMember = c => {
    setPanelState({
      ...panelState,
      currentExchangeCharacter: c,
    });
  };

  const onChange = (name, value) => {
    const obj = {};
    obj[name] = value;
    setPanelState({
      ...panelState,
      ...obj,
    });
  };

  const onChangeTab = tab => {
    setPanelState({
      ...panelState,
      infoTab: tab,
    });
  };

  const onLifeChange = () => {
    const {
      character: { health, maxHealth },
      currentStory,
      uid,
      triggerError,
    } = props;
    const { damageTaken } = panelState;

    const healthLeft =
      parseInt(health, 10) + damageTaken < 0
        ? 0
        : parseInt(health, 10) + damageTaken > maxHealth
        ? maxHealth
        : parseInt(health, 10) + damageTaken;
    firebase
      .database()
      .ref(
        "stories/" + currentStory + "/characters/" + uid + "/character/health",
      )
      .set(parseInt(healthLeft, 10))
      .catch(error => {
        // Handle Errors here.
        triggerError(error);
      });
  };

  const onStatusChange = () => {
    const { currentStory, uid, triggerError } = props;
    const { status } = panelState;

    firebase
      .database()
      .ref(
        "stories/" + currentStory + "/characters/" + uid + "/character/status",
      )
      .set(status)
      .catch(error => {
        // Handle Errors here.
        triggerError(error);
      });
  };

  const onItemUse = (i, value) => {
    const { character, currentStory, uid, triggerError } = props;

    if (value > -1) {
      const newCharacterItems = [...character.items];

      if (value > 0) {
        newCharacterItems[i].quantity = value;
      } else {
        newCharacterItems.splice(i, 1);
      }

      const newCharacter = {
        ...character,
        items: newCharacterItems,
      };

      firebase
        .database()
        .ref("stories/" + currentStory + "/characters/" + uid + "/character")
        .set(newCharacter)
        .catch(error => {
          // Handle Errors here.
          triggerError(error);
        });
    }
  };

  const onItemExchange = (i, value, givableItem) => {
    const { currentStory, triggerError } = props;
    const { currentExchangeCharacter } = panelState;

    const newCharacterItems = currentExchangeCharacter.items
      ? [...currentExchangeCharacter.items]
      : [];
    let hasAlready = false;
    if (currentExchangeCharacter.items) {
      currentExchangeCharacter.items.map((item, index) => {
        if (item.name === givableItem.name) {
          hasAlready = true;
          newCharacterItems[index].quantity =
            parseInt(newCharacterItems[index].quantity, 10) + 1;
        }
        return null;
      });
    }
    if (!hasAlready) {
      newCharacterItems.push({ ...givableItem, quantity: 1 });
    }
    currentExchangeCharacter.items = newCharacterItems;

    firebase
      .database()
      .ref(
        "stories/" +
          currentStory +
          "/characters/" +
          currentExchangeCharacter.userUid +
          "/character/items",
      )
      .set(newCharacterItems)
      .then(() => {
        onItemUse(i, value);
      })
      .catch(error => {
        // Handle Errors here.
        triggerError(error);
      });
  };

  const onWeaponExchange = (i, givableItem) => {
    const { character, currentStory, uid, triggerError } = props;
    const { currentExchangeCharacter } = panelState;

    const newCharacterItems = currentExchangeCharacter.weapons
      ? [...currentExchangeCharacter.weapons]
      : [];
    newCharacterItems.push(givableItem);
    currentExchangeCharacter.weapons = newCharacterItems;

    firebase
      .database()
      .ref(
        "stories/" +
          currentStory +
          "/characters/" +
          currentExchangeCharacter.userUid +
          "/character/weapons",
      )
      .set(newCharacterItems)
      .then(() => {
        const newCharacterWeapons = character.weapons;

        newCharacterWeapons.splice(i, 1);

        firebase
          .database()
          .ref("stories/" + currentStory + "/characters/" + uid + "/character")
          .set(character)
          .catch(error => {
            // Handle Errors here.
            triggerError(error);
          });
      })
      .catch(error => {
        // Handle Errors here.
        triggerError(error);
      });
  };

  // for GM only
  const onGoldChange = () => {
    const { character, currentStory, uid, isGameMaster, triggerError } = props;
    const { gold } = panelState;

    if (isGameMaster) {
      const goldToSet = character.gold + gold < 0 ? 0 : character.gold + gold;

      firebase
        .database()
        .ref(
          "stories/" + currentStory + "/characters/" + uid + "/character/gold",
        )
        .set(goldToSet)
        .catch(error => {
          // Handle Errors here.
          triggerError(error);
        });
    }
  };

  const modifyCurrentCharacter = uid => {
    const { currentStory, isGameMaster, dispatchListenCharacter } = props;

    if (isGameMaster) {
      firebase
        .database()
        .ref(
          "stories/" + currentStory + "/characters/" + props.uid + "/character",
        )
        .off();

      dispatchListenCharacter(uid);
    }
  };

  const closeExchange = () => {
    setPanelState({
      ...panelState,
      currentExchangeCharacter: null,
    });
  };

  const toggleIsOnChar = () => {
    setPanelState({
      ...panelState,
      isOnChar: !panelState.isOnChar,
    });
  };

  const { triggerError } = props;

  const {
    status,
    infoTab,
    damageTaken,
    gold,
    currentExchangeCharacter,
    isOnChar,
  } = panelState;

  return (
    <div style={styles.RightPanel}>
      {isOnChar ? (
        <CharacterPanel
          damageTaken={damageTaken}
          gold={gold}
          infoTab={infoTab}
          onChange={onChange}
          onChangeTab={onChangeTab}
          onGoldChange={onGoldChange}
          onItemUse={onItemUse}
          onLifeChange={onLifeChange}
          onStatusChange={onStatusChange}
          toggleIsOnChar={toggleIsOnChar}
          status={status}
          triggerError={triggerError}
        />
      ) : (
        <SongPanel
          toggleIsOnChar={toggleIsOnChar}
        />
      )}
      {currentExchangeCharacter !== null && (
        <ExchangePanel
          closeExchange={closeExchange}
          onItemExchange={onItemExchange}
          onWeaponExchange={onWeaponExchange}
          currentExchangeCharacter={currentExchangeCharacter}
        />
      )}
      <TeamPanel
        chatWithTeamMember={chatWithTeamMember}
        exchangeWithTeamMember={exchangeWithTeamMember}
        goldWithTeamMember={goldWithTeamMember}
        modifyCurrentCharacter={modifyCurrentCharacter}
      />
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchListenCharacter: payload => {
      dispatch(callListenOtherCharacter(payload));
    },
  };
};

const mapStateToProps = store => ({
  currentStory: store.appState.currentStory,
  isGameMaster: store.appState.isGameMaster,
  uid: store.userInfos.uid,
  character: store.character,
  song: store.sounds.song,
});

RightPanel.propTypes = {
  triggerError: PropTypes.func.isRequired,
  dispatchListenCharacter: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RightPanel);
