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
  color: 'red',
};

class DefaultBeast extends Component {
  render() {
    const { name, image } = this.props;

    return (
      <div style={styledContainer}>
        <div style={styledTitle}> {name}</div>
        <img src={'./bestiary/' + image} style={styledImage} alt={image} />
      </div>
    );
  }
}

DefaultBeast.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default DefaultBeast;
