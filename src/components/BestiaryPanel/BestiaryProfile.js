import React from 'react';
import PropTypes from 'prop-types';

import { heightLeft, widthLeftBestiary } from '../Utils/StyleConstants';
import Beast from './Beast';
import PNJ from './PNJ';
import ButtonLarge from '../Utils/ButtonLarge';
import { useSelector } from 'react-redux';

const styledBeast = {
  width: widthLeftBestiary,
  overflowX: 'hidden',
  height: heightLeft - 25,
  overflowY: 'auto',
  display: 'inline-block',
  float: 'left',
  position: 'relative',
};

const BestiaryProfile = ({ beast, editBeast }) => {
  const { isGameMaster, uid } = useSelector(store => ({
    isGameMaster: store.appState.isGameMaster,
    uid: store.userInfos.uid,
  }));
  return (
    <div style={styledBeast} className='scrollbar'>
      <ButtonLarge
        onClick={editBeast}
        style={{
          position: 'absolute',
          right: 60,
          top: 32,
          zIndex: 5,
        }}
      >
        Edit
      </ButtonLarge>
      {beast.monster ? (
        <Beast
          name={beast.name}
          image={beast.image}
          text1={beast[uid].text1 || isGameMaster ? beast.text1 : ''}
          text2={beast[uid].text2 || isGameMaster ? beast.text2 : ''}
          text3={beast[uid].text3 || isGameMaster ? beast.text3 : ''}
          text4={beast[uid].text4 || isGameMaster ? beast.text4 : ''}
          dangerosity={
            beast[uid].dangerosity || isGameMaster ? beast.dangerosity : ''
          }
          taille={beast[uid].taille || isGameMaster ? beast.taille : ''}
          poids={beast[uid].poids || isGameMaster ? beast.poids : ''}
        />
      ) : (
        <PNJ
          name={beast.name}
          image={beast.image}
          text1={beast[uid].text1 || isGameMaster ? beast.text1 : ''}
          text2={beast[uid].text2 || isGameMaster ? beast.text2 : ''}
          text3={beast[uid].text3 || isGameMaster ? beast.text3 : ''}
          text4={beast[uid].text4 || isGameMaster ? beast.text4 : ''}
          age={beast[uid].age || isGameMaster ? beast.age : ''}
          taille={beast[uid].taille || isGameMaster ? beast.taille : ''}
          poids={beast[uid].poids || isGameMaster ? beast.poids : ''}
        />
      )}
    </div>
  );
};

BestiaryProfile.propTypes = {
  beast: PropTypes.object.isRequired,
  editBeast: PropTypes.func.isRequired,
};

export default BestiaryProfile;
