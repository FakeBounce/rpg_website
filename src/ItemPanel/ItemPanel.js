import React, { Component } from "react";
import PropTypes from "prop-types";
import { widthLeft, heightLeft } from "../Utils/StyleConstants";
import ItemList from "./ItemList";

const styledBoxHeader = {
  width: "100%",
  height: "20px",
  marginBottom: "5px",
  textAlign: "center",
};

const styledMapSide = {
  border: "1px solid brown",
  width: `${widthLeft / 2 - 11}px`,
  height: `${heightLeft / 2 - 1}px`,
  display: "inline-block",
  float: "left",
  textAlign: "left",
  position: "relative",
};

class ItemPanel extends Component {
  showItemDescription = i => {
    const { merchants, currentMerchant, doSetState } = this.props;
    doSetState({
      isItemDescriptionShowed: true,
      itemToDescribe: merchants[currentMerchant].items[i],
      itemDescribed: i,
    });
  };

  render() {
    const { character, itemsList } = this.props;

    return (
      <div style={styledMapSide}>
        <div style={styledBoxHeader}>Liste des objets</div>
        <ItemList
          character={character}
          itemsList={itemsList}
          showItemDescription={this.showItemDescription}
        />
      </div>
    );
  }
}

ItemPanel.propTypes = {
  currentMerchant: PropTypes.number.isRequired,
  character: PropTypes.object.isRequired,
  itemsList: PropTypes.array.isRequired,
  merchants: PropTypes.array.isRequired,
  doSetState: PropTypes.func.isRequired,
};

export default ItemPanel;
