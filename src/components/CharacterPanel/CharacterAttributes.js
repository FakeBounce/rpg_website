import React, { useState } from "react";
import { useSelector } from "react-redux";
import { cursorPointer, heightLeft, imageSize } from "../Utils/StyleConstants";
import { attributes } from "../Utils/Constants";
import firebase from "firebase";
import ButtonLarge from "../Utils/ButtonLarge";

const styles = {
  BoxHeader: {
    width: "100%",
    height: "20px",
    marginBottom: "5px",
    textAlign: "center",
  },
  characterAttributeInfos: {
    width: `${imageSize - 1}px`,
    height: `${heightLeft / 2 - imageSize}px`,
    position: "relative",
    float: "left",
    display: "inline-block",
    borderRight: "1px solid black",
    overflowY: "auto",
  },
};
const styledAttribute = {
  marginLeft: 5,
  float: "left",
  display: "inline-block",
  textTransform: "capitalize",
};
const styledAttributeGM = {
  marginLeft: 5,
  float: "left",
  display: "inline-block",
  textTransform: "capitalize",
  cursor: cursorPointer,
};
const styledButton = {
  width: `${imageSize - 1}px`,
};
const styledInput = { width: 30 };

const CharacterAttributes = () => {
  const [currentAttribute, setCurrentAttribute] = useState("");
  const [currentValue, setCurrentValue] = useState(0);

  const { currentStory, isGameMaster, character } = useSelector(store => ({
    currentStory: store.appState.currentStory,
    isGameMaster: store.appState.isGameMaster,
    character: store.character,
  }));

  const onChange = value => {
    setCurrentValue(value === "" ? 0 : parseInt(value, 10));
  };

  const onClick = (name, value) => {
    setCurrentValue(value);
    setCurrentAttribute(name);
  };

  const validate = () => {
    firebase
      .database()
      .ref(
        "stories/" +
          currentStory +
          "/characters/" +
          character.userUid +
          "/character/" +
          currentAttribute,
      )
      .set(currentValue)
      .then(() => {
        onClick("", 0);
      })
      .catch(error => {
        // Handle Errors here.
        console.log("error", error);
      });
  };

  if (!character || !character.attributes) return null;

  return (
    <div style={styles.characterAttributeInfos}>
      <div style={styles.BoxHeader}>Attributes :</div>
      {attributes.map(a => {
        const label = a.substring(0, 4);
        return (
          <div
            style={isGameMaster ? styledAttributeGM : styledAttribute}
            onClick={() => onClick(a, character.attributes[a])}
            key={"character-attribute-" + a}
          >
            {label} :{" "}
            {isGameMaster && currentAttribute === a ? (
              <input
                name={a}
                value={currentValue}
                type="number"
                style={styledInput}
                onChange={e => {
                  onChange(e.target.value);
                }}
              />
            ) : (
              character.attributes[a]
            )}
          </div>
        );
      })}
      {currentAttribute !== "" && (
        <ButtonLarge onClick={validate} style={styledButton}>
          OK
        </ButtonLarge>
      )}
    </div>
  );
};

export default CharacterAttributes;
