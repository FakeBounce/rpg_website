import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { heightHeader, widthLeft } from './Utils/StyleConstants';
import { tempoImagesList } from './Utils/Constants';
import firebase from 'firebase';

const styledTempImage = {
  float: 'left',
  width: `${widthLeft}px`,
  height: `${window.innerHeight - heightHeader}px`,
  display: 'inline-block',
  position: 'relative',
};
const styledTempSelect = {
  position: 'absolute',
  zIndex: 1,
};

class TempImage extends Component {
  state = {
    tempImage: 'noTown.jpg',
  };

  componentDidMount() {
    firebase
      .database()
      .ref('stories/' + 0 + '/tempoImage')
      .on('value', snapshot => {
        this.setState(state => ({
          ...state,
          tempImage: snapshot.val(),
        }));
      });
  }

  onChange = value => {
    firebase
      .database()
      .ref('stories/' + 0 + '/tempoImage')
      .set(value)
      .catch(error => {
        // Handle Errors here.
        this.triggerError(error);
      });
  };

  render() {
    const { isGameMaster } = this.props;
    const { tempImage } = this.state;

    return (
      <Fragment>
        {isGameMaster && (
          <select
            value={tempImage}
            onChange={e => {
              this.onChange(e.target.value);
            }}
            style={styledTempSelect}
          >
            {tempoImagesList.map(sts => {
              return (
                <option key={sts} value={sts}>
                  {sts}
                </option>
              );
            })}
          </select>
        )}
        <img
          src={'./common/' + tempImage}
          style={styledTempImage}
          alt={tempImage}
        />
      </Fragment>
    );
  }
}

TempImage.propTypes = {
  isGameMaster: PropTypes.bool.isRequired,
};

export default TempImage;
