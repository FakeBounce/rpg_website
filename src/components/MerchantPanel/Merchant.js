import React, { Component } from "react";
import "./Merchant.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Merchant extends Component {
  render() {
    const {
      index,
      name,
      isDiscovered,
      items,
      icon,
      job,
      description,
      showItems,
      currentMerchant,
    } = this.props;
    return (
      <div
        className={`merchant ${
          currentMerchant === index ? "merchant-is-selected" : ""
        }`}
        onClick={isDiscovered ? () => showItems(items, index) : () => {}}
      >
        <img
          src={
            isDiscovered
              ? "./merchants/" + icon
              : "./common/unknown_image_white.png"
          }
          alt={description}
          className="merchant-icon"
        />
        <div className="merchant-text">
          {isDiscovered ? name + " (" + job + ")" : "???"}
        </div>
        <div className="merchant-text">{description}</div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  currentMerchant: store.merchants.currentMerchant,
});

Merchant.defaultProps = {
  isDiscovered: false,
  description: "",
};

Merchant.propTypes = {
  index: PropTypes.number.isRequired,
  isDiscovered: PropTypes.bool,
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  job: PropTypes.string.isRequired,
  description: PropTypes.string,
  showItems: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default connect(mapStateToProps)(Merchant);
