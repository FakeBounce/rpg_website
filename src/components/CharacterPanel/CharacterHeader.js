import React, { Component } from "react";
import PropTypes from "prop-types";
import HealthBar from "../Utils/HealthBar";
import CharacterHeaderInfos from "./CharacterHeaderInfos";
import {
  widthRightPanel,
  imageSize,
  widthRightPanelLeft,
  cursorPointer,
} from "../Utils/StyleConstants";
import firebase from "firebase";
import FileUploader from "../CharacterCreation/FileUploader";
import { connect } from "react-redux";

const styles = {
  characterHeader: {
    width: `${widthRightPanel}px`,
    height: `${imageSize}px`,
    position: "relative",
    float: "left",
    display: "inline-block",
  },
  characterHeaderName: {
    position: "relative",
    width: `${widthRightPanelLeft}px`,
    height: 25,
    float: "left",
    display: "inline-block",
  },
  characterHeaderIcon: {
    position: "relative",
    width: `${imageSize}px`,
    height: `${imageSize}px`,
    float: "left",
    display: "inline-block",
  },
};

const styledCharacterHeaderIconContainer = {
  position: "relative",
  width: `${imageSize}px`,
  height: `${imageSize}px`,
  float: "left",
  display: "inline-block",
};

const styledCharacterHeaderInactiveIcon = {
  position: "absolute",
  width: `${imageSize}px`,
  height: `${imageSize}px`,
  backgroundColor: "grey",
  opacity: 0.3,
};

class CharacterHeader extends Component {
  onDrop = picture => {
    const { uid, currentStory, triggerError } = this.props;
    const path =
      "images/" +
      uid +
      "/stories/" +
      currentStory +
      "/" +
      picture[picture.length - 1].name;

    firebase
      .database()
      .ref(
        "stories/" +
          currentStory +
          "/characters/" +
          uid +
          "/character/iconPath",
      )
      .once("value")
      .then(snapshot => {
        firebase
          .storage()
          .ref()
          .child(snapshot.val())
          .delete()
          .then(() => {
            // File deleted successfully
            firebase
              .storage()
              .ref()
              .child(path)
              .put(picture[picture.length - 1])
              .then(() => {
                firebase
                  .storage()
                  .ref()
                  .child(path)
                  .getDownloadURL()
                  .then(url => {
                    let updates = {};
                    updates[uid + "/character/iconPath"] = path;
                    updates[uid + "/character/icon"] = url;

                    firebase
                      .database()
                      .ref("stories/" + currentStory + "/characters/")
                      .update(updates)
                      .catch(error => {
                        // Handle Errors here.
                        triggerError(error);
                      });
                  })
                  .catch(error => {
                    // Handle any errors
                    triggerError(error);
                  });
              });
          })
          .catch(error => {
            // Uh-oh, an error occurred!
            triggerError(error);
          });
      })
      .catch(error => {
        // Handle any errors
        triggerError(error);
      });
  };

  render() {
    const { icon, name, health, maxHealth, gold, status } = this.props;

    return (
      <div style={styles.characterHeader}>
        <div style={styledCharacterHeaderIconContainer}>
          {status === "Inactive" && (
            <div style={styledCharacterHeaderInactiveIcon} />
          )}
          <img src={icon} alt={name} style={styles.characterHeaderIcon} />
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: (imageSize - 20) / 2,
          }}
        >
          <FileUploader
            onDrop={this.onDrop}
            buttonText="+"
            fileContainerStyle={{ padding: 0, margin: 0, display: "block" }}
            buttonStyles={{
              width: 20,
              padding: 0,
              margin: 0,
              border: "1px solid #3f4257",
              cursor: cursorPointer,
            }}
            withIcon={false}
            label=""
          />
        </div>
        <div style={styles.characterHeaderName}>{name}</div>
        <HealthBar
          width={`${Math.floor((health / maxHealth) * 100)}%`}
          maxWidth={`${widthRightPanelLeft}px`}
          health={health}
          maxHealth={maxHealth}
        />
        <CharacterHeaderInfos status={status} gold={gold} />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  currentStory: store.appState.currentStory,
});

CharacterHeader.propTypes = {
  gold: PropTypes.number.isRequired,
  health: PropTypes.number.isRequired,
  maxHealth: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  triggerError: PropTypes.func.isRequired,
  uid: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(CharacterHeader);
