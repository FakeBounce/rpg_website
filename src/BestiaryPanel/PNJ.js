import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  widthImageBestiary,
  widthLeftBestiary,
  widthTextBestiary,
} from '../Utils/StyleConstants';
import { colors } from '../Utils/Constants';

const styledImage = {
  position: 'relative',
  float: 'left',
  width: widthImageBestiary,
  display: 'inline-block',
};

const styledContainer = {
  position: 'relative',
  width: widthLeftBestiary - 140,
  float: 'left',
  display: 'inline-block',
  padding: '20px 70px',
};
const styledText = {
  position: 'relative',
  float: 'left',
  width: widthTextBestiary - 200,
  display: 'inline-block',
  paddingLeft: 15,
  paddingRight: 45,
  marginTop: 30,
};
const styledParagraph = {
  position: 'relative',
  float: 'left',
  width: widthTextBestiary - 200,
  display: 'inline-block',
  marginTop: 20,
  paddingLeft: 15,
  paddingRight: 45,
};
const styledMensurations = {
  position: 'relative',
  float: 'left',
  width: (widthTextBestiary - 200) / 3,
  display: 'inline-block',
  marginTop: 20,
};
const styledInfos = {
  position: 'relative',
  float: 'left',
  width: (widthTextBestiary - 200) / 3,
  display: 'inline-block',
  marginTop: 20,
};

const styledTitle = {
  fontSize: 22,
  fontWeight: 'bolder',
  color: colors.text,
};

const styledAttribute = {
  width: (widthTextBestiary - 200) / 4,
  position: 'relative',
  display: 'inline-block',
};

const styledAttributesContainer = {
  position: 'relative',
  width: widthTextBestiary - 200,
  marginTop: 20,
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
          {text4 && (
            <div style={styledParagraph}>Skills and traits : {text4}</div>
          )}
          {age && <div style={styledMensurations}>Age : {age} ans</div>}
          {taille && (
            <div style={styledInfos}>
              Taille : {taille}
              cm
            </div>
          )}
          {poids && (
            <div style={styledInfos}>
              Poids : {poids}
              kg
            </div>
          )}
          {age !== '' && (
            <div style={styledAttributesContainer}>
              <div style={styledAttribute}>Strength: 35</div>
              <div style={styledAttribute}>Dextérity: 35</div>
              {taille !== '' && (
                <Fragment>
                  <div style={styledAttribute}>Magic: 35</div>
                  <div style={styledAttribute}>Perception: 35</div>
                </Fragment>
              )}
              {poids !== '' && (
                <Fragment>
                  <div style={styledAttribute}>Constitution: 35</div>
                  <div style={styledAttribute}>Charisma: 35</div>
                  <div style={styledAttribute}>Luck: 35</div>
                  <div style={styledAttribute}>Education: 35</div>
                </Fragment>
              )}
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
