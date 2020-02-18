import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import {
  cursorPointer,
  heightLeft,
  widthLeftBestiary,
} from "../Utils/StyleConstants";
import firebase from "firebase";
import FileUploader from "../CharacterCreation/FileUploader";
import ButtonLarge from "../Utils/ButtonLarge";
import { initialBestiaryForm } from "../Utils/Constants";
import { populateBestiary } from "../Utils/DatabaseFunctions";
import { connect } from "react-redux";

class BestiaryForm extends Component {
  state =
    this.props.beast !== null
      ? {
          name: this.props.beast.name || "",
          monster: this.props.beast.monster || true,
          image: this.props.beast.image || "",
          text1: this.props.beast.text1 || "",
          text2: this.props.beast.text2 || "",
          text3: this.props.beast.text3 || "",
          text4: this.props.beast.text4 || "",
          age: this.props.beast.age || "",
          taille: this.props.beast.taille || "",
          poids: this.props.beast.poids || "",
          known: this.props.beast.known || false,
          dangerosity: this.props.beast.dangerosity || "",
        }
      : initialBestiaryForm;

  onChange = (name, value) => {
    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  onDrop = picture => {
    // const { triggerError, doSetState } = this.props;

    // const path = 'images/bestiary/' + picture[picture.length - 1].name;
    this.setState(state => ({
      ...state,
      image: picture[picture.length - 1].name,
    }));

    // firebase
    //   .storage()
    //   .ref()
    //   .child(path)
    //   .put(picture[picture.length - 1])
    //   .then(() => {
    //     firebase
    //       .storage()
    //       .ref()
    //       .child(path)
    //       .getDownloadURL()
    //       .then(url => {
    //         this.setState(state => ({
    //           ...state,
    //           image: url,
    //           imagePath: path,
    //         }));
    //       })
    //       .catch(error => {
    //         // Handle any errors
    //         triggerError(error);
    //       });
    //   });
  };

  validate = () => {
    const {
      name,
      monster,
      image,
      text1,
      text2,
      text3,
      text4,
      age,
      taille,
      poids,
      known,
      dangerosity,
    } = this.state;
    const { bestiary, currentStory, teamCharacters } = this.props;

    const newPostKey = firebase
      .database()
      .ref("stories/" + currentStory + "/bestiary")
      .push().key;

    bestiary[newPostKey] = {
      name,
      monster,
      image,
      text1,
      text2,
      text3,
      text4,
      age,
      taille,
      poids,
      known,
      dangerosity,
      seen: false,
    };
    const tempBestiary = { ...bestiary };
    const tempCharacters = { ...teamCharacters };
    Object.keys(tempCharacters).map(key => {
      Object.keys(tempBestiary).map(bKey => {
        if (!tempBestiary[bKey][key]) {
          let cpt = 0;
          const maxRoll =
            (tempCharacters[key].character.userPseudo === "Danjors" ||
              tempCharacters[key].character.userPseudo === "Rangrim") &&
            tempBestiary[bKey].monster
              ? parseInt(tempCharacters[key].character.education, 10) + 20
              : tempBestiary[bKey].monster ||
                tempCharacters[key].character.userPseudo === "Danjors" ||
                tempCharacters[key].character.userPseudo === "Rangrim"
              ? parseInt(tempCharacters[key].character.education, 10) - 10
              : parseInt(tempCharacters[key].character.education, 10);
          while (Math.floor(Math.random() * 100 + 1) <= maxRoll && cpt < 7) {
            ++cpt;
          }
          const statsKnown = {};
          if (cpt === 0) {
            statsKnown["unknown"] = true;
          } else {
            if (cpt >= 1) {
              statsKnown["text1"] = true;
            }
            if (cpt >= 2) {
              statsKnown["text2"] = true;
            }
            if (cpt >= 3) {
              if (tempBestiary[bKey].monster) {
                statsKnown["dangerosity"] = true;
              } else {
                statsKnown["age"] = true;
              }
            }
            if (cpt >= 4) {
              statsKnown["text3"] = true;
            }
            if (cpt >= 5) {
              statsKnown["text4"] = true;
            }
            if (cpt >= 6) {
              statsKnown["taille"] = true;
            }
            if (cpt >= 7) {
              statsKnown["poids"] = true;
            }
          }
          tempBestiary[bKey][key] = { ...statsKnown };
        }
        return null;
      });
      return null;
    });
    firebase
      .database()
      .ref("stories/" + currentStory + "/bestiary")
      .set(tempBestiary)
      .catch(error => {
        // Handle Errors here.
        // triggerError(error);
      });
    // doSetState({
    //   bestiary: tempBestiary,
    // });

    // firebase
    //   .database()
    //   .ref("stories/" + currentStory + "/bestiary")
    //   .set(bestiary)
    //   .then(() => {
    //     this.setState(
    //       state => ({
    //         ...initialBestiaryForm,
    //       }),
    //       () => {
    //         populateBestiary(0);
    //         // populateBestiary(0, doSetState);
    //       },
    //     );
    //   })
    //   .catch(error => {
    //     // Handle Errors here.
    //     // this.triggerError(error);
    //     console.log("error", error);
    //   });
  };

  render() {
    const {
      name,
      monster,
      image,
      text1,
      text2,
      text3,
      text4,
      age,
      taille,
      poids,
      known,
      dangerosity,
    } = this.state;

    return (
      <div
        style={{
          height: heightLeft,
          width: widthLeftBestiary,
          color: "white",
          position: "relative",
          float: "left",
        }}
      >
        <div style={{ height: 25 }}>New Monster</div>
        Name :
        <input
          type="text"
          value={name}
          name="name"
          onChange={e => {
            this.onChange(e.target.name, e.target.value);
          }}
        />
        <FileUploader
          onDrop={this.onDrop}
          buttonText="+"
          fileContainerStyle={{
            width: 20,
            padding: 0,
            margin: 0,
            display: "inline-block",
          }}
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
        {image !== "" && (
          <img src={"./bestiary/" + image} style={{ width: 100 }} alt={image} />
        )}
        <div onClick={() => this.onChange("known", !known)}>
          {known ? "Is known" : "Is unknown"}
        </div>
        <div onClick={() => this.onChange("monster", !monster)}>
          {monster ? "Is a monster" : "Is a NPC"}
        </div>
        Text1 :
        <input
          type="text"
          value={text1}
          name="text1"
          onChange={e => {
            this.onChange(e.target.name, e.target.value);
          }}
        />
        Text2 :
        <input
          type="text"
          value={text2}
          name="text2"
          onChange={e => {
            this.onChange(e.target.name, e.target.value);
          }}
        />
        Text3 :
        <input
          type="text"
          value={text3}
          name="text3"
          onChange={e => {
            this.onChange(e.target.name, e.target.value);
          }}
        />
        Text4 :
        <input
          type="text"
          value={text4}
          name="text4"
          onChange={e => {
            this.onChange(e.target.name, e.target.value);
          }}
        />
        {monster ? (
          <Fragment>
            Dangerosity :
            <input
              type="text"
              value={dangerosity}
              name="dangerosity"
              onChange={e => {
                this.onChange(e.target.name, e.target.value);
              }}
            />
          </Fragment>
        ) : (
          <Fragment>
            Age :
            <input
              type="text"
              value={age}
              name="age"
              onChange={e => {
                this.onChange(e.target.name, e.target.value);
              }}
            />
          </Fragment>
        )}
        Taille :
        <input
          type="text"
          value={taille}
          name="taille"
          onChange={e => {
            this.onChange(e.target.name, e.target.value);
          }}
        />
        Poids :
        <input
          type="text"
          value={poids}
          name="poids"
          onChange={e => {
            this.onChange(e.target.name, e.target.value);
          }}
        />
        <ButtonLarge onClick={this.validate}>Submit</ButtonLarge>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  bestiary: store.bestiary.bestiary,
  currentStory: store.appState.currentStory,
  teamCharacters: store.team.characters,
});

BestiaryForm.defaultProps = {
  beast: null,
};

BestiaryForm.propTypes = {
  beast: PropTypes.object,
};

export default connect(mapStateToProps)(BestiaryForm);
