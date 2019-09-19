import React, { Component } from "react";

import PropTypes from "prop-types";
import firebase from "firebase";
import TeamPanel from "./TeamCharacters/TeamPanel";
import { widthRightPanel, heightHeader } from "./Utils/StyleConstants";
import CharacterPanel from "./CharacterPanel/CharacterPanel";
import ExchangePanel from "./ExchangePanel/ExchangePanel";
import SongPanel from "./SongPanel/SongPanel";
import { listenSong } from "./Utils/DatabaseFunctions";

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

class RightPanel extends Component {
  state = {
    status: this.props.character.status ? this.props.character.status : "OK",
    infoTab: "Weapons",
    damageTaken: 0,
    gold: 0,
    currentExchangeCharacter: null,
    isOnChar: true,
    songName: "",
    songStatus: "PAUSED",
    songVolume: 50,
  };

  componentDidMount() {
    listenSong(this.props.currentStory, this.doSetState);
  }

  doSetState = obj => {
    this.setState(state => ({
      ...state,
      ...obj,
    }));
  };

  chatWithTeamMember = pseudo => {
    if (pseudo === "GM") {
      this.props.doSetState({
        chatInput: `/gmw `,
      });
    } else {
      this.props.doSetState({
        chatInput: `/w ${pseudo} `,
      });
    }
  };

  goldWithTeamMember = pseudo => {
    if (pseudo === "GM") {
      this.props.doSetState({
        chatInput: `/goldgm `,
      });
    } else {
      this.props.doSetState({
        chatInput: `/gold ${pseudo} `,
      });
    }
  };

  exchangeWithTeamMember = character => {
    this.setState(state => ({
      ...state,
      currentExchangeCharacter: character,
    }));
  };

  onChange = (name, value) => {
    const obj = {};
    obj[name] = value;
    this.setState(state => ({
      ...state,
      ...obj,
    }));
  };

  onChangeTab = tab => {
    this.setState(state => ({
      ...state,
      infoTab: tab,
    }));
  };

  onLifeChange = () => {
    const {
      character: { health, maxHealth },
      currentStory,
      uid,
      triggerError,
    } = this.props;
    const { damageTaken } = this.state;

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

  onStatusChange = () => {
    const { currentStory, uid, triggerError } = this.props;
    const { status } = this.state;

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

  onItemUse = (i, value) => {
    const {
      character,
      currentStory,
      uid,
      doSetState,
      triggerError,
    } = this.props;

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

  onItemExchange = (i, value, givableItem) => {
    const { currentStory, triggerError } = this.props;
    const { currentExchangeCharacter } = this.state;

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
        this.onItemUse(i, value);
      })
      .catch(error => {
        // Handle Errors here.
        triggerError(error);
      });
  };

  onWeaponExchange = (i, givableItem) => {
    const { character, currentStory, uid, triggerError } = this.props;
    const { currentExchangeCharacter } = this.state;

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
  onGoldChange = () => {
    const {
      character,
      currentStory,
      uid,
      isGameMaster,
      triggerError,
    } = this.props;
    const { gold } = this.state;

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

  modifyCurrentCharacter = uid => {
    const { currentStory, isGameMaster, doSetState } = this.props;

    if (isGameMaster) {
      firebase
        .database()
        .ref(
          "stories/" +
            currentStory +
            "/characters/" +
            this.props.uid +
            "/character",
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

  closeExchange = () => {
    this.setState(state => ({
      ...state,
      currentExchangeCharacter: null,
    }));
  };

  resetSongs = () => {
    const { currentStory } = this.props;
    firebase
      .database()
      .ref("/stories/" + currentStory + "/song")
      .set({
        songVolume: 50,
        songName: "",
        songStatus: "STOPPED",
      })
      .catch(error => {
        this.triggerError(error);
      });
  };

  changeCurrentNoise = n => {
    const { onChangeMusics } = this.props;
    onChangeMusics("songName", n);
    onChangeMusics("songStatus", "PLAYING");
  };

  toggleIsOnChar = () => {
    this.setState(state => ({
      ...state,
      isOnChar: !state.isOnChar,
    }));
  };

  render() {
    const {
      uid,
      character,
      gameMaster,
      isGameMaster,
      storyCharacters,
      triggerError,
      currentStory,
      onChangeMusics,
    } = this.props;

    const {
      status,
      infoTab,
      damageTaken,
      gold,
      currentExchangeCharacter,
      isOnChar,
      songName,
      songVolume,
    } = this.state;

    return (
      <div style={styles.RightPanel}>
        {isOnChar ? (
          <CharacterPanel
            character={character}
            damageTaken={damageTaken}
            gold={gold}
            infoTab={infoTab}
            isGameMaster={isGameMaster}
            onChange={this.onChange}
            onChangeTab={this.onChangeTab}
            onGoldChange={this.onGoldChange}
            onItemUse={this.onItemUse}
            onLifeChange={this.onLifeChange}
            onStatusChange={this.onStatusChange}
            toggleIsOnChar={this.toggleIsOnChar}
            status={status}
            triggerError={triggerError}
            uid={uid}
            currentStory={currentStory}
          />
        ) : (
          <SongPanel
            resetSongs={this.resetSongs}
            songName={songName}
            songVolume={songVolume}
            onChangeSongs={onChangeMusics}
            toggleIsOnChar={this.toggleIsOnChar}
          />
        )}
        {currentExchangeCharacter !== null && (
          <ExchangePanel
            closeExchange={this.closeExchange}
            onItemExchange={this.onItemExchange}
            onWeaponExchange={this.onWeaponExchange}
            currentExchangeCharacter={currentExchangeCharacter}
            character={character}
          />
        )}
        <TeamPanel
          chatWithTeamMember={this.chatWithTeamMember}
          exchangeWithTeamMember={this.exchangeWithTeamMember}
          gameMaster={gameMaster}
          goldWithTeamMember={this.goldWithTeamMember}
          isGameMaster={isGameMaster}
          modifyCurrentCharacter={this.modifyCurrentCharacter}
          storyCharacters={storyCharacters}
        />
      </div>
    );
  }
}

RightPanel.propTypes = {
  character: PropTypes.object.isRequired,
  chatInput: PropTypes.string.isRequired,
  currentStory: PropTypes.number.isRequired,
  doSetState: PropTypes.func.isRequired,
  gameMaster: PropTypes.string.isRequired,
  isGameMaster: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  pseudo: PropTypes.string.isRequired,
  storyCharacters: PropTypes.array.isRequired,
  triggerError: PropTypes.func.isRequired,
  uid: PropTypes.string.isRequired,
  onChangeMusics: PropTypes.func.isRequired,
};

export default RightPanel;
