import React, { Component, Fragment } from "react";

import PropTypes from "prop-types";
import { widthExchangeBox, heightExchangeBox } from "../Utils/StyleConstants";
import ExchangeItems from "./ExchangeItems";
import ExchangeWeapons from "./ExchangeWeapons";
import { connect } from "react-redux";

const styledItemContainer = {
  position: "absolute",
  left: 20,
  top: 20,
  width: widthExchangeBox - 40,
  height: heightExchangeBox - 40,
  zIndex: 2,
  overflowY: "auto",
  overflowX: "hidden",
};

const styledSeparator = { marginBottom: 10 };
const styledSeparator2 = { marginTop: 20, display: "inline-block" };

class ExchangeContent extends Component {
  render() {
    const { characterWeapons, onItemExchange, onWeaponExchange } = this.props;

    return (
      <div className="scrollbar" style={styledItemContainer}>
        {characterWeapons.length > 0 && (
          <Fragment>
            <div style={styledSeparator}>Weapons : </div>
            <ExchangeWeapons onWeaponExchange={onWeaponExchange} />
          </Fragment>
        )}
        <div style={styledSeparator2}>Items : </div>
        <ExchangeItems onItemExchange={onItemExchange} />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  currentStory: store.appState.currentStory,
  characterWeapons: store.character.weapons,
});

ExchangeContent.propTypes = {
  onItemExchange: PropTypes.func.isRequired,
  onWeaponExchange: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(ExchangeContent);
