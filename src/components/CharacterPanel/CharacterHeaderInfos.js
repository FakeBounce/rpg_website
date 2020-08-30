import React from 'react';
import { useSelector } from 'react-redux';
import { widthRightPanelLeft } from '../Utils/StyleConstants';

const characterHeaderinfos = {
  width: `${widthRightPanelLeft}px`,
  height: 49,
  position: 'relative',
  float: 'left',
  display: 'inline-block',
  borderBottom: '1px solid black',
};
const characterHeaderGold = {
  position: 'relative',
  width: `${widthRightPanelLeft}px`,
  height: 25,
  float: 'left',
  display: 'inline-block',
};

const CharacterHeaderInfos = () => {
  const { gold } = useSelector(store => ({
    gold: store.character.gold,
  }));

  return (
    <div style={characterHeaderinfos}>
      <div style={characterHeaderGold}>{gold ? gold : 0}g</div>
    </div>
  );
};

export default CharacterHeaderInfos;
