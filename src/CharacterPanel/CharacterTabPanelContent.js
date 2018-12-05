import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { widthRightPanelLeft } from '../Utils/StyleConstants';
import firebase from 'firebase';

const styles = {
  tabPanelItem: {
    width: `${widthRightPanelLeft - 20}px`,
    paddingHorizontal: 5,
    position: 'relative',
    float: 'left',
    display: 'inline-block',
  },
  itemButton: {
    width: 50,
    height: 30,
    position: 'relative',
    float: 'right',
    display: 'inline-block',
    padding: 0,
    margin: 0,
    textAlign: 'center',
  },
};

class CharacterTabPanelContent extends Component {
  state = {
    newValue: '',
  };

  onChange = value => {
    this.setState(state => ({
      ...state,
      newValue: value,
    }));
  };

  onValidate = () => {
    const { newValue } = this.state;
    const { character, tab, tabName } = this.props;
    const obj = [...tab];
    obj.push(newValue);

    firebase
      .database()
      .ref(
        'stories/' +
          0 +
          '/characters/' +
          character.userUid +
          '/character/' +
          tabName.toLowerCase()
      )
      .set(obj)
      .catch(error => {
        // Handle Errors here.
        console.log('Error', error);
      });
  };

  onRemove = i => {
    const { character, tab, tabName } = this.props;
    const obj = [...tab];
    obj.splice(i, 1);

    firebase
      .database()
      .ref(
        'stories/' +
          0 +
          '/characters/' +
          character.userUid +
          '/character/' +
          tabName.toLowerCase()
      )
      .set(obj)
      .catch(error => {
        // Handle Errors here.
        console.log('Error', error);
      });
  };

  render() {
    const { tab, tabName } = this.props;
    const { newValue } = this.state;

    return (
      <div>
        {tab.map((description, index) => {
          return (
            <div key={`${description}-${index}`} style={styles.tabPanelItem}>
              {description}
              <button style={styles.itemButton} onClick={this.onRemove(index)}>
                Remove
              </button>
            </div>
          );
        })}
        <div style={styles.tabPanelItem}>
          <input
            type="text"
            placeholder={`${tabName} + description if needed`}
            value={newValue}
            onChange={e => {
              this.onChange(e.target.value);
            }}
          />
          <button onClick={this.onValidate}>Add {tabName.toLowerCase()}</button>
        </div>
      </div>
    );
  }
}

CharacterTabPanelContent.defaultProps = {
  tabName: '',
  character: {},
};

CharacterTabPanelContent.propTypes = {
  tab: PropTypes.array.isRequired,
  tabName: PropTypes.string,
  character: PropTypes.object,
};

export default CharacterTabPanelContent;
