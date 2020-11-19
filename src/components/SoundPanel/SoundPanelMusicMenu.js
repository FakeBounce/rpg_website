import React from 'react';

import { cursorPointer } from '../Utils/StyleConstants';
import { colors, musics } from '../Utils/Constants';
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
const SoundPanelMusicMenu = ({ activeMusicItem, setActiveMusicItem }) => {
  return (
    <Menu attached='top' tabular>
      {Object.keys(musics).map(mKey => {
        return (
          <Menu.Item
            key={mKey}
            name={mKey}
            active={activeMusicItem === mKey.toLowerCase()}
            onClick={() => {
              setActiveMusicItem(mKey);
            }}
            style={styledSoundMenuItem}
          />
        );
      })}
    </Menu>
  );
};

export default SoundPanelMusicMenu;
