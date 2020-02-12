import React, { Component } from "react";
import PropTypes from "prop-types";
import { widthRightPanelLeft } from "../Utils/StyleConstants";
import firebase from "firebase";
import ButtonLarge from "../Utils/ButtonLarge";
import { connect } from "react-redux";

const styles = {
  tabPanelItem: {
    width: `${widthRightPanelLeft - 6}px`,
    paddingHorizontal: 5,
    position: "relative",
    float: "left",
    display: "inline-block",
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
  itemDescription: {
    width: `${widthRightPanelLeft - 70}px`,
    position: "relative",
    float: "left",
    display: "inline-block",
    padding: 0,
    margin: 0,
    textAlign: "center",
  },
};

class CharacterTabPanelContent extends Component {
  state = {
    newValue: "",
  };

  onChange = value => {
    this.setState(state => ({
      ...state,
      newValue: value,
    }));
  };

  onValidate = () => {
    const { newValue } = this.state;
    const { character, tab, tabName, currentStory } = this.props;

    if (newValue !== "") {
      let obj = [];
      if (tab) obj = [...tab];
      obj.push(newValue);

      firebase
        .database()
        .ref(
          "stories/" +
            currentStory +
            "/characters/" +
            character.userUid +
            "/character/" +
            tabName.toLowerCase(),
        )
        .set(obj)
        .catch(error => {
          // Handle Errors here.
          console.log("Error", error);
        });
    }
  };

  onRemove = i => {
    const { character, tab, tabName, currentStory } = this.props;
    const obj = [...tab];
    obj.splice(i, 1);

    firebase
      .database()
      .ref(
        "stories/" +
          currentStory +
          "/characters/" +
          character.userUid +
          "/character/" +
          tabName.toLowerCase(),
      )
      .set(obj)
      .catch(error => {
        // Handle Errors here.
        console.log("Error", error);
      });
  };

  render() {
    const { tab, tabName } = this.props;
    const { newValue } = this.state;

    return (
      <div>
        {tab.map((description, index) => {
          return (
            <div key={`${description}-${index}`} style={styles.tabPanelItem}>
              <div style={styles.itemDescription}>{description}</div>
              <ButtonLarge
                style={styles.itemButton}
                onClick={() => this.onRemove(index)}
              >
                Remove
              </ButtonLarge>
            </div>
          );
        })}
        <div style={styles.tabPanelItem}>
          <input
            type="text"
            placeholder={`${tabName} + description if needed`}
            value={newValue}
            onChange={e => {
              this.onChange(e.target.value);
            }}
          />
          <ButtonLarge style={styles.itemButton} onClick={this.onValidate}>
            Add {tabName.toLowerCase()}
          </ButtonLarge>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  currentStory: store.appState.currentStory,
  character: store.character,
});

CharacterTabPanelContent.defaultProps = {
  tabName: "",
};

CharacterTabPanelContent.propTypes = {
  tab: PropTypes.array.isRequired,
  tabName: PropTypes.string,
};

export default connect(mapStateToProps)(CharacterTabPanelContent);
