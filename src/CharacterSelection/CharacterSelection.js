import React, { Component } from "react";

import CharacterCreationPanel from "../CharacterCreation/CharacterCreationPanel";
import PropTypes from "prop-types";
import CharacterPreview from "./CharacterPreview";
import firebase from "firebase";
import ButtonLarge from "../Utils/ButtonLarge";

const styledBoxHeader = {
  width: "100%",
  height: 60,
  marginBottom: 5,
  paddingTop: 10,
  paddingBottom: 10,
};

const styledBoxBack = {
  width: 250,
  height: 20,
  marginBottom: 25,
  textAlign: "center",
};

const styledSideHeaders = {
  width: "25%",
  height: "100%",
  display: "inline-block",
  float: "left",
};

const styledCenterHeader = {
  width: "50%",
  height: "100%",
  display: "inline-block",
  float: "left",
  position: "relative",
};

class CharacterSelection extends Component {
  state = {
    isAnUpdate: false,
    updateCharacterId: 0,
  };

  getCharacters = () => {
    const { characters } = this.props;
    return Object.keys(characters).map(char => {
      return (
        <CharacterPreview
          key={`char-${char.name}`}
          {...characters[char]}
          chooseCharacter={this.chooseCharacter}
          modifyCharacter={this.modifyCharacter}
        />
      );
    });
  };

  modifyCharacter = id => {
    this.setState(
      state => ({
        ...state,
        isAnUpdate: true,
        updateCharacterId: id,
      }),
      () => {
        this.props.doSetState({
          characterCreation: true,
        });
      },
    );
  };

  chooseCharacter = id => {
    const {
      characters,
      chooseStory,
      currentStory,
      uid,
      triggerError,
      doSetState,
    } = this.props;

    const charToRegister = characters[id];
    charToRegister.gold = Math.floor(
      Math.random() * characters[id].luck * 5 + 5,
    );
    charToRegister.status = "OK";

    firebase
      .database()
      .ref("stories/" + currentStory + "/characters/" + uid)
      .set({ character: charToRegister, characterId: id })
      .then(() => {
        doSetState(
          {
            character: charToRegister,
            characterId: id,
          },
          () => {
            chooseStory(currentStory);
          },
        );
      })
      .catch(error => {
        // Handle Errors here.
        triggerError(error);
      });
  };

  goToCharacterForm = () => {
    this.props.doSetState({
      characterCreation: true,
    });
  };

  updateCharacter = character => {
    const {
      doSetState,
      uid,
      characters,
      currentStory,
      chooseStory,
      triggerError,
    } = this.props;
    this.setState(
      state => ({
        ...state,
        isAnUpdate: true,
        updateCharacterId: 0,
      }),
      () => {
        const charTab = characters;
        charTab[character.id] = character;
        doSetState(
          {
            characters: charTab,
            characterId: character.id,
            character,
          },
          () => {
            firebase
              .database()
              .ref("users/" + uid + "/characters")
              .set({ ...charTab })
              .then(() => {
                firebase
                  .database()
                  .ref("stories/" + currentStory + "/characters/" + uid)
                  .set({
                    character,
                    characterId: character.id,
                  })
                  .then(() => {
                    chooseStory(currentStory);
                  })
                  .catch(error => {
                    // Handle Errors here.
                    triggerError(error);
                  });
              })
              .catch(error => {
                // Handle Errors here.
                triggerError(error);
              });
          },
        );
      },
    );
  };

  createCharacter = character => {
    const {
      doSetState,
      characters,
      uid,
      pseudo,
      triggerError,
      currentStory,
      chooseStory,
    } = this.props;
    const charTab = characters;

    const charToRegister = character;
    charToRegister.gold = Math.floor(Math.random() * character.luck + 1) * 5;
    charToRegister.status = "OK";
    charToRegister.userPseudo = pseudo;
    charToRegister.userUid = uid;

    charTab[character.id] = charToRegister;
    doSetState(
      {
        characters: charTab,
        characterId: character.id,
        character: charToRegister,
      },
      () => {
        firebase
          .database()
          .ref("users/" + uid + "/characters")
          .set({ ...charTab })
          .then(() => {
            firebase
              .database()
              .ref("stories/" + currentStory + "/characters/" + uid)
              .set({
                character: charToRegister,
                characterId: character.id,
              })
              .then(() => {
                chooseStory(currentStory);
              })
              .catch(error => {
                // Handle Errors here.
                triggerError(error);
              });
          })
          .catch(error => {
            // Handle Errors here.
            triggerError(error);
          });
      },
    );
  };

  resetStory = () => {
    const { chooseStory } = this.props;

    chooseStory(-1);
  };

  render() {
    const { isAnUpdate, updateCharacterId } = this.state;
    const {
      characterCreation,
      characters,
      keepCharacter,
      signOut,
      triggerError,
      uid,
    } = this.props;

    if (typeof characters[1] !== "undefined" && !characterCreation) {
      return (
        <div>
          <button style={styledBoxBack} onClick={keepCharacter}>
            Retourner sur l'histoire
          </button>
          <div style={styledBoxHeader}>Choisir un personnage</div>
          <button onClick={this.goToCharacterForm}>Créer un personnage</button>
          <div style={styledBoxHeader}>Vos personnages :</div>
          {this.getCharacters()}
        </div>
      );
    }

    return (
      <div
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <div style={styledBoxHeader}>
          <div style={styledSideHeaders}>
            <ButtonLarge onClick={this.resetStory}>
              Select another story
            </ButtonLarge>
          </div>
          <div style={styledCenterHeader}>
            {isAnUpdate ? "Update a character" : "Create a character"}
          </div>
          <div style={styledSideHeaders}>
            <ButtonLarge onClick={signOut}>Log out</ButtonLarge>
          </div>
        </div>
        <CharacterCreationPanel
          uid={uid}
          id={
            isAnUpdate ? updateCharacterId : Object.keys(characters).length + 1
          }
          createCharacter={this.createCharacter}
          updateCharacter={this.updateCharacter}
          triggerError={triggerError}
          isAnUpdate={isAnUpdate}
          character={isAnUpdate ? { ...characters[updateCharacterId] } : {}}
        />
      </div>
    );
  }
}

CharacterSelection.propTypes = {
  characterCreation: PropTypes.bool.isRequired,
  characters: PropTypes.object.isRequired,
  chooseStory: PropTypes.func.isRequired,
  currentStory: PropTypes.number.isRequired,
  doSetState: PropTypes.func.isRequired,
  keepCharacter: PropTypes.func.isRequired,
  pseudo: PropTypes.string.isRequired,
  signOut: PropTypes.func.isRequired,
  triggerError: PropTypes.func.isRequired,
  uid: PropTypes.string.isRequired,
};

export default CharacterSelection;
