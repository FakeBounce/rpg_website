import React from 'react';
import PropTypes from 'prop-types';
import { widthImageBestiary, widthLeftBestiary } from '../Utils/StyleConstants';
import { colors } from '../Utils/Constants';

const styledImage = {
  position: 'relative',
  float: 'left',
  width: widthImageBestiary,
  display: 'inline-block',
};

const styledContainer = {
  position: 'relative',
  width: widthLeftBestiary,
  float: 'left',
  display: 'inline-block',
  padding: 15,
};

const styledTitle = {
  fontSize: 22,
  fontWeight: 'bolder',
  color: colors.red300,
};

const DefaultBeast = ({ name, image }) => {
  return (
    <div style={styledContainer}>
      <div style={styledTitle}> {name}</div>
      <img src={'./bestiary/' + image} style={styledImage} alt={image} />
    </div>
  );
};

DefaultBeast.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default DefaultBeast;
