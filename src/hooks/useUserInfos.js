import { useDispatch } from 'react-redux';
import { CALL_SET_USER_PSEUDO } from '../redux/actionsTypes/actionsTypesUserInfos';
import useApp from './useApp';

const useUserInfos = () => {
  const dispatch = useDispatch();

  const choosePseudo = pseudoInput => {
    dispatch({ type: CALL_SET_USER_PSEUDO, payload: pseudoInput });
  };

  return { choosePseudo };
};

export default useUserInfos;
