import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TeamCharacter from './TeamCharacter';
import {
  widthRightPanel,
  heightHeader,
  heightLeft,
} from '../Utils/StyleConstants';

const styles = {
  TeamPanel: {
    borderBottom: '1px solid black',
    width: '100%',
    height: '50%',
  },
  teamCharacters: {
    width: `${widthRightPanel}px`,
    height: `${heightLeft / 2 - 30}px`,
    marginTop: 25,
    position: 'relative',
    float: 'left',
    display: 'inline-block',
    overflowY: 'auto',
  },
  HeaderTextContainer: {
    position: 'absolute',
    width: `${widthRightPanel}px`,
    height: 20,
    float: 'left',
    display: 'inline-block',
    left: 0,
    paddingTop: 2,
  },
  HeaderText: {
    position: 'relative',
    width: `${widthRightPanel/4}px`,
    height: 25,
    float: 'left',
    display: 'inline-block',
  },
  HeaderTextLeft: {
    position: 'relative',
    width: `${widthRightPanel/4}px`,
    height: 25,
    float: 'left',
    display: 'inline-block',
    textAlign: 'left',
  },
};

class TeamPanel extends Component {
  render() {
    const {
      storyCharacters,
      chatWithTeamMember,
      goldWithTeamMember,
      modifyCurrentCharacter,
      isGameMaster,
      gameMaster,
    } = this.props;

    return (
      <div style={styles.TeamPanel}>
        <div style={styles.HeaderTextContainer}>
        <div style={styles.HeaderTextLeft}>Equipe :</div>
        <div style={styles.HeaderText}>Name</div>
        <div style={styles.HeaderText}>Status</div>
        <div style={styles.HeaderText}>Gold</div>
        </div>
        <div style={styles.teamCharacters}>
          <TeamCharacter
            icon="./common/gameMaster.jpg"
            name="Game Master"
            status="OK"
            gold={999999}
            health={9999}
            maxHealth={9999}
            isGM
            chatWithTeamMember={() => chatWithTeamMember('GM')}
            goldWithTeamMember={() => goldWithTeamMember('GM')}
          />

          {storyCharacters.map(storyCharacter => {
            if (storyCharacter.userUid !== gameMaster) {
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
  chatWithTeamMember: PropTypes.func.isRequired,
  goldWithTeamMember: PropTypes.func.isRequired,
  modifyCurrentCharacter: PropTypes.func.isRequired,
  isGameMaster: PropTypes.bool.isRequired,
  gameMaster: PropTypes.string.isRequired,
};

export default TeamPanel;
