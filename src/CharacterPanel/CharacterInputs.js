import React, { Component } from "react";
import PropTypes from "prop-types";
import ButtonLarge from "../Utils/ButtonLarge";
import { statusList } from "../Utils/Constants";

const styles = {
  lifeInput: {
    position: "relative",
    float: "left",
    display: "inline-block",
    width: 35,
    height: 19,
  },
  lifeSelect: {
    position: "relative",
    float: "left",
    display: "inline-block",
    width: 70,
    height: 19,
  },
  lifeButton: {
    position: "relative",
    float: "left",
    display: "inline-block",
    width: 25,
    height: 25,
    padding: 0,
  },
  statusButton: {
    position: "relative",
    float: "left",
    display: "inline-block",
    width: 42,
    height: 25,
    padding: 0,
  },
  goldButton: {
    position: "relative",
    float: "left",
    display: "inline-block",
    width: 35,
    height: 25,
    padding: 0,
  },
};

class CharacterInputs extends Component {
  render() {
    const {
      character,
      gold,
      status,
      onChange,
      onLifeChange,
      onStatusChange,
      onGoldChange,
      damageTaken,
      isGameMaster,
      toggleIsOnChar,
    } = this.props;

    console.log("chara", character);

    return (
      <div>
        <input
          type="number"
          placeholder="X"
          name="damageTaken"
          value={damageTaken}
          onChange={e => {
            onChange(e.target.name, parseInt(e.target.value, 10));
          }}
          style={styles.lifeInput}
        />
        <ButtonLarge onClick={onLifeChange} style={styles.lifeButton}>
          HP
        </ButtonLarge>
        <select
          value={status}
          onChange={e => {
            onChange("status", e.target.value);
          }}
          style={styles.lifeSelect}
        >
          {statusList.map(sts => {
            return (
              <option key={sts} value={sts}>
                {sts}
              </option>
            );
          })}
        </select>
        <ButtonLarge onClick={onStatusChange} style={styles.statusButton}>
          Status
        </ButtonLarge>
        {isGameMaster && (
          <div>
            <input
              type="number"
              placeholder="X"
              name="gold"
              value={gold}
              onChange={e => {
                onChange(e.target.name, parseInt(e.target.value, 10));
              }}
              style={styles.lifeInput}
            />
            <ButtonLarge onClick={onGoldChange} style={styles.goldButton}>
              Gold
            </ButtonLarge>
          </div>
        )}
        {character.userUid === "UUCVe6qVn8ZHTrS1qa1ff4fK7i22" && (
          <ButtonLarge
            onClick={toggleIsOnChar}
            style={{
              position: "relative",
              float: "right",
              width: 124,
            }}
          >
            Play music
          </ButtonLarge>
        )}
      </div>
    );
  }
}

CharacterInputs.propTypes = {
  character: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  damageTaken: PropTypes.number.isRequired,
  gold: PropTypes.number.isRequired,
  isGameMaster: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeTab: PropTypes.func.isRequired,
  onLifeChange: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onGoldChange: PropTypes.func.isRequired,
  toggleIsOnChar: PropTypes.func.isRequired,
};

export default CharacterInputs;
