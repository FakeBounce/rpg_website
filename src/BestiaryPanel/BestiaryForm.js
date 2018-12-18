import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { cursorPointer, heightLeft } from '../Utils/StyleConstants';
import firebase from 'firebase';
import FileUploader from '../CharacterCreation/FileUploader';
import ButtonLarge from '../Utils/ButtonLarge';
import { initialBestiaryForm } from '../Utils/Constants';
import { populateBestiary } from '../Utils/DatabaseFunctions';

class BestiaryForm extends Component {
  state = initialBestiaryForm;

  onChange = (name, value) => {
    this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  onDrop = picture => {
    // const { triggerError, chatInput, doSetState } = this.props;

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
    const { bestiary, doSetState, currentStory } = this.props;

    const tempBestiary = [...bestiary];
    tempBestiary.push({
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
    });

    firebase
      .database()
      .ref('stories/' + currentStory + '/bestiary')
      .set(tempBestiary)
      .then(() => {
        this.setState(
          state => ({
            ...initialBestiaryForm,
          }),
          () => {
            populateBestiary(0, doSetState);
          }
        );
      })
      .catch(error => {
        // Handle Errors here.
        // this.triggerError(error);
        console.log('error', error);
      });
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
          width: '100%',
          color: "white",
          position: "relative"
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
            display: 'inline-block',
          }}
          buttonStyles={{
            width: 20,
            padding: 0,
            margin: 0,
            border: '1px solid #3f4257',
            cursor: cursorPointer,
          }}
          withIcon={false}
          label=""
        />
        {image !== '' && (
          <img src={'./bestiary/' + image} style={{ width: 100 }} alt={image}/>
        )}
        <div onClick={() => this.onChange('known', !known)}>
          {known ? 'Is known' : 'Is unknown'}
        </div>
        <div onClick={() => this.onChange('monster', !monster)}>
          {monster ? 'Is a monster' : 'Is a NPC'}
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

BestiaryForm.propTypes = {
  bestiary: PropTypes.array.isRequired,
  currentStory: PropTypes.number.isRequired,
  doSetState: PropTypes.func.isRequired,
};

export default BestiaryForm;
