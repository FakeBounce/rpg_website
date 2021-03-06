import React, { useState, useEffect } from 'react';
import { heightLeft } from '../Utils/StyleConstants';
import TownsHistoryList from './TownsHistoryList';
import TownsHistorySoloMerchant from './TownsHistorySoloMerchant';
import TownsHistoryCity from './TownsHistoryCity';
import TownsHistoryQuest from './TownsHistoryQuest';
import { colors } from '../Utils/Constants';
import { useSelector } from 'react-redux';

const styledTownsHistoryContainer = {
  height: heightLeft,
  width: '100%',
  position: 'relative',
  backgroundColor: colors.background,
  color: colors.text,
};

const TownsHistoryPanel = () => {
  const [townsOrdered, setTownsOrdered] = useState({});
  const [showedMerchant, setShowedMerchant] = useState({});
  const [showedQuest, setShowedQuest] = useState({});
  const [showedTown, setShowedTown] = useState({});

  const { towns, quests, merchants } = useSelector(store => ({
    towns: store.mapInfos.towns,
    quests: store.mapInfos.quests,
    merchants: store.merchants.merchantList,
  }));

  useEffect(() => {
    const tempMandQ = {};
    towns.map(t => {
      tempMandQ[t.name] = { merchants: [], quests: [] };
      let merchantsNumber = 0;
      let questsNumber = 0;
      if (t.merchantsList && t.merchantsList.length > 0) {
        t.merchantsList.map(mIndex => {
          if (merchants[mIndex].isDiscovered) {
            tempMandQ[t.name].merchants.push({
              ...merchants[mIndex],
              realIndex: mIndex,
            });
            merchantsNumber += 1;
          }
          return null;
        });
      }
      if (t.questsList && t.questsList.length > 0) {
        t.questsList.map(qIndex => {
          if (quests[qIndex].town && quests[qIndex].town > -1) {
            tempMandQ[t.name].quests.push(quests[qIndex]);
            questsNumber += 1;
          }
          return null;
        });
      }
      if (merchantsNumber === 0 && questsNumber === 0) {
        delete tempMandQ[t.name];
      }
      return null;
    });
    setTownsOrdered({ ...tempMandQ });
  }, [merchants, quests, towns]);

  const showMerchant = m => {
    setShowedQuest({});
    setShowedTown({});
    setShowedMerchant({ ...m });
  };

  const showQuest = q => {
    setShowedQuest({ ...q });
    setShowedTown({});
    setShowedMerchant({});
  };

  const showCity = city => {
    let showedTown = {};
    towns.map(t => {
      if (t.name === city) {
        showedTown = t;
      }
      return null;
    });
    setShowedQuest({});
    setShowedTown({ ...showedTown });
    setShowedMerchant({});
  };
  return (
    <div style={styledTownsHistoryContainer}>
      <TownsHistoryList
        townsOrdered={townsOrdered}
        showMerchant={showMerchant}
        showQuest={showQuest}
        showCity={showCity}
      />
      {showedMerchant.items && (
        <TownsHistorySoloMerchant showedMerchant={showedMerchant} />
      )}
      {showedQuest.name && <TownsHistoryQuest showedQuest={showedQuest} />}
      {showedTown.name && <TownsHistoryCity showedTown={showedTown} />}
    </div>
  );
};

export default TownsHistoryPanel;
