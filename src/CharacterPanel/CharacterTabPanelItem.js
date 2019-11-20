import React, { Component } from "react";
import PropTypes from "prop-types";

import { widthRightPanelLeft } from "../Utils/StyleConstants";
import ButtonLarge from "../Utils/ButtonLarge";
import firebase from "firebase";

const styles = {
  tabPanelItem: {
    width: `${widthRightPanelLeft - 6}px`,
    paddingHorizontal: 5,
    position: "relative",
    float: "left",
    display: "inline-block",
    borderBottom: "1px solid black",
  },
  itemName: {
    width: `${widthRightPanelLeft - 120}px`,
    position: "relative",
    float: "left",
    display: "inline-block",
  },
  itemQuantity: {
    width: 30,
    height: 26,
    position: "relative",
    float: "left",
    display: "inline-block",
    padding: 0,
    margin: 0,
    textAlign: "center",
  },
  itemButton: {
    width: 50,
    height: 30,
    position: "relative",
    float: "right",
    display: "inline-block",
    padding: 0,
    margin: 0,
    textAlign: "center",
  },
  discoverButton: {
    width: 90,
    height: 16,
    padding: 0,
    position: "absolute",
    bottom: 0,
    textAlign: "center",
    left: 80,
  },
};

class CharacterTabPanelItem extends Component {
  state = {
    itemValue: "",
  };

  onChangeItem = value => {
    this.setState(state => ({
      ...state,
      itemValue: value,
    }));
  };

  onValidateItem = () => {
    const { itemValue } = this.state;
    const { character, currentStory } = this.props;
    let obj = [];
    if (character.items) obj = [...character.items];
    const newObject = {
      name: itemValue,
      quantity: 1,
      rarity: 1,
    };
    obj.push(newObject);

    firebase
      .database()
      .ref(
        "stories/" + currentStory +
          "/characters/" +
          character.userUid +
          "/character/items",
      )
      .set(obj)
      .catch(error => {
        // Handle Errors here.
        console.log("Error", error);
      });
  };

  discoverItem = (index, isDiscovered = false) => () => {
    const { character } = this.props;
    const obj = [...character.items];
    obj[index].isDiscovered = isDiscovered;

    firebase
      .database()
      .ref(
        "stories/" +
          0 +
          "/characters/" +
          character.userUid +
          "/character/items",
      )
      .set(obj)
      .catch(error => {
        // Handle Errors here.
        console.log("Error", error);
      });
  };

  render() {
    const { character, onItemUse, isGameMaster } = this.props;
    const { itemValue } = this.state;

    return (
      <div>
        {character.items &&
          character.items.map((item, index) => {
            return (
              <div key={`${item.name}-${index}`} style={styles.tabPanelItem}>
                <input
                  type="number"
                  value={item.quantity}
                  style={styles.itemQuantity}
                  onChange={e => {
                    onItemUse(index, e.target.value);
                  }}
                />
                <div style={styles.itemName}>
                  {character.education < item.rarity * 9 && !item.isDiscovered
                    ? "???"
                    : item.name}
                </div>
                <ButtonLarge
                  style={styles.itemButton}
                  onClick={() => onItemUse(index, item.quantity - 1)}
                >
                  Use ({item.quantity} left)
                </ButtonLarge>
                {isGameMaster && (
                  <ButtonLarge
                    style={styles.discoverButton}
                    onClick={this.discoverItem(index, !item.isDiscovered)}
                  >
                    {item.isDiscovered ? "Uncover" : "Discover"}
                  </ButtonLarge>
                )}
              </div>
            );
          })}

        <div style={styles.tabPanelItem}>
          <input
            type="text"
            placeholder={`Item + description if needed`}
            value={itemValue}
            onChange={e => {
              this.onChangeItem(e.target.value);
            }}
          />
          <ButtonLarge style={styles.itemButton} onClick={this.onValidateItem}>
            Add Item
          </ButtonLarge>
        </div>
      </div>
    );
  }
}

CharacterTabPanelItem.propTypes = {
  character: PropTypes.object.isRequired,
  currentStory: PropTypes.number.isRequired,
  onItemUse: PropTypes.func.isRequired,
  isGameMaster: PropTypes.bool.isRequired,
};

export default CharacterTabPanelItem;
