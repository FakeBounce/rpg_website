import React from 'react';
import { widthRightPanel, heightCameras } from '../Utils/StyleConstants';

const styledBottomPanel = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: `${window.innerWidth - widthRightPanel}px`,
  height: `${heightCameras}px`,
};

const BottomPanel = () => {
  return <div style={styledBottomPanel}></div>;
};

export default BottomPanel;
