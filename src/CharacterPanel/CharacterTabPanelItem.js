import React, { Component } from "react";
import PropTypes from "prop-types";

import { widthRightPanelLeft } from "../Utils/StyleConstants";

const styles = {
  tabPanelItem: {
    width: `${widthRightPanelLeft - 20}px`,
    height: 40,
    paddingHorizontal: 5,
    position: "relative",
    float: "left",
    display: "inline-block",
    borderBottom: "1px solid black",
  },
  itemName: {
    width: `${widthRightPanelLeft - 70}px`,
    height: 40,
    position: "relative",
    float: "left",
    display: "inline-block",
  },
  itemQuantity: {
    width: 30,
    height: 30,
    position: "relative",
    float: "left",
    display: "inline-block",
    padding: 0,
    margin: 0,
    textAlign: "center",
    marginTop: 5,
  },
};

class CharacterTabPanelItem extends Component {
  render() {
    const { character, onItemUse } = this.props;

    return (
      <div>
        <div style={styles.BoxHeader}>Items :</div>
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
                  {character.education < item.rarity * 9 ? "???" : item.name}
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

CharacterTabPanelItem.propTypes = {
  character: PropTypes.object.isRequired,
  onItemUse: PropTypes.func.isRequired,
};

export default CharacterTabPanelItem;
