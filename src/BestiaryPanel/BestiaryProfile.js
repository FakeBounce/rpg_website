import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { heightLeft, widthLeftBestiary } from '../Utils/StyleConstants';
import Beast from './Beast';
import PNJ from './PNJ';

const styledBeast = {
  width: widthLeftBestiary,
  overflowX: 'hidden',
  height: heightLeft - 25,
  overflowY: 'auto',
  display: 'inline-block',
  float: 'left',
};

class BestiaryProfile extends Component {
  render() {
    const { isGameMaster, uid, beast } = this.props;
    return (
      <div style={styledBeast}>
        {beast.monster ? (
          <Beast
            name={beast.name}
            image={beast.image}
            text1={beast[uid].text1 || isGameMaster ? beast.text1 : ''}
            text2={beast[uid].text2 || isGameMaster ? beast.text2 : ''}
            text3={beast[uid].text3 || isGameMaster ? beast.text3 : ''}
            text4={beast[uid].text4 || isGameMaster ? beast.text4 : ''}
            dangerosity={beast[uid].dangerosity ? beast.dangerosity : ''}
            taille={beast[uid].taille ? beast.taille : ''}
            poids={beast[uid].poids ? beast.poids : ''}
          />
        ) : (
          <PNJ
            name={beast.name}
            image={beast.image}
            text1={beast[uid].text1 || isGameMaster ? beast.text1 : ''}
            text2={beast[uid].text2 || isGameMaster ? beast.text2 : ''}
            text3={beast[uid].text3 || isGameMaster ? beast.text3 : ''}
            text4={beast[uid].text4 || isGameMaster ? beast.text4 : ''}
            age={beast[uid].age ? beast.age : ''}
            taille={beast[uid].taille ? beast.taille : ''}
            poids={beast[uid].poids ? beast.poids : ''}
          />
        )}
      </div>
    );
  }
}

BestiaryProfile.propTypes = {
  isGameMaster: PropTypes.bool.isRequired,
  uid: PropTypes.string.isRequired,
  beast: PropTypes.object.isRequired,
};

export default BestiaryProfile;
