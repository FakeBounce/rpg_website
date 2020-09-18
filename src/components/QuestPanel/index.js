import React from 'react';
import Quest from './Quest';
import { widthLeft, heightLeft } from '../Utils/StyleConstants';
import QuestFullscreen from './QuestFullscreen';
import { useSelector, useDispatch } from 'react-redux';

const styledMapSide = {
  width: `${widthLeft / 2}px`,
  height: `${heightLeft / 2}px`,
  display: 'inline-block',
  float: 'left',
  textAlign: 'left',
  position: 'relative',
};

const QuestPanel = () => {
  const { currentQuest, isQuestShowed, quests, questsList } = useSelector(
    store => ({
      currentQuest: store.mapInfos.currentQuest,
      isQuestShowed: store.mapInfos.isQuestShowed,
      quests: store.mapInfos.quests,
      questsList: store.mapInfos.townInfos.questsList,
    }),
  );

  // For GM quest positionning
  // const getPosition = () => {
  //   let hasPosition = false;
  //   const i = Math.floor(Math.random() * 8);
  //   if (positionList.indexOf(i) === -1) {
  //     const newPositionList = positionList;
  //     hasPosition = true;
  //     newPositionList.push(i);
  //     setPositionList(newPositionList);
  //   }
  //   if (hasPosition || positionList.length === 8)
  //     return positionList[positionList.length - 1];

  //   return getPosition();
  // };

  if (isQuestShowed) {
    return (
      <div
        style={{
          ...styledMapSide,
          backgroundImage: `url(./quests/quest_panel.jpg)`,
          backgroundSize: 'cover',
        }}
      >
        <QuestFullscreen {...quests[currentQuest]} />
      </div>
    );
  }
  return (
    <div
      style={{
        ...styledMapSide,
        backgroundImage: `url(./quests/quest_panel.jpg)`,
        backgroundSize: 'cover',
      }}
    >
      {questsList.map((q, i) => {
        if (!quests[q].validated) {
          return (
            <Quest
              key={`merchant-${quests[q].name} -${i}`}
              {...quests[q]}
              index={q}
            />
          );
        }
        return null;
      })}
    </div>
  );
};

export default QuestPanel;
