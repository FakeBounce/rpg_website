import React, { useState, useEffect } from "react";

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
import { listenSong } from "../components/Utils/DatabaseFunctions";
import { connect } from "react-redux";

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

  const chatWithTeamMember = receiverPseudo => {
    const { doSetState } = props;
    if (receiverPseudo === "GM") {
      doSetState({
        chatInput: `/gmw `,
      });
    } else {
      doSetState({
        chatInput: `/w ${receiverPseudo} `,
      });
    }
  };

  const goldWithTeamMember = receiverPseudo => {
    const { doSetState } = props;
    if (receiverPseudo === "GM") {
      doSetState({
        chatInput: `/goldgm `,
      });
    } else {
      doSetState({
        chatInput: `/gold ${receiverPseudo} `,
      });
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
    const { character, currentStory, uid, doSetState, triggerError } = props;

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

      doSetState({
        character: newCharacter,
      });

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
    const { currentStory, isGameMaster, doSetState } = props;

    if (isGameMaster) {
      firebase
        .database()
        .ref(
          "stories/" + currentStory + "/characters/" + props.uid + "/character",
        )
        .off();
      firebase
        .database()
        .ref("stories/" + currentStory + "/characters/" + uid + "/character")
        .on("value", snapshot => {
          doSetState({
            uid,
            character: snapshot.val(),
          });
        });
    }
  };

  const closeExchange = () => {
    setPanelState({
      ...panelState,
      currentExchangeCharacter: null,
    });
  };

  const resetSongs = () => {
    const { currentStory } = props;
    firebase
      .database()
      .ref("/stories/" + currentStory + "/song")
      .set({
        songVolume: 50,
        songName: "",
        songStatus: "STOPPED",
      })
      .catch(error => {
        triggerError(error);
      });
  };

  const toggleIsOnChar = () => {
    setPanelState({
      ...panelState,
      isOnChar: !panelState.isOnChar,
    });
  };

  const { triggerError, onChangeMusics } = props;

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
          resetSongs={resetSongs}
          onChangeSongs={onChangeMusics}
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

const mapStateToProps = store => ({
  currentStory: store.appState.currentStory,
  isGameMaster: store.appState.isGameMaster,
  uid: store.userInfos.uid,
  character: store.character,
  song: store.sounds.song,
});

RightPanel.propTypes = {
  doSetState: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  triggerError: PropTypes.func.isRequired,
  onChangeMusics: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(RightPanel);