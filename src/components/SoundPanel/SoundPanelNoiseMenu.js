import React from 'react';

import { cursorPointer } from '../Utils/StyleConstants';
import { colors, noises } from '../Utils/Constants';
import { Menu } from 'semantic-ui-react';

const styledSoundMenuItem = {
  width: 75,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 0,
  backgroundColor: colors.background,
  color: 'white',
  cursor: cursorPointer,
};

const SoundPanelNoiseMenu = ({ activeNoiseItem, setActiveNoiseItem }) => {
  return (
    <Menu attached='top' tabular>
      {Object.keys(noises).map(mKey => {
        return (
          <Menu.Item
            key={mKey}
            name={mKey}
            active={activeNoiseItem === mKey.toLowerCase()}
            onClick={() => {
              setActiveNoiseItem(mKey);
            }}
            style={styledSoundMenuItem}
          />
        );
      })}
    </Menu>
  );
};

export default SoundPanelNoiseMenu;
