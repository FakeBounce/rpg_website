import { useDispatch } from 'react-redux';
import { SHOW_QUEST, HIDE_QUEST } from '../redux/actionsTypes/actionsTypesMapInfos';

const useMapInfos = () => {
  const dispatch = useDispatch();

  const showQuest = index => {
    dispatch({
      type: SHOW_QUEST,
      payload: index,
    });
  };

  const hideQuest = () => {
    dispatch({
      type: HIDE_QUEST,
    });
  };

  return {
    showQuest,
    hideQuest,
  };
};

export default useMapInfos;
