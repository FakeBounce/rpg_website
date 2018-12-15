import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import TeamCharacter from "./TeamCharacter";
import { widthRightPanel, heightLeft } from "../Utils/StyleConstants";
import TeamHeader from "./TeamHeader";

const styles = {
  TeamPanel: {
    borderBottom: "1px solid black",
    width: "100%",
    height: "50%",
  },
  teamCharacters: {
    width: `${widthRightPanel}px`,
    height: `${heightLeft / 2 - 30}px`,
    marginTop: 25,
    position: "relative",
    float: "left",
    display: "inline-block",
    overflowY: "auto",
  },
  GMTeamPanel: {
    borderBottom: "1px solid black",
    width: "100%",
    height: "100%",
  },
  GMteamCharacters: {
    width: "100%",
    height: `${heightLeft / 2 - 30}px`,
    marginTop: 25,
    position: "relative",
    float: "left",
    display: "inline-block",
    overflowY: "auto",
  },
};

class TeamPanel extends PureComponent {
  render() {
    const {
      storyCharacters,
      exchangeWithTeamMember,
      chatWithTeamMember,
      goldWithTeamMember,
      modifyCurrentCharacter,
      isGameMaster,
      gameMaster,
    } = this.props;

    return (
      <div style={isGameMaster ? styles.GMTeamPanel : styles.TeamPanel}>
        <TeamHeader />
        <div
          style={isGameMaster ? styles.GMteamCharacters : styles.teamCharacters}
        >
          <TeamCharacter
            icon="./common/gameMaster.jpg"
            name="Game Master"
            status="FURIOUS"
            gold={999999}
            health={9999}
            maxHealth={9999}
            isGM
            exchangeWithTeamMember={() => {}}
            chatWithTeamMember={() => {
              chatWithTeamMember("GM");
              modifyCurrentCharacter(gameMaster);
            }}
            goldWithTeamMember={() => goldWithTeamMember("GM")}
          />

          {storyCharacters.map(storyCharacter => {
            if (
              storyCharacter.userUid !== gameMaster &&
              storyCharacter.userPseudo !== "Tadlos"
            ) {
              return (
                <TeamCharacter
                  key={storyCharacter.name}
                  {...storyCharacter}
                  chatWithTeamMember={() => {
                    chatWithTeamMember(storyCharacter.userPseudo);
                    if (isGameMaster) {
                      modifyCurrentCharacter(storyCharacter.userUid);
                    }
                  }}
                  goldWithTeamMember={() =>
                    goldWithTeamMember(storyCharacter.userPseudo)
                  }
                  exchangeWithTeamMember={() =>
                    exchangeWithTeamMember(storyCharacter)
                  }
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  }
}

TeamPanel.propTypes = {
  storyCharacters: PropTypes.array.isRequired,
  exchangeWithTeamMember: PropTypes.func.isRequired,
  chatWithTeamMember: PropTypes.func.isRequired,
  goldWithTeamMember: PropTypes.func.isRequired,
  modifyCurrentCharacter: PropTypes.func.isRequired,
  isGameMaster: PropTypes.bool.isRequired,
  gameMaster: PropTypes.string.isRequired,
};

export default TeamPanel;
