import React, { PureComponent } from "react";

import PropTypes from "prop-types";
import CharacterAttributes from "./CharacterAttributes";
import CharacterOtherInfos from "./CharacterOtherInfos";
import CharacterHeader from "./CharacterHeader";
import { colors } from "../Utils/Constants";

const styles = {
  CharPanel: {
    borderBottom: "1px solid black",
    width: "100%",
    height: "50%",
    backgroundColor: colors.background,
    color: colors.text,
  },
  CharacterBox: { position: "relative", height: "100%" },
};

class CharacterPanel extends PureComponent {
  render() {
    const {
      character,
      isGameMaster,
      infoTab,
      status,
      damageTaken,
      gold,
      onChange,
      onChangeTab,
      onLifeChange,
      onStatusChange,
      onItemUse,
      onGoldChange,
      toggleIsOnChar,
      triggerError,
      uid,
      currentStory,
    } = this.props;

    return (
      <div style={styles.CharPanel}>
        <div style={styles.CharacterBox}>
          {isGameMaster ? (
            <CharacterHeader
              gold={0}
              status={"Gamemaster"}
              icon={"./common/gameMaster.jpg"}
              name={"Gamemaster"}
              health={"999"}
              maxHealth={"999"}
              triggerError={triggerError}
              uid={uid}
              currentStory={currentStory}
            />
          ) : (
            <CharacterHeader
              gold={character.gold}
              status={character.status}
              icon={character.icon}
              name={character.name}
              health={character.health}
              maxHealth={character.maxHealth}
              triggerError={triggerError}
              uid={uid}
              currentStory={currentStory}
            />
          )}
          <CharacterAttributes
            character={character}
            isGameMaster={isGameMaster}
            currentStory={currentStory}
          />
          <CharacterOtherInfos
            character={character}
            currentStory={currentStory}
            status={status}
            infoTab={infoTab}
            damageTaken={damageTaken}
            gold={gold}
            isGameMaster={isGameMaster}
            onChange={onChange}
            onChangeTab={onChangeTab}
            onLifeChange={onLifeChange}
            onStatusChange={onStatusChange}
            onItemUse={onItemUse}
            onGoldChange={onGoldChange}
            toggleIsOnChar={toggleIsOnChar}
          />
        </div>
      </div>
    );
  }
}

CharacterPanel.propTypes = {
  character: PropTypes.object.isRequired,
  isGameMaster: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  infoTab: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  damageTaken: PropTypes.number.isRequired,
  gold: PropTypes.number.isRequired,
  onChangeTab: PropTypes.func.isRequired,
  onLifeChange: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onItemUse: PropTypes.func.isRequired,
  onGoldChange: PropTypes.func.isRequired,
  toggleIsOnChar: PropTypes.func.isRequired,
  triggerError: PropTypes.func.isRequired,
  uid: PropTypes.string.isRequired,
  currentStory: PropTypes.number.isRequired,
};

export default CharacterPanel;
