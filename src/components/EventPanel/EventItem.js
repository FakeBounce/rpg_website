import React, { Component } from "react";
import PropTypes from "prop-types";
import { cursorPointer } from "../Utils/StyleConstants";

const styledItem = {
  width: "100%",
  display: "inline-block",
  float: "left",
  position: "relative",
  cursor: cursorPointer,
  borderBottom: "1px solid black",
};

const styledItemIcon = {
  width: 20,
  height: 20,
  display: "inline-block",
  float: "left",
  position: "relative",
};

class EventItem extends Component {
  render() {
    const { itemEvent, onChange, i, ikey } = this.props;

    return (
      <div
        key={`event-item-${i.name}`}
        className={`${itemEvent.name === i.name ? "selected" : ""}`}
        style={styledItem}
        onClick={() =>
          onChange("itemEvent", {
            ...i,
            itemType: ikey,
          })
        }
      >
        <img
          src={"./" + ikey + "/" + i.icon}
          style={styledItemIcon}
          alt={i.name}
        />
        {i.name}
      </div>
    );
  }
}

EventItem.propTypes = {
  itemEvent: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  i: PropTypes.object.isRequired,
  ikey: PropTypes.string.isRequired,
};

export default EventItem;
