import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import HealthBar from '../Utils/HealthBar';
import TeamCharacterInfo from './TeamCharacterInfo';
import {
  cursorPointer,
  widthRightPanel,
  imageSize,
  widthRightPanelLeft,
} from '../Utils/StyleConstants';
import { GiSwitchWeapon } from 'react-icons/gi';
import MentalBar from '../Utils/MentalBar';

const styles = {
  characterTeamHeaderImage: {
    position: 'relative',
    width: `${imageSize / 2}px`,
    height: `${imageSize / 2}px`,
    float: 'left',
    display: 'inline-block',
  },
};

const styledCharacterTeamHeader = {
  width: `${widthRightPanel}px`,
  height: `${imageSize / 2}px`,
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  borderTop: '1px solid black',
  borderBottom: '1px solid black',
  cursor: cursorPointer,
};

const styledCharacterTeamExchangeImage = {
  width: 25,
  height: 25,
};

const styledCharacterTeamHeaderImageContainer = {
  position: 'relative',
  width: `${imageSize / 2}px`,
  height: `${imageSize / 2}px`,
  float: 'left',
  display: 'inline-block',
};

const styledCharacterTeamHeaderInactiveImage = {
  position: 'absolute',
  width: `${imageSize}px`,
  height: `${imageSize}px`,
  backgroundColor: 'grey',
  opacity: 0.3,
};

const TeamCharacter = ({
  icon,
  name,
  status,
  gold,
  health = 50,
  maxHealth = 50,
  mentalState = 5,
  maxMentalState = 5,
  exchangeWithTeamMember,
  chatWithTeamMember,
  goldWithTeamMember,
  isGM = false,
}) => {
  const [currentFilter, setCurrentFilter] = useState({});

  useEffect(() => {
    setCurrentFilter(getFilter());
  }, [status]);

  const getFilter = () => {
    console.log('status', status);
    switch (status) {
      case 'Inactive':
      case 'Left':
      case 'Unconscious':
      case 'Dead':
        return {
          position: 'absolute',
          width: `${imageSize / 2}px`,
          height: `${imageSize / 2}px`,
          backgroundColor: 'black',
          opacity: 0.7,
          zIndex: 2,
        };
      case 'Bleeding':
        return {
          position: 'absolute',
          width: `${imageSize / 2}px`,
          height: `${imageSize / 2}px`,
          backgroundColor: 'red',
          opacity: 0.4,
          zIndex: 2,
        };
      case 'Frozen':
        return {
          position: 'absolute',
          width: `${imageSize / 2}px`,
          height: `${imageSize / 2}px`,
          backgroundColor: 'azure',
          opacity: 0.7,
          zIndex: 2,
        };
      case 'Paralyzed':
        return {
          position: 'absolute',
          width: `${imageSize / 2}px`,
          height: `${imageSize / 2}px`,
          backgroundColor: 'yellow',
          opacity: 0.7,
          zIndex: 2,
        };
      case 'Poisoned':
        return {
          position: 'absolute',
          width: `${imageSize / 2}px`,
          height: `${imageSize / 2}px`,
          backgroundColor: 'green',
          opacity: 0.7,
          zIndex: 2,
        };
      case 'Sleepy':
        return {
          position: 'absolute',
          width: `${imageSize / 2}px`,
          height: `${imageSize / 2}px`,
          backgroundColor: 'grey',
          opacity: 0.7,
          zIndex: 2,
        };
      case 'Under control':
        return {
          position: 'absolute',
          width: `${imageSize / 2}px`,
          height: `${imageSize / 2}px`,
          backgroundColor: '#e03997',
          opacity: 0.7,
          zIndex: 2,
        };
      case 'Burned':
        return {
          position: 'absolute',
          width: `${imageSize / 2}px`,
          height: `${imageSize / 2}px`,
          backgroundColor: 'orange',
          opacity: 0.4,
          zIndex: 2,
        };
      default:
        return {};
    }
  };

  return (
    <div style={styledCharacterTeamHeader}>
      <div>
        <div style={currentFilter}></div>
        <div
          style={{
            position: 'absolute',
            width: `${imageSize / 2}px`,
            height: `${imageSize / 2}px`,
            zIndex: 3,
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {status && status !== 'OK' ? status : ''}
        </div>
        <img src={icon} alt={name} style={styles.characterTeamHeaderImage} />
      </div>
      <div
        onClick={chatWithTeamMember}
        style={{ display: 'flex', flexDirection: 'row', width: 130 }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 5,
            width: 25,
          }}
        >
          {!isGM && (
            <GiSwitchWeapon
              onClick={exchangeWithTeamMember}
              style={styledCharacterTeamExchangeImage}
            />
          )}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: 100,
            paddingLeft: 5,
            paddingRight: 5,
          }}
        >
          <TeamCharacterInfo title={name} />
        </div>
      </div>
      <div
        onClick={goldWithTeamMember}
        style={{ minWidth: 70, width: 70, display: 'flex' }}
      >
        <TeamCharacterInfo title='' text={`${gold ? gold : 0}g`} />
      </div>
      <div
        onClick={chatWithTeamMember}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <HealthBar
          isGM={isGM}
          width={`${Math.floor((health / maxHealth) * 100)}%`}
          maxWidth={`${140}px`}
        />
        <MentalBar
          isGM={isGM}
          width={`${Math.floor((mentalState / maxMentalState) * 100)}%`}
          maxWidth={`${maxMentalState * 14}px`}
          mentalState={mentalState}
          maxMentalState={maxMentalState}
        />
      </div>
    </div>
  );
};

TeamCharacter.propTypes = {
  icon: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  gold: PropTypes.number.isRequired,
  health: PropTypes.number,
  maxHealth: PropTypes.number,
  mentalState: PropTypes.number,
  maxMentalState: PropTypes.number,
  isGM: PropTypes.bool,
  exchangeWithTeamMember: PropTypes.func.isRequired,
  chatWithTeamMember: PropTypes.func.isRequired,
  goldWithTeamMember: PropTypes.func.isRequired,
};

export default TeamCharacter;
