import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import EventItem from "./EventItem";
import { sortAlphabetical } from "../Utils/Functions";
import SelectMapper from "../Utils/SelectMapper";
import { itemEventTypes } from "../Utils/Constants";
import { connect } from "react-redux";
import { Input } from "semantic-ui-react";

const styledItemList = {
  width: "100%",
  height: 210,
  display: "inline-block",
  float: "left",
  position: "relative",
  overflowY: "auto",
};

const styledEventItemFormInputsContainer = {
  marginTop: 10,
  marginBottom: 10,
  paddingLeft: 10,
  paddingRight: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

class EventItemForm extends PureComponent {
  state = {
    orderedItems: [],
    filteredItems: [],
    filterText: "",
    filterType: "",
  };

  componentDidMount() {
    const { items } = this.props;
    const filteredItems = [];
    Object.keys(items).map(ikey => {
      if (ikey !== "runes" && ikey !== "enhancements") {
        Object.keys(items[ikey]).map(key => {
          return filteredItems.push({
            ...items[ikey][key],
            itemType: ikey,
          });
        });
      }
      return null;
    });

    sortAlphabetical(filteredItems);
    this.setState(state => ({
      ...state,
      filteredItems,
      orderedItems: [...filteredItems],
    }));
  }

  onChangeFilter = (name, value) => {
    this.setState(
      state => ({
        ...state,
        [name]: value,
      }),
      () => {
        this.filterItems();
      },
    );
  };

  onChangeSelect = value => {
    this.setState(
      state => ({
        ...state,
        filterType: value,
      }),
      () => {
        this.filterItems();
      },
    );
  };

  filterItems = () => {
    const { filterText, filterType, orderedItems } = this.state;
    const tempFilter = [];
    orderedItems.map(item => {
      if (
        item.name.indexOf(filterText) !== -1 &&
        ((filterType !== "" && item.itemType === filterType) ||
          filterType === "")
      ) {
        tempFilter.push(item);
      }
      return null;
    });
    this.setState(state => ({
      ...state,
      filteredItems: [...tempFilter],
    }));
  };

  render() {
    const { descriptionEvent, quantityEvent, itemEvent, onChange } = this.props;
    const { filteredItems, filterText, filterType } = this.state;

    return (
      <div>
        <div>
          Filter :
          <Input
            type="text"
            value={filterText}
            name="filterText"
            placeholder={"Name to filter"}
            onChange={e => {
              this.onChangeFilter(e.target.name, e.target.value);
            }}
          />
          <SelectMapper
            mapArray={itemEventTypes}
            value={filterType}
            onChange={this.onChangeSelect}
          />
        </div>
        <div style={styledItemList} className="scrollbar">
          {filteredItems.map(i => {
            return (
              <EventItem
                key={`event-item-${i.itemType}-${i.name}-${i.type}`}
                itemEvent={itemEvent}
                onChange={onChange}
                i={{
                  ...i,
                  name:
                    i.itemType === "spells"
                      ? i.name + " (" + i.type + ")"
                      : i.name,
                }}
                ikey={i.itemType}
              />
            );
          })}
        </div>
        <div style={styledEventItemFormInputsContainer}>
          <Input
            type="number"
            value={quantityEvent}
            name="quantityEvent"
            onChange={e => {
              onChange(e.target.name, e.target.value);
            }}
            style={{ maxWidth: "40%" }}
          />
          <Input
            type="text"
            value={descriptionEvent}
            name="descriptionEvent"
            onChange={e => {
              onChange(e.target.name, e.target.value);
            }}
            placeholder="Event description"
            style={{ maxWidth: "50%" }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  items: store.items.items,
});

EventItemForm.propTypes = {
  descriptionEvent: PropTypes.string.isRequired,
  quantityEvent: PropTypes.number.isRequired,
  itemEvent: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(EventItemForm);
