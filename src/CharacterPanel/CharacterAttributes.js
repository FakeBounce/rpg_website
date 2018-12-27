import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { cursorPointer, heightLeft, imageSize } from '../Utils/StyleConstants';
import { attributes } from '../Utils/Constants';
import firebase from 'firebase';
import ButtonLarge from '../Utils/ButtonLarge';

const styles = {
  BoxHeader: {
    width: '100%',
    height: '20px',
    marginBottom: '5px',
    textAlign: 'center',
  },
  characterAttributeInfos: {
    width: `${imageSize - 1}px`,
    height: `${heightLeft / 2 - imageSize}px`,
    position: 'relative',
    float: 'left',
    display: 'inline-block',
    borderRight: '1px solid black',
    overflowY: 'auto',
  },
};
const styledAttribute = {
  marginLeft: 5,
  float: 'left',
  display: 'inline-block',
  textTransform: 'capitalize',
};
const styledAttributeGM = {
  marginLeft: 5,
  float: 'left',
  display: 'inline-block',
  textTransform: 'capitalize',
  cursor: cursorPointer,
};
const styledButton = {
  width: `${imageSize - 1}px`,
};
const styledInput = { width: 30 };

class CharacterAttributes extends PureComponent {
  state = {
    currentAttribute: '',
    currentValue: 0,
  };

  onChange = value => {
    this.setState(state => ({
      ...state,
      currentValue: value === '' ? 0 : parseInt(value, 10),
    }));
  };

  onClick = (name, value) => {
    this.setState(state => ({
      ...state,
      currentAttribute: name,
      currentValue: value,
    }));
  };

  validate = () => {
    const { currentStory, character } = this.props;
    const { currentAttribute, currentValue } = this.state;
    firebase
      .database()
      .ref(
        'stories/' +
          currentStory +
          '/characters/' +
          character.userUid +
          '/character/' +
          currentAttribute
      )
      .set(currentValue)
      .then(() => {
        this.setState(state => ({
          ...state,
          currentAttribute: '',
          currentValue: 0,
        }));
      })
      .catch(error => {
        // Handle Errors here.
        console.log('error', error);
      });
  };

  render() {
    const { character, isGameMaster } = this.props;
    const { currentAttribute, currentValue } = this.state;

    return (
      <div style={styles.characterAttributeInfos}>
        <div style={styles.BoxHeader}>Attributes :</div>
        {attributes.map(a => {
          const label = a.substring(0, 4);
          return (
            <div
              style={isGameMaster ? styledAttributeGM : styledAttribute}
              onClick={() => this.onClick(a, character[a])}
              key={'character-attribute-' + a}
            >
              {label} :{' '}
              {isGameMaster && currentAttribute === a ? (
                <input
                  name={a}
                  value={currentValue}
                  type="number"
                  style={styledInput}
                  onChange={e => {
                    this.onChange(e.target.value);
                  }}
                />
              ) : (
                character[a]
              )}
            </div>
          );
        })}
        {currentAttribute !== '' && (
          <ButtonLarge onClick={this.validate} style={styledButton}>
            OK
          </ButtonLarge>
        )}
      </div>
    );
  }
}

CharacterAttributes.propTypes = {
  character: PropTypes.object.isRequired,
  isGameMaster: PropTypes.bool.isRequired,
  currentStory: PropTypes.number.isRequired,
};

export default CharacterAttributes;
