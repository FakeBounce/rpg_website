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
  width: widthLeftBestiary - 140,
  float: 'left',
  display: 'inline-block',
  padding:"20px 70px",
};
const styledText = {
  position: 'relative',
  float: 'left',
  width: widthTextBestiary - 200,
  display:'inline-block',
  paddingLeft: 15,
  paddingRight: 45,
  marginTop: 30,
};
const styledParagraph = {
  position: 'relative',
  float: 'left',
  width: widthTextBestiary - 200,
  display:'inline-block',
  marginTop: 20,
  paddingLeft: 15,
  paddingRight: 45,
};
const styledTitle = {
  fontSize: 22,
  fontWeight: 'bolder',
  color: 'white',
};

class PNJ extends Component {
  render() {
    const {
      name,
      image,
      text1,
      text2,
      text3,
      text4,
      age,
      taille,
      poids,
    } = this.props;

    return (
      <div style={styledContainer}>
        <div style={styledTitle}> {name}</div>
        <img src={'./bestiary/' + image} style={styledImage} alt={image} />
        <div style={styledText}>
          {text1 && <div style={styledParagraph}>{text1}</div>}
          {text2 && <div style={styledParagraph}>{text2}</div>}
          {text3 && <div style={styledParagraph}>{text3}</div>}
          {text4 && <div style={styledParagraph}>Skills and traits : {text4}</div>}
          {age && <div>Age : {age} ans</div>}
          {taille && (
            <div>
              Taille : {taille}
              cm
            </div>
          )}
          {poids && (
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

PNJ.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  text1: PropTypes.string.isRequired,
  text2: PropTypes.string.isRequired,
  text3: PropTypes.string.isRequired,
  text4: PropTypes.string.isRequired,
  age: PropTypes.string.isRequired,
  taille: PropTypes.string.isRequired,
  poids: PropTypes.string.isRequired,
};

export default PNJ;
