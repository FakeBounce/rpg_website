import React, { Component } from 'react';
import PropTypes from 'prop-types';

const styledImage = {
  position: 'relative',
  float: 'left',
  width: 100,
  height: 100,
};
const styledContainer = {
  position: 'relative',
  width: window.innerWidth / 4 - 2,
  float: 'left',
  display: 'inline-block',
  borderLeft: '1px dashed black',
  borderRight: '1px dashed black',
  borderBottom: '1px dashed black',
};
const styledText = {
  position: 'relative',
  float: 'left',
  width: window.innerWidth / 4 - 2 - 120,
  padding: 10,
};
const styledTitle = {
  fontSize: 22,
  fontWeight: 'bolder',
  color: 'red',
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
          {text1 && <div>{text1}</div>}
          {text2 && <div>{text2}</div>}
          {text3 && <div>{text3}</div>}
          {text4 && <div>{text4}</div>}
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
