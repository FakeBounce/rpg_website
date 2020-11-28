import React, { useState } from 'react';
import { heightLeft, widthLeft } from '../components/Utils/StyleConstants';
import EventPanel from '../components/EventPanel';
import MapEditionPanel from '../components/MapEditionPanel';
import StoryQuestsAndMerchantsPanel from '../components/StoryQuestsAndMerchantsPanel';
import TownPanel from '../components/TownPanel';
import SpellGeneratorPanel from '../components/SpellGeneratorPanel';
import { useSelector } from 'react-redux';

const styledMiddlePanel = {
  width: `${widthLeft}px`,
  height: `${heightLeft}px`,
  display: 'inline-block',
  float: 'left',
  position: 'relative',
};

const GMMapPanel = () => {
  const [isOnQuest, setIsOnQuest] = useState(true);

  const { currentTown } = useSelector(store => ({
    currentTown: store.mapInfos.currentTown,
  }));

  const toggleRightPanel = bool => {
    setIsOnQuest(bool);
  };

  return (
    <div style={styledMiddlePanel}>
      <MapEditionPanel />
      <SpellGeneratorPanel />
      <EventPanel />
      {currentTown > -1 && <TownPanel toggleRightPanel={toggleRightPanel} />}
      {currentTown > -1 && (
        <StoryQuestsAndMerchantsPanel isOnQuest={isOnQuest} />
      )}
    </div>
  );
};

export default GMMapPanel;
