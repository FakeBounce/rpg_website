import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { heightLeft, widthLeft } from "./components/Utils/StyleConstants";
import { colors, tempoImagesList } from "./components/Utils/Constants";
import firebase from "firebase";

const styledTempContainer = {
  float: "left",
  width: `${widthLeft}px`,
  height: `${heightLeft + 2}px`,
  position: "relative",
  backgroundColor: colors.background,
};
const styledTempImage = {
  maxWidth: `${widthLeft}px`,
  maxHeight: `${heightLeft}px`,
  display: "inline-block",
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%,-50%)",
};
const styledTempSelect = {
  position: "absolute",
  zIndex: 1,
};

class TempImage extends PureComponent {
  state = {
    tempImage: "noTown.jpg",
    bestiaryList: null,
  };

  componentDidMount() {
    const { currentStory, isGameMaster } = this.props;
    firebase
      .database()
      .ref("stories/" + currentStory + "/tempoImage")
      .on("value", snapshot => {
        this.setState(state => ({
          ...state,
          tempImage: snapshot.val(),
        }));
      });
    if (isGameMaster) {
      firebase
        .database()
        .ref("stories/" + currentStory + "/bestiary")
        .once("value")
        .then(snapshot => {
          this.setState(state => ({
            ...state,
            bestiaryList: snapshot.val(),
          }));
        });
    }
  }

  onChange = value => {
    const { currentStory } = this.props;
    firebase
      .database()
      .ref("stories/" + currentStory + "/tempoImage")
      .set(value)
      .catch(error => {
        // Handle Errors here.
        console.log("Error", error);
      });
  };

  render() {
    const { isGameMaster } = this.props;
    const { tempImage, bestiaryList } = this.state;

    return (
      <div style={styledTempContainer}>
        {isGameMaster && (
          <select
            value={tempImage}
            onChange={e => {
              this.onChange(e.target.value);
            }}
            style={styledTempSelect}
          >
            {tempoImagesList.map(obj => {
              return (
                <option key={obj.path} value={obj.path}>
                  {obj.name}
                </option>
              );
            })}
            {bestiaryList !== null &&
              Object.keys(bestiaryList).map(bKey => {
                return (
                  <option
                    key={bestiaryList[bKey].name}
                    value={"bestiary/" + bestiaryList[bKey].image}
                  >
                    {bestiaryList[bKey].name}
                  </option>
                );
              })}
          </select>
        )}
        <img src={"./" + tempImage} style={styledTempImage} alt={tempImage} />
      </div>
    );
  }
}

TempImage.propTypes = {
  isGameMaster: PropTypes.bool.isRequired,
  currentStory: PropTypes.number.isRequired,
};

export default TempImage;
