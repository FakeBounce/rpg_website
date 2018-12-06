import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  widthImageBestiary,
  widthLeftBestiary,
  widthTextBestiary,
} from '../Utils/StyleConstants';

const styledImage = {
  position: 'relative',
  float: 'left',
  width: widthImageBestiary,
  display:'inline-block',
};

const styledContainer = {
  position: 'relative',
  width: widthLeftBestiary,
  float: 'left',
  display: 'inline-block',
  padding:15,
};
const styledText = {
  position: 'relative',
  float: 'left',
  width: widthTextBestiary - 30,
  display:'inline-block',
  marginTop: 30,
};
const styledTitle = {
  fontSize: 22,
  fontWeight: 'bolder',
  color: 'red',
};

class Beast extends Component {
  render() {
    const {
      name,
      image,
      text1,
      text2,
      text3,
      text4,
      dangerosity,
      taille,
      poids,
    } = this.props;

    return (
      <div style={styledContainer}>
        <div style={styledTitle}> {name}</div>
        <img src={'./bestiary/' + image} style={styledImage} alt={image} />
        <div style={styledText}>
          {text1 !== '' && <div>{text1}</div>}
          {text2 !== '' && <div>{text2}</div>}
          {text3 !== '' && <div>{text3}</div>}
          {text4 !== '' && <div>{text4}</div>}
          {dangerosity !== '' && <div>Dangerosité : {dangerosity}</div>}
          {taille !== '' && (
            <div>
              Taille : {taille}
              cm
            </div>
          )}
          {poids !== '' && (
            <div>
              Poids : {poids}
              kg
            </div>
          )}
        </div>
      </div>
    );
  }
}

Beast.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  text1: PropTypes.string.isRequired,
  text2: PropTypes.string.isRequired,
  text3: PropTypes.string.isRequired,
  text4: PropTypes.string.isRequired,
  dangerosity: PropTypes.string.isRequired,
  taille: PropTypes.string.isRequired,
  poids: PropTypes.string.isRequired,
};

export default Beast;
