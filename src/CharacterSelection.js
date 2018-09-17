import React, { Component } from "react";
import "./App.css";

import CharacterCreation from "./CharacterCreation";
import PropTypes from "prop-types";
import ChooseCharacter from "./ChooseCharacter";
import firebase from "firebase";

const styledBoxHeader = {
    width: "100%",
    height: "20px",
    marginBottom: "5px",
    textAlign: "center",
};

class CharacterSelection extends Component {
    getCharacters = () => {
        const { characters } = this.props;
        return Object.keys(characters).map(char => {
            return (
                <ChooseCharacter
                    key={`char-${char.name}`}
                    {...characters[char]}
                    chooseCharacter={this.chooseCharacter}
                />
            );
        });
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
        charToRegister.gold =
            Math.floor(Math.random() * characters[id].luck + 1) * 5;
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

    createCharacter = character => {
        const {
            doSetState,
            characters,
            uid,
            triggerError,
            currentStory,
            chooseStory,
        } = this.props;
        const charTab = characters;
        charTab[character.id] = character;
        doSetState(
            {
                characters: charTab,
                characterId: character.id,
                character: character,
            },
            () => {
                firebase
                    .database()
                    .ref("users/" + uid + "/characters")
                    .set({ ...charTab })
                    .then(() => {
                        firebase
                            .database()
                            .ref(
                                "stories/" +
                                    currentStory +
                                    "/characters/" +
                                    uid,
                            )
                            .set({ character, characterId: character.id })
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

    render() {
        const { uid, characters, characterCreation, triggerError } = this.props;

        if (typeof characters[1] !== "undefined" && !characterCreation) {
            return (
                <div>
                    <div style={styledBoxHeader}>Choisir un personnage</div>
                    <button onClick={this.goToCharacterForm}>
                        Créer un personnage
                    </button>
                    <div style={styledBoxHeader}>Vos personnages :</div>
                    {this.getCharacters()}
                </div>
            );
        } else {
            return (
                <div>
                    <div style={styledBoxHeader}>Créer un personnage</div>
                    <CharacterCreation
                        uid={uid}
                        id={Object.keys(characters).length + 1}
                        createCharacter={this.createCharacter}
                        triggerError={triggerError}
                    />
                </div>
            );
        }
    }
}

CharacterSelection.propTypes = {
    uid: PropTypes.func.isRequired,
    characterCreation: PropTypes.func.isRequired,
    characters: PropTypes.object.isRequired,
    doSetState: PropTypes.func.isRequired,
    triggerError: PropTypes.func.isRequired,
    chooseStory: PropTypes.func.isRequired,
    currentStory: PropTypes.number.isRequired,
};

export default CharacterSelection;
