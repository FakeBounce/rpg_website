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
