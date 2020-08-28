import React from 'react';
import { widthRightPanel } from '../Utils/StyleConstants';

const styles = {
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
    width: `${widthRightPanel / 4}px`,
    height: 25,
    float: 'left',
    display: 'inline-block',
  },
  HeaderTextLeft: {
    position: 'relative',
    width: `${widthRightPanel / 8}px`,
    height: 25,
    float: 'left',
    display: 'inline-block',
    textAlign: 'left',
  },
};

const TeamHeader = () => {
  return (
    <div style={styles.HeaderTextContainer}>
      <div style={styles.HeaderTextLeft}>Equipe :</div>
      <div style={{ ...styles.HeaderText, width: 130 }}>Name</div>
      <div style={{ ...styles.HeaderText, width: 70 }}>Gold</div>
      <div style={{ ...styles.HeaderText, width: 140 }}>Health & Mental</div>
    </div>
  );
};

export default TeamHeader;
