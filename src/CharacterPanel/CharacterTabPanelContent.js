import React, { Component } from "react";
import PropTypes from "prop-types";
import { widthRightPanelLeft } from "../Utils/StyleConstants";
import firebase from "firebase";

const styles = {
  tabPanelItem: {
    width: `${widthRightPanelLeft - 20}px`,
    paddingHorizontal: 5,
    position: "relative",
    float: "left",
    display: "inline-block",
  },
};

class CharacterTabPanelContent extends Component {
  state = {
    skillValue: "",
  };

  onChangeSkill = value => {
    this.setState(state => ({
      ...state,
      skillValue: value,
    }));
  };

  onValidateSkills = () => {
    const { skillValue } = this.state;
    const { character } = this.props;
    const obj = [...this.props.tab];
    obj.push(skillValue);

    firebase
      .database()
      .ref("stories/" + 0 + "/characters/" + character.userUid + "/character/skills")
      .set(obj)
      .catch(error => {
        // Handle Errors here.
        console.log("Error", error);
      });
  };

  render() {
    const { tab, tabName } = this.props;
    const { skillValue } = this.state;

    return (
      <div>
        {tab.map((description, index) => {
          return (
            <div key={`${description}-${index}`} style={styles.tabPanelItem}>
              {description}
            </div>
          );
        })}
        {tabName === "Skills" && (
          <div style={styles.tabPanelItem}>
            <input
              type="text"
              placeholder={`Skill + description if needed`}
              value={skillValue}
              onChange={e => {
                this.onChangeSkill(e.target.value);
              }}
            />
            <button onClick={this.onValidateSkills}>Add skill</button>
          </div>
        )}
      </div>
    );
  }
}

CharacterTabPanelContent.defaultProps = {
  tabName: "",
  character: {},
};

CharacterTabPanelContent.propTypes = {
  tab: PropTypes.array.isRequired,
  tabName: PropTypes.string,
  character: PropTypes.object,
};

export default CharacterTabPanelContent;
